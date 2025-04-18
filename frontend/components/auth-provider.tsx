"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: number
  fullName: string
  email: string
  phone: string
  role: string
  createdAt: string
  orders: any[]
  wishlist: number[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Thay đổi hàm AuthProvider để tạm thời bỏ qua việc kiểm tra đăng nhập
export function AuthProvider({ children }: { children: ReactNode }) {
  // Tạo một user mẫu với quyền admin để có thể truy cập tất cả các trang
  const defaultAdminUser = {
    id: 1,
    fullName: "Admin",
    email: "admin@thanhtam.com",
    phone: "0901234567",
    role: "Admin",
    createdAt: new Date().toISOString(),
    orders: [],
    wishlist: [],
  }

  const [user, setUser] = useState<User | null>(defaultAdminUser) // Luôn đặt user là admin
  const [isLoading, setIsLoading] = useState(false) // Đặt isLoading là false để không hiển thị màn hình loading
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Khởi tạo users array với admin user nếu chưa tồn tại
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.length === 0) {
      localStorage.setItem("users", JSON.stringify([defaultAdminUser]))
    }

    // Lưu user admin vào localStorage để đảm bảo tính nhất quán
    localStorage.setItem("currentUser", JSON.stringify(defaultAdminUser))

    setIsLoading(false)
  }, [])

  // Các hàm khác giữ nguyên
  const login = async (email: string, password: string): Promise<boolean> => {
    // Luôn trả về true để giả lập đăng nhập thành công
    return Promise.resolve(true)
  }

  const register = async (userData: any): Promise<boolean> => {
    // Luôn trả về true để giả lập đăng ký thành công
    return Promise.resolve(true)
  }

  const logout = () => {
    // Không xóa user, chỉ chuyển hướng về trang chủ nếu cần
    if (pathname.startsWith("/account") || pathname.startsWith("/admin")) {
      router.push("/")
    }
  }

  // Các hàm còn lại giữ nguyên
  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
  }

  const addToWishlist = (productId: number) => {
    if (!user) return

    if (user.wishlist.includes(productId)) return

    const updatedWishlist = [...user.wishlist, productId]
    updateUser({ wishlist: updatedWishlist })
  }

  const removeFromWishlist = (productId: number) => {
    if (!user) return

    const updatedWishlist = user.wishlist.filter((id) => id !== productId)
    updateUser({ wishlist: updatedWishlist })
  }

  const isInWishlist = (productId: number): boolean => {
    return user ? user.wishlist.includes(productId) : false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
