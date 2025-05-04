"use client"

import type React from "react"

import { useEffect } from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { AuthProvider } from "@/components/auth-provider"
import RouteGuard from "@/components/route-guard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Cuộn lên đầu trang khi chuyển trang
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <AuthProvider>
      <RouteGuard requireAdmin={true}>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </RouteGuard>
    </AuthProvider>
  )
}
