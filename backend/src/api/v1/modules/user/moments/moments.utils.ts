import crypto from "crypto";

/**
 * Generate a URL-safe unique slug for share URLs (e.g. x7k9m2p)
 */
export function generateSlug(): string {
  return crypto.randomBytes(8).toString("base64url").slice(0, 12);
}

import { config } from "../../../../../config/env";

/**
 * Get the current date/time in the configured timezone (Africa/Lagos by default).
 */
function nowInTimezone(): Date {
  const tz = config.timezone;
  const str = new Date().toLocaleString("en-US", { timeZone: tz });
  return new Date(str);
}

/**
 * Get week number from a specific date based on Sunday 00:00 as week boundary.
 * Uses promo start date from config (env PROMO_START_DATE or default Jan 1, 2026).
 * All calculations use the configured TIMEZONE (default: Africa/Lagos).
 */
function getPromoStartSunday(): Date {
  const promoStart = config.app.promoStartDate;
  const startStr = promoStart.toLocaleString("en-US", { timeZone: config.timezone });
  const start = new Date(startStr);
  start.setHours(0, 0, 0, 0);
  const dayOfWeek = start.getDay();
  const diffToSunday = dayOfWeek === 0 ? 0 : -dayOfWeek;
  start.setDate(start.getDate() + diffToSunday);
  return start;
}

/**
 * Get week number from a specific date based on Sunday 00:00 as week boundary.
 * Uses promo start date from config (env PROMO_START_DATE or default Jan 1, 2026).
 * All calculations use the configured TIMEZONE (default: Africa/Lagos).
 */
export function getWeekFromDate(date: Date): number {
  const promoStart = getPromoStartSunday();
  
  // Convert date to configured timezone
  const dateStr = date.toLocaleString("en-US", { timeZone: config.timezone });
  const dateInTz = new Date(dateStr);
  dateInTz.setHours(0, 0, 0, 0);

  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const elapsed = dateInTz.getTime() - promoStart.getTime();
  return Math.max(1, Math.floor(elapsed / msPerWeek) + 1);
}

/**
 * Get current week number based on Sunday 11:59 PM as week boundary.
 * Uses promo start date from config (env PROMO_START_DATE or default Jan 1, 2026).
 * All calculations use the configured TIMEZONE (default: Africa/Lagos).
 */
export function getCurrentWeekNumber(): number {
  const now = nowInTimezone();
  return getWeekFromDate(now);
}
