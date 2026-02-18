import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../abstractions/AppError";
import {
  listPendingMomentsService,
  updateMomentStatusService,
  getModerationStatsService,
} from "./admin-moments.service";
import { updateMomentStatusSchema, momentIdParamSchema } from "./admin-moments.types";

export async function listPendingMomentsController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await listPendingMomentsService();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateMomentStatusController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramResult = momentIdParamSchema.safeParse(req.params);
    if (!paramResult.success) {
      const first = paramResult.error.issues[0];
      throw new AppError(first?.message ?? "Invalid moment ID", 400);
    }
    const momentId = paramResult.data.id;

    const parsed = updateMomentStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      throw new AppError(
        firstIssue?.message ?? "Invalid status. Use 'approved' or 'rejected'",
        400
      );
    }

    const updated = await updateMomentStatusService(momentId, parsed.data.status);
    res.json({
      success: true,
      message: `Moment ${parsed.data.status} successfully`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function getModerationStatsController(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const stats = await getModerationStatsService();
    res.json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
}
