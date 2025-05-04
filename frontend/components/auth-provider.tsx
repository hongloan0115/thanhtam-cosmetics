"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

// Cập nhật interface User để thêm trường phone
interface User {
  id: number
  fullName: string
  email?: string
  phone?: string
  role: string
  createdAt: string
  orders: any[]
  wishlist: number[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (emailOrPhone: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Kiểm tra xem người dùng đã đăng nhập chưa khi tải trang
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }

    // Khởi tạo users array nếu chưa tồn tại
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.length === 0) {
      const defaultAdminUser = {
        id: 1,
        fullName: "Admin",
        email: "admin@thanhtam.com",
        phone: "0901234567",
        password: "admin123", // Trong thực tế, mật khẩu nên được mã hóa
        role: "Admin",
        createdAt: new Date().toISOString(),
        orders: [],
        wishlist: [],
      }
      localStorage.setItem("users", JSON.stringify([defaultAdminUser]))
    }

    setIsLoading(false)
  }, [])

  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Tìm người dùng theo email hoặc số điện thoại
      const foundUser = users.find(
        (u: any) => (u.email && u.email === emailOrPhone) || (u.phone && u.phone === emailOrPhone),
      )

      // Kiểm tra mật khẩu
      if (foundUser && foundUser.password === password) {
        // Loại bỏ mật khẩu trước khi lưu vào state
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        setIsAuthenticated(true)
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Lấy danh sách người dùng từ localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      // Kiểm tra xem email hoặc số điện thoại đã tồn tại chưa
      const emailExists = userData.email && users.some((u: any) => u.email === userData.email)
      const phoneExists = userData.phone && users.some((u: any) => u.phone === userData.phone)

      if (emailExists || phoneExists) {
        return false
      }

      // Tạo người dùng mới
      const newUser = {
        id: users.length + 1,
        fullName: userData.fullName,
        email: userData.email || undefined,
        phone: userData.phone || undefined,
        password: userData.password, // Trong thực tế, mật khẩu nên được mã hóa
        role: userData.role || "Khách hàng",
        createdAt: new Date().toISOString(),
        orders: [],
        wishlist: [],
      }

      // Thêm người dùng mới vào danh sách
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      // Đăng nhập người dùng mới
      const { password, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      setIsAuthenticated(true)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")

    // Chuyển hướng về trang chủ
    router.push("/")
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    // Cập nhật thông tin người dùng trong danh sách users
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...userData } : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))
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
        isAuthenticated,
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
