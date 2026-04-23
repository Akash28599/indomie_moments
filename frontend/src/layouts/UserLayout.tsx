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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header – hidden on guest landing page (LandingPage has its own) */}
      {!isGuestHomePage && <Header config={userHeaderConfig} />}

      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer – hidden on guest landing page */}
      {!isGuestHomePage && <Footer config={userFooterConfig} />}

      {/* Mobile Bottom Navigation – only for authenticated users */}
      {isAuthenticated && <BottomNav />}
    </div>
  );
};

export default UserLayout;
