export interface LeaderboardMoment {
  id: string;
  userId: string;
  userName: string;
  slug: string;
  imageUrl: string;
  caption?: string;
  likes: number;
  shareUrl: string;
  uploadedAt: string;
}


export interface TimeUntilReset {
  days: number;
  hours: number;
  minutes: number;
}
