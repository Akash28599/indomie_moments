import { env } from "../config/env";

const TIMEZONE = env.VITE_APP_TIMEZONE || "Africa/Lagos";

export function formatDateWAT(dateInput: string | number | Date): string {
  try {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString("en-NG", {
      timeZone: TIMEZONE,
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

