import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { env } from "../config/env";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const TIMEZONE = env.VITE_APP_TIMEZONE

// Calculate countdown to target Date in specific timezone
const getTimeLeft = (target: DateTime): Countdown => {
  const now = DateTime.now().setZone(TIMEZONE);
  const diff = target.diff(now, ["days", "hours", "minutes", "seconds"]).toObject();

  if (diff.seconds! <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(diff.days!),
    hours: Math.floor(diff.hours!),
    minutes: Math.floor(diff.minutes!),
    seconds: Math.floor(diff.seconds!),
    isExpired: false,
  };
};

export const useCountdown = (targetDate: Date): Countdown => {
  // Convert JS Date to Luxon DateTime in the configured timezone
  const target = DateTime.fromJSDate(targetDate).setZone(TIMEZONE);

  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return useMemo(() => time, [time]);
};
