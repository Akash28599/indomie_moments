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
 * Features: Redemption Banner, Prizes, CTA – all within 100dvh.
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
        <span className="text-white text-[10px] font-black uppercase tracking-[0.1em]">
          Find your nearest redemption center
        </span>
      </div>

      <div className="max-w-md mx-auto w-full bg-[#FFF8F0] flex-1 flex flex-col relative overflow-hidden">
        
        {/* ─── Header ─── */}
        <header className="px-5 py-4 flex items-center gap-2 shrink-0">
          <img src={indomieLogo} alt="Indomie" className="h-7 w-auto" />
          <h1 className="text-[#DF2020] font-black text-lg tracking-tight">
            Indomie Moments
          </h1>
        </header>

        {/* ─── Image Placeholder (images will be placed here) ─── */}
        <div className="px-5 shrink-0">
          <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-2 border-dashed border-red-200 flex items-center justify-center">
            <p className="text-[10px] font-black text-red-300 uppercase tracking-widest">Promotional Images Here</p>
          </div>
        </div>

        {/* ─── Hero Content ─── */}
        <main className="px-5 flex-1 flex flex-col min-h-0">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[1.8rem] font-black text-[#DF2020] leading-[1.1] tracking-tight mb-1.5" style={{ fontFamily: "'Inter', 'Outfit', system-ui, sans-serif" }}>
              Share your Indomie moment & win!
            </h1>
            
            <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-[300px] mb-4">
              Upload your best Indomie moment, collect likes, and win amazing prizes every week.
            </p>
          </motion.div>

          {/* ─── Grand Prizes Section ─── */}
          <section className="mb-4 shrink-0">
            <h2 className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em] mb-3">
              Grand Prizes to be Won
            </h2>
            
            <div className="flex gap-3 no-scrollbar">
              {prizes.map((prize, idx) => (
                <motion.div
                  key={prize.id}
                  initial={{ x: 15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex-1 bg-white rounded-2xl p-2.5 border border-gray-100 shadow-lg shadow-gray-200/50 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden mb-1.5">
                    <img src={prize.image} alt={prize.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-[10px] mb-0.5">{prize.name}</h3>
                  <span className={`${prize.labelColor} text-[7px] font-black px-1.5 py-0.5 rounded`}>
                    {prize.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── CTA Button ─── */}
          <div className="pb-4 shrink-0 mt-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full bg-[#DF2020] text-white py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-red-500/40 flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              Start the Journey
              <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </main>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-red-50 rounded-full blur-[100px] pointer-events-none -z-10" />
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
            className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl relative"
          >
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-black text-[#DF2020] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Active Centers
            </h2>
            
            <div className="flex gap-2 mb-3">
              <select 
                value={selectedState} 
                onChange={e => { setSelectedState(e.target.value); setSelectedCity("All"); }}
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2"
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Rivers">Rivers</option>
              </select>
              <select 
                value={selectedCity} 
                onChange={e => setSelectedCity(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2"
              >
                <option value="All">All Cities</option>
                <option value="Surulere">Surulere</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Lekki">Lekki</option>
              </select>
            </div>

            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
              {filteredCenters.map((center, i) => (
                <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all group hover:shadow-md">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 text-xs group-hover:text-[#DF2020] transition-colors">{center.name}</h4>
                    <div className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${center.status.includes('Open') ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className="text-[7px] font-black text-gray-800 uppercase tracking-wider">{center.status}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-1.5">{center.address}</p>
                  
                  <div className="bg-white p-2 rounded-lg border border-gray-100 mb-1.5">
                    <p className="text-[8px] text-gray-500 uppercase font-black mb-0.5">Supervisor</p>
                    <p className="text-[10px] font-bold text-gray-800">{center.supervisor}</p>
                    <p className="text-[10px] text-[#DF2020]">{center.phone}</p>
                  </div>

                  <a 
                    href={center.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    View on Google Maps <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
              {filteredCenters.length === 0 && (
                <p className="text-center text-gray-500 text-xs py-4">No centers found in this location.</p>
              )}
            </div>
            <button 
              onClick={() => setIsLocationModalOpen(false)}
              className="w-full mt-4 bg-gray-900 text-white font-black text-xs uppercase py-3 rounded-xl hover:bg-black transition-colors"
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
