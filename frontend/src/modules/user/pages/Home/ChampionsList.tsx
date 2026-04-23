import { Trophy, Star } from "lucide-react";
import { useGetWeeklyWinnersQuery } from "@/store";
import { getCurrentWeekNumber } from "../../../../lib/weekUtils";
import {
  NoodleBowl,
  SteamingBowl,
} from "../../../common/components/Ui/NoodleDecorations";
import { Link } from "react-router-dom";

const ChampionsList = () => {
  const currentWeek = getCurrentWeekNumber();
  const { data: weeklyWinners = [] } = useGetWeeklyWinnersQuery({ week: currentWeek });
  // If no weekly winners, we might have some mocked ones for the design showcase
  const displayWinners = weeklyWinners.length > 0 ? weeklyWinners.slice(0, 5) : [];

  return (
    <>
      {displayWinners.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-white">
          <SteamingBowl className="absolute -top-10 -left-10 w-64 h-64 opacity-[0.03] animate-float text-gray-400" />
          <NoodleBowl className="absolute -bottom-10 -right-10 w-64 h-64 opacity-[0.03] rotate-45 text-gray-400" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-black mb-6 uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                <span>Hall of Fame</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight uppercase">
                Weekly Top Champions
              </h2>
              <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6" />
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Celebrating the most creative Indomie moments from last week!
              </p>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="flex overflow-x-auto pb-10 gap-8 no-scrollbar snap-x px-4 -mx-4">
              {displayWinners.map((winner, index) => (
                <Link
                  key={winner.id}
                  to={`/leaderboard`}
                  className="min-w-[280px] sm:min-w-[320px] bg-gray-50 rounded-[40px] p-8 flex flex-col items-center relative snap-center group hover:bg-yellow-50 transition-colors duration-300 border border-transparent hover:border-yellow-200 shadow-sm"
                >
                  {/* Rank Number in Background */}
                  <span className="absolute top-6 left-10 text-8xl font-black text-gray-200 group-hover:text-yellow-200/50 transition-colors duration-300 opacity-40 select-none">
                    0{index + 1}
                  </span>

                  {/* Profile Image with Crown for Rank 1 */}
                  <div className="relative mb-6 z-10">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white relative">
                      <img
                        src={winner.userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${winner.userName}`}
                        alt={winner.userName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index === 0 && (
                        <div className="absolute -top-4 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg transform rotate-12">
                           <Star className="w-6 h-6 fill-current" />
                        </div>
                    )}
                  </div>

                  <div className="text-center z-10">
                    <h3 className="text-2xl font-black text-gray-900 mb-2 truncate max-w-[200px]">
                      {winner.userName}
                    </h3>
                    
                    <div className="bg-white px-6 py-2.5 rounded-2xl shadow-sm border border-gray-100 mb-6">
                        <span className="text-xs font-black text-gray-400 uppercase block tracking-widest mb-0.5">Total Likes</span>
                        <span className="text-2xl font-black text-[#DF2020]">
                          {(winner.likes).toLocaleString()}
                        </span>
                    </div>

                    <div className="group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="inline-flex items-center gap-2 text-[#DF2020] font-black uppercase text-xs tracking-widest">
                            View Profile
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ChampionsList;
