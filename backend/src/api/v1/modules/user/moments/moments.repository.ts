import { eq, and, sql, inArray, desc, count } from "drizzle-orm";
import { db } from "../../../../../db";
import {
  moments,
  momentLikes,
  users,
  type Moment,
  type NewMoment,
} from "../../../../../db/schema";

export async function createMomentRepo(data: NewMoment): Promise<Moment> {
  const [moment] = await db.insert(moments).values(data).returning();
  return moment;
}

export async function getMomentByIdRepo(id: string): Promise<Moment | undefined> {
  const [row] = await db.select().from(moments).where(eq(moments.id, id)).limit(1);
  return row;
}

export async function getMomentBySlugRepo(slug: string): Promise<Moment | undefined> {
  const [row] = await db.select().from(moments).where(eq(moments.slug, slug)).limit(1);
  return row;
}

export async function getMomentWithUserBySlugRepo(slug: string): Promise<{ moment: Moment; userName: string } | undefined> {
  const [row] = await db
    .select({
      moment: moments,
      userName: sql<string>`COALESCE(${users.fullName}, ${users.phoneNumber})`,
    })
    .from(moments)
    .innerJoin(users, eq(moments.userId, users.id))
    .where(eq(moments.slug, slug))
    .limit(1);
  return row;
}

export interface MomentListItem {
  id: string;
  userId: string;
  slug: string;
  imageUrl: string;
  caption: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  userName: string;
  likes: number;
}

export async function listApprovedMomentsRepo(
  options: { currentWeek?: boolean; limit: number; offset: number }
): Promise<{ items: MomentListItem[]; totalCount: number }> {
  const { currentWeek, limit, offset } = options;

  const conditions = [eq(moments.status, "approved")];
  if (currentWeek !== undefined) {
    conditions.push(eq(moments.currentWeek, currentWeek));
  }

  const whereClause = and(...conditions);

  // Single query with JOIN, GROUP BY, ORDER BY, LIMIT/OFFSET
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
      likes: sql<number>`count(${momentLikes.id})::int`,
    })
    .from(moments)
    .innerJoin(users, eq(moments.userId, users.id))
    .leftJoin(momentLikes, eq(moments.id, momentLikes.momentId))
    .where(whereClause)
    .groupBy(moments.id, users.id)
    .orderBy(
      desc(moments.currentWeek),
      desc(sql`count(${momentLikes.id})`),
      desc(moments.createdAt)
    )
    .limit(limit)
    .offset(offset);

  // Count query for pagination
  const [countResult] = await db
    .select({ total: count() })
    .from(moments)
    .where(whereClause);

  return {
    items: rows as MomentListItem[],
    totalCount: countResult?.total ?? 0,
  };
}

export async function listUserMomentsRepo(userId: string): Promise<MomentListItem[]> {
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
    .where(eq(moments.userId, userId));

  if (rows.length === 0) return [];

  const momentIds = rows.map((r) => r.id);
  const likeCounts = await db
    .select({
      momentId: momentLikes.momentId,
      count: sql<number>`count(*)::int`,
    })
    .from(momentLikes)
    .where(inArray(momentLikes.momentId, momentIds))
    .groupBy(momentLikes.momentId);

  const likeMap = new Map(likeCounts.map((l) => [l.momentId, l.count]));

  return rows.map((r) => ({
    ...r,
    likes: likeMap.get(r.id) ?? 0,
  }));
}

export async function getMomentLikeCountRepo(momentId: string): Promise<number> {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(momentLikes)
    .where(eq(momentLikes.momentId, momentId));
  return row?.count ?? 0;
}
