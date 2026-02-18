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

export const LeaderBoard: React.FC = () => {
  const nextSunday = getNextSunday();

  const {
    data: leaderboard = [],
    isLoading: loadingLeaderboard,
  } = useGetLeaderboardQuery({ limit: 100, offset: 0 });

  const {
    data: weeklyWinners = [],
    isLoading: loadingWinners,
  } = useGetWeeklyWinnersQuery();

  return (
    <div className="max-w-5xl mx-auto p-4">
      <LeaderBoardHeader />

      {/* Current week timer */}
      <Timer targetDate={nextSunday} />

      {/* Previous week winners */}
      {!loadingWinners && weeklyWinners.length >= 3 && (
        <WeeklyWinners topThree={weeklyWinners.slice(0, 3)} />
      )}

      {/* Current week leaderboard */}
      {!loadingLeaderboard && (
        <RankingTable data={leaderboard} />
      )}
    </div>
  );
};
