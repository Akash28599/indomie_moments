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
    <div className="bg-[#FDFCF9] h-[100dvh] font-sans overflow-hidden flex flex-col">
      
      {/* Scrollable content area that fills space above bottom nav */}
      <div className="flex-1 overflow-hidden flex flex-col px-4 pt-3 pb-1">
        
        {/* ═══ SECTION: YOUR RECENT MOMENT (if submitted) ═══ */}
        {submittedMoment && (
          <motion.section 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-2 shrink-0"
          >
            <h2 className="text-[9px] font-black text-[#DF2020] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#DF2020] animate-pulse" />
              Your Active Moment
            </h2>
            <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img src={submittedMoment.image} className="w-full h-full object-cover" alt="Your Moment" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-800 line-clamp-1 italic">
                  "{submittedMoment.story || "My Indomie vibe!"}"
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-pink-50 px-1.5 py-0.5 rounded-md">
                    <Heart className="w-2.5 h-2.5 text-[#DF2020] fill-[#DF2020]" />
                    <span className="text-[9px] font-black text-[#DF2020]">{submittedMoment.likes}</span>
                  </div>
                  {submittedMoment.status === 'review' ? (
                    <div className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-orange-500 animate-pulse" />
                      <span className="text-[7px] font-bold text-orange-500 uppercase">Reviewing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-green-500" />
                      <span className="text-[7px] font-bold text-green-500 uppercase">Approved!</span>
                    </div>
                  )}
                </div>
                {submittedMoment.status === 'approved' && (
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button className="bg-[#1877F2] text-white px-1.5 py-0.5 rounded text-[7px] font-bold">FB</button>
                    <button className="bg-[#25D366] text-white px-1.5 py-0.5 rounded text-[7px] font-bold">WA</button>
                    <button className="bg-black text-white px-1.5 py-0.5 rounded text-[7px] font-bold">X</button>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
        
        {/* ═══ SECTION: INDOMIE MOMENTS (Fading Carousel) ═══ */}
        <section className="mb-2 shrink-0">
          <h2 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
            INDOMIE MOMENTS
          </h2>
          
          <div className="relative w-full h-28 rounded-2xl overflow-hidden shadow-md bg-black">
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
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                <p className="text-white font-black text-[10px]">{FEATURED_MOMENTS[currentMomentIndex].title}</p>
                <div 
                  onClick={() => navigate("/moments")}
                  className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/40"
                >
                    <Plus className="w-3 h-3 text-white" />
                </div>
            </div>
            {/* Dot indicators */}
            <div className="absolute top-2 right-2 flex gap-1">
              {FEATURED_MOMENTS.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentMomentIndex ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION: SHARE YOUR MOMENT ═══ */}
        <motion.section 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 mb-2 shrink-0"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-4 h-4 rounded bg-[#DF2020] flex items-center justify-center text-white">
                <Edit3 className="w-2.5 h-2.5" />
            </div>
            <h2 className="font-black text-slate-800 text-[10px] uppercase tracking-wider">Share Your Moment</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            {/* Upload Box */}
            <div 
              onClick={handleImageClick}
              className="w-full border-2 border-dashed border-pink-200 bg-pink-50/30 rounded-xl h-16 flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:bg-pink-50 transition-colors"
            >
              {selectedImage ? (
                <img src={selectedImage} className="w-full h-full object-cover rounded-xl" alt="Selected" />
              ) : (
                <>
                    <UploadCloud className="w-5 h-5 text-[#DF2020]" />
                    <p className="text-[8px] font-black text-slate-600">Tap to Upload Photo</p>
                </>
              )}
            </div>

            {/* Story */}
            <textarea 
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Your Indomie story... (Required)"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-[10px] font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#DF2020] transition-all h-10 resize-none"
            />

            {/* Info + Submit row */}
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#F0F7FF] border border-[#E0EFFF] rounded-lg px-2 py-1.5 flex items-center gap-1.5">
                <Info className="w-3 h-3 text-blue-500 shrink-0" />
                <p className="text-[8px] font-bold text-blue-600">
                  Submit = <span className="font-extrabold">50 pts</span> + <span className="font-extrabold text-[#DF2020]">Scratch Card!</span>
                </p>
              </div>
              <button 
                type="submit"
                disabled={!selectedImage || story.trim() === ""}
                className="bg-[#B91C1C] disabled:bg-gray-400 text-white font-black text-[9px] py-2.5 px-4 rounded-lg flex items-center gap-1 shadow-sm transition-all active:scale-[0.98] shrink-0"
              >
                Submit
                <Ticket className="w-3 h-3" />
              </button>
            </div>
          </form>
        </motion.section>

        {/* ═══ SECTION: HOW TO PARTICIPATE ═══ */}
        <section className="shrink-0">
          <h2 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">
            How to participate?
          </h2>
          
          <div className="grid grid-cols-2 gap-2">
            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/winners-hub")}
              className="bg-[#FACC15] rounded-xl p-3 h-20 flex flex-col justify-between shadow-sm cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center text-black">
                  <Gift className="w-3.5 h-3.5" />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideo(true);
                  }}
                  className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-black hover:bg-white/40 transition-all"
                >
                  <Play className="w-3 h-3 fill-black" />
                </button>
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-[10px] mb-0.5">Redemption Center</h3>
                <p className="text-[8px] font-bold text-slate-900/40 uppercase">Claim Prizes</p>
              </div>
            </motion.div>

            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/moments")}
              className="bg-white border border-slate-100 rounded-xl p-3 h-20 flex flex-col justify-between shadow-sm cursor-pointer relative overflow-hidden"
            >
               <div className="z-10">
                    <div className="w-7 h-7 rounded-lg bg-pink-50 flex items-center justify-center text-[#DF2020]">
                        <Flame className="w-3.5 h-3.5 fill-[#DF2020]" />
                    </div>
               </div>
               <div className="z-10">
                    <h3 className="font-black text-slate-900 text-[10px] mb-0.5">Share & Win</h3>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Up to 3M / Wk</p>
               </div>
               <div className="absolute top-0 right-0 w-12 h-12 bg-pink-50/50 blur-2xl" />
            </motion.div>
          </div>
        </section>
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

export default Dashboard;
