import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  
  // Check if session is expired
  if (session?.value) {
    try {
      const sessionData = JSON.parse(session.value)
      if (sessionData.exp < Date.now()) {
        // Session expired, clear it
        const response = NextResponse.redirect(new URL('/', request.url))
        response.cookies.delete('session')
        return response
      }
    } catch (error) {
      console.error('Error parsing session:', error)
    }
  }

  // Public routes that don't require auth
  const publicPaths = ['/', '/auth/signin', '/auth/signup']
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path
  )

  // Protected routes
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 