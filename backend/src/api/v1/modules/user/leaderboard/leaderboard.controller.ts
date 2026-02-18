import { Request, Response, NextFunction } from "express";
import {
  getLeaderboardService,
  getWeeklyWinnersService,
  getTop5Service,
} from "./leaderboard.service";
import { leaderboardQuerySchema } from "./leaderboard.types";

export async function getLeaderboardController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const parsed = leaderboardQuerySchema.safeParse(req.query);
    const options = parsed.success ? parsed.data : { limit: 20, offset: 0 };

    const data = await getLeaderboardService(options);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getWeeklyWinnersController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await getWeeklyWinnersService();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTop5Controller(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await getTop5Service();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}