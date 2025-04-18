"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  MoreVertical,
  Eye,
  Truck,
  XCircle,
  ArrowUpDown,
  Calendar,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Define order type
interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer: string;
  email?: string;
  phone?: string;
  address?: string;
  date: string;
  amount: number;
  status: string;
  items: OrderItem[];
  payment: string;
  notes?: string;
}

// Define form type
interface OrderForm {
  id?: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  payment: string;
  status: string;
  items: OrderItem[];
  notes: string;
}

export default function AdminOrders() {
  // Sample data - in a real app, this would come from a database
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "Nguyễn Thị Hương",
      email: "huong@example.com",
      phone: "0901234567",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      date: "15/04/2023",
      amount: 850000,
      status: "Đã giao hàng",
      items: [
        {
          id: 1,
          productId: 1,
          productName: "Kem dưỡng ẩm Thanh Tâm",
          price: 450000,
          quantity: 1,
        },
        {
          id: 2,
          productId: 4,
          productName: "Son lì Thanh Tâm",
          price: 350000,
          quantity: 1,
        },
        {
          id: 3,
          productId: 8,
          productName: "Mặt nạ dưỡng da",
          price: 50000,
          quantity: 1,
        },
      ],
      payment: "Thanh toán khi nhận hàng",
      notes: "Giao hàng trong giờ hành chính",
    },
    {
      id: "ORD-002",
      customer: "Trần Văn Minh",
      email: "minh@example.com",
      phone: "0912345678",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      date: "14/04/2023",
      amount: 1250000,
      status: "Đang xử lý",
      items: [
        {
          id: 1,
          productId: 2,
          productName: "Serum Vitamin C",
          price: 650000,
          quantity: 1,
        },
        {
          id: 2,
          productId: 3,
          productName: "Phấn nước Thanh Tâm",
          price: 550000,
          quantity: 1,
        },
        {
          id: 3,
          productId: 8,
          productName: "Mặt nạ dưỡng da",
          price: 50000,
          quantity: 1,
        },
      ],
      payment: "Chuyển khoản ngân hàng",
    },
    {
      id: "ORD-003",
      customer: "Lê Thị Hà",
      email: "ha@example.com",
      phone: "0923456789",
      address: "789 Trần Hưng Đạo, Quận 5, TP.HCM",
      date: "13/04/2023",
      amount: 450000,
      status: "Đã giao hàng",
      items: [
        {
          id: 1,
          productId: 1,
          productName: "Kem dưỡng ẩm Thanh Tâm",
          price: 450000,
          quantity: 1,
        },
      ],
      payment: "Thẻ tín dụng",
    },
    {
      id: "ORD-004",
      customer: "Phạm Văn Đức",
      email: "duc@example.com",
      phone: "0934567890",
      address: "101 Nguyễn Du, Quận 1, TP.HCM",
      date: "12/04/2023",
      amount: 750000,
      status: "Đang vận chuyển",
      items: [
        {
          id: 1,
          productId: 7,
          productName: "Nước hoa Thanh Tâm",
          price: 750000,
          quantity: 1,
        },
      ],
      payment: "Thanh toán khi nhận hàng",
      notes: "Gọi trước khi giao hàng",
    },
    {
      id: "ORD-005",
      customer: "Hoàng Thị Mai",
      email: "mai@example.com",
      phone: "0945678901",
      address: "202 Lý Tự Trọng, Quận 1, TP.HCM",
      date: "11/04/2023",
      amount: 950000,
      status: "Đã giao hàng",
      items: [
        {
          id: 1,
          productId: 2,
          productName: "Serum Vitamin C",
          price: 650000,
          quantity: 1,
        },
        {
          id: 2,
          productId: 4,
          productName: "Son lì Thanh Tâm",
          price: 300000,
          quantity: 1,
        },
      ],
      payment: "Thẻ tín dụng",
    },
    {
      id: "ORD-006",
      customer: "Vũ Thành Nam",
      email: "nam@example.com",
      phone: "0956789012",
      address: "303 Hai Bà Trưng, Quận 3, TP.HCM",
      date: "10/04/2023",
      amount: 550000,
      status: "Đã hủy",
      items: [
        {
          id: 1,
          productId: 3,
          productName: "Phấn nước Thanh Tâm",
          price: 550000,
          quantity: 1,
        },
      ],
      payment: "Chuyển khoản ngân hàng",
      notes: "Khách hàng đổi ý",
    },
    {
      id: "ORD-007",
      customer: "Đỗ Thị Lan",
      email: "lan@example.com",
      phone: "0967890123",
      address: "404 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
      date: "09/04/2023",
      amount: 1150000,
      status: "Đang xử lý",
      items: [
        {
          id: 1,
          productId: 2,
          productName: "Serum Vitamin C",
          price: 650000,
          quantity: 1,
        },
        {
          id: 2,
          productId: 1,
          productName: "Kem dưỡng ẩm Thanh Tâm",
          price: 450000,
          quantity: 1,
        },
        {
          id: 3,
          productId: 8,
          productName: "Mặt nạ dưỡng da",
          price: 50000,
          quantity: 1,
        },
      ],
      payment: "Thanh toán khi nhận hàng",
    },
    {
      id: "ORD-008",
      customer: "Ngô Văn Hùng",
      email: "hung@example.com",
      phone: "0978901234",
      address: "505 Cách Mạng Tháng 8, Quận 10, TP.HCM",
      date: "08/04/2023",
      amount: 350000,
      status: "Đã giao hàng",
      items: [
        {
          id: 1,
          productId: 4,
          productName: "Son lì Thanh Tâm",
          price: 350000,
          quantity: 1,
        },
      ],
      payment: "Thẻ tín dụng",
    },
  ]);

  // Sample products for order creation
  const products = [
    { id: 1, name: "Kem dưỡng ẩm Thanh Tâm", price: 450000 },
    { id: 2, name: "Serum Vitamin C", price: 650000 },
    { id: 3, name: "Phấn nước Thanh Tâm", price: 550000 },
    { id: 4, name: "Son lì Thanh Tâm", price: 350000 },
    { id: 5, name: "Dầu gội Thanh Tâm", price: 250000 },
    { id: 6, name: "Sữa tắm Thanh Tâm", price: 280000 },
    { id: 7, name: "Nước hoa Thanh Tâm", price: 850000 },
    { id: 8, name: "Mặt nạ dưỡng da", price: 150000 },
  ];

  const [viewOrderOpen, setViewOrderOpen] = useState(false);
  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const [editOrderOpen, setEditOrderOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const [orderForm, setOrderForm] = useState<OrderForm>({
    customer: "",
    email: "",
    phone: "",
    address: "",
    payment: "",
    status: "Đang xử lý",
    items: [],
    notes: "",
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setViewOrderOpen(true);
  };

  const handleAddOrder = () => {
    setOrderForm({
      customer: "",
      email: "",
      phone: "",
      address: "",
      payment: "Thanh toán khi nhận hàng",
      status: "Đang xử lý",
      items: [],
      notes: "",
    });
    setAddOrderOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setOrderForm({
      id: order.id,
      customer: order.customer,
      email: order.email || "",
      phone: order.phone || "",
      address: order.address || "",
      payment: order.payment,
      status: order.status,
      items: [...order.items],
      notes: order.notes || "",
    });
    setEditOrderOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderForm({
      ...orderForm,
      [name]: value,
    });
  };

  const handleStatusChange = (value: string) => {
    setOrderForm({
      ...orderForm,
      status: value,
    });
  };

  const handlePaymentChange = (value: string) => {
    setOrderForm({
      ...orderForm,
      payment: value,
    });
  };

  const handleAddItem = () => {
    if (products.length > 0) {
      const product = products[0];
      const newItem: OrderItem = {
        id: orderForm.items.length + 1,
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
      };

      setOrderForm({
        ...orderForm,
        items: [...orderForm.items, newItem],
      });
    }
  };

  const handleRemoveItem = (itemId: number) => {
    setOrderForm({
      ...orderForm,
      items: orderForm.items.filter((item) => item.id !== itemId),
    });
  };

  const handleItemChange = (itemId: number, field: string, value: any) => {
    setOrderForm({
      ...orderForm,
      items: orderForm.items.map((item) => {
        if (item.id === itemId) {
          if (field === "productId") {
            const product = products.find((p) => p.id === Number(value));
            if (product) {
              return {
                ...item,
                productId: product.id,
                productName: product.name,
                price: product.price,
              };
            }
          }
          return {
            ...item,
            [field]: field === "quantity" ? Number(value) : value,
          };
        }
        return item;
      }),
    });
  };

  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const saveOrder = () => {
    const total = calculateTotal(orderForm.items);

    if (orderForm.id) {
      // Edit existing order
      setOrders(
        orders.map((order) =>
          order.id === orderForm.id
            ? {
                ...order,
                customer: orderForm.customer,
                email: orderForm.email,
                phone: orderForm.phone,
                address: orderForm.address,
                payment: orderForm.payment,
                status: orderForm.status,
                items: orderForm.items,
                amount: total,
                notes: orderForm.notes,
              }
            : order
        )
      );
      setEditOrderOpen(false);
    } else {
      // Add new order
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${today.getFullYear()}`;

      const newOrder: Order = {
        id: `ORD-${(orders.length + 1).toString().padStart(3, "0")}`,
        customer: orderForm.customer,
        email: orderForm.email,
        phone: orderForm.phone,
        address: orderForm.address,
        date: formattedDate,
        amount: total,
        status: orderForm.status,
        items: orderForm.items,
        payment: orderForm.payment,
        notes: orderForm.notes,
      };

      setOrders([...orders, newOrder]);
      setAddOrderOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <Button
          className="bg-pink-600 hover:bg-pink-700"
          onClick={handleAddOrder}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm đơn hàng mới
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Danh sách đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm đơn hàng..." className="pl-9" />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Từ ngày" className="pl-9 w-40" />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Đến ngày" className="pl-9 w-40" />
            </div>

            <select className="border rounded-md px-3 py-2">
              <option value="all">Tất cả trạng thái</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipping">Đang vận chuyển</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Mã đơn hàng
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Ngày đặt
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Số lượng</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead className="text-right">Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">
                      {order.items.length}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>{order.payment}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === "Đã giao hàng"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Đang vận chuyển"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Chi tiết</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditOrder(order)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Chỉnh sửa</span>
                          </DropdownMenuItem>
                          {order.status === "Đang xử lý" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "Đang vận chuyển")
                              }
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              <span>Chuyển sang vận chuyển</span>
                            </DropdownMenuItem>
                          )}
                          {order.status === "Đang vận chuyển" && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "Đã giao hàng")
                              }
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              <span>Đánh dấu đã giao</span>
                            </DropdownMenuItem>
                          )}
                          {(order.status === "Đang xử lý" ||
                            order.status === "Đang vận chuyển") && (
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "Đã hủy")
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Hủy đơn hàng</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Hiển thị 1-{orders.length} của {orders.length} đơn hàng
            </div>
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-pink-600 text-white"
              >
                1
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>

          {currentOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      {currentOrder.id}
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          currentOrder.status === "Đã giao hàng"
                            ? "bg-green-100 text-green-800"
                            : currentOrder.status === "Đang vận chuyển"
                            ? "bg-blue-100 text-blue-800"
                            : currentOrder.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {currentOrder.status}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-500">
                      Ngày đặt: {currentOrder.date}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Thông tin khách hàng</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Tên:</span>{" "}
                        {currentOrder.customer}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {currentOrder.email}
                      </p>
                      <p>
                        <span className="font-medium">Điện thoại:</span>{" "}
                        {currentOrder.phone}
                      </p>
                      <p>
                        <span className="font-medium">Địa chỉ:</span>{" "}
                        {currentOrder.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Thông tin thanh toán</h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Phương thức:</span>{" "}
                        {currentOrder.payment}
                      </p>
                      <p>
                        <span className="font-medium">Tổng tiền:</span>{" "}
                        {formatCurrency(currentOrder.amount)}
                      </p>
                    </div>
                  </div>

                  {currentOrder.notes && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Ghi chú</h4>
                      <p className="text-sm">{currentOrder.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Sản phẩm</h4>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead className="text-right">Giá</TableHead>
                          <TableHead className="text-right">SL</TableHead>
                          <TableHead className="text-right">Tổng</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(item.price)}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(item.price * item.quantity)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-between pt-4 font-medium">
                    <span>Tổng cộng</span>
                    <span>{formatCurrency(currentOrder.amount)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setViewOrderOpen(false);
                    handleEditOrder(currentOrder);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>

                {currentOrder.status === "Đang xử lý" && (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      updateOrderStatus(currentOrder.id, "Đang vận chuyển");
                      setViewOrderOpen(false);
                    }}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Chuyển sang vận chuyển
                  </Button>
                )}

                {currentOrder.status === "Đang vận chuyển" && (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      updateOrderStatus(currentOrder.id, "Đã giao hàng");
                      setViewOrderOpen(false);
                    }}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Đánh dấu đã giao
                  </Button>
                )}

                {(currentOrder.status === "Đang xử lý" ||
                  currentOrder.status === "Đang vận chuyển") && (
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      updateOrderStatus(currentOrder.id, "Đã hủy");
                      setViewOrderOpen(false);
                    }}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Hủy đơn hàng
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Order Dialog */}
      <Dialog open={addOrderOpen} onOpenChange={setAddOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Thêm đơn hàng mới</DialogTitle>
            <DialogDescription>
              Điền thông tin đơn hàng mới vào form bên dưới.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Tên khách hàng</Label>
                <Input
                  id="customer"
                  name="customer"
                  value={orderForm.customer}
                  onChange={handleFormChange}
                  placeholder="Nhập tên khách hàng"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={orderForm.email}
                  onChange={handleFormChange}
                  placeholder="Nhập email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleFormChange}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={orderForm.address}
                  onChange={handleFormChange}
                  placeholder="Nhập địa chỉ giao hàng"
                  className="h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment">Phương thức thanh toán</Label>
                  <Select
                    value={orderForm.payment}
                    onValueChange={handlePaymentChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương thức" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Thanh toán khi nhận hàng">
                        Thanh toán khi nhận hàng
                      </SelectItem>
                      <SelectItem value="Chuyển khoản ngân hàng">
                        Chuyển khoản ngân hàng
                      </SelectItem>
                      <SelectItem value="Thẻ tín dụng">Thẻ tín dụng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={orderForm.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                      <SelectItem value="Đang vận chuyển">
                        Đang vận chuyển
                      </SelectItem>
                      <SelectItem value="Đã giao hàng">Đã giao hàng</SelectItem>
                      <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={orderForm.notes}
                  onChange={handleFormChange}
                  placeholder="Nhập ghi chú đơn hàng"
                  className="h-20"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Sản phẩm</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm sản phẩm
                </Button>
              </div>

              {orderForm.items.length === 0 ? (
                <div className="border rounded-md p-8 text-center text-gray-500">
                  Chưa có sản phẩm nào. Nhấn "Thêm sản phẩm" để bắt đầu.
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead className="text-right">SL</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderForm.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Select
                              value={item.productId.toString()}
                              onValueChange={(value) =>
                                handleItemChange(
                                  item.id,
                                  "productId",
                                  Number(value)
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn sản phẩm" />
                              </SelectTrigger>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id.toString()}
                                  >
                                    {product.name} -{" "}
                                    {formatCurrency(product.price)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="w-16 ml-auto"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <div className="flex justify-between pt-4 font-medium">
                <span>Tổng cộng</span>
                <span>{formatCurrency(calculateTotal(orderForm.items))}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOrderOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={saveOrder}
              className="bg-pink-600 hover:bg-pink-700"
              disabled={orderForm.items.length === 0 || !orderForm.customer}
            >
              Thêm đơn hàng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={editOrderOpen} onOpenChange={setEditOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin đơn hàng.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-customer">Tên khách hàng</Label>
                <Input
                  id="edit-customer"
                  name="customer"
                  value={orderForm.customer}
                  onChange={handleFormChange}
                  placeholder="Nhập tên khách hàng"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={orderForm.email}
                  onChange={handleFormChange}
                  placeholder="Nhập email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-phone">Số điện thoại</Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleFormChange}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-address">Địa chỉ</Label>
                <Textarea
                  id="edit-address"
                  name="address"
                  value={orderForm.address}
                  onChange={handleFormChange}
                  placeholder="Nhập địa chỉ giao hàng"
                  className="h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-payment">Phương thức thanh toán</Label>
                  <Select
                    value={orderForm.payment}
                    onValueChange={handlePaymentChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương thức" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Thanh toán khi nhận hàng">
                        Thanh toán khi nhận hàng
                      </SelectItem>
                      <SelectItem value="Chuyển khoản ngân hàng">
                        Chuyển khoản ngân hàng
                      </SelectItem>
                      <SelectItem value="Thẻ tín dụng">Thẻ tín dụng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status">Trạng thái</Label>
                  <Select
                    value={orderForm.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                      <SelectItem value="Đang vận chuyển">
                        Đang vận chuyển
                      </SelectItem>
                      <SelectItem value="Đã giao hàng">Đã giao hàng</SelectItem>
                      <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Ghi chú</Label>
                <Textarea
                  id="edit-notes"
                  name="notes"
                  value={orderForm.notes}
                  onChange={handleFormChange}
                  placeholder="Nhập ghi chú đơn hàng"
                  className="h-20"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Sản phẩm</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm sản phẩm
                </Button>
              </div>

              {orderForm.items.length === 0 ? (
                <div className="border rounded-md p-8 text-center text-gray-500">
                  Chưa có sản phẩm nào. Nhấn "Thêm sản phẩm" để bắt đầu.
                </div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead className="text-right">SL</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderForm.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Select
                              value={item.productId.toString()}
                              onValueChange={(value) =>
                                handleItemChange(
                                  item.id,
                                  "productId",
                                  Number(value)
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn sản phẩm" />
                              </SelectTrigger>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem
                                    key={product.id}
                                    value={product.id.toString()}
                                  >
                                    {product.name} -{" "}
                                    {formatCurrency(product.price)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  item.id,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              className="w-16 ml-auto"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <div className="flex justify-between pt-4 font-medium">
                <span>Tổng cộng</span>
                <span>{formatCurrency(calculateTotal(orderForm.items))}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOrderOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={saveOrder}
              className="bg-pink-600 hover:bg-pink-700"
              disabled={orderForm.items.length === 0 || !orderForm.customer}
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
