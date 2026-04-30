import React from "react";
import { Sparkles } from "lucide-react";

/**
 * LeaderBoardHeader - Compact for mobile
 */
const LeaderBoardHeader = () => {
  return (
    <div className="text-center text-white">
      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-1.5 shadow-lg shadow-black/10">
        <span className="text-xl">🏆</span>
      </div>
      <h1 className="text-xl font-black mb-0.5 flex items-center justify-center gap-1.5 tracking-tight">
        <Sparkles className="w-4 h-4 text-yellow-300" />
        Legends of Last Week
        <Sparkles className="w-4 h-4 text-yellow-300" />
      </h1>
      <p className="text-white/90 text-[10px] font-medium tracking-wide max-w-[260px] mx-auto">
        Get max likes to win exciting prizes! Results declared every Sunday.
      </p>
    </div>
  );
};

export default LeaderBoardHeader;