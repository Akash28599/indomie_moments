import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Rocket, 
  ChevronRight,
  Star,
  X
} from "lucide-react";
import { AuthModal } from "../../auth/AuthModal";
import { indomieLogo } from "../../../../assets";

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

  const centers = [
    { state: "Lagos", city: "Surulere", name: "Surulere Hub", address: "45 Adeniran Ogunsanya St, Surulere", supervisor: "Mr. Adebayo", phone: "+234 801 234 5678", mapLink: "https://maps.google.com/?q=45+Adeniran+Ogunsanya+St+Surulere", status: "Open Now", time: "8AM - 6PM" },
    { state: "Lagos", city: "Ikeja", name: "Ikeja Mega Plaza", address: "Obafemi Awolowo Way, Ikeja", supervisor: "Mrs. Chioma", phone: "+234 802 345 6789", mapLink: "https://maps.google.com/?q=Obafemi+Awolowo+Way+Ikeja", status: "Open Now", time: "9AM - 8PM" },
    { state: "Lagos", city: "Lekki", name: "Lekki Phase 1", address: "Admiralty Way, Beside City Dia", supervisor: "Mr. Tunde", phone: "+234 803 456 7890", mapLink: "https://maps.google.com/?q=Admiralty+Way+Lekki", status: "Closing Soon", time: "8AM - 5PM" }
  ];

  const filteredCenters = centers.filter(c => c.state === selectedState && (selectedCity === "All" || c.city === selectedCity));

  const prizes = [
    { id: 1, name: "Smart TV", label: "WEEKLY", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=200&h=200", bg: "bg-blue-50", labelColor: "bg-yellow-100 text-yellow-700" },
    { id: 2, name: "Double Fridge", label: "MEGA", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=200&h=200", bg: "bg-cyan-50", labelColor: "bg-yellow-100 text-yellow-700" },
    { id: 3, name: "Gaming Console", label: "PROMO", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=200&h=200", bg: "bg-purple-50", labelColor: "bg-yellow-100 text-yellow-700" }
  ];

  return (
    <div className="h-[100dvh] bg-[#FFF8F0] flex flex-col font-sans selection:bg-red-100 overflow-hidden">
      
      {/* ─── Top Notification Banner ─── */}
      <div 
        onClick={() => setIsLocationModalOpen(true)}
        className="bg-[#DF2020] py-2.5 px-4 flex items-center justify-center gap-2 z-50 shadow-md cursor-pointer hover:bg-red-700 transition-colors shrink-0"
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
            <img src={indomieLogo} alt="Indomie" className="h-7 md:h-10 w-auto" />
            <h1 className="text-[#DF2020] font-black text-lg md:text-2xl tracking-tight">
              Indomie Moments
            </h1>
          </div>
          {/* Desktop Login Button */}
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden md:flex bg-white text-[#DF2020] border-2 border-[#DF2020] px-6 py-2 rounded-xl font-black text-sm hover:bg-[#DF2020] hover:text-white transition-all shadow-sm"
          >
            Login / Sign Up
          </button>
        </header>

        {/* ─── Hero Content Area ─── */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 px-5 md:px-10 gap-8 md:gap-16">
          
          {/* LEFT SIDE: Text & CTA */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-[1.8rem] md:text-[3.5rem] font-black text-[#DF2020] leading-[1.1] tracking-tight mb-3 md:mb-6" style={{ fontFamily: "'Inter', 'Outfit', system-ui, sans-serif" }}>
                Share your Indomie moment & win!
              </h1>
              
              <p className="text-gray-500 text-xs md:text-lg font-medium leading-relaxed mb-6 md:mb-10">
                Upload your best Indomie moment, collect likes, and win amazing prizes every week. Join thousands of fans sharing their love for Indomie!
              </p>

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
            {/* Promotional Image / Video Area */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="shrink-0 mb-6 md:mb-10"
            >
              <div className="w-full h-36 md:h-64 rounded-3xl bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-2 border-dashed border-red-200 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" />
                <p className="text-[10px] md:text-sm font-black text-red-400 uppercase tracking-[0.3em] relative z-10">Promotional Showcase</p>
              </div>
            </motion.div>

            {/* Prizes Section */}
            <section className="shrink-0">
              <h2 className="text-[9px] md:text-xs font-black text-red-400 uppercase tracking-[0.2em] mb-4">
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
                    <div className="w-14 md:w-24 h-14 md:h-24 rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-4 shadow-inner">
                      <img src={prize.image} alt={prize.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-[10px] md:text-sm mb-1 md:mb-2">{prize.name}</h3>
                    <span className={`${prize.labelColor} text-[7px] md:text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-wider`}>
                      {prize.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Mobile-only CTA (pinned to bottom) */}
        <div className="md:hidden px-5 pb-6 mt-auto">
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
            <h2 className="text-xl font-black text-[#DF2020] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Active Centers
            </h2>
            
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

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {filteredCenters.map((center, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all group hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#DF2020] transition-colors">{center.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${center.status.includes('Open') ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className="text-[8px] font-black text-gray-800 uppercase tracking-wider">{center.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{center.address}</p>
                  
                  <div className="bg-white p-3 rounded-xl border border-gray-100 mb-2 text-xs">
                    <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Supervisor</p>
                    <div className="flex justify-between">
                      <p className="font-bold text-gray-800">{center.supervisor}</p>
                      <p className="text-[#DF2020] font-black">{center.phone}</p>
                    </div>
                  </div>

                  <a 
                    href={center.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                  >
                    View on Google Maps <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
              {filteredCenters.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-8">No centers found in this location.</p>
              )}
            </div>
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="w-full mt-6 bg-gray-900 text-white font-black text-xs uppercase py-4 rounded-2xl hover:bg-black transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
