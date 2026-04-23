import { Gift } from "lucide-react";
import {
  PRIZE_DECORATIONS,
  PRIZE_HEADER,
  PRIZE_PRIZES,
} from "./constant/prize.constant";
import { nira } from '../../../../assets/index';

const Prize = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorations */}
      {PRIZE_DECORATIONS.map((item, i) => {
        const Deco = item.component;
        return <Deco key={i} className={item.className} />;
      })}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-[#DF2020] text-sm font-black mb-6">
            <Gift className="w-4 h-4" />
            <span>REWARDS & PERKS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            {PRIZE_HEADER.title.toUpperCase()}
          </h2>
          <div className="w-24 h-1.5 bg-[#DF2020] mx-auto rounded-full mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {PRIZE_HEADER.subtitle}
          </p>
        </div>

        {/* Prizes Container with Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto pb-8 sm:pb-0 sm:grid sm:grid-cols-3 gap-6 snap-x no-scrollbar">
          {PRIZE_PRIZES.map((prize: any, i) => (
            <div
              key={i}
              className="min-w-[280px] sm:min-w-0 bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col relative snap-center group"
            >
              {/* Tag Badge */}
              <div className="absolute top-4 right-4 bg-[#DF2020] text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-sm">
                {prize.tag}
              </div>

              <div className={`text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                {prize.rank}
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-3">{prize.title}</h3>
              
              <div className="flex items-center gap-1.5 mb-4">
                <img src={nira} alt="Naira" className="h-6 w-auto" />
                <span className="text-3xl font-black text-[#DF2020]">{prize.amount}</span>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-50">
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  {prize.bonus}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12">
          <div className="inline-block bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100">
             <p className="text-gray-900 text-sm sm:text-base font-bold">
              {PRIZE_HEADER.footerNote.replace("Sunday", "")}
              <span className="text-[#DF2020] font-black uppercase">Every Sunday</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prize;
