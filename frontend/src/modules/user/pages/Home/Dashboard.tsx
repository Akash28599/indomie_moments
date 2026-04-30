import type { ChangeEvent, FormEvent } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  Edit3,
  Gift,
  Ticket,
  Trophy,
  Clock,
  Heart,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScratchCard from "./ScratchCard";
import { promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8 } from "../../../../assets";

const FEATURED_MOMENTS = [
  { id: 1, title: "Hectic Day", image: promo1 },
  { id: 2, title: "Late Night", image: promo2 },
  { id: 3, title: "Super Chef", image: promo3 },
  { id: 4, title: "Weekend Vibes", image: promo4 },
  { id: 5, title: "Cook Off", image: promo5 },
  { id: 6, title: "Family Time", image: promo6 },
  { id: 7, title: "Street Style", image: promo7 },
  { id: 8, title: "Office Snack", image: promo8 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [story, setStory] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [submittedMoment, setSubmittedMoment] = useState<{image: string; story: string; likes: number; status: string} | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_MOMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirm(false);
    setSubmittedMoment({
      image: selectedImage!,
      story: story,
      likes: 0,
      status: 'review'
    });
    setShowScratchCard(true);
    setSelectedImage(null);
    setStory("");
  };

  return (
    <>
      {/* NO h-[100dvh] here — UserLayout already handles full height. 
          This just fills the flex-1 space between Header and BottomNav. 
          pb-16 accounts for the fixed BottomNav overlay. */}
      <div className="h-full flex flex-col bg-[#FFF8F0] font-sans overflow-hidden px-4 pb-16 md:pb-0">
        
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between overflow-hidden py-3 gap-2">
          
          {/* ─── Featured Moments Carousel (COMPACT) ─── */}
          <section className="shrink-0 relative">
            <div className="flex items-center justify-between mb-1">
               <h2 className="text-[10px] md:text-sm font-black text-slate-800 uppercase tracking-widest italic flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#DF2020] rounded-full animate-ping" />
                  Featured Moments
               </h2>
               <button onClick={() => navigate("/moments")} className="text-[8px] md:text-xs font-bold text-[#DF2020] hover:underline">View All</button>
            </div>
            <div className="relative h-24 md:h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-white group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={FEATURED_MOMENTS[activeIndex].image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-4">
                <p className="text-white font-black italic text-[9px] md:text-xl uppercase tracking-tighter shadow-sm">
                  #{FEATURED_MOMENTS[activeIndex].title.replace(/\s+/g, '')}
                </p>
              </div>
            </div>
          </section>

          {/* ─── MAIN CENTERPIECE (flex-1 to fill remaining space) ─── */}
          <div className="flex-1 min-h-0 flex flex-col gap-2">
            {submittedMoment ? (
              /* ═══ ACTIVE MOMENT (shown after submission) ═══ */
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-[2rem] p-4 shadow-xl border border-slate-50 flex flex-col gap-3 flex-1 min-h-0"
              >
                <div className="flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#DF2020] flex items-center justify-center text-white shadow-md">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <h2 className="font-black text-slate-800 text-[10px] uppercase tracking-tight">Your Active Moment</h2>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                    <Clock className="w-2.5 h-2.5 text-orange-500 animate-pulse" />
                    <span className="text-[7px] font-black text-orange-600 uppercase">Reviewing</span>
                  </div>
                </div>

                {/* Submitted image fills the space */}
                <div className="flex-1 min-h-0 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                  <img src={submittedMoment.image} className="w-full h-full object-cover" alt="Your Moment" />
                </div>

                <div className="shrink-0 flex items-center justify-between">
                  <p className="text-[9px] font-bold text-slate-500 italic truncate flex-1 mr-4">"{submittedMoment.story}"</p>
                  <div className="flex items-center gap-1 bg-pink-50 px-2 py-1 rounded-md">
                    <Heart className="w-2.5 h-2.5 text-[#DF2020] fill-[#DF2020]" />
                    <span className="text-[8px] font-black text-[#DF2020]">{submittedMoment.likes}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSubmittedMoment(null)}
                  className="w-full bg-slate-100 text-slate-600 font-black text-[9px] py-2.5 rounded-xl uppercase tracking-widest shrink-0"
                >
                  Upload Another Moment
                </button>
              </motion.section>
            ) : (
              /* ═══ UPLOAD FORM (shown before submission) ═══ */
              <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-[2rem] p-4 shadow-xl border border-slate-50 flex flex-col gap-2 flex-1 min-h-0"
              >
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-6 h-6 rounded-lg bg-[#DF2020] flex items-center justify-center text-white shadow-md">
                      <Edit3 className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-black text-slate-800 text-[10px] md:text-base uppercase tracking-tight">Share your Indomie moment</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2 min-h-0">
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  
                  {/* Upload box grows to fill available space */}
                  <div 
                    onClick={handleImageClick}
                    className="w-full border-2 border-dashed border-pink-200 bg-pink-50/30 rounded-2xl flex-1 min-h-0 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-pink-50 transition-all overflow-hidden shadow-inner relative"
                  >
                    {selectedImage ? (
                      <>
                        <img src={selectedImage} className="w-full h-full object-cover" alt="Selected" />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center group">
                          <span className="text-white text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1.5 rounded-full">Tap to change</span>
                        </div>
                      </>
                    ) : (
                      <>
                          <UploadCloud className="w-8 h-8 text-[#DF2020]" />
                          <p className="text-[10px] md:text-sm font-black text-slate-600 uppercase tracking-widest text-center">Tap to Upload Photo</p>
                      </>
                    )}
                  </div>

                  {/* Story textarea — fixed height */}
                  <textarea 
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder="Explain the vibe..."
                      required
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[10px] md:text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none h-12 md:h-28 resize-none shadow-inner shrink-0"
                  />

                  <button 
                    type="submit"
                    disabled={!selectedImage || story.trim() === ""}
                    className="w-full bg-[#DF2020] disabled:bg-slate-100 disabled:text-slate-300 text-white font-black text-[10px] md:text-base py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] uppercase tracking-widest shrink-0"
                  >
                    Submit & Win 🎉
                    <Ticket className="w-4 h-4" />
                  </button>
                </form>
              </motion.section>
            )}
          </div>

          {/* ─── HOW TO PARTICIPATE (COMPACT BOTTOM) ─── */}
          <section className="shrink-0">
            <div className="flex items-center gap-3 mb-1.5">
               <div className="flex-1 h-[1px] bg-slate-200" />
               <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.2em] whitespace-nowrap">Alternative Ways</p>
               <div className="flex-1 h-[1px] bg-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/winners-hub")}
                className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-sm hover:border-[#DF2020] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#DF2020] text-white font-black text-[11px] flex items-center justify-center shadow-md">A</div>
                <h3 className="font-black text-slate-900 text-[9px] uppercase leading-tight">Drop 10 wrappers<br/>at the Center</h3>
                <Gift className="w-4 h-4 text-[#DF2020]" />
              </motion.div>

              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/upload")}
                className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center text-center gap-1.5 shadow-sm hover:border-[#DF2020] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#DF2020] text-white font-black text-[11px] flex items-center justify-center shadow-md">B</div>
                <h3 className="font-black text-slate-900 text-[9px] uppercase leading-tight">Upload & Win up to<br/><span className="text-[#DF2020]">₦10M</span></h3>
                <Trophy className="w-4 h-4 text-[#DF2020]" />
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-sm bg-white rounded-[3rem] p-8 shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-red-100">
                <Info className="w-8 h-8 text-[#DF2020]" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Submit Moment?</h3>
              <p className="text-xs text-gray-500 font-bold mb-6 italic">Share your Indomie Moment & get a scratch card!</p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Wait</button>
                <button onClick={handleConfirmSubmit} className="flex-1 bg-[#DF2020] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-200">Yes! 🎉</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ScratchCard isOpen={showScratchCard} onClose={() => setShowScratchCard(false)} />
    </>
  );
};

export default Dashboard;
