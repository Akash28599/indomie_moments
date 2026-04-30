import React from "react";
import { getNextSunday } from "./utils";
import LeaderBoardHeader from "./LeaderBoardHeader";
import { RankingTable } from "./RankingTable";
import { WeeklyWinners } from "./WeeklyWinners";
import {
  useGetLeaderboardQuery,
  useGetWeeklyWinnersQuery,
} from "@/store";
import { Star, Clock } from "lucide-react";
import { useCountdown } from "../../../../hooks/useCountdown";

/**
 * LeaderBoard – Single viewport, no-scroll layout.
 * Timer compact in header, Lucky Moment kept.
 */
export const LeaderBoard: React.FC = () => {
  const nextSunday = getNextSunday();
  const countdown = useCountdown(nextSunday);
  const { days, hours, minutes, isExpired } = countdown;

  const {
    data: weeklyWinners = [],
    isLoading: loadingWinners,
  } = useGetWeeklyWinnersQuery();

  const {
    data: leaderboard = [],
    isLoading: loadingLeaderboard,
  } = useGetLeaderboardQuery({ limit: 10, offset: 0 });

  return (
    <div className="bg-[#FDFCF9] h-full font-sans overflow-hidden w-full flex flex-col">
      {/* ═══ Header + Compact Timer ═══ */}
      <div className="bg-[#DF2020] px-4 pt-3 pb-5 rounded-b-[24px] relative overflow-hidden shadow-xl shadow-red-200/50 shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <LeaderBoardHeader />
          
          {/* Compact inline timer */}
          <div className="mt-2 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/20">
            <Clock className="w-3 h-3 text-white/70 animate-pulse" />
            <span className="text-[8px] font-bold text-white/70 uppercase tracking-wider">Resets in</span>
            {isExpired ? (
              <span className="text-[10px] font-black text-white">Reset!</span>
            ) : (
              <div className="flex items-center gap-1 text-white">
                <span className="text-xs font-black bg-white/20 px-1.5 py-0.5 rounded">{days}d</span>
                <span className="text-[10px] font-black">:</span>
                <span className="text-xs font-black bg-white/20 px-1.5 py-0.5 rounded">{String(hours).padStart(2, '0')}h</span>
                <span className="text-[10px] font-black">:</span>
                <span className="text-xs font-black bg-white/20 px-1.5 py-0.5 rounded">{String(minutes).padStart(2, '0')}m</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content below header */}
      <div className="max-w-2xl mx-auto px-4 -mt-4 relative z-20 flex flex-col gap-2 flex-1 min-h-0 w-full">
        
        {/* ═══ TOP RANKINGS TABLE (scrollable, constrained height) ═══ */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden w-full" style={{ maxHeight: '45%' }}>
          <div className="flex items-center justify-between px-3 py-1.5 shrink-0">
            <h3 className="text-[8px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-1">
              <span className="text-[#FFD700]">🏆</span> Top Ranking
            </h3>
            <span className="text-[6px] font-bold text-gray-400 px-1.5 py-0.5 bg-gray-50 rounded-full flex-shrink-0">
              Live Standings
            </span>
          </div>

          {/* This part scrolls */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {loadingLeaderboard ? (
              <div className="space-y-2 p-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <RankingTable data={leaderboard.length > 0 ? leaderboard.slice(0, 5) : [
                  { id: "1", userName: "Aisha B.", caption: "Indomie breakfast!!", likes: 12500, slug: "aisha-b" } as any,
                  { id: "2", userName: "Tunde O.", caption: "Late night cravings", likes: 11200, slug: "tunde-o" } as any,
                  { id: "3", userName: "Chioma E.", caption: "Noodles & Chill", likes: 9800, slug: "chioma-e" } as any,
                  { id: "4", userName: "Emeka U.", caption: "Spicy flavor FTW", likes: 8500, slug: "emeka-u" } as any,
                  { id: "5", userName: "Zainab M.", caption: "Party pack mode", likes: 7200, slug: "zainab-m" } as any,
                ]} />
            )}
          </div>
        </section>

        {/* ═══ LEGENDS OF THE WEEK (Top 3) ═══ */}
        {!loadingWinners && weeklyWinners.length >= 3 && (
          <section className="shrink-0">
            <WeeklyWinners topThree={weeklyWinners.slice(0, 3)} />
          </section>
        )}

        {/* ═══ LUCKY MOMENT OF THE DAY (always visible) ═══ */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-2 shadow-sm border border-yellow-100 overflow-hidden relative shrink-0 mb-1">
          <div className="absolute -right-8 -top-8 w-20 h-20 bg-yellow-200 opacity-20 rounded-full blur-2xl" />
          <div className="flex gap-2.5 items-center relative z-10">
            <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm shadow-yellow-200 shrink-0">
              <Star className="w-2.5 h-2.5 text-white fill-white" />
            </div>
            <div className="w-8 h-8 rounded-md overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=200&h=200" alt="Lucky Moment" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-gray-900 text-[9px]">Sarah Johnson</h4>
                <span className="text-[6px] font-black text-[#DF2020] uppercase bg-red-50 px-1 py-0.5 rounded border border-red-100">Won: Gift Box</span>
              </div>
              <p className="text-[7px] text-gray-500 italic truncate">"Late night cravings sorted! 🍜✨"</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
