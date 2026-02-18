import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RoleRedirect: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (location.pathname !== "/") return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return user?.role === "admin" ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RoleRedirect;
