/**
 * Week and reset-date utilities. Matches backend promo week boundary (Sunday 00:00, start Jan 1 2026).
 * All calculations use the configured VITE_APP_TIMEZONE (default: Africa/Lagos).
 */

import { env } from "../config/env";

const TIMEZONE = env.VITE_APP_TIMEZONE || "Africa/Lagos";
const PROMO_START = new Date("2026-01-01");
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/** Get current date/time in the configured timezone */
function nowInTimezone(): Date {
  const str = new Date().toLocaleString("en-US", { timeZone: TIMEZONE });
  return new Date(str);
}

function getPromoStartSunday(): Date {
  const str = PROMO_START.toLocaleString("en-US", { timeZone: TIMEZONE });
  const start = new Date(str);
  start.setHours(0, 0, 0, 0);
  const dayOfWeek = start.getDay();
  const diffToSunday = dayOfWeek === 0 ? 0 : -dayOfWeek;
  start.setDate(start.getDate() + diffToSunday);
  return start;
}

export function getCurrentWeekNumber(): number {
  const start = getPromoStartSunday();
  const now = nowInTimezone();
  const elapsed = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(elapsed / MS_PER_WEEK) + 1);
}

export function getNextSunday(): Date {
  const now = nowInTimezone();
  const next = new Date(now);
  next.setDate(now.getDate() + (7 - now.getDay()));
  next.setHours(23, 59, 59, 999);
  return next;
}

export function getTimeUntilReset(): { days: number; hours: number; minutes: number } {
  const now = nowInTimezone().getTime();
  const next = getNextSunday().getTime();
  const diff = next - now;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
  };
}
