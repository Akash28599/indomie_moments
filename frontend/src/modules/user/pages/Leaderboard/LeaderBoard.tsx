import React from "react";
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
import { Star } from "lucide-react";

/**
 * LeaderBoard – "Legends & Memory Feed" Consolidated Page.
 * Compact no-scroll layout for mobile (100dvh).
 */
export const LeaderBoard: React.FC = () => {
  const nextSunday = getNextSunday();

  const {
    data: weeklyWinners = [],
    isLoading: loadingWinners,
  } = useGetWeeklyWinnersQuery();

  const {
    data: leaderboard = [],
    isLoading: loadingLeaderboard,
  } = useGetLeaderboardQuery({ limit: 10, offset: 0 });

  return (
    <div className="bg-[#FDFCF9] min-h-screen font-sans flex flex-col pb-24">
      {/* ═══ Header Section (Compact) ═══ */}
      <div className="bg-[#DF2020] px-4 pt-6 pb-16 rounded-b-[32px] relative overflow-hidden shadow-xl shadow-red-200/50 shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <LeaderBoardHeader />
          <p className="text-white/80 text-[9px] font-black uppercase tracking-[0.2em] mt-2 mb-1">
            Next Winner Announcement
          </p>
          <Timer targetDate={nextSunday} />
        </div>
      </div>

      {/* Content below header */}
      <div className="max-w-2xl mx-auto px-4 -mt-8 relative z-20 flex-1 flex flex-col gap-3 min-h-0 pb-20">
        
        {/* ═══ LEGENDS OF THE WEEK (Top 3) ═══ */}
        {!loadingWinners && weeklyWinners.length >= 3 && (
          <section className="shrink-0">
            <WeeklyWinners topThree={weeklyWinners.slice(0, 3)} />
          </section>
        )}

        {/* ═══ LUCKY MOMENT OF THE DAY ═══ */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-3 shadow-sm border border-yellow-100 overflow-hidden relative shrink-0">
          <div className="absolute -right-10 -top-10 w-24 h-24 bg-yellow-200 opacity-20 rounded-full blur-2xl" />
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-md shadow-yellow-200">
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
              Lucky Moment of the Day
            </h3>
          </div>
          
          <div className="bg-white rounded-xl p-2.5 flex gap-3 items-center relative z-10 shadow-sm">
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=200&h=200" alt="Lucky Moment" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-xs">Sarah Johnson</h4>
              <p className="text-[10px] text-gray-500 mt-0.5 italic truncate">"Late night cravings sorted! 🍜✨"</p>
              <div className="mt-1 inline-block px-1.5 py-0.5 bg-red-50 border border-red-100 rounded text-[8px] font-black text-[#DF2020] uppercase tracking-wider">
                Won: Surprise Gift Box
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TOP RANKINGS TABLE ═══ */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-1.5">
              <span className="text-[#FFD700]">🏆</span> Top Ranking
            </h3>
            <span className="text-[8px] font-bold text-gray-400 px-2 py-0.5 bg-gray-50 rounded-full">
              Live Standings
            </span>
          </div>

          {loadingLeaderboard ? (
            <div className="space-y-3 flex-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <RankingTable data={leaderboard.slice(0, 5)} />
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
