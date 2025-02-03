"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Star, Zap, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useState } from "react";
import { GlobeDemo } from "@/components/shared/globe";
import { Project } from "../../../db/schema";

const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export function HomeClient({ }: { projects: Project[] }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleRocketClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <main className="flex-1 py-12 px-4">
      {/* Rest of your JSX moved here */}
      <section className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-yellow-300 drop-shadow-lg"
        >
          IACL Bd Manager
        </motion.h1>
        <main className="flex-1 py-12 px-4">
          
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-white drop-shadow"
            >
              Where work feels like play
            </motion.p>

            <motion.div
              className="mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link href="/projects">
                <Button
                  size="lg"
                  className="bg-yellow-400 text-purple-800 hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 font-bold text-lg px-8 py-6 rounded-full shadow-lg"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={handleRocketClick}
                >
                  <span className="mr-2">Get Started</span>
                  <motion.span animate={isHovering ? bounceAnimation : {}}>
                    <Rocket className="h-6 w-6" />
                  </motion.span>
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Star,
                  title: "Stellar Projects",
                  description: "Manage your projects with cosmic efficiency!",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Zoom through tasks at the speed of light!",
                },
                {
                  icon: Sparkles,
                  title: "Magic Moments",
                  description: "Create dazzling results with every project!",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                  className="bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-xl"
                >
                  <motion.div
                    className="text-yellow-300 mb-4"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-12 w-12 mx-auto" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
        </main>
      </section>
      <section className="mt-20">
        <GlobeDemo />
      </section>
    </main>
  );
} 