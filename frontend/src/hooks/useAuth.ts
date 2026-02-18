import { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  selectUser,
  selectAdmin,
  selectIsAuthenticated,
  logoutUserThunk,
  logoutAdminThunk,
  clearUser,
  clearAdmin,
} from "../store";
import type { AuthUser, UserRole, Permission } from "../auth/auth.types";

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/", "/login", "/register", "/admin/login"];

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = useAppSelector(selectUser);
  const admin = useAppSelector(selectAdmin);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const activeUser: AuthUser | null = user ?? admin ?? null;
  const isLoading = false;

  // Auto-redirect when authentication state changes
  useEffect(() => {
    // If user was logged out (isAuthenticated = false)
    if (!isAuthenticated && !PUBLIC_ROUTES.includes(location.pathname)) {
      // Determine which login page based on previous role
      const loginPath = admin ? "/admin/login" : "/login";
      navigate(loginPath, { replace: true });
    }
  }, [isAuthenticated, navigate, location.pathname, admin]);

  const logout = useCallback(async () => {
    try {
      if (admin) {
        await dispatch(logoutAdminThunk()).unwrap();
        // Redux state cleared, useEffect will handle redirect
      } else if (user) {
        await dispatch(logoutUserThunk()).unwrap();
        // Redux state cleared, useEffect will handle redirect
      }
    } catch {
      // Force logout even if API fails
      if (admin) {
        dispatch(clearAdmin());
      } else if (user) {
        dispatch(clearUser());
      }
      // Redux state cleared, useEffect will handle redirect
    }
  }, [admin, user, dispatch]);

  const hasRole = useCallback(
    (role: UserRole) => activeUser?.role === role,
    [activeUser?.role]
  );

  const hasPermission = useCallback(
    (permission: Permission) =>
      Boolean(activeUser?.permissions?.includes(permission)),
    [activeUser?.permissions]
  );

  return {
    user: user ?? null,
    admin: admin ?? null,
    activeUser,
    isAuthenticated,
    isLoading,
    logout,
    hasRole,
    hasPermission,
  };
}