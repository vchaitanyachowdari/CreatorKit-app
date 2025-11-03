"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth(options?: { required?: boolean; redirectTo?: string }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (options?.required && status === "unauthenticated") {
      router.push(options?.redirectTo || "/login")
    }
  }, [status, router, options])

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  }
}
