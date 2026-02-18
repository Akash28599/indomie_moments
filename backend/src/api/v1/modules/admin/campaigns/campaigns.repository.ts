import { eq, desc } from 'drizzle-orm';
import { db } from '../../../../../db';
import { campaigns } from '../../../../../db/schema';
import type { NewCampaign } from '../../../../../db/schema';

export async function createCampaignRepo(data: NewCampaign) {
  const [row] = await db.insert(campaigns).values(data).returning();
  return row!;
}

export async function findAllCampaignsRepo() {
  return db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
}

export async function findCampaignByIdRepo(id: string) {
  const [row] = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
  return row;
}

export async function updateCampaignRepo(id: string, data: Partial<NewCampaign>) {
  const [row] = await db
    .update(campaigns)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(campaigns.id, id))
    .returning();
  return row!;
}

export async function deleteCampaignRepo(id: string) {
  await db.delete(campaigns).where(eq(campaigns.id, id));
}
