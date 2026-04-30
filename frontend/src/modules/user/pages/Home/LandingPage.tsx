import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Rocket, 
  ChevronRight,
  Star,
  X,
  Copy,
  CheckCircle2,
  Gift
} from "lucide-react";
import { AuthModal } from "../../auth/AuthModal";
import { momentLogo, promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8 } from "../../../../assets";

const PROMO_IMAGES = [promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8];

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * LandingPage – Single viewport, no-scroll mobile-first landing.
 * Optimized for Desktop with a premium side-by-side layout.
 */
const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedCity, setSelectedCity] = useState("All");

  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);
  const [locationStep, setLocationStep] = useState<'ask' | 'loading' | 'results'>('ask');
  const [promoIndex, setPromoIndex] = useState(0);

  // Auto-cycle promo images
  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMO_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const centers = [
    { state: "Lagos", city: "Surulere", name: "Surulere Hub", address: "45 Adeniran Ogunsanya St, Surulere", supervisor: "Mr. Adebayo", phone: "+234 801 234 5678", mapLink: "https://maps.google.com/?q=45+Adeniran+Ogunsanya+St+Surulere", status: "Open Now", time: "8AM - 6PM", lat: 6.4965, lng: 3.3486 },
    { state: "Lagos", city: "Ikeja", name: "Ikeja Mega Plaza", address: "Obafemi Awolowo Way, Ikeja", supervisor: "Mrs. Chioma", phone: "+234 802 345 6789", mapLink: "https://maps.google.com/?q=Obafemi+Awolowo+Way+Ikeja", status: "Open Now", time: "9AM - 8PM", lat: 6.6018, lng: 3.3515 },
    { state: "Lagos", city: "Lekki", name: "Lekki Phase 1", address: "Admiralty Way, Beside City Dia", supervisor: "Mr. Tunde", phone: "+234 803 456 7890", mapLink: "https://maps.google.com/?q=Admiralty+Way+Lekki", status: "Closing Soon", time: "8AM - 5PM", lat: 6.4698, lng: 3.5852 }
  ];

  let processedCenters = [...centers];
  if (userLocation) {
    processedCenters = processedCenters.map(c => ({
      ...c,
      distance: getDistance(userLocation.lat, userLocation.lng, c.lat, c.lng)
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  } else {
    processedCenters = processedCenters.filter(c => c.state === selectedState && (selectedCity === "All" || c.city === selectedCity));
  }

  const handleCopy = (phone: string, name: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhoneId(name);
    setTimeout(() => setCopiedPhoneId(null), 2000);
  };

  const handleOpenLocationModal = () => {
    setIsLocationModalOpen(true);
    // Always start at the 'ask' step unless we already have location
    if (userLocation) {
      setLocationStep('results');
    } else {
      setLocationStep('ask');
    }
  };

  const handleAllowLocation = () => {
    setLocationStep('loading');
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          setIsLoadingLocation(false);
          setLocationError(null);
          setLocationStep('results');
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Location access denied or unavailable.");
          setIsLoadingLocation(false);
          setLocationStep('results');
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoadingLocation(false);
      setLocationStep('results');
    }
  };

  const handleChooseManually = () => {
    setUserLocation(null);
    setLocationError(null);
    setLocationStep('results');
  };

  const resetLocation = () => {
    setUserLocation(null);
    setLocationError(null);
  };

  const prizes = [
    { id: 1, name: "Smart TV", label: "WEEKLY", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=200&h=200", bg: "bg-blue-50", labelColor: "bg-yellow-100 text-yellow-700" },
    { id: 2, name: "Double Fridge", label: "MEGA", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=200&h=200", bg: "bg-cyan-50", labelColor: "bg-yellow-100 text-yellow-700" },
    { id: 3, name: "Gaming Console", label: "PROMO", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=200&h=200", bg: "bg-purple-50", labelColor: "bg-yellow-100 text-yellow-700" }
  ];

  return (
    <div className="h-[100dvh] bg-[#FFF8F0] flex flex-col font-sans selection:bg-red-100 overflow-hidden">
      
      {/* ─── Top Notification Banner ─── */}
      <div 
        onClick={handleOpenLocationModal}
        className="animate-blink-yellow py-2.5 px-4 flex items-center justify-center gap-2 z-50 shadow-md cursor-pointer shrink-0"
      >
        <MapPin className="w-3.5 h-3.5 text-white animate-bounce" />
        <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.1em]">
          Find your nearest redemption center
        </span>
      </div>

      <div className="max-w-md md:max-w-6xl mx-auto w-full bg-[#FFF8F0] flex-1 flex flex-col relative overflow-hidden">
        
        {/* ─── Header ─── */}
        <header className="px-5 md:px-10 py-4 md:py-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <img src={momentLogo} alt="Indomie Moments" className="h-8 md:h-12 w-auto object-contain" />
          </div>
          {/* Desktop Login Button */}
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden md:flex bg-white text-[#DF2020] border-2 border-[#DF2020] px-6 py-2 rounded-xl font-black text-sm hover:bg-[#DF2020] hover:text-white transition-all shadow-sm"
          >
            Login / Sign Up
          </button>
        </header>

        {/* Promotional Image / Video Area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="shrink-0 px-5 md:px-10 mb-4 md:mb-10"
        >
          <div className="w-full h-24 md:h-72 rounded-3xl overflow-hidden relative bg-black shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={promoIndex}
                src={PROMO_IMAGES[promoIndex]}
                alt={`Indomie Promo ${promoIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </AnimatePresence>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {/* Dots indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {PROMO_IMAGES.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === promoIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── Hero Content Area ─── */}
        <div className="flex-1 flex flex-col md:flex-row px-5 md:px-10 py-6 gap-8 md:gap-16">
          
          {/* LEFT SIDE: Text & CTA */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-xl md:text-[3.5rem] font-black text-[#DF2020] leading-[1.1] tracking-tight mb-1 md:mb-6" style={{ fontFamily: "'Inter', 'Outfit', system-ui, sans-serif" }}>
                Share your Indomie moment & win!
              </h1>
              
              <p className="text-gray-500 text-[10px] md:text-lg font-medium leading-relaxed mb-2 md:mb-10">
                Upload your best moment and win amazing prizes every week.
              </p>

              {/* ═══ SECTION: HOW TO PARTICIPATE (Pick Your Way) ═══ */}
              <div className="mb-2 md:mb-12">
                <p className="text-[8px] md:text-xs font-black text-[#DF2020] uppercase tracking-[0.2em] mb-1">
                  2 Ways to Participate
                </p>
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  {/* OPTION A: Redemption Center */}
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-3 md:p-6 flex flex-col items-center text-center gap-1.5 shadow-sm">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#DF2020] text-white font-black text-[9px] md:text-sm flex items-center justify-center">A</div>
                    <p className="font-black text-slate-800 text-[7px] md:text-[11px] leading-tight text-center">Submit 10 wrappers at the Center</p>
                    <Gift className="w-3.5 h-3.5 text-[#DF2020]" />
                  </div>

                  {/* OPTION B: Upload Moments */}
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-3 md:p-6 flex flex-col items-center text-center gap-0.5 shadow-sm">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#DF2020] text-white font-black text-[9px] md:text-sm flex items-center justify-center">B</div>
                    <p className="font-black text-slate-800 text-[7px] md:text-[11px] leading-tight">Upload & win up to</p>
                    <p className="text-[#DF2020] font-black text-xs md:text-xl leading-none">₦10M</p>
                    <p className="text-[5px] md:text-[8px] font-bold text-gray-400 uppercase">Weekly</p>
                  </div>
                </div>
              </div>

              {/* Desktop CTA */}
              <div className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-[#DF2020] text-white py-5 px-10 rounded-2xl font-black text-xl shadow-xl shadow-red-500/40 flex items-center gap-4 group"
                >
                  Start the Journey
                  <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Images & Prizes */}
          <div className="flex-1 flex flex-col justify-center min-h-0">
            {/* Prizes Section */}
            <section className="shrink-0">
              <h2 className="text-[8px] md:text-xs font-black text-red-400 uppercase tracking-[0.2em] mb-2">
                Grand Prizes to be Won
              </h2>
              
              <div className="flex gap-3 md:gap-6">
                {prizes.map((prize, idx) => (
                  <motion.div
                    key={prize.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex-1 bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 border border-gray-100 shadow-lg shadow-gray-200/50 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-default"
                  >
                    <div className="w-10 md:w-24 h-10 md:h-24 rounded-xl md:rounded-2xl overflow-hidden mb-1.5 md:mb-4 shadow-inner">
                      <img src={prize.image} alt={prize.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[10px] md:text-sm mb-1 md:mb-2">{prize.name}</h3>
                    <span className={`${prize.labelColor} text-[6px] md:text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider`}>
                      {prize.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Mobile-only CTA (pinned to bottom with clearance) */}
        <div className="md:hidden px-5 pb-8 mt-auto">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full bg-[#DF2020] text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-red-500/40 flex items-center justify-center gap-3"
          >
            Start the Journey
            <Rocket className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 -right-20 w-64 md:w-96 h-64 md:h-96 bg-red-50 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-yellow-50 rounded-full blur-[100px] pointer-events-none -z-10" />
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm md:max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative"
          >
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ── STEP 1: ASK PERMISSION ── */}
            {locationStep === 'ask' && (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 border-2 border-red-100">
                  <MapPin className="w-10 h-10 text-[#DF2020]" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">
                  Allow your location
                </h2>
                <p className="text-sm text-gray-500 font-medium mb-8 px-4 leading-relaxed">
                  Allow location access to find the <span className="text-[#DF2020] font-bold">nearest redemption center</span> to you. You can also choose manually.
                </p>

                <button
                  onClick={handleAllowLocation}
                  className="w-full bg-[#DF2020] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-red-200 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mb-3"
                >
                  <MapPin className="w-4 h-4" />
                  Allow Location
                </button>
                <button
                  onClick={handleChooseManually}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                  Choose Manually
                </button>
              </div>
            )}

            {/* ── STEP 2: LOADING SPINNER ── */}
            {locationStep === 'loading' && (
              <div className="flex flex-col items-center justify-center py-14">
                <div className="w-14 h-14 border-4 border-red-100 border-t-[#DF2020] rounded-full animate-spin mb-6" />
                <p className="text-base font-black text-gray-900 mb-1">Finding nearest centers...</p>
                <p className="text-xs text-gray-400 font-medium">Please allow location access in your browser</p>
              </div>
            )}

            {/* ── STEP 3: RESULTS ── */}
            {locationStep === 'results' && (
              <>
                <h2 className="text-xl font-black text-[#DF2020] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Active Centers
                </h2>

                {(!userLocation) && (
                  <div className="flex gap-3 mb-4">
                    <select 
                      value={selectedState} 
                      onChange={e => { setSelectedState(e.target.value); setSelectedCity("All"); }}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-3"
                    >
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Rivers">Rivers</option>
                    </select>
                    <select 
                      value={selectedCity} 
                      onChange={e => setSelectedCity(e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-3"
                    >
                      <option value="All">All Cities</option>
                      <option value="Surulere">Surulere</option>
                      <option value="Ikeja">Ikeja</option>
                      <option value="Lekki">Lekki</option>
                    </select>
                  </div>
                )}

                {locationError && (
                  <p className="text-xs text-orange-500 font-bold mb-4 bg-orange-50 p-3 rounded-xl border border-orange-100">
                    {locationError} Please choose manually below.
                  </p>
                )}

                {userLocation && (
                  <div className="flex justify-between items-center mb-4 bg-green-50 p-3 rounded-xl border border-green-100">
                    <p className="text-xs text-green-700 font-bold">📍 Showing nearest centers</p>
                    <button 
                      onClick={resetLocation}
                      className="text-xs text-green-700 underline font-black hover:text-green-800 transition-colors"
                    >
                      Choose manually
                    </button>
                  </div>
                )}

                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {processedCenters.map((center, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all group hover:shadow-md relative">
                      {userLocation && i === 0 && (
                        <div className="absolute -top-2 -right-2 bg-[#DF2020] text-white text-[9px] font-black uppercase px-2 py-1 rounded-full shadow-md">
                          Nearest
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#DF2020] transition-colors">{center.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {center.distance !== undefined && (
                            <span className="text-[10px] font-bold text-gray-500 mr-1.5 bg-gray-200 px-1.5 py-0.5 rounded-md">
                              {center.distance.toFixed(1)} km
                            </span>
                          )}
                          <div className={`w-2 h-2 rounded-full ${center.status.includes('Open') ? 'bg-green-500' : 'bg-orange-500'}`} />
                          <span className="text-[8px] font-black text-gray-800 uppercase tracking-wider">{center.status}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{center.address}</p>
                      
                      <div className="bg-white p-3 rounded-xl border border-gray-100 mb-2 text-xs">
                        <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Supervisor</p>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-gray-800">{center.supervisor}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-[#DF2020] font-black">{center.phone}</p>
                            <button 
                              onClick={() => handleCopy(center.phone, center.name)}
                              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                              title="Copy Phone"
                            >
                              {copiedPhoneId === center.name ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <a 
                        href={center.mapLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline mt-1"
                      >
                        View on Google Maps <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                  {processedCenters.length === 0 && (
                    <p className="text-center text-gray-500 text-sm py-8">No centers found in this location.</p>
                  )}
                </div>
              </>
            )}

            {locationStep !== 'ask' && (
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="w-full mt-6 bg-gray-900 text-white font-black text-xs uppercase py-4 rounded-2xl hover:bg-black transition-colors"
              >
                Got it
              </button>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
