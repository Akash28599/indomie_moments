import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../modules/common/components/Footer/Footer";
import { Header } from "../modules/common/components/PageHeader";
import BottomNav from "../modules/common/components/BottomNav/BottomNav";
import { userFooterConfig } from "../modules/common/components/Footer/constant";
import { userHeaderConfig } from "../modules/common/components/PageHeader/constant";
import { useAppDispatch, useAppSelector, useGetUserProfileQuery, setUser, selectIsAuthenticated } from "../store";
import { toast } from "react-toastify";


const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  // Check for social login success param
  const params = new URLSearchParams(location.search);
  const socialSuccess = params.get("social") === "success";

  // Trigger profile fetch if we just logged in via social auth
  const { data: profileData, isSuccess } = useGetUserProfileQuery(undefined, {
    skip: !socialSuccess,
  });

  useEffect(() => {
    if (socialSuccess && isSuccess && profileData?.user) {
      dispatch(setUser(profileData.user));
      toast.success(`Welcome back, ${profileData.user.fullName || "User"}!`);
      // Clean up the URL
      params.delete("social");
      const nextSearch = params.toString();
      navigate(nextSearch ? `${location.pathname}?${nextSearch}` : location.pathname, { replace: true });
    }
  }, [socialSuccess, isSuccess, profileData, dispatch, navigate, location.pathname, params]);

  // On the "/" route, guests see the LandingPage which has its own header layout.
  // So we hide the main Header + Footer for unauthenticated users on the home path.
  const isGuestHomePage = location.pathname === "/" && !isAuthenticated;

  // Hide bottom nav on immersive pages like /moments
  const isImmersivePage = location.pathname === "/moments";

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
      {/* Header – hidden on guest landing page & immersive moments page */}
      {!isGuestHomePage && !isImmersivePage && <Header config={userHeaderConfig} />}

      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1 min-h-0 overflow-y-auto">
        <Outlet />
      </main>

      {/* Footer removed for authenticated views – Header provides all navigation */}

      {/* Mobile Bottom Navigation – only for authenticated users, hidden on immersive pages */}
      {isAuthenticated && !isImmersivePage && <BottomNav />}
    </div>
  );
};

export default UserLayout;
