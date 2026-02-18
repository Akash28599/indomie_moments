import { Crown, Medal, Trophy } from "lucide-react";
import { PRIZES } from "../constant/leaderboard.constants";

export { getCurrentWeekNumber, getNextSunday, getTimeUntilReset } from "@/lib/weekUtils";

export const getPrizeText = (rank: number): string => PRIZES[rank] ?? "";

export const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-10 h-10 text-[#FFD700]" />;
    case 2:
      return <Medal className="w-8 h-8 text-gray-400" />;
    case 3:
      return <Medal className="w-8 h-8 text-orange-500" />;
    default:
      return <Trophy className="w-6 h-6 text-gray-400" />;
  }
};
