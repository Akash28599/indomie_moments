import { Request, Response } from "express";
import { config } from "../../../../../config/env";
import { HTTP_STATUS, ERROR_MESSAGES } from "../../../common/constants";
import { successResponse, errorResponse } from "../../../utils/responseFormatter";
import {
  loginService,
  getProfileService,
  refreshAdminTokensService,
  requestPasswordResetService,
  resetPasswordService,
} from "./auth.service";

export async function loginController(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      errorResponse(res, ERROR_MESSAGES.USERNAME_PASSWORD_REQUIRED, HTTP_STATUS.BAD_REQUEST);
      return;
    }
    const result = await loginService(username, password);
    const accessOpts = config.app.cookieOptions(config.isProduction, 15 * 60);
    const refreshOpts = config.app.refreshCookieOptions(config.isProduction);
    res.cookie(config.app.cookieNames.adminAccess, result.accessToken, accessOpts);
    res.cookie(config.app.cookieNames.adminRefresh, result.refreshToken, refreshOpts);
    successResponse(res, {
      message: "Login successful.",
      admin: result.admin,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : ERROR_MESSAGES.INTERNAL_ERROR;
    const status =
      msg === ERROR_MESSAGES.INVALID_CREDENTIALS ? HTTP_STATUS.UNAUTHORIZED :
      msg === ERROR_MESSAGES.ACCOUNT_INACTIVE ? 403 :
      HTTP_STATUS.INTERNAL_SERVER_ERROR;
    errorResponse(res, msg, status);
  }
}

export async function refreshController(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken =
      req.cookies?.[config.app.cookieNames.adminRefresh] ??
      req.header("X-Refresh-Token");
    if (!refreshToken) {
      errorResponse(res, ERROR_MESSAGES.ACCESS_DENIED_NO_TOKEN, HTTP_STATUS.UNAUTHORIZED);
      return;
    }
    const result = await refreshAdminTokensService(refreshToken);
    const accessOpts = config.app.cookieOptions(config.isProduction, 15 * 60);
    const refreshOpts = config.app.refreshCookieOptions(config.isProduction);
    res.cookie(config.app.cookieNames.adminAccess, result.accessToken, accessOpts);
    res.cookie(config.app.cookieNames.adminRefresh, result.refreshToken, refreshOpts);
    successResponse(res, { message: "Token refreshed successfully." });
  } catch (err) {
    const msg = err instanceof Error ? err.message : ERROR_MESSAGES.INTERNAL_ERROR;
    errorResponse(res, msg, HTTP_STATUS.UNAUTHORIZED);
  }
}

export function logoutController(_req: Request, res: Response): void {
  res.clearCookie(config.app.cookieNames.adminAccess, { path: "/" });
  res.clearCookie(config.app.cookieNames.adminRefresh, { path: "/" });
  successResponse(res, { message: "Logged out successfully." });
}

export async function forgotPasswordController(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      errorResponse(res, "Email is required.", HTTP_STATUS.BAD_REQUEST);
      return;
    }
    await requestPasswordResetService(email);
    // Always return success to prevent email enumeration
    successResponse(res, {
      message: "If an account exists with that email, a reset link has been sent.",
    });
  } catch {
    // Always return success – never reveal whether the email exists or expose internal errors
    successResponse(res, {
      message: "If an account exists with that email, a reset link has been sent.",
    });
  }
}

export async function resetPasswordController(req: Request, res: Response): Promise<void> {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      errorResponse(res, "Token and new password are required.", HTTP_STATUS.BAD_REQUEST);
      return;
    }
    await resetPasswordService(token, password);
    successResponse(res, { message: "Password reset successfully. You can now login." });
  } catch (err) {
    const msg = err instanceof Error ? err.message : ERROR_MESSAGES.INTERNAL_ERROR;
    errorResponse(res, msg, HTTP_STATUS.BAD_REQUEST);
  }
}

export async function getProfileController(req: Request, res: Response): Promise<void> {
  try {
    if (!req.admin) {
      errorResponse(res, ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      return;
    }
    const result = getProfileService(req.admin);
    successResponse(res, result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to get profile";
    errorResponse(res, msg, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
