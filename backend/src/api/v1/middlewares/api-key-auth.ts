import { Request, Response, NextFunction } from "express";
import { config } from "../../../config/env";
import { ERROR_MESSAGES, HTTP_STATUS } from "../common/constants";
import { errorResponse } from "../utils/responseFormatter";

/**
 * Middleware to authenticate requests using API key.
 * Checks for API token in Authorization: Bearer <token> header or X-API-Key header.
 * Uses API_TOKEN from environment configuration.
 */
export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  if (!config.apiToken) {
    errorResponse(
      res,
      "API key authentication is not configured",
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    return;
  }

  const authHeader = req.header("Authorization");
  const apiKeyHeader = req.header("X-API-Key");
  
  const token = authHeader?.replace(/^Bearer\s+/i, "") || apiKeyHeader;

  if (!token) {
    errorResponse(
      res,
      "API key is required. Provide it in Authorization: Bearer <token> or X-API-Key header",
      HTTP_STATUS.UNAUTHORIZED
    );
    return;
  }

  if (token !== config.apiToken) {
    errorResponse(
      res,
      ERROR_MESSAGES.ACCESS_DENIED_NO_TOKEN || "Invalid API key",
      HTTP_STATUS.UNAUTHORIZED
    );
    return;
  }

  next();
}
