import { Router, Request, Response, NextFunction } from "express";
import { refreshCronController } from "./cron.controller";

const cronRouter = Router();

console.log("🔧 Cron router being initialized...");

/**
 * POST /api/v1/cron/refresh-weekly
 */
cronRouter.post("/refresh-weekly", (req: Request, res: Response, next: NextFunction) => {
  console.log("✅ POST /refresh-weekly called");
  refreshCronController(req, res, next);
});

/**
 * GET /api/v1/cron/health
 */
cronRouter.get("/health", (req: Request, res: Response) => {
  console.log("✅ GET /health called");
  res.json({
    success: true,
    service: "cron",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

console.log("✅ Cron router initialized with routes: /refresh-weekly, /health");

export default cronRouter;