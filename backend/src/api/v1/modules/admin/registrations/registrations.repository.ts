import { eq, desc, count, ilike, or, and, SQL } from 'drizzle-orm';
import { db } from '../../../../../db';
import { users, campaigns } from '../../../../../db/schema';
import type { FormattedUser } from './registrations.types';

function buildWhere(search?: string, campaignId?: string): SQL | undefined {
  if (search && campaignId) {
    return and(
      or(
        ilike(users.phoneNumber, `%${search}%`)
      )!,
      eq(users.campaignId, campaignId)
    ) as SQL;
  }
  if (search) {
    return or(
      ilike(users.phoneNumber, `%${search}%`),
    ) as SQL;
  }
  if (campaignId) return eq(users.campaignId, campaignId) as SQL;
  return undefined;
}

export async function getUsersRepo(limit: number, offset: number, search?: string, campaignId?: string) {
  const whereCond = buildWhere(search, campaignId);
  const rows = await db
    .select({
      user: users,
      campaign: { id: campaigns.id, name: campaigns.name },
    })
    .from(users)
    .leftJoin(campaigns, eq(users.campaignId, campaigns.id))
    .where(whereCond)
    .orderBy(desc(users.createdAt))
    .limit(limit)
    .offset(offset);

  const [countResult] = await db
    .select({ count: count() })
    .from(users)
    .where(whereCond);
  const total = countResult?.count ?? 0;

  const formatted: FormattedUser[] = rows.map((row) => ({
    id: row.user.id,
    phoneNumber: row.user.phoneNumber,
    campaignId: row.user.campaignId,
    createdAt: row.user.createdAt,
    campaign: row.campaign?.id
      ? { id: row.campaign.id, name: row.campaign.name }
      : null,
  }));

  return { users: formatted, total };
}

export async function getUsersForExportRepo(search?: string, campaignId?: string) {
  const whereCond = buildWhere(search, campaignId);
  return db
    .select({
      user: users,
      campaign: { id: campaigns.id, name: campaigns.name },
    })
    .from(users)
    .leftJoin(campaigns, eq(users.campaignId, campaigns.id))
    .where(whereCond)
    .orderBy(desc(users.createdAt));
}
