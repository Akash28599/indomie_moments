import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  MapPin, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  Copy,
  Gift,
  Ticket
} from "lucide-react";
import { AuthModal } from "../../auth/AuthModal";
import momentLogo from "../../../../assets/momentLogo.png";
import { redemptionCenters } from "./constant/location.constant";
import { promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8 } from "../../../../assets";
import { toast } from "react-toastify";

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

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationStep, setLocationStep] = useState<'ask' | 'loading' | 'results'>('ask');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedCity, setSelectedCity] = useState("All");

  const prizes = [
    { id: 1, name: "Smart TV", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Double Fridge", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200" },
    { id: 3, name: "Gaming Console", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=200" }
  ];

  const handleOpenLocationModal = () => {
    setIsLocationModalOpen(true);
    setLocationStep('ask');
  };

  const handleAllowLocation = () => {
    setLocationStep('loading');
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationStep('results');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStep('results');
      },
      () => {
        setLocationError("Location access denied.");
        setLocationStep('results');
      }
    );
  };

  return (
    <div className="h-[100dvh] bg-[#FFF8F0] flex flex-col font-sans overflow-hidden">
      
      {/* ─── Top Banner ─── */}
      <div 
        onClick={handleOpenLocationModal}
        className="animate-blink-yellow py-2 px-4 flex items-center justify-center gap-2 z-50 shadow-md cursor-pointer shrink-0"
      >
        <MapPin className="w-3 h-3 text-white" />
        <span className="text-white text-[8px] md:text-xs font-black uppercase tracking-[0.1em]">
          Find your nearest redemption center
        </span>
      </div>

      <div className="max-w-md md:max-w-6xl mx-auto w-full bg-[#FFF8F0] flex-1 flex flex-col justify-between relative overflow-hidden px-5 md:px-10">
        
        {/* ─── Header ─── */}
        <header className="py-2.5 md:py-8 flex items-center justify-between shrink-0">
          <img src={momentLogo} alt="Indomie Moments" className="h-7 md:h-12 w-auto object-contain" />
        </header>

        {/* ─── Main Content Area ─── */}
        <div className="flex-1 flex flex-col justify-between py-1 overflow-hidden">
          
          <div className="shrink-0 text-center">
            <h1 className="text-2xl md:text-[3.5rem] font-black text-[#DF2020] leading-[1.1] tracking-tight mb-1">
              Share your Indomie moment & win!
            </h1>
            <p className="text-gray-500 text-[10px] md:text-lg font-medium">
              Upload your best moment and win amazing prizes every week.
            </p>
          </div>

          {/* ─── IMAGE CAROUSEL ─── */}
          <div className="relative w-full aspect-[16/9] md:aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white shrink-0">
            <div className="absolute inset-0 flex">
              {FEATURED_MOMENTS.slice(0, 3).map((moment, idx) => (
                <motion.div
                  key={moment.id}
                  animate={{ x: ["0%", "-100%", "-200%", "0%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: idx * 2 }}
                  className="min-w-full h-full relative"
                >
                  <img src={moment.image} alt={moment.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-5">
                    <p className="text-white font-black italic text-xs md:text-2xl uppercase tracking-tighter drop-shadow-lg">
                      #{moment.title.replace(/\s+/g, '')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── PRIZES ─── */}
          <section className="shrink-0">
            <h2 className="text-[8px] md:text-xs font-black text-red-400 uppercase tracking-[0.2em] mb-1.5">
              Grand Prizes to be Won
            </h2>
            <div className="flex gap-3 md:gap-6">
              {prizes.map((prize) => (
                <div key={prize.id} className="flex-1 bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 md:w-24 h-12 md:h-24 rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-4">
                    <img src={prize.image} alt={prize.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-black text-gray-900 text-[10px] md:text-sm">{prize.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* ─── WAYS TO PARTICIPATE ─── */}
          <div className="shrink-0">
            <p className="text-[9px] md:text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-2 text-center">How to Participate</p>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="bg-white p-4 md:p-8 rounded-[2rem] md:rounded-[3.5rem] border-2 border-slate-50 shadow-sm flex flex-col items-center text-center gap-2">
                 <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-[#DF2020] text-white flex items-center justify-center font-black text-xs md:text-3xl shadow-lg">A</div>
                 <p className="text-[9px] md:text-lg font-black text-slate-800 leading-tight uppercase">Drop 10 <br/>wrappers</p>
                 <Gift className="w-5 h-5 md:w-10 md:h-10 text-[#DF2020]" />
              </div>
              <div className="bg-white p-4 md:p-8 rounded-[2rem] md:rounded-[3.5rem] border-2 border-slate-50 shadow-sm flex flex-col items-center text-center gap-2">
                 <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-[#DF2020] text-white flex items-center justify-center font-black text-xs md:text-3xl shadow-lg">B</div>
                 <p className="text-[9px] md:text-lg font-black text-slate-800 leading-tight uppercase">Upload & <br/>Win <span className="text-[#DF2020]">₦10M</span></p>
                 <Ticket className="w-5 h-5 md:w-10 md:h-10 text-[#DF2020]" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Start Button ─── */}
        <div className="shrink-0 pt-3 pb-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full bg-[#DF2020] text-white py-4 md:py-6 rounded-2xl md:rounded-3xl font-black text-sm md:text-2xl shadow-2xl shadow-red-500/40 flex items-center justify-center gap-3"
          >
            Start the Journey
            <Rocket className="w-5 h-5 md:w-8 md:h-8" />
          </motion.button>
        </div>

        {/* ─── Footer ─── */}
        <div className="shrink-0 pb-4 flex items-center justify-center gap-5">
           <a href="/privacy-policy" className="text-[8px] font-black text-gray-400 uppercase tracking-widest hover:text-[#DF2020]">Privacy</a>
           <div className="w-1 h-1 rounded-full bg-gray-200" />
           <a href="/terms" className="text-[8px] font-black text-gray-400 uppercase tracking-widest hover:text-[#DF2020]">Terms</a>
           <div className="w-1 h-1 rounded-full bg-gray-200" />
           <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">© Tolaram 2026</p>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default LandingPage;
