import { Navigate, useLocation } from "react-router-dom";
import { useEffect, type ReactElement } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Permission, UserRole } from "../auth/auth.types";
import {
  useAppDispatch,
  setUser,
  setAdmin,
  clearUser,
  clearAdmin,
  useGetUserProfileQuery,
  useGetAdminProfileQuery,
} from "../store";

interface Props {
  children: ReactElement;
  role?: UserRole;
  permission?: Permission;
}

export const ProtectedRoute = ({
  children,
  role,
  permission,
}: Props) => {
  const dispatch = useAppDispatch();
  const { user, admin, isAuthenticated, isLoading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  // Determine which auth type to bootstrap based on route and role requirement
  const isAdminPath = location.pathname.startsWith("/admin");
  const requiresUserAuth = role === "user" || (!role && !isAdminPath);
  const requiresAdminAuth = role === "admin" || isAdminPath;

  // Bootstrap to verify session: if we have persisted auth, verify silently
  // If no persisted auth, bootstrap and show loading
  const hasPersistedAuth = Boolean(user || admin);
  const shouldBootstrap = !isAuthenticated || hasPersistedAuth;

  // Only call the appropriate profile query based on route/role
  const {
    data: userProfile,
    isLoading: isUserProfileLoading,
  } = useGetUserProfileQuery(undefined, {
    skip: !shouldBootstrap || requiresAdminAuth,
  });

  const {
    data: adminProfile,
    isLoading: isAdminProfileLoading,
  } = useGetAdminProfileQuery(undefined, {
    skip: !shouldBootstrap || requiresUserAuth,
  });

  useEffect(() => {
    // Only set user if we're on a user route or if role requires user
    if (userProfile?.user && requiresUserAuth) {
      dispatch(setUser(userProfile.user));
    }
    // Only set admin if we're on an admin route or if role requires admin
    if (adminProfile?.admin && requiresAdminAuth) {
      dispatch(setAdmin(adminProfile.admin));
    }
  }, [userProfile, adminProfile, dispatch, requiresUserAuth, requiresAdminAuth]);

  // Only show loading if we don't have persisted auth state
  const isBootstrapping =
    !hasPersistedAuth && 
    ((requiresUserAuth && isUserProfileLoading) || 
     (requiresAdminAuth && isAdminProfileLoading));

  if (isLoading || isBootstrapping) return <div>Loading...</div>;

  // If we have the wrong auth type for this route, redirect
  if (requiresUserAuth && admin && !user) {
    // Admin trying to access user route - clear admin and redirect to login
    dispatch(clearAdmin());
    const currentPath = location.pathname + location.search;
    const target = `/login?returnUrl=${encodeURIComponent(currentPath)}`;
    return <Navigate to={target} replace />;
  }

  if (requiresAdminAuth && user && !admin) {
    // User trying to access admin route - clear user and redirect to admin login
    dispatch(clearUser());
    const currentPath = location.pathname + location.search;
    const target = `/admin/login?returnUrl=${encodeURIComponent(currentPath)}`;
    return <Navigate to={target} replace />;
  }

  if (!isAuthenticated && !user && !admin) {
    const currentPath = location.pathname + location.search;
    const baseLoginPath = isAdminPath ? "/admin/login" : "/login";
    const target = `${baseLoginPath}?returnUrl=${encodeURIComponent(
      currentPath,
    )}`;

    return <Navigate to={target} replace />;
  }

  if (role && !hasRole(role)) {
    return <Navigate to="/403" replace />;
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};
