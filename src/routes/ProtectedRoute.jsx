import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoute
 * - Blocks unauthenticated access
 * - Prevents redirect flicker
 * - Preserves previous route
 * - Supports nested routing
 */
const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Prevent redirect before auth state restored
  if (loading) {
    return null; // Or a global spinner
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;