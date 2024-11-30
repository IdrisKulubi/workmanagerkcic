import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface AchievementPopupProps {
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
}

export function AchievementPopup({
  title,
  message,
  show,
}: AchievementPopupProps) {
  if (show) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="h-6 w-6" />
            </motion.div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
