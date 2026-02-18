import { z } from "zod";

// No query parameters needed for cron endpoint
export const CronQuerySchema = z.object({}).strict();

export type CronQuery = z.infer<typeof CronQuerySchema>;

// Response type for refresh
export interface CronRefreshResponse {
  success: boolean;
  message: string;
  momentsArchived: number;
  leaderboardUpdated: boolean;
  timestamp: string;
}
