import { rateLimit } from "express-rate-limit";

const WINDOW_MS = 60 * 1000; // 1 minute

export const otpRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 3,
  message: { success: false, error: "Too many OTP requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const uploadRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 10,
  message: { success: false, error: "Too many uploads. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLoginRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  limit: 10,
  message: { success: false, error: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const weekResetRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 3,
  message: { success: false, error: "Week reset already processed. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
