export interface FormattedUser {
  id: string;
  phoneNumber: string;
  campaignId: string | null;
  createdAt: Date;
  campaign: { id: string; name: string } | null;
}
