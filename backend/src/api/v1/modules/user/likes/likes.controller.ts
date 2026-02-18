import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../abstractions/AppError";
import { toggleLikeService } from "./likes.service";
import { momentIdParamSchema } from "./likes.types";

export async function toggleLikeController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      throw new AppError("Authentication required", 401);
    }

    const paramResult = momentIdParamSchema.safeParse(req.params);
    if (!paramResult.success) {
      const first = paramResult.error.issues[0];
      throw new AppError(first?.message ?? "Invalid moment ID", 400);
    }
    const momentId = paramResult.data.id;

    const result = await toggleLikeService(momentId, user.id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
