import { Request, Response, NextFunction } from "express";
import { AppError } from "../abstractions/AppError";
import { HTTP_STATUS } from "../common/constants";
import { errorResponse } from "../utils/responseFormatter";
import { logger } from "../../../lib/logger";
import { config } from "../../../config/env";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode =
    err instanceof AppError ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isKnown = err instanceof AppError;

  if (isKnown) {
    logger.warn("Request error", {
      message: err.message,
      statusCode,
      path: req.path,
      method: req.method,
      details: err.details,
    });
  } else {
    logger.error("Unhandled error", {
      message: err.message,
      statusCode,
      path: req.path,
      method: req.method,
      stack: err.stack,
    });
  }

  const messageToClient =
    isKnown || config.isDevelopment
      ? err.message
      : "Internal server error. Please try again later.";
  errorResponse(res, messageToClient, statusCode);
}
