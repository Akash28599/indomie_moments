import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
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
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const admin = useAppSelector(selectAdmin);

  const isAuthenticated = Boolean(user || admin);
  const activeUser = user ?? admin;
  const role = activeUser?.role;

  const isActive = (path: string) => location.pathname === path;

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
    },
  );

  return (
    <>
      <Link
        to="/"
        className="md:flex hidden items-center gap-3  z-99 top-0 fixed"
      >
        <img src={indomieLogo_Float} alt="Indomie" className="h-25 w-auto" />
      </Link>

      <header className="bg-white shadow-md sticky top-0 z-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 md:opacity-0 opacity-100"
            >
              <img src={indomieLogo} alt="Indomie" className="h-22 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {filteredLinks.map((link: HeaderNavigationLink) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 hover:text-[#E2231A] transition-colors ${
                      isActive(link.path)
                        ? "text-[#E2231A] font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {Icon && <Icon sx={{ fontSize: 16 }} />}
                    {link.label}
                  </Link>
                );
              })}

              {
                isAuthenticated && (
                  <div className="flex items-center gap-4">
                    {config.features?.showUploadButton && (
                      <Link
                        to={config.features.uploadPath!}
                        className="bg-[#E2231A] text-white px-6 py-2 rounded-full hover:bg-[#c41e16]"
                      >
                        {config.features.uploadLabel}
                      </Link>
                    )}

                    {activeUser && (
                      <Link
                        to={role === "admin" ? "/admin" : "/profile"}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#E2231A] transition-colors"
                      >
                        <PersonIcon sx={{ fontSize: 16 }} />
                        <span className="text-sm font-semibold">
                          {activeUser.fullName || activeUser.email}
                        </span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2  text-gray-600 px-5 py-2 rounded-full font-bold text-sm cursor-pointer"
                    >
                      <LogoutIcon sx={{ fontSize: 18 }} />
                    </button>
                  </div>
                )
                // : (
                //   <div className="flex items-center gap-3">
                //     <Link
                //       to={config.authConfig.loginPath}
                //       className="text-gray-700 hover:text-[#E2231A]"
                //     >
                //       Login
                //     </Link>
                //     <Link
                //       to={config.authConfig.registerPath}
                //       className="bg-[#FFD700] text-gray-900 px-6 py-2 rounded-full hover:bg-[#ffd000]"
                //     >
                //       {config.authConfig.registerLabel}
                //     </Link>
                //   </div>
                // )
              }
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? (
                <CloseIcon sx={{ fontSize: 24 }} />
              ) : (
                <MenuIcon sx={{ fontSize: 24 }} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                {config.navigationLinks.map((link: HeaderNavigationLink) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 ${
                        isActive(link.path)
                          ? "text-[#E2231A] font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {Icon && <Icon sx={{ fontSize: 16 }} />}
                      {link.label}
                    </Link>
                  );
                })}

                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#E2231A]"
                  >
                    <LogoutIcon sx={{ fontSize: 16 }} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to={config.authConfig.loginPath}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
