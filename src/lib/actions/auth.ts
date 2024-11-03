'use server'

import { validateEmail, signOut as authSignOut } from '@/lib/auth'

export async function signIn(email: string) {
  try {
    const result = await validateEmail(email)
    return result
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function signOut() {
  await authSignOut()
} 