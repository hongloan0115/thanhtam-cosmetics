"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
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

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu"
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
      const success = await login(formData.email, formData.password)

      if (success) {
        // Check if user is admin to redirect to admin dashboard
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const user = users.find((u: any) => u.email === formData.email)

        if (user && user.role === "Admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/account")
        }
      } else {
        setGeneralError("Email hoặc mật khẩu không chính xác")
      }
    } catch (error) {
      setGeneralError("Đã xảy ra lỗi. Vui lòng thử lại sau.")
      console.error("Login error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">Nhập thông tin đăng nhập của bạn để tiếp tục</CardDescription>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-pink-600 hover:underline">
                      Quên mật khẩu?
                    </Link>
                  </div>
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

                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="rememberMe" className="text-sm font-normal">
                    Ghi nhớ đăng nhập
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isSubmitting}>
                  {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center w-full text-sm">
              Chưa có tài khoản?{" "}
              <Link href="/auth/register" className="text-pink-600 hover:underline font-medium">
                Đăng ký ngay
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
