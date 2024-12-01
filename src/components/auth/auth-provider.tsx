"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {  usePathname } from "next/navigation";
import { SignInModal } from "./sign-in-modal";
import { User } from "../../../db/schema";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  showSignIn: boolean;
  setShowSignIn: (show: boolean) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  showSignIn: false,
  setShowSignIn: () => {},
  setIsAuthenticated: () => {},
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Function to check auth status
  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) throw new Error('Auth check failed');

      const data = await response.json();
      
      if (data.authenticated && data.user) {
        setIsAuthenticated(true);
        setUser(data.user);
        setShowSignIn(false);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        // Only show sign in for protected routes
        if (!isPublicRoute(pathname)) {
          setShowSignIn(true);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [pathname, setIsAuthenticated, setUser, setShowSignIn]);

  // Check auth on mount and route changes
  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Periodic auth check
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(checkAuth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [checkAuth, isAuthenticated]);

  const isPublicRoute = (path: string) => {
    return ['/', '/auth/signin', '/auth/signup'].includes(path);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        showSignIn,
        setShowSignIn,
        setIsAuthenticated,
        setUser,
      }}
    >
      {children}
      <SignInModal open={showSignIn} onOpenChange={setShowSignIn} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
