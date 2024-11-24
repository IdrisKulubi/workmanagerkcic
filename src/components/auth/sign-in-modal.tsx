"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/actions/auth'
import { useAuth } from './auth-provider'

export function SignInModal({ open, onOpenChange }: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setIsAuthenticated, setUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await signIn(email)
    
    if (!result.success) {
      setError(result.error || 'An error occurred during sign in')
      return
    }

    setIsAuthenticated(true)
    setUser(result.user ?? null)
    onOpenChange(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to KCIC Project Manager</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="name@kcicconsulting.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 