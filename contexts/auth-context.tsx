"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, registerUser, type AuthUser } from "@/lib/api";

type UserRole = "officer" | "startup" | "expert" | "validator" | "procurement" | "admin";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (data: { name: string; email: string; role: string; department?: string; password: string }) => Promise<string | null>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("prism_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("prism_user"); }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await loginUser(email, password);
      if (res.error) return res.error;
      if (res.user) {
        const u: User = { id: res.user.id, name: res.user.name, email: res.user.email, role: res.user.role, department: res.user.department };
        localStorage.setItem("prism_user", JSON.stringify(u));
        setUser(u);
        return null;
      }
      return "Login failed";
    } catch { return "Network error"; }
  }, []);

  const register = useCallback(async (data: { name: string; email: string; role: string; department?: string; password: string }): Promise<string | null> => {
    try {
      const res = await registerUser(data);
      if (res.error) return res.error;
      if (res.user) {
        const u: User = { id: res.user.id, name: res.user.name, email: res.user.email, role: res.user.role, department: res.user.department };
        localStorage.setItem("prism_user", JSON.stringify(u));
        setUser(u);
        return null;
      }
      return "Registration failed";
    } catch { return "Network error"; }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("prism_user");
    localStorage.removeItem("prism_token");
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, role };
      localStorage.setItem("prism_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
