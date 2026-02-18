import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../modules/user/pages/Home/Home";
import AdminHome from "../modules/admin/pages/home/AdminHome";
import Approval from "../modules/admin/pages/approvals/Approval";
import UserAnalytics from "../modules/admin/pages/users/UserAnalytics";
import { Moments } from "../modules/user/pages/Moments/MomentFullList";
import {LeaderBoard} from "../modules/user/pages/Leaderboard/LeaderBoard";
import {Upload} from "../modules/user/pages/Upload/Upload";
import Profile from "../modules/user/pages/Profile/Profile";
import { SharePage } from "../modules/user/pages/Share/SharePage";
import { AdminLogin, AdminRegister, ResetPassword, ForgotPassword } from "../modules/admin/auth";
import { Login } from "../modules/user/auth/login/Login";
import {Register} from "../modules/user/auth/register/Register";
import { ProtectedRoute } from "./ProtectedRoute";
import NotFound from "../modules/common/pages/Notfound";



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
    { index: true, element: <Home /> }, // ✅ HOME RENDERS

    // 🔐 PROTECTED ROUTES
    {
      path: "moments",
      element: (
        <ProtectedRoute role="user">
          <Moments />
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
      path: "profile",
      element: (
        <ProtectedRoute role="user">
          <Profile />
        </ProtectedRoute>
      ),
    },
    { path: "share/:slug", element: <SharePage /> },
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
