import { Router } from "express";
import {
  getLeaderboardController,
  getWeeklyWinnersController,
  getTop5Controller,
} from "./leaderboard.controller";

const router = Router();

router.get("/weekly-winners", getWeeklyWinnersController);
router.get("/top5", getTop5Controller);
router.get("/", getLeaderboardController);

export default router;
