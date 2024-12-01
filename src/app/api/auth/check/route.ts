import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    const user = await getCurrentUser();
    
    if (user) {
      return NextResponse.json({ 
        authenticated: true, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
        }
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
    }
    
    return NextResponse.json({ authenticated: false, user: null });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false, user: null });
  }
}
