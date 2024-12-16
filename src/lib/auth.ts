'use server'

import { cookies } from 'next/headers'
import { eq } from 'drizzle-orm'
import { users } from '../../db/schema'
import db from '../../db/drizzle'
import bcrypt from 'bcrypt'

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

export async function resetUserPassword(email: string) {
  try {
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD || 'Kcic@34', 10);
    
    await db
      .update(users)
      .set({ 
        password: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(users.email, email));

    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, error: 'Failed to reset password' };
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log('Attempting sign in for email:', email);
    
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      console.log('No user found with email:', email);
      return null;
    }

    console.log('User found, checking password...');
    console.log('Password length:', password.length);
    console.log('Stored password hash length:', user.password.length);
    
    const passwordsMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', passwordsMatch);
    
    if (!passwordsMatch) {
      console.log('Password mismatch for user:', email);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error during sign in:', error);
    return null;
  }
} 