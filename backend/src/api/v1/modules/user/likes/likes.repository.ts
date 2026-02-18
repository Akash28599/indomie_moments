import { eq, and, sql, inArray } from "drizzle-orm";
import { db } from "../../../../../db";
import { momentLikes } from "../../../../../db/schema";

export async function hasUserLikedRepo(
  momentId: string,
  userId: string
): Promise<boolean> {
  const [row] = await db
    .select()
    .from(momentLikes)
    .where(
      and(
        eq(momentLikes.momentId, momentId),
        eq(momentLikes.userId, userId)
      )
    )
    .limit(1);
  return !!row;
}

export async function addLikeRepo(
  momentId: string,
  userId: string
): Promise<void> {
  await db.insert(momentLikes).values({ momentId, userId });
}

export async function removeLikeRepo(
  momentId: string,
  userId: string
): Promise<void> {
  await db
    .delete(momentLikes)
    .where(
      and(
        eq(momentLikes.momentId, momentId),
        eq(momentLikes.userId, userId)
      )
    );
}

export async function getLikeCountRepo(momentId: string): Promise<number> {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(momentLikes)
    .where(eq(momentLikes.momentId, momentId));
  return row?.count ?? 0;
}

export async function getUserLikedMomentIdsRepo(
  userId: string,
  momentIds: string[]
): Promise<Set<string>> {
  if (momentIds.length === 0) return new Set();
  const rows = await db
    .select({ momentId: momentLikes.momentId })
    .from(momentLikes)
    .where(
      and(
        eq(momentLikes.userId, userId),
        inArray(momentLikes.momentId, momentIds)
      )
    );
  return new Set(rows.map((r) => r.momentId));
}
