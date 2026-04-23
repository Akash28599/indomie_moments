import React from "react";
import { Sparkles } from "lucide-react";

/**
 * LeaderBoardHeader - Redesigned for mobile
 */
const LeaderBoardHeader = () => {
  return (
    <div className="text-center text-white">
      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-black/10">
        <span className="text-3xl">🏆</span>
      </div>
      <h1 className="text-3xl font-black mb-1 flex items-center justify-center gap-2 tracking-tight">
        <Sparkles className="w-5 h-5 text-yellow-300" />
        Legends of the Week
        <Sparkles className="w-5 h-5 text-yellow-300" />
      </h1>
      <p className="text-white/90 text-sm font-medium tracking-wide max-w-[250px] mx-auto">
        Rank up by getting the most votes on your story!
      </p>
    </div>
  );
};

export default LeaderBoardHeader;