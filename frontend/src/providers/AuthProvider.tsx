"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { authApi, type AuthUser } from "@/app/api/auth.api";
import {
  AUTH_CHANGE_EVENT,
  setToken,
  setUser,
  clearToken,
  clearUser,
} from "@/lib/utils/storage";

type AuthSnapshot = {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;
};

type AuthCtx = AuthSnapshot & {
  isLoading: boolean;
  login: (body: { email: string; password: string }) => Promise<AuthUser>;
  register: (body: { name: string; email: string; password: string }) => Promise<AuthUser>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | null>(null);

// ✅ SERVER snapshot phải là HẰNG SỐ (cached)
const SERVER_SNAPSHOT: AuthSnapshot = { token: null, user: null, hydrated: false };

// ✅ CLIENT snapshot cache (tránh tạo object mới mỗi render)
let lastToken: string | null = null;
let lastUserRaw: string | null = null;
let CLIENT_SNAPSHOT: AuthSnapshot = { token: null, user: null, hydrated: true };

function subscribeAuth(cb: () => void) {
  if (typeof window === "undefined") return () => {};

  const handler = () => cb();

  window.addEventListener(AUTH_CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

function getClientSnapshot(): AuthSnapshot {
  // chỉ chạy trên client
  const token = localStorage.getItem("accessToken");
  const userRaw = localStorage.getItem("authUser");

  // ✅ không đổi => trả về cùng 1 object cache
  if (token === lastToken && userRaw === lastUserRaw) return CLIENT_SNAPSHOT;

  lastToken = token;
  lastUserRaw = userRaw;

  let user: AuthUser | null = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw) as AuthUser;
    } catch {
      user = null;
    }
  }

  CLIENT_SNAPSHOT = { token, user, hydrated: true };
  return CLIENT_SNAPSHOT;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const snap = useSyncExternalStore(subscribeAuth, getClientSnapshot, () => SERVER_SNAPSHOT);
  const [isLoading, setLoading] = useState(false);

  const logout = useCallback(() => {
    clearToken();
    clearUser();
  }, []);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    try {
      const data = await authApi.me();
      setUser(data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const login = useCallback(async (body: { email: string; password: string }) => {
  setLoading(true);
  try {
    const res = await authApi.login(body);
    setToken(res.accessToken);
    setUser(res.user);
    return res.user; // ✅ thêm dòng này
  } finally {
    setLoading(false);
  }
}, []);

const register = useCallback(async (body: { name: string; email: string; password: string }) => {
  setLoading(true);
  try {
    const res = await authApi.register(body);
    setToken(res.accessToken);
    setUser(res.user);
    return res.user; // ✅ thêm dòng này
  } finally {
    setLoading(false);
  }
}, []);

  const value = useMemo(
    () => ({ ...snap, isLoading, login, register, logout, refreshMe }),
    [snap, isLoading, login, register, logout, refreshMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside <AuthProvider />");
  return ctx;
}
