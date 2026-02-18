import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { config } from "../../../config/env";
import { ERROR_MESSAGES, HTTP_STATUS } from "../common/constants";
import { errorResponse } from "../utils/responseFormatter";

declare global {
  namespace Express {
    interface Request {
      user?: typeof users.$inferSelect;
    }
  }
}

export async function protectConsumer(req: Request, res: Response, next: NextFunction): Promise<void> {
  // CRITICAL: Only read the configured user access cookie, explicitly ignore admin cookies
  // This ensures admin tokens cannot be used for user endpoints
  const userToken = req.cookies?.[config.app.cookieNames.userAccess];
  const authHeaderToken = req.header("Authorization")?.replace("Bearer ", "");
  const token = userToken ?? authHeaderToken;

  if (!token) {
    res.clearCookie(config.app.cookieNames.userAccess, { path: "/" });
    errorResponse(res, ERROR_MESSAGES.ACCESS_DENIED_NO_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    return;
  }

  try {
    // Verify token with consumer secret (user tokens are signed with consumerSecret)
    const decoded = jwt.verify(token, config.jwt.consumerSecret) as { id: string; phoneNumber?: string };
    
    // Ensure the user exists in the database
    const [user] = await db.select().from(users).where(eq(users.id, decoded.id)).limit(1);
    if (!user) {
      res.clearCookie(config.app.cookieNames.userAccess, { path: "/" });
      errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      return;
    }

    // Successfully authenticated as a user
    req.user = user;
    next();
  } catch (error) {
    // Token verification failed - could be expired, invalid, or wrong token type (admin token)
    // Only clear access cookie; preserve refresh cookie so the client can still attempt a token refresh
    res.clearCookie(config.app.cookieNames.userAccess, { path: "/" });
    errorResponse(res, ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }
}

/** Like protectConsumer but does NOT block – just sets req.user if valid token */
export async function optionalConsumer(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const userToken = req.cookies?.[config.app.cookieNames.userAccess];
  const authHeaderToken = req.header("Authorization")?.replace("Bearer ", "");
  const token = userToken ?? authHeaderToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.consumerSecret) as { id: string };
      const [user] = await db.select().from(users).where(eq(users.id, decoded.id)).limit(1);
      if (user) req.user = user;
    } catch {
      // ignore – unauthenticated is fine
    }
  }
  next();
}
