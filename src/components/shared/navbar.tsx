"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/themes/theme-toggle";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { NotificationsBell } from "@/components/notifications/notifications-bell";
import { WeeklySummaryModal } from "@/components/notifications/weekly-summary-modal";
import { useEffect, useState } from "react";
import { getWeeklySummary } from "@/lib/actions/notification-actions";

interface WeeklySummary {
  newProjects: number;
  wonProjects: string[];
  upcomingDeadlines: { name: string; deadline: Date }[];
  newEmployees: string[];
}

export function Navbar() {
  const { isAuthenticated, setShowSignIn, setIsAuthenticated, setUser, user } = useAuth();
  const router = useRouter();
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [summary, setSummary] = useState<WeeklySummary>({
    newProjects: 0,
    wonProjects: [],
    upcomingDeadlines: [],
    newEmployees: []
  });

  useEffect(() => {
    if (isAuthenticated) {
      const checkWeeklySummary = async () => {
        const today = new Date();
        const lastShown = localStorage.getItem('lastWeeklySummaryShown');
        const lastShownDate = lastShown ? new Date(lastShown) : null;
        
        // Show only on Mondays and if not shown in the last 24 hours
        if (
          today.getDay() === 1 && 
          (!lastShownDate || 
           (today.getTime() - lastShownDate.getTime()) > 24 * 60 * 60 * 1000)
        ) {
          const data = await getWeeklySummary();
          const formattedData = {
            ...data,
            upcomingDeadlines: data.upcomingDeadlines.map(d => ({
              name: d.name,
              deadline: new Date(d.deadline)
            }))
          };
          setSummary(formattedData);
          setShowWeeklySummary(true);
          localStorage.setItem('lastWeeklySummaryShown', today.toISOString());
        }
      };

      checkWeeklySummary();
    }
  }, [isAuthenticated]);

  const handleSignOut = async () => {
    await signOut();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-semibold text-xl">
            <Image src="/iacllogo.png" alt="IACL Logo" width={100} height={100} />
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {!isAuthenticated ? (
            <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
          ) : (
            <>
              <NotificationsBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {user?.role?.toLowerCase() === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4 text-blue-600" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <ModeToggle />
        </div>
      </div>

      <WeeklySummaryModal
        open={showWeeklySummary}
        onOpenChange={setShowWeeklySummary}
        summary={summary}
      />
    </nav>
  );
}
