"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/themes/theme-toggle";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isAuthenticated, setShowSignIn } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-semibold text-xl">
            KCIC Manager
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {!isAuthenticated ? (
            <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
          ) : (
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Dashboard
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
