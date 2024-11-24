"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SignInModal } from "./sign-in-modal";
import { User } from "../../../db/schema";
import { getAuthenticatedUser } from "@/lib/user-utils";

type AuthContextType = {
  isAuthenticated: boolean;
  showSignIn: boolean;
  setShowSignIn: (show: boolean) => void;
  user: User | null;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getAuthenticatedUser();
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        showSignIn,
        setShowSignIn,
        user,
        setIsAuthenticated,
        setUser
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
