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
    <div className="w-full flex flex-col overflow-hidden">
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
              className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors active:bg-gray-100 w-full overflow-hidden"
            >
              {/* Rank */}
              <div className="w-5 flex-shrink-0 flex justify-center items-center">
                {isTop3 ? (
                  <div className="text-base">{getRankIcon(index + 1)}</div>
                ) : (
                  <span className="text-[10px] font-black text-gray-400">#{index + 1}</span>
                )}
              </div>

              {/* Thumbnail */}
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                <img
                  src={moment.imageUrl || "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80"}
                  alt={moment.userName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info + Score in one row */}
              <div className="flex-1 min-w-0 overflow-hidden">
                {/* Top row: Name + Votes */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-gray-900 text-[11px] truncate leading-tight">
                    {moment.userName || "Fan"}
                  </h3>
                  <div className="flex items-center gap-0.5 text-[#DF2020] flex-shrink-0">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                    <span className="font-black text-[10px] whitespace-nowrap">{moment.likes?.toLocaleString() || 0}</span>
                  </div>
                </div>
                {/* Caption */}
                <p className="text-[8px] font-medium text-gray-400 truncate mt-0.5">
                  {moment.caption || "Joined the challenge"}
                </p>
                {/* Prize badge */}
                <span className={`text-[7px] mt-1 font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full inline-block border ${isTop3 ? 'text-[#B8860B] bg-yellow-50 border-yellow-200/50' : 'text-gray-500 bg-gray-50 border-gray-200'}`}>
                  Won: {getPrizeForRank(index + 1)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
