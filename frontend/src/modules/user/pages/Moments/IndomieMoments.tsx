import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Music, MapPin, ChevronLeft, Users, Globe } from "lucide-react";
import { useListMomentsQuery, useToggleLikeMutation } from "@/store";
import { useNavigate } from "react-router-dom";

/**
 * IndomieMoments – TikTok-style full-screen vertical feed.
 * "Friends" tab shows friend moments first, "For You" shows all.
 */

const DUMMY_MOMENTS = [
  { id: "d1", userId: "u1", userName: "Chioma Eze", caption: "Nothing beats Indomie after a long day at work 🍜🔥 #IndomieMoments", imageUrl: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=600&h=900", likes: 234, slug: "chioma-late-night", location: "Lagos, Nigeria", isFriend: true },
  { id: "d2", userId: "u2", userName: "Emeka Obi", caption: "Jollof Indomie hits different when you cook it yourself 👨‍🍳✨", imageUrl: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=600&h=900", likes: 189, slug: "emeka-jollof", location: "Abuja, Nigeria", isFriend: true },
  { id: "d3", userId: "u3", userName: "Adaeze Nwosu", caption: "Sunday morning vibes with my special pepper Indomie recipe 🌶️", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d596a1?auto=format&fit=crop&q=80&w=600&h=900", likes: 312, slug: "adaeze-sunday", location: "Port Harcourt", isFriend: false },
  { id: "d4", userId: "u4", userName: "Tunde Bakare", caption: "My kids can't get enough of Indomie! Family moment 🥰", imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=600&h=900", likes: 456, slug: "tunde-family", location: "Ibadan, Nigeria", isFriend: true },
  { id: "d5", userId: "u5", userName: "Ngozi Okafor", caption: "Indomie and egg — the unbeatable combo! 🍳🍜 Who agrees?", imageUrl: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=600&h=900", likes: 567, slug: "ngozi-egg-combo", location: "Enugu, Nigeria", isFriend: false },
  { id: "d6", userId: "u6", userName: "Bola Adeyemi", caption: "Campus life = Indomie life 🎓🍜 3AM study fuel!", imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=600&h=900", likes: 129, slug: "bola-campus", location: "Lagos, Nigeria", isFriend: true },
  { id: "d7", userId: "u7", userName: "Kemi Afolabi", caption: "Added plantain to my Indomie today. Game changer! 🍌🔥", imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600&h=900", likes: 278, slug: "kemi-plantain", location: "Abeokuta", isFriend: false },
  { id: "d8", userId: "u8", userName: "Chidi Nnadi", caption: "Winner winner Indomie dinner! Just redeemed my prize 🏆🎉", imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&q=80&w=600&h=900", likes: 891, slug: "chidi-winner", location: "Kano, Nigeria", isFriend: true },
];

const IndomieMoments = () => {
  const navigate = useNavigate();
  const { data: momentsData, isLoading } = useListMomentsQuery({ limit: 20, offset: 0 });
  const [activeTab, setActiveTab] = useState<"friends" | "foryou">("friends");
  const scrollRef = useRef(null);

  const apiMoments = momentsData?.items || [];
  // Use dummy data as fallback when API has no results
  const allMoments = apiMoments.length > 0 ? apiMoments : DUMMY_MOMENTS;

  const friendMoments = allMoments.filter((m: any) => m.isFriend || false);
  const forYouMoments = allMoments;

  const moments = activeTab === "friends" ? (friendMoments.length > 0 ? friendMoments : forYouMoments) : forYouMoments;

  if (isLoading) {
    return (
      <div className="h-[100dvh] bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#E2231A] border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (moments.length === 0) {
    return (
      <div className="h-[100dvh] bg-black flex flex-col items-center justify-center text-white px-6 text-center">
        <Users className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-black mb-2">No moments yet</h2>
        <p className="text-gray-400 text-sm mb-6">
          {activeTab === "friends" 
            ? "Your friends haven't posted any moments yet. Check out For You!" 
            : "Be the first to share an Indomie moment!"}
        </p>
        {activeTab === "friends" && (
          <button 
            onClick={() => setActiveTab("foryou")}
            className="bg-[#E2231A] text-white px-6 py-3 rounded-full font-bold text-sm"
          >
            Explore For You
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-none" ref={scrollRef}>
      {/* Header Overlays */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-black/20 backdrop-blur-md rounded-full pointer-events-auto"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <div className="flex gap-1 bg-black/30 backdrop-blur-md rounded-full p-1 pointer-events-auto">
          <button 
            onClick={() => setActiveTab("friends")}
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === "friends" 
                ? "bg-white text-black" 
                : "text-white/70 hover:text-white"
            }`}
          >
            <Users className="w-3 h-3 inline mr-1 -mt-0.5" />
            Friends
          </button>
          <button 
            onClick={() => setActiveTab("foryou")}
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === "foryou" 
                ? "bg-white text-black" 
                : "text-white/70 hover:text-white"
            }`}
          >
            <Globe className="w-3 h-3 inline mr-1 -mt-0.5" />
            For You
          </button>
        </div>
        <div className="w-10" />
      </div>

      {moments.map((moment) => (
        <MomentPost key={moment.id} moment={moment} />
      ))}
    </div>
  );
};

interface MomentPostProps {
  moment: any;
}

const MomentPost: React.FC<MomentPostProps> = ({ moment }) => {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [toggleLike] = useToggleLikeMutation();

  const handleDoubleTap = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      if (!liked) {
        setLiked(true);
        toggleLike(moment.id);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
  };

  const shareUrl = `${window.location.origin}/share/${moment.slug || moment.id}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Indomie Moment", text: moment.caption, url: shareUrl });
    } else {
      navigator.clipboard?.writeText(shareUrl);
    }
  };

  return (
    <div className="h-[100dvh] w-full snap-start relative flex flex-col items-center justify-center bg-zinc-900 group">
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
          <button 
            onClick={handleShare}
            className="p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all"
          >
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
          <span className="w-32 truncate">Indomie Jollof Style - Special Remix</span>
        </div>
      </div>

      {/* Progress Bar */}
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
