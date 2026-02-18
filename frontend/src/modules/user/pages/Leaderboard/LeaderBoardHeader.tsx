import { Trophy } from 'lucide-react'
const LeaderBoardHeader = () => {
  return (
    <>
     <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-[#FFD700] mx-auto mb-4 animate-bounce-slow" />
          <h1 className="text-5xl font-black text-gray-900 mb-4">
            Weekly <span className="text-[#E2231A]">Leaderboard</span>
          </h1>
          <p className="text-xl text-gray-600">
            Top moments competing for this week's prizes
          </p>
        </div>
    </>
  )
}

export default LeaderBoardHeader