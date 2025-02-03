/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  calculatePasswordStrength,
  PasswordStrength,
} from "@/lib/password-utils";
import { User } from "../../../db/schema";
import { PasswordStrengthIndicator } from "../auth/password-strength-indicator";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { updatePassword } from "@/lib/actions/password-actions";

interface ProfileFormProps {
  user: User;
}

const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 64,
};

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(
        PASSWORD_REQUIREMENTS.minLength,
        `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`
      )
      .max(
        PASSWORD_REQUIREMENTS.maxLength,
        `Password must be less than ${PASSWORD_REQUIREMENTS.maxLength} characters`
      )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function ProfileForm({ user }: ProfileFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordExpired, setPasswordExpired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(passwordSchema),
  });

  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    requirements: {
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    },
    message: "Let's create a strong password together",
  });

  const watchNewPassword = form.watch("newPassword");
  useEffect(() => {
    if (watchNewPassword) {
      const updateStrength = async () => {
        const strength = await calculatePasswordStrength(watchNewPassword);
        setPasswordStrength(strength);
      };
      updateStrength();
    }
  }, [watchNewPassword]);

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const result = await updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (!result.success) {
        setError(result.error || "Failed to update password");
        toast({
          variant: "destructive",
          title: "Oh no!",
          description: result.error || "Failed to update password",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      form.reset();
      setIsSubmitting(false);

      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Error updating password:", error);
      setError("An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Oh no!",
        description: "An unexpected error occurred",
      });
      setIsSubmitting(false);
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -15,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.4,
      },
    },
    hover: {
      scale: 1.02,
      rotateX: 5,
      transition: {
        type: "spring",
        duration: 0.4,
      },
    },
  };

  const formItemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    },
  };

  const userInfoFields = [
    { id: "name", label: "Name", value: user.name },
    { id: "email", label: "Email", value: user.email },
    { id: "department", label: "Department", value: user.department },
    { id: "role", label: "Role", value: user.role },
  ];

  return (
    <div className="space-y-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-950 p-4 md:p-8 rounded-lg perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key="account-info"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={cardVariants}
          className="transform-gpu"
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                  Account Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userInfoFields.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={formItemVariants}
                      custom={index}
                      className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg"
                    >
                      <label className="text-sm font-medium text-green-700 dark:text-green-300">
                        {item.label}
                      </label>
                      <p className="mt-1 text-green-900 dark:text-green-100 capitalize">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key="password-form"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={cardVariants}
          className="mt-6 transform-gpu"
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-xl">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                    Change Password
                  </h2>
                  {passwordExpired && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-500 dark:text-red-400 animate-pulse"
                    >
                      Your password has expired. Please update it.
                    </motion.span>
                  )}
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-green-700 dark:text-green-300">
                              Current Password
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type={
                                    showCurrentPassword ? "text" : "password"
                                  }
                                  {...field}
                                  className="bg-green-50 dark:bg-green-900/50 border-green-300 dark:border-green-700 
                                           text-green-900 dark:text-green-100 focus:border-green-500 focus:ring-green-500
                                           transition-all duration-300"
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400
                                         hover:text-green-800 dark:hover:text-green-200 transition-colors duration-300"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-green-700 dark:text-green-300">
                              New Password
                            </FormLabel>
                            <div className="space-y-2">
                              <div className="relative">
                                <FormControl>
                                  <Input
                                    type={showNewPassword ? "text" : "password"}
                                    {...field}
                                    className="bg-green-50 dark:bg-green-900/50 border-green-300 dark:border-green-700 
                                             text-green-900 dark:text-green-100 focus:border-green-500 focus:ring-green-500
                                             transition-all duration-300"
                                  />
                                </FormControl>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-2 top-1/2 -translate-y-1/2"
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                >
                                  {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>

                              {field.value && (
                                <div className="space-y-2">
                                  <PasswordStrengthIndicator
                                    strength={passwordStrength.score}
                                  />

                                  <div className="text-sm space-y-1">
                                    <p className="text-muted-foreground">
                                      {passwordStrength.message}
                                    </p>
                                    <ul className="space-y-1 text-sm">
                                      <li
                                        className={`flex items-center gap-2 ${
                                          passwordStrength.requirements
                                            .minLength
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        {passwordStrength.requirements.minLength
                                          ? "✓"
                                          : "×"}{" "}
                                        At least{" "}
                                        {PASSWORD_REQUIREMENTS.minLength}{" "}
                                        characters
                                      </li>
                                      <li
                                        className={`flex items-center gap-2 ${
                                          passwordStrength.requirements
                                            .uppercase
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        {passwordStrength.requirements.uppercase
                                          ? "✓"
                                          : "×"}{" "}
                                        One uppercase letter
                                      </li>
                                      <li
                                        className={`flex items-center gap-2 ${
                                          passwordStrength.requirements
                                            .lowercase
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        {passwordStrength.requirements.lowercase
                                          ? "✓"
                                          : "×"}{" "}
                                        One lowercase letter
                                      </li>
                                      <li
                                        className={`flex items-center gap-2 ${
                                          passwordStrength.requirements.number
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        {passwordStrength.requirements.number
                                          ? "✓"
                                          : "×"}{" "}
                                        One number
                                      </li>
                                      <li
                                        className={`flex items-center gap-2 ${
                                          passwordStrength.requirements
                                            .specialChar
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        {passwordStrength.requirements
                                          .specialChar
                                          ? "✓"
                                          : "×"}{" "}
                                        One special character
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={formItemVariants}>
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-green-700 dark:text-green-300">
                              Confirm New Password
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  {...field}
                                  className="bg-green-50 dark:bg-green-900/50 border-green-300 dark:border-green-700 
                                           text-green-900 dark:text-green-100 focus:border-green-500 focus:ring-green-500
                                           transition-all duration-300"
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400
                                         hover:text-green-800 dark:hover:text-green-200 transition-colors duration-300"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div
                      variants={formItemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-500 dark:bg-green-600 hover:bg-green-600 
                                 dark:hover:bg-green-700 text-white font-medium py-2 px-4 
                                 rounded-lg transform transition-all duration-300 
                                 hover:shadow-lg active:scale-95"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Updating Password...
                          </div>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
