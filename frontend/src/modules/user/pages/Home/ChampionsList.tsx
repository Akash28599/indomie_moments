import { Heart, Trophy } from "lucide-react";
import { useGetWeeklyWinnersQuery } from "@/store";
import { getCurrentWeekNumber } from "../../../../lib/weekUtils";
import {
  NoodleBowl,
  SteamingBowl,
} from "../../../common/components/Ui/NoodleDecorations";
import { PRIZES } from "../Leaderboard/constant/leaderboard.constants";
import { Link } from "react-router-dom";

const ChampionsList = () => {
  const currentWeek = getCurrentWeekNumber();
  const { data: weeklyWinners = [] } = useGetWeeklyWinnersQuery({ week: currentWeek });
  const recentWinners = weeklyWinners.slice(0, 3);

  return (
    <>
      {recentWinners.length > 0 && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <SteamingBowl className="absolute top-20 left-[5%] w-48 h-48 opacity-10 animate-float" />
          <NoodleBowl className="absolute bottom-20 right-[5%] w-40 h-40 opacity-10 rotate-45" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <Trophy className="w-16 h-16 text-[#FFD700] mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                🏆 Last Week's Champions
              </h2>
              <p className="text-xl text-gray-600">
                They shared, they won! You could be next!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {recentWinners.map((winner, index) => (
                <Link
                  key={winner.id}
                  to={`/share/${winner.slug ?? winner.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={winner.imageUrl}
                      alt={winner.userName}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {winner.userName}
                    </h3>
                    <div className="flex items-center gap-2 text-[#E2231A] mb-3">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="font-bold text-xl">
                        {winner.likes.toLocaleString()} likes
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {PRIZES[index + 1] ?? "Top moment"}
                    </p>
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
