import React from "react";
import { Link } from "react-router-dom";
import { Heart, Crown, Medal } from "lucide-react";
import type { LeaderboardItem } from "@/services/types";
import { getPrizeText } from "./utils";

interface WeeklyWinnersProps {
  topThree: LeaderboardItem[];
}

export const WeeklyWinners: React.FC<WeeklyWinnersProps> = ({ topThree }) => {
  if (!topThree || topThree.length < 3) return null;

  const displayOrder = [1, 0, 2]; // 2nd, 1st, 3rd

  return (
    <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
      {displayOrder.map((pos, i) => {
        const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
        const data = topThree[pos];

        return (
          <div key={data.id} className={rank === 1 ? "pt-0" : "pt-12"}>
            <Link to={`/share/${data.slug}`}>
              <div
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  rank === 1 ? "border-4 border-[#FFD700]" : ""
                }`}
              >
                <div
                  className={`${
                    rank === 1
                      ? "bg-gradient-to-r from-[#FFD700] to-yellow-400 text-gray-900 py-4 text-center"
                      : rank === 2
                      ? "bg-gray-400 text-white py-3 text-center"
                      : "bg-orange-600 text-white py-3 text-center"
                  }`}
                >
                  {rank === 1 ? (
                    <Crown className="w-12 h-12 mx-auto mb-1" />
                  ) : (
                    <Medal className="w-8 h-8 mx-auto mb-1" />
                  )}
                  <div className="text-3xl font-black">
                    {rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}
                  </div>
                </div>

                <div className="p-4">
                  <img
                    src={data.imageUrl}
                    alt={data.userName}
                    className="w-full aspect-square object-cover rounded-lg mb-3"
                  />

                  <h3 className="font-bold text-center text-lg mb-2">
                    {data.userName}
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-[#E2231A]">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-bold text-xl">
                      {data.likes.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-center text-gray-600 mt-2 font-semibold">
                    {getPrizeText(rank)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
