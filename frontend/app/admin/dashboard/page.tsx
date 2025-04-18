"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DollarSign, Package, ShoppingCart, Users, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function AdminDashboard() {
  // Sample data - in a real app, this would come from a database
  const stats = [
    {
      title: "Tổng doanh thu",
      value: formatCurrency(12500000),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Đơn hàng mới",
      value: "45",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Sản phẩm",
      value: "128",
      change: "+3.1%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Khách hàng",
      value: "573",
      change: "-2.5%",
      trend: "down",
      icon: Users,
    },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Nguyễn Thị Hương",
      date: "15/04/2023",
      amount: 850000,
      status: "Đã giao hàng",
    },
    {
      id: "ORD-002",
      customer: "Trần Văn Minh",
      date: "14/04/2023",
      amount: 1250000,
      status: "Đang xử lý",
    },
    {
      id: "ORD-003",
      customer: "Lê Thị Hà",
      date: "13/04/2023",
      amount: 450000,
      status: "Đã giao hàng",
    },
    {
      id: "ORD-004",
      customer: "Phạm Văn Đức",
      date: "12/04/2023",
      amount: 750000,
      status: "Đang vận chuyển",
    },
    {
      id: "ORD-005",
      customer: "Hoàng Thị Mai",
      date: "11/04/2023",
      amount: 950000,
      status: "Đã giao hàng",
    },
  ]

  const topProducts = [
    {
      id: 1,
      name: "Kem dưỡng ẩm Thanh Tâm",
      category: "Chăm sóc da",
      price: 450000,
      sold: 124,
      stock: 45,
    },
    {
      id: 3,
      name: "Phấn nước Thanh Tâm",
      category: "Trang điểm",
      price: 550000,
      sold: 98,
      stock: 32,
    },
    {
      id: 4,
      name: "Son lì Thanh Tâm",
      category: "Trang điểm",
      price: 350000,
      sold: 87,
      stock: 56,
    },
    {
      id: 2,
      name: "Serum Vitamin C",
      category: "Chăm sóc da",
      price: 650000,
      sold: 76,
      stock: 28,
    },
    {
      id: 7,
      name: "Nước hoa Thanh Tâm",
      category: "Nước hoa",
      price: 850000,
      sold: 65,
      stock: 18,
    },
  ]

  // Dữ liệu biểu đồ doanh thu theo tháng
  const monthlyRevenue = [
    { month: "T1", revenue: 4500000 },
    { month: "T2", revenue: 5200000 },
    { month: "T3", revenue: 4800000 },
    { month: "T4", revenue: 6100000 },
    { month: "T5", revenue: 5800000 },
    { month: "T6", revenue: 7200000 },
    { month: "T7", revenue: 8500000 },
    { month: "T8", revenue: 7800000 },
    { month: "T9", revenue: 8200000 },
    { month: "T10", revenue: 9500000 },
    { month: "T11", revenue: 10800000 },
    { month: "T12", revenue: 12500000 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bảng điều khiển</h1>
        <Link href="/admin/products">
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm mới
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <stat.icon className="h-5 w-5 text-pink-600" />
                </div>
                <div className={`flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  <span className="text-sm font-medium">{stat.change}</span>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 ml-1" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <Link href="/admin/orders" className="text-sm text-pink-600 hover:underline">
              Xem tất cả
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium">Mã đơn hàng</th>
                    <th className="pb-3 font-medium">Khách hàng</th>
                    <th className="pb-3 font-medium">Ngày đặt</th>
                    <th className="pb-3 font-medium text-right">Số tiền</th>
                    <th className="pb-3 font-medium text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="text-sm hover:bg-gray-50">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3 text-right">{formatCurrency(order.amount)}</td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Đã giao hàng"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Đang vận chuyển"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Phân tích bán hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week">
              <TabsList className="mb-4">
                <TabsTrigger value="week">Tuần</TabsTrigger>
                <TabsTrigger value="month">Tháng</TabsTrigger>
                <TabsTrigger value="year">Năm</TabsTrigger>
              </TabsList>
              <TabsContent value="week" className="space-y-4">
                <div className="h-[200px] bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-4 flex flex-col justify-center items-center">
                  <div className="w-full h-full flex items-end justify-around">
                    {[40, 65, 30, 85, 55, 70, 45].map((height, index) => (
                      <div key={index} className="relative group">
                        <div
                          className="w-6 bg-pink-600 rounded-t-sm transition-all duration-300 group-hover:bg-pink-700"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2">
                          {formatCurrency(height * 10000)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex justify-around mt-2">
                    {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Tổng doanh thu</p>
                    <p className="text-xl font-bold">{formatCurrency(3250000)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Đơn hàng</p>
                    <p className="text-xl font-bold">18</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="month" className="space-y-4">
                <div className="h-[200px] bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-4 flex flex-col justify-center items-center">
                  <div className="w-full h-full flex items-end justify-around">
                    {[50, 70, 60, 85, 75, 90, 65, 80, 70, 85, 95, 100].map((height, index) => (
                      <div key={index} className="relative group">
                        <div
                          className="w-4 bg-pink-600 rounded-t-sm transition-all duration-300 group-hover:bg-pink-700"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2">
                          {formatCurrency(height * 100000)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex justify-around mt-2">
                    {monthlyRevenue.map((item, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        {item.month}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Tổng doanh thu</p>
                    <p className="text-xl font-bold">{formatCurrency(12500000)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Đơn hàng</p>
                    <p className="text-xl font-bold">45</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="year" className="space-y-4">
                <div className="h-[200px] bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-4 flex flex-col justify-center items-center">
                  <div className="w-full h-full flex items-end justify-around">
                    {[30, 45, 60, 75, 90].map((height, index) => (
                      <div key={index} className="relative group">
                        <div
                          className="w-12 bg-pink-600 rounded-t-sm transition-all duration-300 group-hover:bg-pink-700"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2">
                          {formatCurrency(height * 1000000)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex justify-around mt-2">
                    {["2019", "2020", "2021", "2022", "2023"].map((year, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        {year}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Tổng doanh thu</p>
                    <p className="text-xl font-bold">{formatCurrency(145000000)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Đơn hàng</p>
                    <p className="text-xl font-bold">573</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Top products */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sản phẩm bán chạy</CardTitle>
          <Link href="/admin/products" className="text-sm text-pink-600 hover:underline">
            Quản lý sản phẩm
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">Sản phẩm</th>
                  <th className="pb-3 font-medium">Danh mục</th>
                  <th className="pb-3 font-medium text-right">Giá</th>
                  <th className="pb-3 font-medium text-right">Đã bán</th>
                  <th className="pb-3 font-medium text-right">Tồn kho</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topProducts.map((product) => (
                  <tr key={product.id} className="text-sm hover:bg-gray-50">
                    <td className="py-3 font-medium">{product.name}</td>
                    <td className="py-3">{product.category}</td>
                    <td className="py-3 text-right">{formatCurrency(product.price)}</td>
                    <td className="py-3 text-right">{product.sold}</td>
                    <td className="py-3 text-right">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
