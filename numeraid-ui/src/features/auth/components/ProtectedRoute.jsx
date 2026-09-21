import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm font-medium text-[#6F6C7F]">
        Checking your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectTarget = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?returnUrl=${encodeURIComponent(redirectTarget)}`} replace />;
  }

  return children;
};
