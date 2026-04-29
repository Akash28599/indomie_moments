import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Play, Package, MapPin, Trophy, Star, ChevronRight, Navigation, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { noodles } from "../../../../assets";

const STEPS = [
  {
    number: "01",
    title: "COLLECT WRAPPERS",
    description:
      'Gather any 10 unique graphics from specially marked noodle packs. Each graphic represents a flavor of victory!',
    icon: <Package className="w-6 h-6" />,
    color: "from-red-50 to-white",
    iconBg: "bg-red-500 text-white",
    border: "border-red-100",
  },
  {
    number: "02",
    title: "VISIT THE CENTER",
    description:
      "Head to your nearest Indomie Redemption Center with your collected wrappers for verification.",
    icon: <MapPin className="w-6 h-6" />,
    color: "from-yellow-50 to-white",
    iconBg: "bg-[#FFD700] text-gray-900",
    border: "border-yellow-100",
  },
  {
    number: "03",
    title: "WIN BIG PRIZES",
    description:
      "Exchange your verified wrappers for amazing prizes – from cash rewards to electronics and more!",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-green-50 to-white",
    iconBg: "bg-green-500 text-white",
    border: "border-green-100",
  },
];

/**
 * WinnersHub – Premium Redemption Center page.
 * Optimized for clarity, trust, and excitement.
 */
