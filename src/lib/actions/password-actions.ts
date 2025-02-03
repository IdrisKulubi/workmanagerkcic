"use server";

import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { users } from "../../../db/schema";
import db from "../../../db/drizzle";
import { hashPassword, verifyPassword } from "../server/password-server";

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const isValid = await verifyPassword(data.currentPassword, user.password);
    if (!isValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    const hashedPassword = await hashPassword(data.newPassword);
    await db
      .update(users)
      .set({
        password: hashedPassword,
        passwordLastChanged: new Date(),
      })
      .where(eq(users.id, user.id));

    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: "Failed to update password" };
  }
}

export async function hashPasswordAction(password: string) {
  return hashPassword(password);
}

export async function verifyPasswordAction(
  password: string,
  hashedPassword: string
) {
  return verifyPassword(password, hashedPassword);
}
