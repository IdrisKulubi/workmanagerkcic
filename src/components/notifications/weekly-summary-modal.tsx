"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface WeeklySummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: {
    newProjects: number;
    wonProjects: string[];
    upcomingDeadlines: { name: string; deadline: Date }[];
    newEmployees: string[];
  };
}

export function WeeklySummaryModal({ open, onOpenChange, summary }: WeeklySummaryModalProps) {
  useEffect(() => {
    if (open && summary.wonProjects.length > 0) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      let skew = 1;

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      (function frame() {
        const timeLeft = animationEnd - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / duration));

        skew = Math.max(0.8, skew - 0.001);

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            y: Math.random() * skew - 0.2,
          },
          colors: ['#FFD700', '#FFA500', '#FF4500'],
          shapes: ['star'],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.8, 1.4),
          drift: randomInRange(-0.4, 0.4),
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [open, summary.wonProjects.length]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Weekly Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <AnimatePresence>
            {summary.wonProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">Won Projects! 🎉</h3>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {summary.wonProjects.map((project) => (
                    <li key={project} className="text-sm">{project}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* New Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-500/10 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">New Projects</h3>
              </div>
              <p className="text-sm">
                {summary.newProjects} new projects this week
              </p>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/10 p-4 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Upcoming Deadlines</h3>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {summary.upcomingDeadlines.map((project) => (
                  <li key={project.name} className="text-sm">
                    {project.name} - {new Date(project.deadline).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* New Team Members */}
            {summary.newEmployees.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-green-500/10 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">Welcome New Team Members!</h3>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {summary.newEmployees.map((employee) => (
                    <li key={employee} className="text-sm">{employee}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 