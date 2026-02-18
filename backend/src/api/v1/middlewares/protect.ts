import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { admins } from "../../../db/schema";
import { config } from "../../../config/env";
import { ERROR_MESSAGES, HTTP_STATUS } from "../common/constants";
import { errorResponse } from "../utils/responseFormatter";

export async function protect(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token =
    req.cookies?.[config.app.cookieNames.adminAccess] ??
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.clearCookie(config.app.cookieNames.adminAccess, { path: "/" });
    res.clearCookie(config.app.cookieNames.adminRefresh, { path: "/" });
    errorResponse(res, ERROR_MESSAGES.ACCESS_DENIED_NO_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    return;
  }
  try {
    const decoded = jwt.verify(token, config.jwt.adminSecret) as { id: string; role: string };
    const [admin] = await db.select().from(admins).where(eq(admins.id, decoded.id)).limit(1);
    if (!admin || !admin.isActive) {
      res.clearCookie(config.app.cookieNames.adminAccess, { path: "/" });
      res.clearCookie(config.app.cookieNames.adminRefresh, { path: "/" });
      errorResponse(res, ERROR_MESSAGES.INVALID_INACTIVE_ADMIN, HTTP_STATUS.UNAUTHORIZED);
      return;
    }
    const { password, ...adminWithoutPassword } = admin;
    req.admin = adminWithoutPassword;
    next();
  } catch {
    res.clearCookie(config.app.cookieNames.adminAccess, { path: "/" });
    res.clearCookie(config.app.cookieNames.adminRefresh, { path: "/" });
    errorResponse(res, ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }
}

export function checkRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      errorResponse(res, ERROR_MESSAGES.INSUFFICIENT_PERMISSIONS, 403);
      return;
    }
    next();
  };
}
