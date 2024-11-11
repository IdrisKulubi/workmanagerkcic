"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/themes/theme-toggle";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  const { isAuthenticated, setShowSignIn } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-semibold text-xl">
            <Image src="/logo.png" alt="KCIC Logo" width={100} height={100} />
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {!isAuthenticated && (
            <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
