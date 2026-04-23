import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { LeaderboardItem } from "@/services/types";
import { getPrizeText } from "./utils";

interface WeeklyWinnersProps {
  topThree: LeaderboardItem[];
}

export const WeeklyWinners: React.FC<WeeklyWinnersProps> = ({ topThree }) => {
  if (!topThree || topThree.length < 3) return null;

  // Render order for podium: 2nd, 1st, 3rd
  const displayOrder = [1, 0, 2];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-8 px-1">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
          <span className="text-[#FFD700]">👑</span> Past Week Legends
        </h3>
      </div>
      
      <div className="flex items-end justify-center gap-2 sm:gap-4 h-56 mt-8">
        {displayOrder.map((pos, i) => {
          const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
          const data = topThree[pos];
          if (!data) return null;
          
          const isFirst = rank === 1;
          const isSecond = rank === 2;
          
          // Compute dynamic height for podium effect
          const cardHeight = isFirst ? "h-48" : isSecond ? "h-44" : "h-40";

          return (
            <Link 
              key={data.id} 
              to={`/share/${data.slug}`}
              className={`relative flex-1 rounded-2xl flex flex-col items-center p-2 shadow-sm border transition-transform active:scale-95 ${
                isFirst ? 'bg-gradient-to-b from-yellow-50 to-white border-yellow-200 z-10 shadow-yellow-100' : 
                isSecond ? 'bg-gradient-to-b from-gray-50 to-white border-gray-200' : 'bg-gradient-to-b from-orange-50 to-white border-orange-200'
              } ${cardHeight}`}
            >
              {/* Crown Icon / Medal */}
              <div className={`absolute -top-5 w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-white border-2 ${
                isFirst ? 'border-[#FFD700]' : isSecond ? 'border-gray-400' : 'border-orange-500'
              }`}>
                <span className="text-xl font-black">
                  {isFirst ? '1' : isSecond ? '2' : '3'}
                </span>
              </div>

              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 mt-5 mb-2 shadow-sm ${
                isFirst ? 'border-[#FFD700] w-14 h-14' : 'border-white'
              }`}>
                <img 
                  src={data.imageUrl || "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80"} 
                  alt={data.userName} 
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="font-bold text-[11px] text-gray-900 text-center truncate w-full mb-0.5 px-1">
                {data.userName?.split(' ')[0] || "User"}
              </h4>
              
              <div className="flex items-center gap-1 text-[#DF2020] mb-2 mt-auto">
                <Heart className="w-3 h-3 fill-current" />
                <span className="font-black text-[10px]">{data.likes || 0}</span>
              </div>

              {/* Reward Ribbon */}
              <div className={`w-[115%] absolute -bottom-3 rounded-md text-white text-[8px] sm:text-[9px] font-black uppercase tracking-wider py-1.5 text-center shadow-lg px-0.5 ${
                isFirst ? 'bg-[#FFD700]' : isSecond ? 'bg-gray-400' : 'bg-orange-500'
              }`}>
                {getPrizeText(rank).split('|')[0] || `Prize ${rank}`}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
