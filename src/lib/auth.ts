import { cookies } from 'next/headers'
import { createHash } from 'crypto'
  import { eq } from 'drizzle-orm'
import { users } from '../../db/schema'
import db from '../../db/drizzle'

export async function validateEmail(email: string) {
  // Validate email format
  if (!email.endsWith('@kcicconsulting.com')) {
    return { success: false, error: 'Invalid email domain' }
  }

  // Check if user exists in database
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    return { success: false, error: 'User not found' }
  }

  // Generate session token
  const sessionToken = createHash('sha256')
    .update(email + Date.now().toString())
    .digest('hex')

  // Store in cookies
  ;(await
    // Store in cookies
    cookies()).set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })

  return { success: true, user }
}
export async function getCurrentUser() {
  const session = (await cookies()).get('session')
  if (!session) return null

  // In a real app, you'd validate the session token against a sessions table
  // For now, we'll just get the first user as an example
  const user = await db.query.users.findFirst()
  return user
}

export async function signOut() {
  (await cookies()).delete('session')
} 