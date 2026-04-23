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

const FEATURED_MOMENTS = [
  {
    id: 1,
    title: "Hectic Day",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 2,
    title: "Late Night",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 3,
    title: "Super Chef",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d596a1?auto=format&fit=crop&q=80&w=300&h=300",
  },
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
    }, 4000);
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedImage && story.trim() !== "") {
        setSubmittedMoment({
            image: selectedImage,
            story: story,
            likes: 0,
            status: 'review'
        });
        setShowScratchCard(true);
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
    <div className="bg-[#FDFCF9] min-h-screen md:h-auto font-sans flex flex-col">
      
      {/* 
        Main container: 
        - On mobile: h-[100dvh], overflow-hidden, flex-col
        - On desktop: auto height, padding-y, centered max-width
      */}
      <div className="flex-1 max-w-md md:max-w-6xl mx-auto w-full px-4 pt-3 md:pt-10 pb-20 md:pb-16 flex flex-col md:flex-row gap-6 md:gap-12">
        
        {/* LEFT COLUMN: Feed & Info (Priority on Mobile) */}
        <div className="flex-1 flex flex-col gap-4 md:gap-8 min-w-0">
          
          {/* ═══ SECTION: INDOMIE MOMENTS (Fading Carousel) ═══ */}
          <section className="shrink-0">
            <h2 className="text-[9px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-2 md:mb-4">
              INDOMIE MOMENTS
            </h2>
            
            <div className="relative w-full h-32 md:h-64 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg bg-black group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentMomentIndex}
                  src={FEATURED_MOMENTS[currentMomentIndex].image}
                  alt={FEATURED_MOMENTS[currentMomentIndex].title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between">
                  <div>
                    <p className="text-white font-black text-xs md:text-2xl mb-1">{FEATURED_MOMENTS[currentMomentIndex].title}</p>
                    <p className="text-white/60 text-[8px] md:text-xs uppercase font-bold tracking-widest">Featured Story</p>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate("/moments")}
                    className="w-8 h-8 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center cursor-pointer shadow-xl transition-all"
                  >
                      <Plus className="w-4 h-4 md:w-6 md:h-6" />
                  </motion.div>
              </div>
            </div>
          </section>

          {/* ═══ SECTION: HOW TO PARTICIPATE ═══ */}
          <section className="shrink-0">
            <h2 className="text-[9px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-3 md:mb-6">
              How to participate?
            </h2>
            
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/winners-hub")}
                className="bg-[#FACC15] rounded-2xl md:rounded-3xl p-4 md:p-8 h-24 md:h-48 flex flex-col justify-between shadow-lg shadow-yellow-200/50 cursor-pointer group relative overflow-hidden"
              >
                <div className="flex justify-between items-start z-10">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-black/10 flex items-center justify-center text-black">
                    <Gift className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(true);
                    }}
                    className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-black hover:bg-white/40 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 md:w-5 md:h-5 fill-black" />
                  </button>
                </div>
                <div className="z-10">
                  <h3 className="font-black text-slate-900 text-[11px] md:text-lg mb-0.5">Redemption Center</h3>
                  <p className="text-[8px] md:text-xs font-bold text-slate-900/40 uppercase">Claim your rewards</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/moments")}
                className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-4 md:p-8 h-24 md:h-48 flex flex-col justify-between shadow-xl shadow-slate-200/20 cursor-pointer relative overflow-hidden group"
              >
                 <div className="z-10">
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-pink-50 flex items-center justify-center text-[#DF2020]">
                          <Flame className="w-4 h-4 md:w-6 md:h-6 fill-[#DF2020]" />
                      </div>
                 </div>
                 <div className="z-10">
                      <h3 className="font-black text-slate-900 text-[11px] md:text-lg mb-0.5">Share & Win</h3>
                      <p className="text-[8px] md:text-xs font-bold text-slate-400 uppercase">Up to 3M Naira / Week</p>
                 </div>
                 <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50/50 blur-3xl group-hover:bg-pink-100/50 transition-colors" />
              </motion.div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: User Interaction & Activity (Dashboard feel) */}
        <div className="flex-1 flex flex-col gap-4 md:gap-8 min-w-0 md:max-w-sm">
          
          {/* ═══ SECTION: YOUR RECENT MOMENT ═══ */}
          {submittedMoment && (
            <motion.section 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="shrink-0"
            >
              <h2 className="text-[9px] md:text-xs font-black text-[#DF2020] uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF2020] animate-pulse" />
                Active Moment
              </h2>
              <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                    <img src={submittedMoment.image} className="w-full h-full object-cover" alt="Your Moment" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] md:text-sm font-bold text-slate-800 line-clamp-2 italic mb-2">
                      "{submittedMoment.story}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-pink-50 px-2 py-1 rounded-lg">
                        <Heart className="w-3 h-3 text-[#DF2020] fill-[#DF2020]" />
                        <span className="text-[10px] md:text-xs font-black text-[#DF2020]">{submittedMoment.likes} Likes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                    {submittedMoment.status === 'review' ? (
                      <>
                        <Clock className="w-4 h-4 text-orange-500 animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-bold text-orange-600 uppercase">Under Review (AI)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-[9px] md:text-[10px] font-bold text-green-600 uppercase">Moment Approved!</span>
                      </>
                    )}
                  </div>
                  
                  {submittedMoment.status === 'approved' && (
                    <div className="flex flex-col gap-2">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center mb-1">Share to earn more likes</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="bg-[#1877F2] text-white py-2 rounded-lg text-[9px] font-black hover:bg-blue-700 transition-colors">Facebook</button>
                        <button className="bg-[#25D366] text-white py-2 rounded-lg text-[9px] font-black hover:bg-green-600 transition-colors">WhatsApp</button>
                        <button className="bg-black text-white py-2 rounded-lg text-[9px] font-black hover:bg-slate-800 transition-colors">X / Twitter</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}

          {/* ═══ SECTION: SHARE YOUR MOMENT ═══ */}
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 shrink-0"
          >
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-[#DF2020] flex items-center justify-center text-white">
                  <Edit3 className="w-3.5 h-3.5 md:w-5 md:h-5" />
              </div>
              <h2 className="font-black text-slate-800 text-xs md:text-base uppercase tracking-wider">Share New Moment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              
              <div 
                onClick={handleImageClick}
                className="w-full border-2 border-dashed border-pink-200 bg-pink-50/30 rounded-2xl h-24 md:h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-pink-50 transition-colors group overflow-hidden"
              >
                {selectedImage ? (
                  <img src={selectedImage} className="w-full h-full object-cover" alt="Selected" />
                ) : (
                  <>
                      <UploadCloud className="w-6 h-6 md:w-10 md:h-10 text-[#DF2020] group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] md:text-sm font-black text-slate-600">Tap to Upload Photo</p>
                  </>
                )}
              </div>

              <textarea 
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Explain your Indomie vibe... (Required)"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs md:text-sm font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#DF2020] transition-all h-20 md:h-28 resize-none shadow-inner"
              />

              <div className="bg-[#F0F7FF] border border-[#E0EFFF] rounded-xl px-4 py-3 flex items-center gap-3">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />
                <p className="text-[9px] md:text-xs font-bold text-blue-600 leading-tight">
                  Submission grants <span className="font-extrabold text-[#DF2020]">50 Points</span> and a Silver Scratch Card instantly!
                </p>
              </div>

              <button 
                type="submit"
                disabled={!selectedImage || story.trim() === ""}
                className="w-full bg-[#DF2020] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs md:text-base py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition-all active:scale-[0.98] group"
              >
                Submit & Win
                <Ticket className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </form>
          </motion.section>
        </div>
      </div>

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
