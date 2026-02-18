import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { LeaderboardItem } from "@/services/types";
import { getPrizeText, getRankIcon } from "./utils";

interface RankingTableProps {
  data: LeaderboardItem[];
}

export const RankingTable: React.FC<RankingTableProps> = ({ data }) => {
  if (!data.length) return null;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#E2231A] to-[#c41e16] px-6 py-4">
        <h2 className="text-2xl font-black text-white">Full Rankings</h2>
      </div>

      <div className="divide-y">
        {data.map((moment, index) => (
          <Link
            key={moment.id}
            to={`/share/${moment.slug}`}
            className="grid grid-cols-[80px_100px_1fr_140px_180px] items-center gap-4 p-6 hover:bg-gray-50"
          >
            <div className="w-16 text-center flex justify-center">
              {index < 3 ? getRankIcon(index + 1) : `#${index + 1}`}
            </div>

            <img
              src={moment.imageUrl}
              alt={moment.userName}
              className="w-20 h-20 rounded-lg object-cover"
            />

            <div>
              <h3 className="font-bold">{moment.userName}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">
                {moment.caption ?? ""}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#E2231A] justify-center">
              <Heart className="w-6 h-6 fill-current" />
              <span className="font-black text-2xl">
                {moment.likes.toLocaleString()}
              </span>
            </div>

            {index < 3 && (
              <div className="hidden md:block bg-[#FFD700] text-center px-4 py-2 rounded-full text-sm font-bold">
                {getPrizeText(index + 1)}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
