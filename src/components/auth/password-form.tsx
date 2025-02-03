"use client";

import { handlePasswordHash } from "@/lib/actions/password-client";

// Example usage in a client component
export async function handlePasswordChange(newPassword: string) {
  try {
    const hashedPassword = await handlePasswordHash(newPassword);
    return { success: true, hashedPassword };
  } catch (error) {
    console.error("Error hashing password:", error);
    return { success: false, error: "Failed to hash password" };
  }
}
