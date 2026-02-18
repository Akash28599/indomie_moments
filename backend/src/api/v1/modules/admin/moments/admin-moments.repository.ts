import { eq, sql } from "drizzle-orm";
import { db } from "../../../../../db";
import { moments, users } from "../../../../../db/schema";

export async function listPendingMomentsRepo() {
  const rows = await db
    .select({
      id: moments.id,
      userId: moments.userId,
      slug: moments.slug,
      imageUrl: moments.imageUrl,
      caption: moments.caption,
      status: moments.status,
      createdAt: moments.createdAt,
      userName: sql<string>`COALESCE(${users.fullName}, ${users.phoneNumber})`,
    })
    .from(moments)
    .innerJoin(users, eq(moments.userId, users.id))
    .where(eq(moments.status, "pending"));
  return rows;
}

export async function updateMomentStatusRepo(
  momentId: string,
  status: "approved" | "rejected"
) {
  const [updated] = await db
    .update(moments)
    .set({ status, updatedAt: new Date() })
    .where(eq(moments.id, momentId))
    .returning();
  return updated;
}

export async function getModerationStatsRepo() {
  const [pending] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(moments)
    .where(eq(moments.status, "pending"));
  const [approved] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(moments)
    .where(eq(moments.status, "approved"));
  const [rejected] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(moments)
    .where(eq(moments.status, "rejected"));
  const [total] = await db.select({ count: sql<number>`count(*)::int` }).from(moments);

  return {
    pending: pending?.count ?? 0,
    approved: approved?.count ?? 0,
    rejected: rejected?.count ?? 0,
    total: total?.count ?? 0,
  };
}
