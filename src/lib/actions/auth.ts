'use server'

import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { users } from '../../../db/schema'
import { verifyPassword } from '@/lib/password-utils'
import db from '../../../db/drizzle'

export async function signIn({ email, password }: { email: string; password: string }) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return { success: false, error: 'Invalid credentials' }
    }

    // Create a session token
    const sessionData = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      department: user.department,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
    };

    // Set the session cookie
    (await
      // Set the session cookie
      cookies()).set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      path: '/',
    });

    return { 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        department: user.department
      }
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return { success: false, error: 'An error occurred during sign in' }
  }
} 
