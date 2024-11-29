"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/navbar";
import Link from "next/link";
import { Footer } from "@/components/shared/footer";
import { TrendingUp, LayoutDashboard, PieChart, ArrowRight } from "lucide-react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { TypingAnimation } from "@/components/ui/typing-text";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import confetti from 'canvas-confetti';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDashboardClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </div>

      <main className="flex-1">
        <section className="py-12 sm:py-20 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <TypingAnimation
                  text="Welcome to KCIC Project Manager"
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
                />
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl dark:text-gray-400">
                  Streamline your consulting projects with our comprehensive
                  management system.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-3xl mx-auto"
              >
                <RetroGrid className="max-w-full" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Link href="/projects">
                  <Button 
                    size="lg" 
                    className="group gap-2 relative overflow-hidden transition-all hover:shadow-lg"
                    onClick={handleDashboardClick}
                  >
                    <LayoutDashboard className="h-4 w-4 transition-transform group-hover:scale-110" />
                    Company Dashboard
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section 
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={container}
          className="border-t bg-muted/40 py-12 md:py-16"
        >
          <div className="container px-4 md:px-6">
            <motion.div 
              className="grid gap-8 sm:grid-cols-2 md:grid-cols-3"
              variants={container}
            >
              <motion.div 
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-card border shadow-sm transition-all hover:shadow-md"
              >
                <LayoutDashboard className="h-8 w-8 text-primary animate-pulse" />
                <h2 className="text-xl font-bold">Project Management</h2>
                <p className="text-center text-muted-foreground">
                  Track and manage all your consulting projects in one place
                  with real-time updates
                </p>
              </motion.div>

              <motion.div 
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-card border shadow-sm transition-all hover:shadow-md"
              >
                <PieChart className="h-8 w-8 text-primary animate-pulse" />
                <h2 className="text-xl font-bold">Analytics & Insights</h2>
                <p className="text-center text-muted-foreground">
                  Get detailed analytics and insights into project performance
                  and team metrics
                </p>
              </motion.div>

              <motion.div 
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-4 rounded-lg p-6 bg-card border shadow-sm transition-all hover:shadow-md"
              >
                <TrendingUp className="h-8 w-8 text-primary animate-pulse" />
                <h2 className="text-xl font-bold">Forecasting</h2>
                <p className="text-center text-muted-foreground">
                  Make data-driven decisions from your data
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
