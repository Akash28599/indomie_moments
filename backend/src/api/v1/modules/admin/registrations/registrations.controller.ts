import { Request, Response, NextFunction } from "express";
import { successResponse } from "../../../utils/responseFormatter";
import { logger } from "../../../../../lib/logger";
import {
  getUsersService,
  buildExportStreamService,
  getUserAnalyticsService,
  buildAnalyticsExportService,
} from "./registrations.service";
import { config } from "../../../../../config/env";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search as string | undefined;
    const campaignId = req.query.campaignId as string | undefined;
    const result = await getUsersService(page, limit, search, campaignId);
    successResponse(res, result);
  } catch (err) {
    logger.error("Get users error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function exportUsersController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const search = req.query.search as string | undefined;
    const campaignId = req.query.campaignId as string | undefined;
    const workbook = await buildExportStreamService(search, campaignId);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=users_export_${new Date().toLocaleDateString('en-CA', { timeZone: config.timezone })}.xlsx`
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    logger.error("Export users error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function getUserAnalyticsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search as string | undefined;
    const result = await getUserAnalyticsService(page, limit, search);
    successResponse(res, result);
  } catch (err) {
    logger.error("Get user analytics error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}

export async function exportUserAnalyticsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const search = req.query.search as string | undefined;
    const csv = await buildAnalyticsExportService(search);
    const dateStr = new Date().toLocaleDateString("en-CA", { timeZone: config.timezone });
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=user_analytics_${dateStr}.csv`
    );
    res.send(csv);
  } catch (err) {
    logger.error("Export user analytics error", { err });
    next(err instanceof Error ? err : new Error(String(err)));
  }
}
