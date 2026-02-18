import { eq, count } from 'drizzle-orm';
import { db } from '../../../../../db';
import { users, campaigns } from '../../../../../db/schema';

export async function getStatsRepo() {
  const [totalUsersResult] = await db.select({ count: count() }).from(users);
  const [totalCampaignsResult] = await db.select({ count: count() }).from(campaigns);
  const [activeCampaignsResult] = await db
    .select({ count: count() })
    .from(campaigns)
    .where(eq(campaigns.status, 'active'));
  return {
    totalUsers: totalUsersResult?.count ?? 0,
    totalCampaigns: totalCampaignsResult?.count ?? 0,
    activeCampaigns: activeCampaignsResult?.count ?? 0,
  };
}
