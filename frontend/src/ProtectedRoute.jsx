import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "@auth/stores/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>; 

  if (!user) return <Navigate to="/login" replace />;

  if (location.pathname === "/verify-email") return children;

  if (location.pathname === "/admin" && user.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
