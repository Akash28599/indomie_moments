import { Request, Response, NextFunction } from "express";
import { refreshCronService } from "./cron.service";

/**
 * @route POST /api/v1/cron/refresh-weekly
 * @description Manually trigger the weekly refresh (Top 5 update + archive moments)
 * @access Protected/Admin only (should be protected by middleware)
 *
 * Process:
 * 1. Compute top 5 from current week (approved, currentWeek=true)
 * 2. Clear leaderboard table
 * 3. Insert new top 5 into leaderboard
 * 4. Mark all currentWeek=true moments as currentWeek=false
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Weekly refresh completed successfully",
 *   "momentsArchived": 45,
 *   "leaderboardUpdated": true,
 *   "timestamp": "2025-02-15T10:30:00.000Z"
 * }
 */
export async function refreshCronController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await refreshCronService();

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
}
