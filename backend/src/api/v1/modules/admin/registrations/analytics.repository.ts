import { eq, sql, desc, count, ilike, or, SQL } from "drizzle-orm";
import { db } from "../../../../../db";
import { users, campaigns, moments, momentLikes } from "../../../../../db/schema";

export interface UserAnalyticsRow {
  id: string;
  fullName: string | null;
  phoneNumber: string;
  campaignName: string | null;
  totalPosts: number;
  approvedPosts: number;
  pendingPosts: number;
  totalLikes: number;
  registeredAt: Date;
}

function buildSearchWhere(search?: string): SQL | undefined {
  if (!search) return undefined;
  return or(
    ilike(users.phoneNumber, `%${search}%`),
    ilike(users.fullName, `%${search}%`)
  ) as SQL;
}

export async function getUserAnalyticsRepo(options: {
  limit: number;
  offset: number;
  search?: string;
}): Promise<{ users: UserAnalyticsRow[]; total: number }> {
  const { limit, offset, search } = options;
  const whereCond = buildSearchWhere(search);

  const rows = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      phoneNumber: users.phoneNumber,
      campaignName: campaigns.name,
      registeredAt: users.createdAt,
      totalPosts: sql<number>`count(distinct ${moments.id})::int`,
      approvedPosts: sql<number>`count(distinct ${moments.id}) filter (where ${moments.status} = 'approved')::int`,
      pendingPosts: sql<number>`count(distinct ${moments.id}) filter (where ${moments.status} = 'pending')::int`,
      totalLikes: sql<number>`count(${momentLikes.id})::int`,
    })
    .from(users)
    .leftJoin(campaigns, eq(users.campaignId, campaigns.id))
    .leftJoin(moments, eq(moments.userId, users.id))
    .leftJoin(momentLikes, eq(momentLikes.momentId, moments.id))
    .where(whereCond)
    .groupBy(users.id, campaigns.id)
    .orderBy(desc(sql`count(${momentLikes.id})`), desc(users.createdAt))
    .limit(limit)
    .offset(offset);

  const [countResult] = await db
    .select({ total: count() })
    .from(users)
    .where(whereCond);

  return {
    users: rows as UserAnalyticsRow[],
    total: countResult?.total ?? 0,
  };
}

export async function getUserAnalyticsForExportRepo(
  search?: string
): Promise<UserAnalyticsRow[]> {
  const whereCond = buildSearchWhere(search);

  const rows = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      phoneNumber: users.phoneNumber,
      campaignName: campaigns.name,
      registeredAt: users.createdAt,
      totalPosts: sql<number>`count(distinct ${moments.id})::int`,
      approvedPosts: sql<number>`count(distinct ${moments.id}) filter (where ${moments.status} = 'approved')::int`,
      pendingPosts: sql<number>`count(distinct ${moments.id}) filter (where ${moments.status} = 'pending')::int`,
      totalLikes: sql<number>`count(${momentLikes.id})::int`,
    })
    .from(users)
    .leftJoin(campaigns, eq(users.campaignId, campaigns.id))
    .leftJoin(moments, eq(moments.userId, users.id))
    .leftJoin(momentLikes, eq(momentLikes.momentId, moments.id))
    .where(whereCond)
    .groupBy(users.id, campaigns.id)
    .orderBy(desc(sql`count(${momentLikes.id})`), desc(users.createdAt));

  return rows as UserAnalyticsRow[];
}
