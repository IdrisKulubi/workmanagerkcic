"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SignInModal } from "./sign-in-modal";
import { User } from "../../../db/schema";

type AuthContextType = {
  isAuthenticated: boolean;
  showSignIn: boolean;
  setShowSignIn: (show: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    title: string;
  } | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // Check if user has a session cookie
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check");
      if (!response.ok) {
        setShowSignIn(true);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, showSignIn, setShowSignIn, user }}
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
