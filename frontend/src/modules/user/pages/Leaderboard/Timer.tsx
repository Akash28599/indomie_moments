import React from "react";
import { Clock } from "lucide-react";
import { useCountdown } from "../../../../hooks/useCountdown";

interface TimerProps {
  targetDate?: Date;
}

export const Timer: React.FC<TimerProps> = ({ targetDate }) => {
  const countdown = useCountdown(targetDate ?? new Date());
  const { days, hours, minutes, isExpired } = countdown;

  if (isExpired) {
    return (
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 text-center">
        <p className="font-bold text-[#E2231A]">Leaderboard has reset!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3 text-gray-900">
          <div className="bg-red-50 p-2.5 rounded-xl">
            <Clock className="w-5 h-5 text-[#E2231A] animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Reset In</h3>
            <p className="text-sm font-bold text-gray-900">New Challenge Soon</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#E2231A]">
          {/* Days */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-black bg-red-50 px-2.5 py-1 rounded-lg min-w-[36px] text-center">{days}</span>
            <span className="text-[10px] font-bold mt-1 uppercase text-gray-400">d</span>
          </div>
          <span className="text-xl font-black mb-4">:</span>
          {/* Hours */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-black bg-red-50 px-2.5 py-1 rounded-lg min-w-[36px] text-center">{String(hours).padStart(2, '0')}</span>
            <span className="text-[10px] font-bold mt-1 uppercase text-gray-400">h</span>
          </div>
          <span className="text-xl font-black mb-4">:</span>
          {/* Minutes */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-black bg-red-50 px-2.5 py-1 rounded-lg min-w-[36px] text-center">{String(minutes).padStart(2, '0')}</span>
            <span className="text-[10px] font-bold mt-1 uppercase text-gray-400">m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
