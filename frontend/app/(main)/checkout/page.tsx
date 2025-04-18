"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, Truck } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function CheckoutPage() {
  const router = useRouter()

  // Sample cart data - in a real app, this would come from a state management solution
  const cartItems = [
    {
      id: 1,
      name: "Kem dưỡng ẩm Thanh Tâm",
      price: 450000,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
    },
    {
      id: 3,
      name: "Phấn nước Thanh Tâm",
      price: 550000,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
    },
  ]

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    paymentMethod: "cod",
    notes: "",
  })

  const [formErrors, setFormErrors] = useState({
    fullName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
    district: false,
    ward: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: false,
      })
    }
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData({
      ...formData,
      paymentMethod: value,
    })
  }

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName,
      email: !formData.email,
      phone: !formData.phone,
      address: !formData.address,
      city: !formData.city,
      district: !formData.district,
      ward: !formData.ward,
    }

    setFormErrors(errors)
    return !Object.values(errors).some(Boolean)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, you would submit the order to your backend here
      // For this demo, we'll just redirect to the confirmation page

      // Create a simple order object to pass to the confirmation page
      const order = {
        id: `ORD-${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`,
        date: new Date().toLocaleDateString("vi-VN"),
        items: cartItems,
        subtotal: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        shipping: 30000,
        total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 30000,
        customer: formData,
      }

      // In a real app, you would store this in a database
      // For this demo, we'll use localStorage to simulate persistence
      localStorage.setItem("lastOrder", JSON.stringify(order))

      // Redirect to confirmation page
      router.push("/checkout/confirmation")
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 30000 // Fixed shipping cost
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Link href="/cart" className="inline-flex items-center text-sm hover:text-pink-600">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại giỏ hàng
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-pink-600" />
                  Thông tin giao hàng
                </CardTitle>
                <CardDescription>Vui lòng nhập thông tin giao hàng của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Họ và tên <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={formErrors.fullName ? "border-red-500" : ""}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs">Vui lòng nhập họ và tên</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs">Vui lòng nhập email</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs">Vui lòng nhập số điện thoại</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    Địa chỉ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={formErrors.address ? "border-red-500" : ""}
                  />
                  {formErrors.address && <p className="text-red-500 text-xs">Vui lòng nhập địa chỉ</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={formErrors.city ? "border-red-500" : ""}
                    />
                    {formErrors.city && <p className="text-red-500 text-xs">Vui lòng nhập tỉnh/thành phố</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">
                      Quận/Huyện <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className={formErrors.district ? "border-red-500" : ""}
                    />
                    {formErrors.district && <p className="text-red-500 text-xs">Vui lòng nhập quận/huyện</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">
                      Phường/Xã <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="ward"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      className={formErrors.ward ? "border-red-500" : ""}
                    />
                    {formErrors.ward && <p className="text-red-500 text-xs">Vui lòng nhập phường/xã</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-pink-600" />
                  Phương thức thanh toán
                </CardTitle>
                <CardDescription>Chọn phương thức thanh toán phù hợp với bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-pink-600">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-sm text-gray-500">Thanh toán bằng tiền mặt khi nhận hàng</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-pink-600">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      <div className="font-medium">Chuyển khoản ngân hàng</div>
                      <div className="text-sm text-gray-500">Chuyển khoản trực tiếp đến tài khoản của chúng tôi</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-pink-600">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex-1 cursor-pointer">
                      <div className="font-medium">Thẻ tín dụng/Thẻ ghi nợ</div>
                      <div className="text-sm text-gray-500">Thanh toán an toàn với thẻ của bạn</div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ghi chú đơn hàng</CardTitle>
                <CardDescription>Thêm ghi chú hoặc yêu cầu đặc biệt cho đơn hàng của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Thời gian giao hàng, hướng dẫn giao hàng..."
                  className="h-24"
                />
              </CardContent>
            </Card>
          </form>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Đơn hàng của bạn</CardTitle>
              <CardDescription>Tóm tắt đơn hàng và thanh toán</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-2 border-b">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 mr-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">SL: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Tổng cộng</span>
                  <span className="text-pink-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" onClick={handleSubmit}>
                Đặt hàng
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
