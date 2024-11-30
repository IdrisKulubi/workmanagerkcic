'use server'

import { validateEmail, signOut as authSignOut, getCurrentUser } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { users } from '../../../db/schema'
import { hashPassword, verifyPassword, isPasswordExpired } from '@/lib/password-utils'
import db from '../../../db/drizzle';

export async function signIn({ email, password }: { email: string; password: string }) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Check if it's first time login (no password set)
    if (!user.password) {
      // Create their first password
      const hashedPassword = await hashPassword(password)
      await db.update(users)
        .set({ 
          password: hashedPassword,
          passwordLastChanged: new Date(),
        })
        .where(eq(users.id, user.id))
      
      const result = await validateEmail(email)
      return result
    }

    // Normal login flow
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' }
    }

    if (isPasswordExpired(user.passwordLastChanged)) {
      return { success: false, error: 'Password expired. Please reset your password.' }
    }

    const result = await validateEmail(email)
    return result
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function signOut() {
  await authSignOut()
}



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