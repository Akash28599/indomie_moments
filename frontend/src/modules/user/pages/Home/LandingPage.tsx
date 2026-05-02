import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, MapPin, X, Gift, Ticket } from "lucide-react";
import { AuthModal } from "../../auth/AuthModal";
import momentLogo from "../../../../assets/momentLogo.png";
import indomieLogo_Float from "../../../../assets/indomieLogo_Float.png";
import { redemptionCenters } from "./constant/location.constant";
import { promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8, gift1, gift2, gift3, gift4, gift5, gift6 } from "../../../../assets";

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

const prizes = [
  { id: 1, name: "Smart TV", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=200" },
  { id: 2, name: "Double Fridge", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200" },
  { id: 3, name: "Gaming Console", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=200" },
];

const GIFT_IMAGES = [
  { id: 1, src: gift1, alt: "Gift 1" },
  { id: 2, src: gift2, alt: "Gift 2" },
  { id: 3, src: gift3, alt: "Gift 3" },
  { id: 4, src: gift4, alt: "Gift 4" },
  { id: 5, src: gift5, alt: "Gift 5" },
  { id: 6, src: gift6, alt: "Gift 6" },
];

const HeartDecor = ({ className = "", opacity = 0.15 }: { className?: string; opacity?: number }) => (
  <svg className={className} viewBox="0 0 32 29" fill="currentColor" opacity={opacity}>
    <path d="M16 29l-2.2-2C5.5 19.8 0 14.9 0 9 0 4 3.6 0 8 0c2.7 0 5.3 1.3 7 3.3C16.7 1.3 19.3 0 22 0c4.4 0 8 4 8 9 0 5.9-5.5 10.8-13.8 18L16 29z" />
  </svg>
);

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationStep, setLocationStep] = useState<"ask" | "loading" | "results">("ask");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedCity, setSelectedCity] = useState("All");

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_MOMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenLocationModal = () => {
    setIsLocationModalOpen(true);
    setLocationStep("ask");
  };

  const handleAllowLocation = () => {
    setLocationStep("loading");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationStep("results");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocationStep("results"); },
      () => { setLocationError("Location access denied."); setLocationStep("results"); }
    );
  };

  return (
    <div className="h-[100dvh] md:h-auto md:min-h-[100dvh] flex flex-col font-sans overflow-hidden md:overflow-y-auto relative"
      style={{ background: "linear-gradient(180deg, #DF2020 0%, #C41818 15%, #8B1530 35%, #1D3A99 65%, #162B6E 85%, #0D1B4A 100%)" }}>

      {/* Subtle radial glow overlays for depth */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(223,32,32,0.2) 0%, transparent 50%)" }} />
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(22,43,110,0.3) 0%, transparent 50%)" }} />

      {/* ── TOP BANNER ── */}
      <div onClick={handleOpenLocationModal}
        className="animate-blink-yellow py-1.5 sm:py-2 px-4 flex items-center justify-center gap-2 z-50 shadow-md cursor-pointer shrink-0 relative">
        <MapPin className="w-3 h-3 text-white" />
        <span className="text-white text-[8px] sm:text-xs font-black uppercase tracking-[0.12em]">
          Find your nearest redemption center
        </span>
      </div>

      {/* ── HERO SECTION (transparent — unified gradient shows through) ── */}
      <section className="relative overflow-hidden shrink-0 flex-[0_0_auto] z-10"
        style={{ height: "52dvh" }}>

        {/* Decorative Hearts */}
        <HeartDecor className="absolute top-[10%] left-[4%] w-8 sm:w-14 text-pink-400 animate-float" opacity={0.12} />
        <HeartDecor className="absolute top-[30%] right-[6%] w-6 sm:w-10 text-pink-500 animate-float" opacity={0.1} />
        <HeartDecor className="absolute bottom-[25%] left-[8%] w-7 sm:w-12 text-pink-400" opacity={0.08} />
        <HeartDecor className="absolute top-[55%] right-[3%] w-5 sm:w-8 text-pink-300 animate-float" opacity={0.15} />
        <HeartDecor className="absolute bottom-[10%] right-[15%] w-10 sm:w-16 text-pink-400" opacity={0.06} />

        {/* Floating Indomie Packs — horizontal at sides, top on mobile */}
        <img src={indomieLogo_Float} alt="" className="absolute left-0 top-[5%] sm:top-[10%] w-14 sm:w-20 md:w-28 lg:w-36 opacity-90 pointer-events-none z-10 drop-shadow-2xl" />
        <img src={indomieLogo_Float} alt="" className="absolute right-0 top-[5%] sm:top-[10%] w-14 sm:w-20 md:w-28 lg:w-36 opacity-90 pointer-events-none z-10 drop-shadow-2xl" />

        <div className="relative z-20 max-w-3xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 h-full flex flex-col justify-between py-3 sm:py-5">
          {/* Logo */}
          <img src={momentLogo} alt="My Indomie Moments" className="h-8 sm:h-12 md:h-14 w-auto object-contain drop-shadow-lg shrink-0" />

          {/* Hero Text */}
          <div className="text-center shrink-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight drop-shadow-lg">
              Share your Indomie moment & win!
            </h1>
            <p className="text-white/60 text-[9px] sm:text-sm font-medium mt-1 sm:mt-2">
              Upload your best moment and win amazing prizes every week.
            </p>
          </div>

          {/* Carousel Image */}
          <div className="relative w-full max-w-xl md:w-[60vw] md:max-w-none mx-auto aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-[3px] border-white/20 shrink-0">
            <AnimatePresence mode="wait">
              <motion.img key={activeIndex} src={FEATURED_MOMENTS[activeIndex].image}
                alt={FEATURED_MOMENTS[activeIndex].title}
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }}
                className="w-full h-full object-cover" />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 sm:bottom-4 left-3 sm:left-5">
              <p className="text-white font-black italic text-xs sm:text-lg md:text-xl uppercase tracking-tight drop-shadow-lg">
                #{FEATURED_MOMENTS[activeIndex].title.replace(/\s+/g, "")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOWER SECTION (transparent — unified gradient continues) ── */}
      <section className="flex-1 min-h-0 relative flex flex-col justify-between px-4 sm:px-6 py-3 sm:py-5 overflow-y-auto no-scrollbar z-10">

        <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col justify-between flex-1 min-h-0 gap-2 sm:gap-3">

          {/* Gifts Gallery — Scrollable */}
          <div className="shrink-0">
            <h2 className="text-[8px] sm:text-xs font-black text-white/60 uppercase tracking-[0.2em] mb-2 text-center flex items-center justify-center gap-2">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
              Grand Prizes to be Won
              <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
            </h2>
            <div className="relative overflow-hidden">
              {/* Edge fade gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(29,58,153,0.8), transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(29,58,153,0.8), transparent)" }} />
              <div
                className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {GIFT_IMAGES.map((gift) => (
                  <div
                    key={gift.id}
                    className="snap-center shrink-0 w-[100px] sm:w-[140px] md:w-[160px] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg shadow-black/20 bg-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={gift.src}
                      alt={gift.alt}
                      className="w-full h-[100px] sm:h-[140px] md:h-[160px] object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How to Participate */}
          <div className="shrink-0 text-center">
            <p className="text-[7px] sm:text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-2">
              How to Participate
            </p>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-md mx-auto">
              <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg shadow-black/20 flex flex-col items-center text-center gap-1 sm:gap-2">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#DF2020] text-white flex items-center justify-center font-black text-[10px] sm:text-lg shadow-md">A</div>
                <p className="text-[8px] sm:text-xs font-black text-slate-800 leading-tight uppercase">Drop 10<br />wrappers</p>
                <p className="text-[6px] sm:text-[9px] font-medium text-gray-400">and win your test menu!</p>
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#DF2020]" />
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg shadow-black/20 flex flex-col items-center text-center gap-1 sm:gap-2">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#DF2020] text-white flex items-center justify-center font-black text-[10px] sm:text-lg shadow-md">B</div>
                <p className="text-[8px] sm:text-xs font-black text-slate-800 leading-tight uppercase">Upload & <span className="text-[#DF2020]">Win</span></p>
                <p className="text-base sm:text-2xl font-black text-[#DF2020] leading-none">₦10M</p>
                <div className="flex gap-1"><Gift className="w-4 h-4 sm:w-5 sm:h-5 text-[#DF2020]" /><Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-[#DF2020]" /></div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="shrink-0 max-w-md mx-auto w-full">
            <motion.button whileTap={{ scale: 0.98 }} onClick={() => setIsAuthModalOpen(true)}
              className="w-full bg-white text-[#DF2020] py-3 sm:py-4 rounded-full font-black text-xs sm:text-base shadow-2xl shadow-black/30 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border-2 border-white/50">
              Start the Journey <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>

          {/* Footer */}
          <div className="shrink-0 flex items-center justify-center gap-3 sm:gap-5">
            <a href="/privacy-policy" className="text-[7px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white/80">Privacy</a>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <a href="/terms" className="text-[7px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white/80">Terms</a>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <p className="text-[7px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">© Tolaram 2026</p>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Location Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsLocationModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-gray-900">📍 Redemption Centers</h3>
                <button onClick={() => setIsLocationModalOpen(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              {locationStep === "ask" && (
                <div className="space-y-4">
                  <button onClick={handleAllowLocation} className="w-full bg-[#DF2020] text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg">
                    <MapPin className="w-4 h-4" /> Use My Location
                  </button>
                  <div className="flex items-center gap-3"><div className="flex-1 h-px bg-gray-200" /><span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">or browse</span><div className="flex-1 h-px bg-gray-200" /></div>
                  <div className="flex gap-2">
                    <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity("All"); }}
                      className="flex-1 bg-gray-50 border border-gray-200 text-sm font-bold rounded-xl p-3">
                      <option value="Lagos">Lagos</option><option value="Abuja">Abuja</option><option value="Rivers">Rivers</option>
                    </select>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 text-sm font-bold rounded-xl p-3">
                      <option value="All">All Cities</option><option value="Surulere">Surulere</option><option value="Ikeja">Ikeja</option><option value="Lekki">Lekki</option>
                    </select>
                  </div>
                  <button onClick={() => setLocationStep("results")} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm">Show Centers</button>
                </div>
              )}
              {locationStep === "loading" && (
                <div className="flex flex-col items-center py-12 gap-4">
                  <div className="w-10 h-10 border-4 border-red-100 border-t-[#DF2020] rounded-full animate-spin" />
                  <p className="text-sm font-bold text-gray-500">Finding nearby centers...</p>
                </div>
              )}
              {locationStep === "results" && (
                <div className="space-y-4 mt-4">
                  {locationError && <div className="bg-red-50 p-3 rounded-xl text-xs text-red-600 font-bold">{locationError}</div>}
                  {redemptionCenters.filter((c) => c.state === selectedState && (selectedCity === "All" || c.city === selectedCity)).map((center, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <h4 className="font-black text-gray-900 text-sm">{center.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{center.address}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${center.status.includes("Open") ? "bg-green-500" : "bg-orange-500"}`} />
                        <span className="text-[9px] font-black text-gray-600 uppercase">{center.status}</span>
                        <span className="text-[9px] text-gray-400 font-bold">{center.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
