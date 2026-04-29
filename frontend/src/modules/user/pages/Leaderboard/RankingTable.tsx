import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { LeaderboardItem } from "@/services/types";
import { getRankIcon } from "./utils";

const getPrizeForRank = (rank: number) => {
  if (rank === 1) return "Smart TV";
  if (rank === 2) return "Double Fridge";
  if (rank === 3) return "Gaming Console";
  if (rank <= 5) return "Indomie Carton";
  return "Consolation Prize";
};

interface RankingTableProps {
  data: LeaderboardItem[];
}

export const RankingTable: React.FC<RankingTableProps> = ({ data }) => {
  if (!data.length) return null;

  return (
    <div className="w-full flex flex-col">
      <div className="bg-[#F9FAFB] px-3 py-2 border-y border-gray-100 w-full">
        <h2 className="text-[9px] font-black uppercase tracking-widest text-gray-500">Current Standings</h2>
      </div>

      <div className="flex flex-col w-full">
        {data.map((moment, index) => {
          const isTop3 = index < 3;
          return (
            <Link
              key={moment.id}
              to={`/share/${moment.slug}`}
              className="flex items-center gap-1.5 p-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors active:bg-gray-100 w-full"
            >
              {/* Rank */}
              <div className="w-5 flex-shrink-0 flex justify-center items-center">
                {isTop3 ? (
                  <div className="text-lg">{getRankIcon(index + 1)}</div>
                ) : (
                  <span className="text-[10px] font-black text-gray-400">#{index + 1}</span>
                )}
              </div>

              {/* Thumbnail */}
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                <img
                  src={moment.imageUrl || "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80"}
                  alt={moment.userName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 text-[11px] truncate leading-tight">
                  {moment.userName || "Fan"}
                </h3>
                <p className="text-[8px] font-medium text-gray-400 truncate mt-0.5">
                  {moment.caption || "Joined the challenge"}
                </p>
                <span className={`text-[7px] mt-1 font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full inline-block truncate max-w-full border ${isTop3 ? 'text-[#B8860B] bg-yellow-50 border-yellow-200/50' : 'text-gray-500 bg-gray-50 border-gray-200'}`}>
                  Won: {getPrizeForRank(index + 1)}
                </span>
              </div>

              {/* Score */}
              <div className="flex flex-col items-end flex-shrink-0 ml-0.5">
                <div className="flex items-center gap-0.5 text-[#DF2020] bg-red-50/50 px-1 py-1 rounded">
                  <Heart className="w-2.5 h-2.5 fill-current" />
                  <span className="font-black text-[10px]">{moment.likes?.toLocaleString() || 0}</span>
                </div>
                <span className="text-[6px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Votes</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
