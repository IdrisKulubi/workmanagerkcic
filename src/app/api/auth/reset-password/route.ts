import { NextResponse } from 'next/server';
import { resetUserPassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await resetUserPassword(email);
    
    if (result.success) {
      return NextResponse.json(
        { message: 'Password reset successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to reset password' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in reset-password API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 