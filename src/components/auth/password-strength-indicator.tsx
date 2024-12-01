import { motion } from "framer-motion";

interface PasswordStrengthIndicatorProps {
  strength: number;
}

export function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  const getColor = (strength: number) => {
    if (strength < 30) return "bg-red-500 dark:bg-red-600";
    if (strength < 60) return "bg-yellow-500 dark:bg-yellow-600";
    return "bg-green-500 dark:bg-green-600";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
          Password strength
        </span>
        <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
          {Math.round(strength)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full ${getColor(strength)}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, strength))}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
