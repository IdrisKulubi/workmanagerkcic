import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import Link from "next/link";
import { Footer } from "@/components/shared/footer";
import { TrendingUp,  LayoutDashboard, PieChart } from "lucide-react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { TypingAnimation } from "@/components/ui/typing-text";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <main className="flex-1">
        <section className="py-20 sm:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <TypingAnimation
                  text="Welcome to KCIC Project Manager"
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
                />
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Streamline your consulting projects with our comprehensive
                  management system.
                </p>
              </div>
              <RetroGrid />

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/projects">
                  <Button size="lg" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Company Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/40 py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-card border shadow-sm">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                <h2 className="text-xl font-bold">Project Management</h2>
                <p className="text-center text-muted-foreground">
                  Track and manage all your consulting projects in one place
                  with real-time updates
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-card border shadow-sm">
                <PieChart className="h-8 w-8 text-primary" />
                <h2 className="text-xl font-bold">Analytics & Insights</h2>
                <p className="text-center text-muted-foreground">
                  Get detailed analytics and insights into project performance
                  and team metrics
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-card border shadow-sm">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-xl font-bold">Forecasting</h2>
                <p className="text-center text-muted-foreground">
                  Make data-driven decisions from you data
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
