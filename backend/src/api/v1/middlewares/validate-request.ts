import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { logger } from "../../../lib/logger";

type RequestLocation = "body" | "query" | "params";

export const validateRequest = (
  schema: z.ZodSchema,
  location: RequestLocation = "body",
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = req[location];

      if (location === "body" && req.body) {
        logger.debug("Validating request data", {
          url: req.url,
          method: req.method,
          data: req.body,
        });
      }

      const validatedData = schema.parse(data);

      // Replace the original data with validated data
      // Note: req.query and req.params are read-only in Express, so we can only replace req.body
      // For query and params, we validate but don't replace - the controller can use req.query/req.params directly
      if (location === "body") {
        req.body = validatedData;
      }
      // For query and params, validation passes if no error is thrown
      // The controller should use req.query or req.params directly

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Log validation errors with details
        const logData = location === "body" ? req.body : req[location];

        // Format errors safely - ZodError always has issues array
        const errorMessages: string[] = [];
        if (error.issues && Array.isArray(error.issues)) {
          error.issues.forEach((err) => {
            const field =
              err.path && Array.isArray(err.path) && err.path.length > 0
                ? err.path.join(".")
                : "unknown";
            const message = err.message || "Validation failed";
            errorMessages.push(`${field}: ${message}`);
          });
        } else {
          errorMessages.push(
            "Validation failed - unable to parse error details",
          );
        }

        // Only log data if it's not too large
        const dataSize = JSON.stringify(logData).length;
        const logPayload: Record<string, unknown> = {
          url: req.url,
          method: req.method,
          errors: errorMessages,
        };

        if (dataSize < 5000) {
          // Only log if data is less than 5KB
          logPayload.data = logData;
        } else {
          logPayload.data = "[Request data too large to log]";
        }

        logger.warn("Validation failed", logPayload);

        // Pass ZodError directly so error handler can format it properly
        next(error);
      } else {
        // Handle non-Zod errors
        logger.error("Non-Zod validation error", {
          url: req.url,
          method: req.method,
          error: error instanceof Error ? error.message : String(error),
        });
        next(error);
      }
    }
  };
};
