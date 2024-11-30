"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { signIn } from '@/lib/actions/auth'
import { useAuth } from './auth-provider'
import { SignInForm } from './sign-in-form'

export function SignInModal({ open, onOpenChange }: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [error, setError] = useState('')
  const router = useRouter()
  const { setIsAuthenticated, setUser } = useAuth()

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      setError('')
      const result = await signIn({ email: data.email, password: data.password })
      
      if (!result.success) {
        setError(result.error || 'An error occurred during sign in')
        return
      }

      setIsAuthenticated(true)
      if ('user' in result) {
        setUser(result.user)
      }
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Sign in error:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to KCIC Project Manager</DialogTitle>
        </DialogHeader>
        <SignInForm onSubmit={handleSubmit} />
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  )
} 