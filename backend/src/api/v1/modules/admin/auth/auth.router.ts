import express from "express";
import { protect } from "../../../middlewares";
import { authLoginRateLimiter } from "../../../middlewares/rate-limit";
import {
  loginController,
  refreshController,
  getProfileController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
} from "./auth.controller";

const router = express.Router();

router.post("/login", authLoginRateLimiter, loginController);
router.post("/refresh", refreshController);
router.get("/profile", protect, getProfileController);
router.post("/logout", logoutController);
router.post("/forgot-password", authLoginRateLimiter, forgotPasswordController);
router.post("/reset-password", authLoginRateLimiter, resetPasswordController);

export default router;
