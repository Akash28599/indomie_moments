import { Router } from "express";
import momentsRouter from "../modules/user/moments/moments.router";
import leaderboardRouter from "../modules/user/leaderboard/leaderboard.router";
import cronRouter from "../modules/cron/cron.routes";

const router = Router();

router.use("/moments", momentsRouter);
router.use("/leaderboard", leaderboardRouter);

export default router;
