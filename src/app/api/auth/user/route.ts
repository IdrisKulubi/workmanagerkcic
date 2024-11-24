import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  const session = (await cookies()).get('session')
  
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const user = await getCurrentUser()
  return NextResponse.json({ user })
} 