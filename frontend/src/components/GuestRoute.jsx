import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Opposite of ProtectedRoute: keeps signed-in users off pages that only
// make sense while logged out (login, register). Once authenticated,
// visiting either route bounces straight to the dashboard instead.
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default GuestRoute;
