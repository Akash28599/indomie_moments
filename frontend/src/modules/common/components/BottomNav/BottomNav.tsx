import { useLocation, useNavigate } from "react-router-dom";
import { Camera, BarChart2, Film } from "lucide-react";

/**
 * BottomNav – Mobile bottom navigation bar.
 * Matches Client UI SS2: Upload (red circle) and Leaderboard.
 */
const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] h-16">
      <div className="flex items-center justify-around h-full px-6 max-w-lg mx-auto">

        {/* Upload (Red Circle) */}
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-90 ${
            isActive("/") ? "bg-[#DF2020]" : "bg-[#DF2020] opacity-80"
          }`}>
            <Camera className="w-4 h-4" />
          </div>
          <span className={`text-[8px] font-black tracking-widest uppercase ${
            isActive("/") ? "text-[#DF2020]" : "text-gray-400"
          }`}>Upload</span>
        </button>

        {/* Moments */}
        <button
          onClick={() => navigate("/moments")}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${
            isActive("/moments") ? "text-[#DF2020] bg-red-50" : "text-gray-400 bg-gray-50"
          }`}>
            <Film className="w-4 h-4" />
          </div>
          <span className={`text-[8px] font-black tracking-widest uppercase ${
            isActive("/moments") ? "text-[#DF2020]" : "text-gray-400"
          }`}>Moments</span>
        </button>

        {/* Leaderboard */}
        <button
          onClick={() => navigate("/leaderboard")}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${
            isActive("/leaderboard") ? "text-[#DF2020] bg-red-50" : "text-gray-400 bg-gray-50"
          }`}>
            <BarChart2 className="w-4 h-4" />
          </div>
          <span className={`text-[8px] font-black tracking-widest uppercase ${
            isActive("/leaderboard") ? "text-[#DF2020]" : "text-gray-400"
          }`}>Leaderboard</span>
        </button>

      </div>

      {/* Safe area for iOS notch */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default BottomNav;
