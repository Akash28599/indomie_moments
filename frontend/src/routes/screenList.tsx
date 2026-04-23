import { 
  Dashboard,
  LandingPage,
  LeaderBoard,
  Profile,
  SharePage,
  Upload,
  IndomieMoments
} from "../modules/user/pages";
import { Login } from "../modules/user/auth/login/Login";
import { Register } from "../modules/user/auth/register/Register";
import { AdminLogin, AdminRegister, ResetPassword, ForgotPassword } from "../modules/admin/auth";
import WinnersHub from "../modules/user/pages/Home/WinnersHub";
import Home from "../modules/user/pages/Home/Home";
import AdminHome from "../modules/admin/pages/home/AdminHome";
import Approval from "../modules/admin/pages/approvals/Approval";
import UserAnalytics from "../modules/admin/pages/users/UserAnalytics";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import { ProtectedRoute } from "./ProtectedRoute";
import NotFound from "../modules/common/pages/Notfound";
import PrivacyPolicy from "../modules/common/pages/PrivacyPolicy";
import TermsOfService from "../modules/common/pages/TermsOfService";



export const SCREEN_LIST = [
 {
    id: "user-login",
    path: "/login",
    element: <Login />,
    isPublic: true,
    roles: [],
  },
  {
    id: "admin-register",
    path: "/register",
    element: <Register />,
    isPublic: true,
    roles:[]},

 // 🌍 PUBLIC HOME
{
  path: "/",
  element: <UserLayout />,
  isPublic: true,
  children: [
    { index: true, element: <Home /> },

    // 🔐 PROTECTED ROUTES
    {
      path: "moments",
      element: (
        <ProtectedRoute role="user">
          <IndomieMoments />
        </ProtectedRoute>
      ),
    },
    {
      path: "leaderboard",
      element: (
        <ProtectedRoute role="user">
          <LeaderBoard />
        </ProtectedRoute>
      ),
    },
    {
      path: "upload",
      element: (
        <ProtectedRoute role="user">
          <Upload />
        </ProtectedRoute>
      ),
    },


    {
      path: "winners-hub",
      element: (
        <ProtectedRoute role="user">
          <WinnersHub />
        </ProtectedRoute>
      ),
    },
    {
      path: "profile",
      element: (
        <ProtectedRoute role="user">
          <Profile />
        </ProtectedRoute>
      ),
    },
    { path: "share/:slug", element: <SharePage /> },
    { path: "privacy-policy", element: <PrivacyPolicy /> },
    { path: "terms", element: <TermsOfService /> },
    { path: "*", element: <NotFound /> },
  ],
},

   {
    id: "admin-login",
    path: "/admin/login",
    element: <AdminLogin />,
    isPublic: true,
    roles: [],
  },
  {
    id: "admin-register",
    path: "/admin/register",
    element: <AdminRegister />,
    isPublic: true,
    roles: [],
  },
  {
    id: "admin-forgot-password",
    path: "/admin/forgot-password",
    element: <ForgotPassword />,
    isPublic: true,
    roles: [],
  },
  {
    id: "admin-resetpassword",
    path: "/admin/resetpassword",
    element: <ResetPassword />,
    isPublic: true,
    roles: [],
  },


  // 🔐 ADMIN
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    roles: ["admin"],
    children: [
      { index: true, element: <AdminHome /> },
      { path: "approvals", element: <Approval /> },
      { path: "users", element: <UserAnalytics /> },
    ],
  },
];
