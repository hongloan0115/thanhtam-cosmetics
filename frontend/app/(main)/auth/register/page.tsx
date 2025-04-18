"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generalError, setGeneralError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError("")

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Check if email already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const emailExists = users.some((user: any) => user.email === formData.email)

      if (emailExists) {
        setGeneralError("Email đã được sử dụng. Vui lòng sử dụng email khác.")
        setIsSubmitting(false)
        return
      }

      // Register user
      const success = await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "Khách hàng", // Default role
      })

      if (success) {
        router.push("/account")
      } else {
        setGeneralError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.")
      }
    } catch (error) {
      setGeneralError("Đã xảy ra lỗi. Vui lòng thử lại sau.")
      console.error("Registration error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng ký tài khoản</CardTitle>
            <CardDescription className="text-center">Nhập thông tin của bạn để tạo tài khoản mới</CardDescription>
          </CardHeader>
          <CardContent>
            {generalError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <Link href="/terms" className="text-pink-600 hover:underline">
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link href="/privacy" className="text-pink-600 hover:underline">
                Chính sách bảo mật
              </Link>{" "}
              của chúng tôi.
            </div>
            <div className="text-center text-sm">
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="text-pink-600 hover:underline font-medium">
                Đăng nhập
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
