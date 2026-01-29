import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  // 🔐 Centralized auth check
  const authenticated = isAuthenticated();

  // 🚫 If not authenticated → redirect
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;
