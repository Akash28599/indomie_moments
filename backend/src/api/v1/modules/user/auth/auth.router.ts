import express from "express";
import { protectConsumer } from "../../../middlewares";
import { otpRateLimiter } from "../../../middlewares/rate-limit";
import {
  requestOTPController,
  verifyOTPController,
  refreshController,
  getProfileController,
  logoutController,
} from "./auth.controller";

const router = express.Router();

router.post("/request-otp", otpRateLimiter, requestOTPController);
router.post("/verify-otp", verifyOTPController);
router.post("/refresh", refreshController);
router.get("/profile", protectConsumer, getProfileController);
router.post("/logout", logoutController);

export default router;
