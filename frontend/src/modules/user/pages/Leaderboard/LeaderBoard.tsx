import React, { useState, useCallback } from "react";
import { Timer } from "./Timer";
import { getNextSunday } from "./utils";
import LeaderBoardHeader from "./LeaderBoardHeader";
import { RankingTable } from "./RankingTable";
import { WeeklyWinners } from "./WeeklyWinners";
import {
  useGetLeaderboardQuery,
  useGetWeeklyWinnersQuery,
} from "@/store";
import type { MomentListItem } from "../../../../services/types";

const PAGE_SIZE = 12;

/**
 * LeaderBoard – "Legends & Memory Feed" Consolidated Page.
 * Matches Stitch Design: Legends at top, memory feed scrolls below.
 */
export const LeaderBoard: React.FC = () => {
  const nextSunday = getNextSunday();

  // 1. Fetch Top 3 Legends (Weekly Winners)
  const {
    data: weeklyWinners = [],
    isLoading: loadingWinners,
  } = useGetWeeklyWinnersQuery();

  // 2. Fetch Leaderboard Rankings (Table)
  const {
    data: leaderboard = [],
    isLoading: loadingLeaderboard,
  } = useGetLeaderboardQuery({ limit: 10, offset: 0 });

  return (
    <div className="bg-[#FDFCF9] min-h-screen pb-32 font-sans">
      {/* ═══ Header Section ═══ */}
      <div className="bg-[#DF2020] px-5 pt-10 pb-24 rounded-b-[40px] relative overflow-hidden shadow-2xl shadow-red-200/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-400 opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <LeaderBoardHeader />
          <p className="text-white/80 text-xs font-black uppercase tracking-[0.2em] mt-4 mb-2">
            Next Winner Announcement
          </p>
          <Timer targetDate={nextSunday} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 -mt-12 relative z-20 space-y-10">
        
        {/* ═══ LEGENDS OF THE WEEK (Top 3) ═══ */}
        <section>
          {!loadingWinners && weeklyWinners.length >= 3 && (
            <WeeklyWinners topThree={weeklyWinners.slice(0, 3)} />
          )}
        </section>

        {/* ═══ TOP RANKINGS TABLE (Mini) ═══ */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <span className="text-[#FFD700]">🏆</span> Top Ranking
            </h3>
            <span className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-gray-50 rounded-full">
              Live Standings
            </span>
          </div>

          {loadingLeaderboard ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-gray-50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <RankingTable data={leaderboard.slice(0, 5)} />
          )}
        </section>

      </div>
    </div>
  );
};

