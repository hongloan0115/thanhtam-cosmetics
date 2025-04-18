"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function CartPage() {
  // Sample cart data - in a real app, this would come from a state management solution
  const [cartItems, setCartItems] = useState([
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
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = subtotal > 500000 ? 0 : 30000
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
            <ShoppingBag className="h-8 w-8 text-pink-600" />
          </div>
          <h2 className="text-xl font-medium mb-2">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link href="/products">
            <Button className="bg-pink-600 hover:bg-pink-700">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-sm">
                  <tr>
                    <th className="text-left p-4">Sản phẩm</th>
                    <th className="text-center p-4">Số lượng</th>
                    <th className="text-right p-4">Thành tiền</th>
                    <th className="w-10 p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 mr-4">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Link href={`/products/${item.id}`} className="font-medium hover:text-pink-600">
                              {item.name}
                            </Link>
                            <div className="text-sm text-gray-500 mt-1">{formatCurrency(item.price)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                            className="w-12 h-8 border-y text-center"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">{formatCurrency(item.price * item.quantity)}</td>
                      <td className="p-4">
                        <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-600">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link href="/products" className="inline-flex items-center text-sm hover:text-pink-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tiếp tục mua sắm
              </Link>

              <Button
                onClick={() => setCartItems([])}
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa giỏ hàng
              </Button>
            </div>
          </div>

          <div>
            <div className="border rounded-lg p-6 space-y-6 sticky top-20">
              <h2 className="text-lg font-medium mb-4">Tóm tắt đơn hàng</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span>{shipping === 0 ? "Miễn phí" : formatCurrency(shipping)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Tổng cộng</span>
                  <span className="text-lg text-pink-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">Tiến hành thanh toán</Button>
                </Link>
                <div className="text-xs text-center text-gray-500">
                  Chúng tôi chấp nhận các phương thức thanh toán sau
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="relative">
                  <Input placeholder="Mã giảm giá" />
                  <Button
                    className="absolute right-0 top-0 h-full rounded-l-none bg-pink-600 hover:bg-pink-700"
                    size="sm"
                  >
                    Áp dụng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
