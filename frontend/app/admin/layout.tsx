"use client";

import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
