import type { ChangeEvent, FormEvent } from "react";
import { useState, useRef } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
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
  const [submittedMoment, setSubmittedMoment] = useState<{ image: string, story: string, likes: number } | null>(null);

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
    if (selectedImage) {
        setSubmittedMoment({
            image: selectedImage,
            story: story,
            likes: 0 // Initial likes should be 0
        });
        setShowScratchCard(true);
        // Clear form
        setStory("");
        setSelectedImage(null);
    }
  };

  return (
    <div className="bg-[#E2E8F0]/30 min-h-screen pb-32 font-sans overflow-x-hidden">
      
      <div className="px-5 pt-6">
        
        {/* ═══ SECTION: YOUR RECENT MOMENT ═══ */}
        {submittedMoment && (
          <motion.section 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-[10px] font-black text-[#DF2020] uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DF2020] animate-pulse" />
              Your Active Moment
            </h2>
            <div className="bg-white rounded-3xl p-3 shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-inner">
                <img src={submittedMoment.image} className="w-full h-full object-cover" alt="Your Moment" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-800 line-clamp-1 mb-1 italic">
                  "{submittedMoment.story || "My Indomie vibe!"}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-pink-50 px-2 py-0.5 rounded-lg">
                    <Heart className="w-3 h-3 text-[#DF2020] fill-[#DF2020]" />
                    <span className="text-[10px] font-black text-[#DF2020]">{submittedMoment.likes} Likes</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Status: Reviewing</span>
                </div>
              </div>
            </div>
          </motion.section>
        )}
        
        {/* ═══ SECTION: INDOMIE MOMENTS ═══ */}
        <section className="mb-8">
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
            INDOMIE MOMENTS
          </h2>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
            {FEATURED_MOMENTS.map((moment, idx) => (
              <motion.div 
                key={moment.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative w-36 h-36 flex-shrink-0 rounded-3xl overflow-hidden shadow-md"
              >
                <img 
                  src={moment.image} 
                  alt={moment.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-black text-[10px]">{moment.title}</p>
                </div>
              </motion.div>
            ))}
            <div className="relative w-36 h-36 flex-shrink-0 rounded-3xl overflow-hidden bg-white/50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Plus className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-[9px] font-black text-gray-400 uppercase mt-2">More</span>
            </div>
          </div>
        </section>

        {/* ═══ SECTION: SHARE YOUR MOMENT ═══ */}
        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-5 rounded-md bg-[#DF2020] flex items-center justify-center text-white">
                <Edit3 className="w-3 h-3" />
            </div>
            <h2 className="font-black text-slate-800 text-xs uppercase tracking-wider">Share Your Moment</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            {/* Dashed Upload Box - Matches SS2 */}
            <div 
              onClick={handleImageClick}
              className="w-full border-2 border-dashed border-pink-200 bg-pink-50/30 rounded-2xl h-24 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-pink-50 transition-colors"
            >
              {selectedImage ? (
                <img src={selectedImage} className="w-full h-full object-cover rounded-2xl" alt="Selected" />
              ) : (
                <>
                    <UploadCloud className="w-6 h-6 text-[#DF2020]" />
                    <p className="text-[10px] font-black text-slate-600">Tap to Upload Photo</p>
                </>
              )}
            </div>

            {/* Story Prompt */}
            <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">YOUR STORY</p>
                <textarea 
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Explain your Indomie vibe..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-300 focus:outline-none focus:border-[#DF2020] transition-all h-16"
                />
            </div>

            {/* Blue Info Box */}
            <div className="bg-[#F0F7FF] border border-[#E0EFFF] rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-[10px] font-bold text-blue-600">
                Submit for <span className="font-extrabold">50 pts</span> & <span className="font-extrabold text-[#DF2020]">Silver Scratch Card!</span>
              </p>
            </div>

            {/* Red Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white font-black text-xs py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
            >
              Submit & Get Reward
              <Ticket className="w-4 h-4" />
            </button>
          </form>
        </motion.section>

        {/* ═══ SECTION: ENGAGEMENT HUB ═══ */}
        <section className="mb-10">
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
            How to participate?
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileTap={{ scale: 0.98 }}
              className="bg-[#FACC15] rounded-2xl p-5 aspect-square flex flex-col justify-between shadow-lg shadow-yellow-100/50 cursor-pointer relative group"
            >
              <div className="flex justify-between items-start">
                <div 
                  onClick={() => navigate("/winners-hub")}
                  className="w-8 h-8 rounded-lg bg-black/10 flex items-center justify-center text-black"
                >
                  <Gift className="w-4 h-4" />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVideo(true);
                  }}
                  className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-black hover:bg-white/40 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                </button>
              </div>
              <div onClick={() => navigate("/winners-hub")}>
                <h3 className="font-black text-slate-900 text-[11px] mb-0.5">Redemption Center</h3>
                <p className="text-[9px] font-bold text-slate-900/40 uppercase">Celebration Carton</p>
              </div>
            </motion.div>

            {/* Share and Win (White/Pink Card) */}
            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/moments")}
              className="bg-white border border-slate-100 rounded-2xl p-5 aspect-square flex flex-col justify-between shadow-xl shadow-slate-200/20 cursor-pointer relative overflow-hidden"
            >
               <div className="z-10">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#DF2020] mb-2">
                        <Flame className="w-4 h-4 fill-[#DF2020]" />
                    </div>
                    <h3 className="font-black text-slate-900 text-[11px] mt-4">Share and Win</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Up to 3M Naira / Wk</p>
               </div>
               {/* Pink Shadow Accent */}
               <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50/50 blur-2xl" />
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
