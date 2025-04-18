"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import AccountLayout from "@/components/account-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { Eye, Package, ShoppingBag, Truck } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface Order {
  id: string
  date: string
  status: string
  total: number
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: string
}

// Bỏ kiểm tra đăng nhập trong trang orders
export default function OrdersPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Bỏ kiểm tra đăng nhập, chỉ tải dữ liệu mẫu
    // Simulate fetching orders
    setTimeout(() => {
      const sampleOrders: Order[] = [
        {
          id: "ORD-1234",
          date: "15/04/2023",
          status: "Đã giao hàng",
          total: 1250000,
          items: [
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
              quantity: 1,
            },
            {
              id: 4,
              name: "Son lì Thanh Tâm",
              price: 250000,
              image: "/placeholder.svg?height=100&width=100",
              quantity: 1,
            },
          ],
          shippingAddress: "123 Nguyễn Huệ, Quận 1, TP.HCM",
          paymentMethod: "Thanh toán khi nhận hàng",
          trackingNumber: "TT123456789",
          estimatedDelivery: "20/04/2023",
        },
        {
          id: "ORD-1235",
          date: "10/04/2023",
          status: "Đang vận chuyển",
          total: 850000,
          items: [
            {
              id: 2,
              name: "Serum Vitamin C",
              price: 650000,
              image: "/placeholder.svg?height=100&width=100",
              quantity: 1,
            },
            {
              id: 8,
              name: "Mặt nạ dưỡng da",
              price: 200000,
              image: "/placeholder.svg?height=100&width=100",
              quantity: 1,
            },
          ],
          shippingAddress: "456 Lê Lợi, Quận 3, TP.HCM",
          paymentMethod: "Chuyển khoản ngân hàng",
          trackingNumber: "TT987654321",
          estimatedDelivery: "15/04/2023",
        },
        {
          id: "ORD-1236",
          date: "05/04/2023",
          status: "Đang xử lý",
          total: 550000,
          items: [
            {
              id: 3,
              name: "Phấn nước Thanh Tâm",
              price: 550000,
              image: "/placeholder.svg?height=100&width=100",
              quantity: 1,
            },
          ],
          shippingAddress: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
          paymentMethod: "Thẻ tín dụng",
          estimatedDelivery: "10/04/2023",
        },
      ]

      setOrders(sampleOrders)
    }, 500)
  }, [user])

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã giao hàng":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Đang vận chuyển":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Đã hủy":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Đã giao hàng":
        return <Package className="h-4 w-4" />
      case "Đang vận chuyển":
        return <Truck className="h-4 w-4" />
      case "Đang xử lý":
        return <ShoppingBag className="h-4 w-4" />
      case "Đã hủy":
        return <Eye className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => {
          switch (activeTab) {
            case "processing":
              return order.status === "Đang xử lý"
            case "shipping":
              return order.status === "Đang vận chuyển"
            case "delivered":
              return order.status === "Đã giao hàng"
            case "cancelled":
              return order.status === "Đã hủy"
            default:
              return true
          }
        })

  if (isLoading) {
    return <div className="container py-8">Đang tải...</div>
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Đơn hàng của tôi</h1>
          <p className="text-muted-foreground">Xem và theo dõi tất cả đơn hàng của bạn</p>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
            <TabsTrigger value="shipping">Đang vận chuyển</TabsTrigger>
            <TabsTrigger value="delivered">Đã giao hàng</TabsTrigger>
            <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <ShoppingBag className="h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Không có đơn hàng nào</p>
                  <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào trong mục này</p>
                  <Link href="/products">
                    <Button className="bg-pink-600 hover:bg-pink-700">Mua sắm ngay</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Đơn hàng #{order.id}</CardTitle>
                      <CardDescription>Đặt ngày {order.date}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </Badge>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="w-12 h-12 rounded overflow-hidden bg-gray-100">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{order.items.length} sản phẩm</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-medium">{formatCurrency(order.total)}</p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-pink-600"
                          onClick={() => handleViewOrder(order)}
                        >
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>Đặt ngày {selectedOrder?.date}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-1">{selectedOrder.status}</span>
                </Badge>
                <p className="font-medium text-lg">{formatCurrency(selectedOrder.total)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Thông tin giao hàng</h3>
                  <p className="text-sm text-gray-600 mb-1">{selectedOrder.shippingAddress}</p>
                  {selectedOrder.trackingNumber && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Mã vận đơn:</span> {selectedOrder.trackingNumber}
                    </p>
                  )}
                  {selectedOrder.estimatedDelivery && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Dự kiến giao hàng:</span> {selectedOrder.estimatedDelivery}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium mb-2">Thông tin thanh toán</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Phương thức thanh toán:</span> {selectedOrder.paymentMethod}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Tổng tiền:</span> {formatCurrency(selectedOrder.total)}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Sản phẩm</h3>
                <div className="border rounded-md overflow-hidden">
                  <div className="divide-y">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center p-3">
                        <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 mr-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedOrder.status === "Đang vận chuyển" && selectedOrder.trackingNumber && (
                <div className="flex justify-center">
                  <Button className="bg-pink-600 hover:bg-pink-700">Theo dõi đơn hàng</Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AccountLayout>
  )
}
