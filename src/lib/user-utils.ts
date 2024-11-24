import { User } from "../../db/schema";

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/user')
    if (!response.ok) {
      return null
    }
    const { user } = await response.json()
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
} 