const WinnersHub = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedCity, setSelectedCity] = useState("All");

  const [isLocating, setIsLocating] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const centers = [
    { id: 1, state: "Lagos", city: "Surulere", name: "Surulere Hub", address: "45 Adeniran Ogunsanya St, Surulere", supervisor: "Mr. Adebayo", phone: "+234 801 234 5678", mapLink: "https://maps.google.com/?q=45+Adeniran+Ogunsanya+St+Surulere", status: "Open Now", time: "8AM - 6PM", lat: 6.495, lng: 3.351 },
    { id: 2, state: "Lagos", city: "Ikeja", name: "Ikeja Mega Plaza", address: "Obafemi Awolowo Way, Ikeja", supervisor: "Mrs. Chioma", phone: "+234 802 345 6789", mapLink: "https://maps.google.com/?q=Obafemi+Awolowo+Way+Ikeja", status: "Open Now", time: "9AM - 8PM", lat: 6.601, lng: 3.351 },
    { id: 3, state: "Lagos", city: "Lekki", name: "Lekki Phase 1", address: "Admiralty Way, Beside City Dia", supervisor: "Mr. Tunde", phone: "+234 803 456 7890", mapLink: "https://maps.google.com/?q=Admiralty+Way+Lekki", status: "Closing Soon", time: "8AM - 5PM", lat: 6.444, lng: 3.473 }
  ];

  const filteredCenters = centers.filter(c => c.state === selectedState && (selectedCity === "All" || c.city === selectedCity));

  const handleGetNearest = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let nearest = centers[0];
        let minDistance = Infinity;

        centers.forEach(c => {
          const dist = Math.hypot(c.lat - latitude, c.lng - longitude);
          if (dist < minDistance) {
            minDistance = dist;
            nearest = c;
          }
        });

        setSelectedState(nearest.state);
        setSelectedCity(nearest.city);
        setIsLocating(false);
      },
      () => {
        alert("Unable to retrieve your location. Please select manually.");
        setIsLocating(false);
      }
    );
  };

  const handleCopyDetails = (center: any) => {
    const details = `Center: ${center.name}\nAddress: ${center.address}\nSupervisor: ${center.supervisor}\nPhone: ${center.phone}`;
    navigator.clipboard.writeText(details);
    setCopiedId(center.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFFCF8] pb-32 font-sans relative overflow-x-hidden">
      
      {/* ─── Background Mesh Gradients ─── */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-100/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-yellow-100/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-95 border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-[#DF2020] font-black text-[13px] tracking-[0.2em] uppercase">
              Winner's Hub
            </h2>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Redemption</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all active:scale-95 border border-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-8 relative z-10">
        
        {/* VIDEO SECTION - MEGA PREMIUM */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-red-200/50 group border-4 border-white"
        >
          <div className="aspect-[16/10] bg-gray-900 relative">
             <img
              src={noodles}
              alt="Winner's process"
              className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(!showVideo)}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl relative"
              >
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                <Play className="w-8 h-8 text-[#DF2020] ml-1 fill-[#DF2020]" />
              </motion.button>
              <p className="text-white font-black text-xs uppercase tracking-widest mt-6 drop-shadow-md">
                Watch the Winner's Guide
              </p>
            </div>

            {/* Float Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-[#FFD700] text-gray-900 text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                <Star className="w-3 h-3 fill-current" /> 10,000+ Winners
              </span>
            </div>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black leading-[0.95] tracking-tighter mb-4">
            <span className="text-[#DF2020]">How to Win</span>
            <br />
            <span className="text-gray-900">Your Prize</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium max-w-xs mx-auto leading-relaxed">
            Follow these simple steps and claim your rewards instantly at any center.
          </p>
        </div>

        {/* ═══ The 3-Step Process ═══ */}
        <div className="space-y-6 mb-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className={`bg-gradient-to-r ${step.color} rounded-[2rem] p-6 border border-gray-100 shadow-xl shadow-gray-200/20 group hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 ${step.iconBg} rounded-[1.25rem] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Step {step.number}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg tracking-tight mb-2 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ═══ Redemption Centers List ═══ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 italic tracking-tight">Active Centers</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Verified Locations</p>
            </div>
            <button
              onClick={handleGetNearest}
              disabled={isLocating}
              className="text-xs font-bold bg-[#DF2020] text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Navigation className="w-3 h-3" />
              {isLocating ? "Locating..." : "Find Nearest"}
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <select 
              value={selectedState} 
              onChange={e => { setSelectedState(e.target.value); setSelectedCity("All"); }}
              className="flex-1 bg-white border border-gray-200 text-gray-900 text-sm font-bold rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-3 shadow-sm"
            >
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Rivers">Rivers</option>
            </select>
            <select 
              value={selectedCity} 
              onChange={e => setSelectedCity(e.target.value)}
              className="flex-1 bg-white border border-gray-200 text-gray-900 text-sm font-bold rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-3 shadow-sm"
            >
              <option value="All">All Cities</option>
              <option value="Surulere">Surulere</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Lekki">Lekki</option>
            </select>
          </div>

          <div className="grid gap-4">
            {filteredCenters.map((center, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col group hover:border-red-100 transition-all hover:shadow-2xl hover:shadow-red-900/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-[#DF2020] transition-colors shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-base group-hover:text-[#DF2020] transition-all leading-tight">{center.name}</h4>
                      <div className="flex items-center gap-2 mt-1.5">
                         <div className={`w-1.5 h-1.5 rounded-full ${center.status.includes('Open') ? 'bg-green-500' : 'bg-orange-500'}`} />
                         <span className="text-[9px] font-black text-gray-800 uppercase tracking-wider">{center.status}</span>
                         <span className="text-[10px] text-gray-300">•</span>
                         <span className="text-[9px] font-bold text-gray-400 uppercase">{center.time}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#DF2020] transition-all group-hover:translate-x-1 shrink-0" />
                </div>
                
                <p className="text-xs font-medium text-gray-500 mb-4 ml-16">{center.address}</p>

                <div className="ml-16 bg-gray-50 rounded-xl p-3 border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-gray-400 uppercase font-black mb-0.5">Center Supervisor</p>
                    <p className="text-xs font-bold text-gray-900">{center.supervisor}</p>
                    <p className="text-[11px] font-bold text-[#DF2020]">{center.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCopyDetails(center)}
                      className="inline-flex items-center justify-center bg-white border border-gray-200 shadow-sm rounded-lg px-3 py-2 text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      {copiedId === center.id ? <Check className="w-3 h-3 text-green-500 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                      {copiedId === center.id ? "Copied" : "Copy"}
                    </button>
                    <a 
                      href={center.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center bg-[#DF2020] shadow-sm rounded-lg px-3 py-2 text-[10px] font-bold text-white hover:bg-red-700 transition-colors"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredCenters.length === 0 && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm">No centers found in this location yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-40">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => navigate("/leaderboard")}
              className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-2xl shadow-gray-400 flex items-center justify-center gap-3 hover:bg-gray-800"
            >
              Check Winners Hub <Trophy className="w-5 h-5 text-[#FFD700]" />
            </button>
          </div>
        </div>
      </div>

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

export default WinnersHub;
