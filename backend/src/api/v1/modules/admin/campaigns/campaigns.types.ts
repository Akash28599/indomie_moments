import type { NewCampaign } from '../../../../../db/schema';

export type { NewCampaign };
export type CampaignUpdatePayload = Partial<Omit<NewCampaign, 'id' | 'createdAt'>>;
