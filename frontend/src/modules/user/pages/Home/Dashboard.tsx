import type { ChangeEvent, FormEvent } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  Edit3,
  Info,
  Gift,
  Flame,
  Plus,
  Ticket,
  Play,
  X,
  Heart,
  Share2,
  CheckCircle,
  Clock,
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
  { id: 8, title: "Celebration", image: promo8 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [story, setStory] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [submittedMoment, setSubmittedMoment] = useState<{ image: string, story: string, likes: number, status: 'review' | 'approved' } | null>(null);
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0);

  // Fading carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMomentIndex((prev) => (prev + 1) % FEATURED_MOMENTS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedImage && story.trim() !== "") {
      setShowConfirm(true);
    }
  };

  const handleConfirmSubmit = () => {
    if (selectedImage && story.trim() !== "") {
        setSubmittedMoment({
            image: selectedImage,
            story: story,
            likes: 0,
            status: 'review'
        });
        setShowScratchCard(true);
        setShowConfirm(false);
        // Clear form
        setStory("");
        setSelectedImage(null);
        
        // Simulate review passing after 10 seconds for demo
        setTimeout(() => {
          setSubmittedMoment(prev => prev ? { ...prev, status: 'approved' } : null);
        }, 10000);
    }
  };

  return (
    <div className="bg-[#FDFCF9] h-screen md:h-auto font-sans flex flex-col overflow-hidden">
      
      {/* 
        Main container: 
        - On mobile: h-[100dvh], overflow-hidden, flex-col
        - On desktop: auto height, padding-y, centered max-width
      */}
      <div className="flex-1 max-w-md md:max-w-6xl mx-auto w-full px-4 pt-1 md:pt-10 pb-4 md:pb-16 flex flex-col md:flex-row gap-2 md:gap-12 overflow-hidden">
        
        {/* LEFT COLUMN: Feed & Info (Priority on Mobile) */}
        <div className="flex-initial md:flex-1 flex flex-col gap-4 md:gap-8 min-w-0">
          
          {/* ═══ SECTION: INDOMIE MOMENTS (Fading Carousel) ═══ */}
          <section className="shrink-0">
            <h2 className="text-[8px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-1 md:mb-4">
              INDOMIE MOMENTS
            </h2>
            
            <div className="relative w-full h-24 md:h-64 rounded-xl md:rounded-[2.5rem] overflow-hidden shadow-lg bg-black group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentMomentIndex}
                  src={FEATURED_MOMENTS[currentMomentIndex].image}
                  alt={FEATURED_MOMENTS[currentMomentIndex].title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 p-2 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between">
                  <div>
                    <p className="text-white font-black text-[10px] md:text-2xl mb-0">{FEATURED_MOMENTS[currentMomentIndex].title}</p>
                    <p className="text-white/60 text-[6px] md:text-xs uppercase font-bold tracking-widest tracking-tight">Featured Story</p>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/moments")}
                    className="w-6 h-6 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center cursor-pointer shadow-xl transition-all"
                  >
                      <Plus className="w-3.5 h-3.5 md:w-6 md:h-6" />
                  </motion.div>
              </div>
            </div>
          </section>

          {/* ═══ SECTION: HOW TO PARTICIPATE (Compact) ═══ */}
          <section className="shrink-0">
            <h2 className="text-[8px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-1 md:mb-6">
              How to participate?
            </h2>
            <div className="grid grid-cols-2 gap-2 md:gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/winners-hub")}
                className="bg-[#FACC15] rounded-xl md:rounded-3xl p-2 md:p-8 h-14 md:h-48 flex items-center md:flex-col md:justify-between gap-2 shadow-sm md:shadow-lg md:shadow-yellow-200/50 cursor-pointer relative overflow-hidden group"
              >
                <div className="w-7 h-7 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-black/10 flex items-center justify-center text-black shrink-0">
                  <Gift className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-[9px] md:text-lg leading-tight mb-0.5">Redemption Center</h3>
                  <p className="text-[6px] md:text-xs font-bold text-slate-900/40 uppercase">Claim Rewards</p>
                </div>
                <div className="hidden md:block absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/moments")}
                className="bg-white border border-slate-100 rounded-xl md:rounded-3xl p-2 md:p-8 h-14 md:h-48 flex items-center md:flex-col md:justify-between gap-2 shadow-sm md:shadow-xl md:shadow-slate-200/20 cursor-pointer relative overflow-hidden group"
              >
                 <div className="w-7 h-7 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-pink-50 flex items-center justify-center text-[#DF2020] shrink-0">
                    <Flame className="w-4 h-4 md:w-6 md:h-6 fill-[#DF2020]" />
                 </div>
                 <div>
                    <h3 className="font-black text-slate-900 text-[9px] md:text-lg leading-tight mb-0.5">Share & Win</h3>
                    <p className="text-[6px] md:text-xs font-bold text-slate-400 uppercase">3M Weekly</p>
                 </div>
                 <div className="hidden md:block absolute top-0 right-0 w-24 h-24 bg-pink-50/50 blur-3xl group-hover:bg-pink-100/50 transition-colors" />
              </motion.div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: User Interaction & Activity (Dashboard feel) */}
        <div className="flex-initial md:flex-1 flex flex-col gap-4 md:gap-8 min-w-0 md:max-w-sm">
          
          {/* ═══ SECTION: SHARE YOUR MOMENT (Compact) ═══ */}
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl md:rounded-[2.5rem] p-3 md:p-8 shadow-xl border border-slate-100 shrink-0"
          >
            <div className="flex items-center gap-2 mb-2 md:mb-6">
              <div className="w-5 h-5 md:w-8 md:h-8 rounded bg-[#DF2020] flex items-center justify-center text-white">
                  <Edit3 className="w-3 h-3 md:w-5 md:h-5" />
              </div>
              <h2 className="font-black text-slate-800 text-[10px] md:text-base uppercase tracking-wider">Share New Moment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              
              <div 
                onClick={handleImageClick}
                className="w-full border border-dashed border-pink-200 bg-pink-50/30 rounded-xl md:rounded-2xl h-24 md:h-40 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-pink-50 transition-colors group overflow-hidden"
              >
                {selectedImage ? (
                  <img src={selectedImage} className="w-full h-full object-cover" alt="Selected" />
                ) : (
                  <>
                      <UploadCloud className="w-4 h-4 md:w-10 md:h-10 text-[#DF2020] group-hover:scale-110 transition-transform" />
                      <p className="text-[8px] md:text-sm font-black text-slate-600">Tap to Upload Photo</p>
                  </>
                )}
              </div>

              <textarea 
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Explain vibe... (Required)"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-[10px] md:text-sm font-medium text-slate-900 placeholder-slate-300 focus:outline-none h-16 md:h-28 resize-none shadow-inner"
              />

              <button 
                type="submit"
                disabled={!selectedImage || story.trim() === ""}
                className="w-full bg-[#DF2020] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-[10px] md:text-base py-2 md:py-4 rounded-lg md:rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] group"
              >
                Submit & Win
                <Ticket className="w-3 h-3 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </form>
          </motion.section>

          {/* ═══ SECTION: YOUR ACTIVE MOMENT (Visible after submission) ═══ */}
          {submittedMoment && (
            <motion.section 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="shrink-0"
            >
              <div className="bg-white rounded-xl md:rounded-3xl p-2 md:p-6 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-lg md:rounded-2xl overflow-hidden shrink-0 shadow-inner">
                    <img src={submittedMoment.image} className="w-full h-full object-cover" alt="Your Moment" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[7px] md:text-[10px] font-black text-[#DF2020] uppercase tracking-widest">Active Moment</span>
                        <div className="flex items-center gap-1 bg-pink-50 px-1.5 py-0.5 rounded-md">
                            <Heart className="w-2 h-2 text-[#DF2020] fill-[#DF2020]" />
                            <span className="text-[8px] md:text-xs font-black text-[#DF2020]">{submittedMoment.likes}</span>
                        </div>
                    </div>
                    <p className="text-[9px] md:text-sm font-bold text-slate-800 line-clamp-1 italic">
                      "{submittedMoment.story}"
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            {submittedMoment.status === 'review' ? (
                              <div className="flex items-center gap-1">
                                <Clock className="w-2 h-2 text-orange-500 animate-pulse" />
                                <span className="text-[7px] md:text-[9px] font-bold text-orange-600 uppercase">Reviewing</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-2 h-2 text-green-500" />
                                <span className="text-[7px] md:text-[9px] font-bold text-green-600 uppercase font-black">Approved</span>
                              </div>
                            )}
                        </div>
                        
                        {submittedMoment.status === 'approved' && (
                          <div className="flex items-center gap-2">
                             <motion.button whileTap={{ scale: 0.9 }} className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                                <Share2 className="w-3 h-3" />
                             </motion.button>
                             <motion.button whileTap={{ scale: 0.9 }} className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm">
                                <span className="text-[10px] font-black">f</span>
                             </motion.button>
                             <motion.button whileTap={{ scale: 0.9 }} className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shadow-sm">
                                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.51A6.3 6.3 0 0 0 16.25 15.66V7.12A8.16 8.16 0 0 0 21 8.35v-3a4.81 4.81 0 0 1-1.41-1.66z"/>
                                </svg>
                             </motion.button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* ═══ CONFIRMATION MODAL ═══ */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 border-2 border-red-100">
                <Info className="w-8 h-8 text-[#DF2020]" />
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-2">Confirm Submission</h3>
              <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">
                Are you sure you want to submit this moment? Once submitted, it will go for review and you'll receive a scratch card reward!
              </p>

              {/* Preview */}
              {selectedImage && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                  <img src={selectedImage} alt="Preview" className="w-full h-32 object-cover" />
                  <div className="bg-gray-50 px-4 py-2">
                    <p className="text-[10px] font-bold text-gray-500 italic truncate">"{story}"</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="flex-1 bg-[#DF2020] text-white py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-red-200 active:scale-[0.98] transition-transform"
                >
                  Submit 🎉
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ScratchCard 
        isOpen={showScratchCard} 
        onClose={() => setShowScratchCard(false)} 
      />

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
            className="relative w-full max-w-4xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
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

export default Dashboard;
