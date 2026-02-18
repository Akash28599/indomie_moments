import express from "express";
import { protect } from "../../../middlewares";
import {
  listPendingMomentsController,
  updateMomentStatusController,
  getModerationStatsController,
} from "./admin-moments.controller";

const router = express.Router();

router.use(protect);
router.get("/pending", listPendingMomentsController);
router.get("/stats", getModerationStatsController);
router.patch("/:id", updateMomentStatusController);

export default router;
