"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useAuth({ required: true, redirectTo: "/login" })

  return <>{children}</>
}
