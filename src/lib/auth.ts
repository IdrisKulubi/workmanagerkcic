import { createHash } from 'crypto'
import { eq } from 'drizzle-orm'
import { users } from '../../db/schema'
import db from '../../db/drizzle'
import { cookies } from 'next/headers'

export async function validateEmail(email: string) {
  if (!email.endsWith('@kcicconsulting.com')) {
    return { success: false, error: 'Invalid email domain' }
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  const sessionToken = createHash('sha256')
    .update(email + Date.now().toString())
    .digest('hex')

  ;(await cookies()).set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return { success: true, user }
}

export async function getCurrentUser() {
  const user = await db.query.users.findFirst()
  return user
}

export async function signOut() {
  // This will now be called from the API route
  (await cookies()).delete('session')
} 