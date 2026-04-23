import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreVertical, Music, MapPin, ChevronLeft } from "lucide-react";
import { useListMomentsQuery, useToggleLikeMutation } from "@/store";
import { useNavigate } from "react-router-dom";

const IndomieMoments = () => {
  const navigate = useNavigate();
  const { data: momentsData, isLoading } = useListMomentsQuery({ limit: 10, offset: 0 });
  const [activeId, setActiveId] = useState(null);
  const scrollRef = useRef(null);

  const moments = momentsData?.items || [];

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E2231A] border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-none" ref={scrollRef}>
      {/* Header Overlays */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-black/20 backdrop-blur-md rounded-full pointer-events-auto"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <div className="flex gap-4">
          <button className="text-white font-bold border-b-2 border-white pb-1 pointer-events-auto">For You</button>
          <button className="text-white/60 font-bold pointer-events-auto">Following</button>
        </div>
        <div className="w-10" />
      </div>

      {moments.map((moment) => (
        <MomentPost key={moment.id} moment={moment} active={activeId === moment.id} />
      ))}
    </div>
  );
};

interface MomentPostProps {
  moment: any;
  active: boolean;
}

const MomentPost: React.FC<MomentPostProps> = ({ moment, active }) => {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [toggleLike] = useToggleLikeMutation();

  const handleDoubleTap = (e) => {
    if (e.detail === 2) {
      if (!liked) {
        setLiked(true);
        toggleLike(moment.id);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
  };

  return (
    <div className="h-screen w-full snap-start relative flex flex-col items-center justify-center bg-zinc-900 group">
      {/* Media Content */}
      <div className="absolute inset-0 flex items-center justify-center" onClick={handleDoubleTap}>
        <img 
          src={moment.imageUrl} 
          alt={moment.caption}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Double Tap Heart Animation */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute z-40 pointer-events-none"
          >
            <Heart className="w-32 h-32 text-[#E2231A] fill-[#E2231A] drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-30">
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={() => { setLiked(!liked); toggleLike(moment.id); }}
            className={`p-3 rounded-full transition-all ${liked ? 'bg-[#E2231A] text-white' : 'bg-black/20 backdrop-blur-md text-white hover:bg-black/40'}`}
          >
            <Heart className={`w-7 h-7 ${liked ? 'fill-current' : ''}`} />
          </button>
          <span className="text-white text-xs font-bold shadow-sm">{moment.likes + (liked ? 1 : 0)}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all">
            <MessageCircle className="w-7 h-7" />
          </button>
          <span className="text-white text-xs font-bold shadow-sm">24</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all">
            <Share2 className="w-7 h-7" />
          </button>
          <span className="text-white text-xs font-bold shadow-sm">Share</span>
        </div>
      </div>

      {/* Info Content */}
      <div className="absolute bottom-6 left-4 right-20 z-30 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[#FFD700] p-0.5 overflow-hidden bg-white">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${moment.userId}`} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col">
            <h4 className="text-white font-black text-lg flex items-center gap-1">
              {moment.userName || moment.fullName || "Indomie Legend"}
              <span className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-[6px] text-white">✓</span>
              </span>
            </h4>
            {moment.location && (
              <p className="text-white/80 text-xs flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3" /> {moment.location}
              </p>
            )}
          </div>
        </div>

        <p className="text-white text-sm line-clamp-2 pr-4 font-medium leading-relaxed drop-shadow-md">
          {moment.caption}
        </p>

        <div className="flex items-center gap-2 text-white/90 text-xs bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/10">
          <Music className="w-3 h-3 animate-pulse" />
          <marquee className="w-32">Indomie Jollof Style - Special Remix</marquee>
        </div>
      </div>

      {/* Progress Bar (at bottom of each post for feed feel) */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/20 w-full">
        <motion.div 
          className="h-full bg-[#E2231A]"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 15 }}
        />
      </div>
    </div>
  );
};

export default IndomieMoments;
