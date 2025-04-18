"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Package, ShoppingCart, Users, Settings, LogOut, Layers } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path)

  const menuItems = [
    {
      title: "Bảng điều khiển",
      icon: BarChart3,
      href: "/admin/dashboard",
    },
    {
      title: "Sản phẩm",
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "Danh mục",
      icon: Layers,
      href: "/admin/categories",
    },
    {
      title: "Đơn hàng",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      title: "Người dùng",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Cài đặt",
      icon: Settings,
      href: "/admin/settings",
    },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">
              TT
            </div>
            <span className="text-lg font-semibold">Thanh Tâm Admin</span>
          </div>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                className={cn("flex items-center gap-3", isActive(item.href) && "bg-pink-50 text-pink-600")}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.fullName || "Admin"} />
            <AvatarFallback>{user?.fullName?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium">{user?.fullName || "Admin"}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email || "admin@thanhtam.com"}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-500" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
