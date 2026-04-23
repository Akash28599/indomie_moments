import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Play, Package, MapPin, Trophy, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { noodles } from "../../../../assets";

const STEPS = [
  {
    number: "01",
    title: "COLLECT WRAPPERS",
    description:
      'Gather any 10 unique graphics from specially marked noodle packs. Each graphic represents a flavor of victory!',
    icon: <Package className="w-6 h-6" />,
    color: "from-red-50 to-white",
    iconBg: "bg-red-500 text-white",
    border: "border-red-100",
  },
  {
    number: "02",
    title: "VISIT THE CENTER",
    description:
      "Head to your nearest Indomie Redemption Center with your collected wrappers for verification.",
    icon: <MapPin className="w-6 h-6" />,
    color: "from-yellow-50 to-white",
    iconBg: "bg-[#FFD700] text-gray-900",
    border: "border-yellow-100",
  },
  {
    number: "03",
    title: "WIN BIG PRIZES",
    description:
      "Exchange your verified wrappers for amazing prizes – from cash rewards to electronics and more!",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-green-50 to-white",
    iconBg: "bg-green-500 text-white",
    border: "border-green-100",
  },
];

/**
 * WinnersHub – Premium Redemption Center page.
 * Optimized for clarity, trust, and excitement.
 */
const WinnersHub = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFCF8] pb-32 font-sans relative overflow-x-hidden">
      
      {/* ─── Background Mesh Gradients ─── */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-100/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-yellow-100/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-95 border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-[#DF2020] font-black text-[13px] tracking-[0.2em] uppercase">
              Winner's Hub
            </h2>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Redemption</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-95 border border-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-8 relative z-10">
        
        {/* VIDEO SECTION - MEGA PREMIUM */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-red-200/50 group border-4 border-white"
        >
          <div className="aspect-[16/10] bg-gray-900 relative">
             <img
              src={noodles}
              alt="Winner's process"
              className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(!showVideo)}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl relative"
              >
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                <Play className="w-8 h-8 text-[#DF2020] ml-1 fill-[#DF2020]" />
              </motion.button>
              <p className="text-white font-black text-xs uppercase tracking-widest mt-6 drop-shadow-md">
                Watch the Winner's Guide
              </p>
            </div>

            {/* Float Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-[#FFD700] text-gray-900 text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                <Star className="w-3 h-3 fill-current" /> 10,000+ Winners
              </span>
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black leading-[0.95] tracking-tighter mb-4">
            <span className="text-[#DF2020]">How to Win</span>
            <br />
            <span className="text-gray-900">Your Prize</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium max-w-xs mx-auto leading-relaxed">
            Follow these simple steps and claim your rewards instantly at any center.
          </p>
        </div>

        {/* ═══ The 3-Step Process ═══ */}
        <div className="space-y-6 mb-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className={`bg-gradient-to-r ${step.color} rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/20 group hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 ${step.iconBg} rounded-[1.25rem] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Step {step.number}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg tracking-tight mb-2 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══ Redemption Centers List ═══ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 italic tracking-tight">Active Centers</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Lagos Region</p>
            </div>
            <button className="text-[10px] font-black text-[#DF2020] uppercase border-b-2 border-red-500 pb-0.5">
              Change Location
            </button>
          </div>

          <div className="grid gap-4">
            {[
              { name: "Surulere Hub", address: "45 Adeniran Ogunsanya St, Surulere", status: "Open Now", time: "8AM - 6PM" },
              { name: "Ikeja Mega Plaza", address: "Obafemi Awolowo Way, Ikeja", status: "Open Now", time: "9AM - 8PM" },
              { name: "Lekki Phase 1", address: "Admiralty Way, Beside City Dia", status: "Closing Soon", time: "8AM - 5PM" }
            ].map((center, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-red-100 transition-all hover:shadow-2xl hover:shadow-red-900/5"
              >
                <div className="flex gap-5 items-center">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-[#DF2020] transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-sm group-hover:text-[#DF2020] transition-all">{center.name}</h4>
                    <p className="text-[10px] font-bold text-gray-400 mt-0.5">{center.address}</p>
                    <div className="flex items-center gap-2 mt-3">
                       <div className={`w-1.5 h-1.5 rounded-full ${center.status.includes('Open') ? 'bg-green-500' : 'bg-orange-500'}`} />
                       <span className="text-[9px] font-black text-gray-800 uppercase tracking-wider">{center.status}</span>
                       <span className="text-[10px] text-gray-300">•</span>
                       <span className="text-[9px] font-bold text-gray-400 uppercase">{center.time}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#DF2020] transition-all group-hover:translate-x-1" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-40">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => navigate("/leaderboard")}
              className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-2xl shadow-gray-400 flex items-center justify-center gap-3 hover:bg-gray-800"
            >
              Check Winners Hub <Trophy className="w-5 h-5 text-[#FFD700]" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Popup Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowVideo(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-full max-w-xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Indomie Redemption Center Guide"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WinnersHub;
