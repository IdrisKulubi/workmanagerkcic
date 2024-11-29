"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingActionButton() {
  return (
    <motion.button
      className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg md:hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Plus className="h-6 w-6" />
    </motion.button>
  );
}
