import { Request, Response, NextFunction } from "express";
import { getStatsService } from "./dashboard.service";

export async function getDashboardStatsController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await getStatsService();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
