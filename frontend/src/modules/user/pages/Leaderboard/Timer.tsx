import React from "react";
import { Clock } from "lucide-react";
import { useCountdown } from "../../../../hooks/useCountdown";

interface TimerProps {
  targetDate?: Date;
  title?: string;
  resetInfo?: string;
  expiredMessage?: string;
}

export const Timer: React.FC<TimerProps> = ({
  targetDate,
  title = "Time Until Next Reset",
  resetInfo = "Leaderboard resets every Sunday at 11:59 PM",
  expiredMessage = "Leaderboard has reset!",
}) => {
  const countdown = useCountdown(targetDate ?? new Date());
  const { days, hours, minutes, seconds, isExpired } = countdown;

  return (
    <div className="bg-gradient-to-r from-[#E2231A] to-[#c41e16] rounded-3xl p-8 text-white mb-8 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-6 h-6" />
        <h2 className="text-2xl font-bold">{isExpired ? expiredMessage : title}</h2>
      </div>

      {!isExpired && (
        <div className="flex justify-center gap-6">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <div key={unit}>
              <div className="text-5xl font-black">
                {{
                  days: days,
                  hours: hours,
                  minutes: minutes,
                  seconds: seconds,
                }[unit]}
              </div>
              <div className="text-sm text-white/80 mt-1">
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-white/90 mt-6">{resetInfo}</p>
    </div>
  );
};
