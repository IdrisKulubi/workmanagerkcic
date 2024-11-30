import { motion } from "framer-motion";
import { PasswordStrength } from "@/lib/password-utils";
import { cn } from "@/lib/utils";

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

export function PasswordStrengthIndicator({
  strength,
}: PasswordStrengthIndicatorProps) {
  return (
    <div className="space-y-3 mt-2">
      <div className="space-y-2">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={cn(
              "h-full rounded-full",
              strength.score === 100 && "bg-green-500",
              strength.score >= 80 && strength.score < 100 && "bg-emerald-500",
              strength.score >= 60 && strength.score < 80 && "bg-yellow-500",
              strength.score >= 40 && strength.score < 60 && "bg-orange-500",
              strength.score < 40 && "bg-red-500"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${strength.score}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {strength.message}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(strength.requirements).map(([key, met]) => (
          <motion.div
            key={key}
            className={cn(
              "flex items-center gap-2 text-sm px-2 py-1 rounded-md",
              met ? "text-green-600 bg-green-50" : "text-gray-500 bg-gray-50"
            )}
            animate={{ opacity: met ? 1 : 0.5 }}
          >
            {met ? "✓" : "○"} {formatRequirement(key)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function formatRequirement(key: string): string {
  switch (key) {
    case "minLength":
      return "8+ Characters";
    case "uppercase":
      return "Uppercase";
    case "lowercase":
      return "Lowercase";
    case "number":
      return "Number";
    case "specialChar":
      return "Special Char";
    default:
      return key;
  }
}
