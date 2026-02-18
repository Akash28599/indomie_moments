import { markMomentsAsInactiveRepo, refreshLeaderboardRepo } from "../user/leaderboard/leaderboard.repository";


export async function refreshCronService(): Promise<{
  message: string;
  momentsArchived: number;
  leaderboardUpdated: boolean;
  timestamp: string;
}> {
  try {
    // Step 1: Get top 5 from current week and update leaderboard table
    await refreshLeaderboardRepo();

    // Step 2: Mark all current week moments as inactive for next week
    const archivedCount = await markMomentsAsInactiveRepo();

    return {
      message: "Weekly refresh completed successfully",
      momentsArchived: archivedCount,
      leaderboardUpdated: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Cron refresh error:", error);
    throw new Error(
      `Failed to refresh leaderboard: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
