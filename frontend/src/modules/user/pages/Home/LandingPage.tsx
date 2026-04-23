import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Tv, 
  Refrigerator, 
  Smartphone, 
  Rocket, 
  ChevronRight,
  TrendingUp,
  Star,
  X
} from "lucide-react";
import { AuthModal } from "../../auth/AuthModal";
import { indomieLogo } from "../../../../assets";

/**
 * LandingPage – Matches the specific UI in the user-provided screenshot.
 * Features the Redemption Banner, Points Header, and Grand Prize Gallery.
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const prizes = [
    {
      id: 1,
      name: "Smart TV",
      label: "WEEKLY",
      icon: <Tv className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50",
      labelColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 2,
      name: "Double Fridge",
      label: "MEGA",
      icon: <Refrigerator className="w-8 h-8 text-cyan-600" />,
      bg: "bg-cyan-50",
      labelColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: 3,
      name: "Gaming Console",
      label: "PROMO",
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      bg: "bg-purple-50",
      labelColor: "bg-yellow-100 text-yellow-700"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col font-sans selection:bg-red-100">
      
      {/* ─── Top Notification Banner ─── */}
      <div 
        onClick={() => setIsLocationModalOpen(true)}
        className="bg-[#DF2020] py-2 px-4 flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md cursor-pointer hover:bg-red-700 transition-colors"
      >
        <MapPin className="w-3.5 h-3.5 text-white animate-bounce" />
        <span className="text-white text-[10px] font-black uppercase tracking-[0.1em]">
          Find your nearest redemption center
        </span>
      </div>

      <div className="max-w-md mx-auto w-full bg-[#FFF8F0] flex-1 flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* ─── Specialized Header ─── */}
        <header className="px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={indomieLogo} alt="Indomie" className="h-8 w-auto" />
            <h1 className="text-[#DF2020] font-black text-xl tracking-tight">
              Indomie Moments
            </h1>
          </div>
          
          {/* Login button removed as requested */}
        </header>

        {/* ─── Hero Content ─── */}
        <main className="px-8 pt-12 flex-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[2.75rem] sm:text-5xl font-black text-[#DF2020] leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "'Inter', 'Outfit', system-ui, sans-serif" }}>
              Win 3 Million<br />
              Naira Weekly!
            </h1>
            
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-[320px] mb-12">
              Your favorite noodle moments are now your ticket to the grand prize. Join the hype today!
            </p>
          </motion.div>

          {/* ─── Grand Prizes Section ─── */}
          <section className="mb-12">
            <h2 className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mb-6">
              Grand Prizes to be Won
            </h2>
            
            <div className="flex gap-4 overflow-x-auto pb-6 -mx-2 px-2 no-scrollbar">
              {prizes.map((prize, idx) => (
                <motion.div
                  key={prize.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="min-w-[140px] bg-white rounded-3xl p-5 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center group active:scale-95 transition-transform"
                >
                  <div className={`${prize.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {prize.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{prize.name}</h3>
                  <span className={`${prize.labelColor} text-[8px] font-black px-2 py-0.5 rounded-md`}>
                    {prize.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        {/* ─── Sticky Footer CTA ─── */}
        <div className="px-8 pb-12 pt-6 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0] to-transparent">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full bg-[#DF2020] text-white py-6 rounded-[2rem] font-black text-base shadow-2xl shadow-red-500/40 flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            Start the Journey
            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400">Join 2.5k players this week</span>
          </div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-red-50 rounded-full blur-[100px] pointer-events-none -z-10" />
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl relative"
          >
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-black text-[#DF2020] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Active Centers
            </h2>
            <div className="space-y-3">
              {[
                { name: "Surulere Hub", address: "45 Adeniran Ogunsanya St, Surulere", status: "Open Now", time: "8AM - 6PM" },
                { name: "Ikeja Mega Plaza", address: "Obafemi Awolowo Way, Ikeja", status: "Open Now", time: "9AM - 8PM" },
                { name: "Lekki Phase 1", address: "Admiralty Way, Beside City Dia", status: "Closing Soon", time: "8AM - 5PM" }
              ].map((center, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all cursor-pointer group hover:shadow-md">
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#DF2020] transition-colors">{center.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 mb-2">{center.address}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${center.status.includes('Open') ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <span className="text-[9px] font-black text-gray-800 uppercase tracking-wider">{center.status}</span>
                    <span className="text-[10px] text-gray-300">•</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{center.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="w-full mt-6 bg-gray-900 text-white font-black text-sm uppercase py-4 rounded-2xl hover:bg-black transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
