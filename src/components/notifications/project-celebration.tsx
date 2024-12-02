"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCelebrationProps {
  projectName: string;
  onClose: () => void;
}

export function ProjectCelebration({ projectName, onClose }: ProjectCelebrationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      // Initial celebration
      const end = Date.now() + 5000;

      const colors = ['#FFD700', '#FFA500', '#FF4500'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-lg shadow-xl text-white max-w-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Trophy className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Project Won! 🎉</h3>
              <p className="text-white/90">{projectName}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="secondary"
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Dismiss
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 