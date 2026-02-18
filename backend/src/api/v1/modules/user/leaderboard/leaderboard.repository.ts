import { eq, sql, desc, and } from "drizzle-orm";
import { db } from "../../../../../db";
import {
  leaderboard,
  moments,
  momentLikes,
  users,
} from "../../../../../db/schema";

/* ============================================================
   CURRENT WEEK LEADERBOARD (LIVE FROM MOMENTS)
============================================================ */

export async function getLeaderboardRepo(options: {
  limit: number;
  offset: number;
}) {
  const { limit, offset } = options;

  return await db
    .select({
      id: moments.id,
      userId: moments.userId,
      slug: moments.slug,
      imageUrl: moments.imageUrl,
      caption: moments.caption,
      createdAt: moments.createdAt,
      userName: sql<string>`COALESCE(${users.fullName}, ${users.phoneNumber})`,
      likes: sql<number>`count(${momentLikes.id})::int`,
    })
    .from(moments)
    .leftJoin(momentLikes, eq(moments.id, momentLikes.momentId))
    .innerJoin(users, eq(moments.userId, users.id))
    .where(
      and(
        eq(moments.status, "approved"),
        eq(moments.currentWeek, true),
      )
    )
    .groupBy(moments.id, users.id)
    .orderBy(desc(sql`count(${momentLikes.id})`))
    .limit(limit)
    .offset(offset);
}

/* ============================================================
   PREVIOUS WEEK WINNERS (FROM LEADERBOARD TABLE)
============================================================ */

export async function getTop5FromLeaderboardRepo() {
  return await db
    .select({
      id: leaderboard.id,
      userId: leaderboard.userId,
      momentId: leaderboard.momentId,
      likeCount: leaderboard.likeCount,
      createdAt: leaderboard.createdAt,
      slug: moments.slug,
      imageUrl: moments.imageUrl,
      caption: moments.caption,
      userName: sql<string>`COALESCE(${users.fullName}, ${users.phoneNumber})`,
    })
    .from(leaderboard)
    .innerJoin(moments, eq(leaderboard.momentId, moments.id))
    .innerJoin(users, eq(leaderboard.userId, users.id))
    .where(eq(moments.currentWeek, false))
    .orderBy(desc(leaderboard.likeCount))
    .limit(5);
}

/* ============================================================
   WEEKLY RESET (MANUAL OR CRON)
============================================================ */

export async function refreshLeaderboardRepo(): Promise<void> {
  // Get top 5 from current week
  const topMoments = await db
    .select({
      momentId: moments.id,
      userId: moments.userId,
      likeCount: sql<number>`count(${momentLikes.id})::int`,
    })
    .from(moments)
    .leftJoin(momentLikes, eq(moments.id, momentLikes.momentId))
    .where(
      and(
        eq(moments.status, "approved"),
        eq(moments.currentWeek, true),
      )
    )
    .groupBy(moments.id, moments.userId)
    .orderBy(desc(sql`count(${momentLikes.id})`))
    .limit(5);

  if (!topMoments.length) return;

  // Use transaction for safety
  await db.transaction(async (tx) => {
    await tx.delete(leaderboard);

    await tx.insert(leaderboard).values(
      topMoments.map((m) => ({
        userId: m.userId,
        momentId: m.momentId,
        likeCount: m.likeCount,
      }))
    );
  });
}

/* ============================================================
   ARCHIVE CURRENT WEEK
============================================================ */

export async function markMomentsAsInactiveRepo(): Promise<number> {
  const result = await db
    .update(moments)
    .set({ currentWeek: false, updatedAt: new Date() })
    .where(eq(moments.currentWeek, true));

  return (result as unknown as { rowCount?: number }).rowCount ?? 0;
}
