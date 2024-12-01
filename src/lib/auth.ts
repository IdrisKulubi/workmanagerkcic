'use server'

import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { users } from '../../db/schema'
import db from '../../db/drizzle'

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session');
    
    if (!sessionCookie?.value) return null;
    
    const sessionData = JSON.parse(sessionCookie.value);
    
    const user = await db.query.users.findFirst({
      where: eq(users.email, sessionData.email),
    });
    
    if (!user) {
      (await cookieStore).delete('session');
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function signOut() {
  const cookieStore = cookies();
  (await cookieStore).delete('session');
} 