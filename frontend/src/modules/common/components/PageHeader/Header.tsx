import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  selectUser,
  selectAdmin,
  logoutUserThunk,
  logoutAdminThunk,
  clearUser,
  clearAdmin,
} from "@/store";
import { indomieLogo, indomieLogo_Float } from "../../../../assets";
import type { HeaderConfig, HeaderNavigationLink } from "./type";

export interface HeaderProps {
  config: HeaderConfig;
}

export const Header = ({ config }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const admin = useAppSelector(selectAdmin);

  const isAuthenticated = Boolean(user || admin);
  const activeUser = user ?? admin;
  const role = activeUser?.role;

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      if (role === "admin") {
        await dispatch(logoutAdminThunk()).unwrap();
        navigate("/admin/login", { replace: true });
      } else {
        await dispatch(logoutUserThunk()).unwrap();
        navigate("/", { replace: true });
      }
    } catch {
      if (role === "admin") {
        dispatch(clearAdmin());
        navigate("/admin/login", { replace: true });
      } else {
        dispatch(clearUser());
        navigate("/", { replace: true });
      }
    }
  };

  const filteredLinks = config.navigationLinks.filter(
    (link: HeaderNavigationLink) => {
      if (
        !isAuthenticated &&
        (link.path === "/moments" || link.path === "/leaderboard")
      ) {
        return false;
      }
      return true;
    }
  );

  return (
    <>
      <header className={`bg-white sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 h-16 sm:h-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
          <div className="flex justify-between items-center h-full">
            
            {/* Mobile Header (Client UI Match) */}
            <div className="flex w-full items-center justify-between md:hidden py-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-[#b91c1c] font-black text-lg leading-none tracking-tight">
                  Indomie<br/>Moments
                </h1>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#FFD700] hover:bg-[#FACC15] text-black font-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm transition-transform active:scale-95"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to={config.authConfig.loginPath}
                  className="bg-[#DF2020] text-white px-4 py-1.5 rounded-full hover:bg-[#c41e16] transition-all text-xs font-black uppercase tracking-widest shadow-sm"
                >
                  LOGIN
                </Link>
              )}
            </div>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <div className="hidden md:flex justify-between items-center w-full">
              <Link to="/" className="flex items-center gap-3">
                <img src={indomieLogo} alt="Indomie" className="h-10 w-auto" />
              </Link>
              <nav className="flex items-center space-x-10">
                {filteredLinks.map((link: HeaderNavigationLink) => {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`relative py-2 text-sm font-black tracking-widest uppercase transition-all duration-300 group ${
                        isActive(link.path) ? "text-[#DF2020]" : "text-gray-400 hover:text-gray-900"
                      }`}
                    >
                      {link.label}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#DF2020] transition-transform duration-300 origin-left ${
                        isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                      }`} />
                    </Link>
                  );
                })}

                <div className="flex items-center gap-8 pl-8 border-l border-gray-100 h-10">
                  {isAuthenticated ? (
                    <>
                      {config.features?.showUploadButton && (
                        <Link
                          to={config.features.uploadPath!}
                          className="bg-[#DF2020] text-white px-8 py-3 rounded-2xl hover:bg-[#c41e16] transition-all shadow-xl shadow-red-200 text-xs font-black uppercase tracking-widest"
                        >
                          {config.features.uploadLabel}
                        </Link>
                      )}

                      <Link
                        to={role === "admin" ? "/admin" : "/profile"}
                        className="flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200 group-hover:border-[#DF2020] transition-colors">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                        </div>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="bg-[#FFD700] hover:bg-[#FACC15] text-black font-black text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                      <Link
                        to={config.authConfig.loginPath}
                        className="bg-[#DF2020] text-white px-8 py-3 rounded-2xl hover:bg-[#c41e16] transition-all focus:outline-none focus:ring-4 focus:ring-red-100"
                      >
                        LOGIN
                      </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
