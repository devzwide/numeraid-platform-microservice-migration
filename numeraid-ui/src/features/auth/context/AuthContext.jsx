import { useEffect, useMemo, useState } from "react";

import { authApi } from "../api/authApi";
import { AuthContext } from "./auth-context";
import { getCurrentUserFromToken } from "../lib/session";

const AUTH_STORAGE_KEY = "numeraid-auth";

const readStoredSession = () => {
  try {
    const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawSession) {
      return { accessToken: null, refreshToken: null, user: null };
    }

    const parsedSession = JSON.parse(rawSession);
    const user = parsedSession.user || null;

    return {
      accessToken: parsedSession.accessToken || null,
      refreshToken: parsedSession.refreshToken || null,
      user,
    };
  } catch {
    return { accessToken: null, refreshToken: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(readStoredSession);

  useEffect(() => {
    if (!session.accessToken && !session.refreshToken) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const getCurrentUser = () => {
    if (session.user) {
      return session.user;
    }

    return getCurrentUserFromToken(session.accessToken);
  };

  const login = async (email, password) => {
    const authResponse = await authApi.login({ email, password });
    const normalizedUser = getCurrentUserFromToken(authResponse.accessToken);
    const nextSession = {
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken,
      user: normalizedUser,
    };

    setSession(nextSession);
    return nextSession;
  };

  const register = async (email, password) => {
    return authApi.register({ email, password });
  };

  const refreshSession = async () => {
    if (!session.refreshToken) {
      return null;
    }

    const authResponse = await authApi.refresh(session.refreshToken);
    if (!authResponse.accessToken) {
      return null;
    }

    const user = getCurrentUserFromToken(authResponse.accessToken);
    const nextSession = {
      accessToken: authResponse.accessToken,
      refreshToken: authResponse.refreshToken || session.refreshToken,
      user,
    };

    setSession(nextSession);
    return nextSession;
  };

  const logout = () => {
    setSession({ accessToken: null, refreshToken: null, user: null });
  };

  const value = useMemo(() => {
    const currentUser = session.user || getCurrentUser();

    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: currentUser,
      isAuthenticated: Boolean(session.accessToken),
      isReady: true,
      login,
      register,
      logout,
      refreshSession,
    };
  }, [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


