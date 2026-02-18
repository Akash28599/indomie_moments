import { Gift } from "lucide-react";
import {
  PRIZE_DECORATIONS,
  PRIZE_HEADER,
  PRIZE_PRIZES,
} from "./constant/prize.constant";
import {nira} from '../../../../assets/index'

const Prize = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#FFD700] to-yellow-400 relative overflow-hidden">
      {/* Decorations */}
      {PRIZE_DECORATIONS.map((item, i) => {
        const Deco = item.component;
        return <Deco key={i} className={item.className} />;
      })}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <Gift className="w-16 h-16 text-gray-900 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            {PRIZE_HEADER.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-800">
            {PRIZE_HEADER.subtitle}
          </p>
        </div>

        {/* Prizes */}
        <div className="grid md:grid-cols-3 gap-8">
          {PRIZE_PRIZES.map((prize, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 text-center shadow-xl"
            >
              <div className={`text-6xl font-black mb-4 ${prize.rankColor}`}>
                {prize.rank}
              </div>
              <h3 className="text-2xl font-bold mb-4">{prize.title}</h3>
              <p className="text-3xl flex justify-center items-center gap-2 font-black text-[#E2231A] mb-2">
                <img src={nira} alt="" />{prize.amount}
              </p>
              <p className="text-gray-600">{prize.bonus}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-8">
          <p className="text-gray-800 text-lg font-semibold">
            {PRIZE_HEADER.footerNote.replace("Sunday at 11:59 PM", "")}
            <span className="text-[#E2231A]">Sunday at 11:59 PM</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Prize;
