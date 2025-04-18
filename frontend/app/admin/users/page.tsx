"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Lock,
  UserPlus,
  ArrowUpDown,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  UserCog,
  Grid,
  List,
} from "lucide-react";

// Define user type
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  orders?: number;
  totalSpent?: number;
}

// Define form type
interface UserForm {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  password?: string;
  confirmPassword?: string;
}

export default function AdminUsers() {
  // Sample data - in a real app, this would come from a database
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Admin",
      email: "admin@thanhtam.com",
      phone: "0901234567",
      role: "Admin",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "15/04/2023 10:30",
      createdAt: "01/01/2023",
      orders: 0,
      totalSpent: 0,
    },
    {
      id: 2,
      name: "Nguyễn Thị Hương",
      email: "huong@example.com",
      phone: "0912345678",
      role: "Khách hàng",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "14/04/2023 15:45",
      createdAt: "15/01/2023",
      orders: 5,
      totalSpent: 2500000,
    },
    {
      id: 3,
      name: "Trần Văn Minh",
      email: "minh@example.com",
      phone: "0923456789",
      role: "Khách hàng",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "13/04/2023 09:20",
      createdAt: "20/01/2023",
      orders: 3,
      totalSpent: 1800000,
    },
    {
      id: 4,
      name: "Lê Thị Hà",
      email: "ha@example.com",
      phone: "0934567890",
      role: "Khách hàng",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "12/04/2023 14:10",
      createdAt: "05/02/2023",
      orders: 7,
      totalSpent: 3200000,
    },
    {
      id: 5,
      name: "Phạm Văn Đức",
      email: "duc@example.com",
      phone: "0945678901",
      role: "Nhân viên",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "15/04/2023 08:30",
      createdAt: "10/02/2023",
      orders: 0,
      totalSpent: 0,
    },
    {
      id: 6,
      name: "Hoàng Thị Mai",
      email: "mai@example.com",
      phone: "0956789012",
      role: "Khách hàng",
      status: "Bị khóa",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "10/03/2023 16:45",
      createdAt: "15/02/2023",
      orders: 2,
      totalSpent: 950000,
    },
    {
      id: 7,
      name: "Vũ Thành Nam",
      email: "nam@example.com",
      phone: "0967890123",
      role: "Khách hàng",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "14/04/2023 11:30",
      createdAt: "01/03/2023",
      orders: 4,
      totalSpent: 1650000,
    },
    {
      id: 8,
      name: "Đỗ Thị Lan",
      email: "lan@example.com",
      phone: "0978901234",
      role: "Nhân viên",
      status: "Hoạt động",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "15/04/2023 09:15",
      createdAt: "10/03/2023",
      orders: 0,
      totalSpent: 0,
    },
  ]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const [userForm, setUserForm] = useState<UserForm>({
    name: "",
    email: "",
    phone: "",
    role: "Khách hàng",
    status: "Hoạt động",
    password: "",
    confirmPassword: "",
  });

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phone && user.phone.includes(searchTerm));
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "createdAt") {
        // Simple date comparison for demo purposes
        return sortOrder === "asc"
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt);
      } else if (sortBy === "orders") {
        return sortOrder === "asc"
          ? (a.orders || 0) - (b.orders || 0)
          : (b.orders || 0) - (a.orders || 0);
      }
      return 0;
    });

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      setUsers(users.filter((user) => user.id !== userToDelete));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    setBulkDeleteDialogOpen(false);
  };

  const handleAddUser = () => {
    setUserForm({
      name: "",
      email: "",
      phone: "",
      role: "Khách hàng",
      status: "Hoạt động",
      password: "",
      confirmPassword: "",
    });
    setAddUserOpen(true);
  };

  const handleEditUser = (user: User) => {
    setUserForm({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      status: user.status,
    });
    setEditUserOpen(true);
  };

  const handleViewUser = (user: User) => {
    setCurrentUser(user);
    setViewUserOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setCurrentUser(user);
    setUserForm({
      ...userForm,
      id: user.id,
      password: "",
      confirmPassword: "",
    });
    setResetPasswordOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const handleRoleChange = (value: string) => {
    setUserForm({
      ...userForm,
      role: value,
    });
  };

  const handleStatusChange = (value: string) => {
    setUserForm({
      ...userForm,
      status: value,
    });
  };

  const saveUser = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;

    if (userForm.id) {
      // Edit existing user
      setUsers(
        users.map((user) =>
          user.id === userForm.id
            ? {
                ...user,
                name: userForm.name,
                email: userForm.email,
                phone: userForm.phone,
                role: userForm.role,
                status: userForm.status,
              }
            : user
        )
      );
      setEditUserOpen(false);
    } else {
      // Add new user
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
        role: userForm.role,
        status: userForm.status,
        avatar: "/placeholder.svg?height=40&width=40",
        createdAt: formattedDate,
        orders: 0,
        totalSpent: 0,
      };

      setUsers([...users, newUser]);
      setAddUserOpen(false);
    }
  };

  const resetPassword = () => {
    // In a real app, this would call an API to reset the password
    // For this demo, we'll just close the dialog
    setResetPasswordOpen(false);
  };

  const toggleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const exportUsers = () => {
    // In a real app, this would generate a CSV or Excel file
    alert("Xuất danh sách người dùng thành công!");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportUsers}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button
            className="bg-pink-600 hover:bg-pink-700"
            onClick={handleAddUser}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Thêm người dùng mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng người dùng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +
              {
                users.filter((u) => {
                  const parts = u.createdAt.split("/");
                  const date = new Date(
                    Number.parseInt(parts[2]),
                    Number.parseInt(parts[1]) - 1,
                    Number.parseInt(parts[0])
                  );
                  const oneMonthAgo = new Date();
                  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                  return date > oneMonthAgo;
                }).length
              }{" "}
              trong tháng này
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "Khách hàng").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(
                (users.filter((u) => u.role === "Khách hàng").length /
                  users.length) *
                  100
              )}
              % tổng người dùng
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nhân viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "Nhân viên").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(
                (users.filter((u) => u.role === "Nhân viên").length /
                  users.length) *
                  100
              )}
              % tổng người dùng
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Tài khoản bị khóa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.status === "Bị khóa").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(
                (users.filter((u) => u.status === "Bị khóa").length /
                  users.length) *
                  100
              )}
              % tổng người dùng
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách người dùng</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={viewMode === "list" ? "bg-muted" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={viewMode === "grid" ? "bg-muted" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm người dùng..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                className="border rounded-md px-3 py-2"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Tất cả vai trò</option>
                <option value="Admin">Admin</option>
                <option value="Nhân viên">Nhân viên</option>
                <option value="Khách hàng">Khách hàng</option>
              </select>

              <select
                className="border rounded-md px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Bị khóa">Bị khóa</option>
              </select>

              <Button
                variant="outline"
                onClick={() => setFilterDialogOpen(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Lọc nâng cao
              </Button>
            </div>
          </div>

          {selectedUsers.length > 0 && (
            <div className="bg-muted p-2 rounded-md mb-4 flex justify-between items-center">
              <span>{selectedUsers.length} người dùng đã chọn</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUsers([])}
                >
                  Bỏ chọn
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                >
                  Xóa đã chọn
                </Button>
              </div>
            </div>
          )}

          {viewMode === "list" ? (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox
                        checked={
                          selectedUsers.length === filteredUsers.length &&
                          filteredUsers.length > 0
                        }
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          setSortBy("name");
                          toggleSortOrder();
                        }}
                      >
                        Tên người dùng
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          setSortBy("createdAt");
                          toggleSortOrder();
                        }}
                      >
                        Ngày tạo
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          setSortBy("orders");
                          toggleSortOrder();
                        }}
                      >
                        Đơn hàng
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center py-10 text-muted-foreground"
                      >
                        Không tìm thấy người dùng nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="group">
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleSelectUser(user.id)}
                            disabled={user.role === "Admin"}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.role === "Admin"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : user.role === "Nhân viên"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>{user.orders || 0}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === "Hoạt động"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleResetPassword(user)}
                            >
                              <Lock className="h-4 w-4" />
                            </Button>
                            {user.role !== "Admin" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteClick(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredUsers.length === 0 ? (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  Không tìm thấy người dùng nào
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <Card key={user.id} className="overflow-hidden group">
                    <div className="relative">
                      {user.role !== "Admin" && (
                        <div className="absolute top-2 right-2 z-10">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleSelectUser(user.id)}
                            className="bg-white/80"
                          />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center mb-4">
                        <Avatar className="h-16 w-16 mb-2">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-center">
                          {user.name}
                        </h3>
                        <Badge variant="outline" className="mt-1 mb-2">
                          {user.role}
                        </Badge>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === "Hoạt động"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Tham gia: {user.createdAt}</span>
                        </div>
                        {user.role === "Khách hàng" && (
                          <div className="flex items-center justify-between pt-2 border-t mt-2">
                            <span className="text-muted-foreground">
                              Đơn hàng:
                            </span>
                            <span className="font-medium">{user.orders}</span>
                          </div>
                        )}
                        {user.role === "Khách hàng" &&
                          user.totalSpent !== undefined && (
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Chi tiêu:
                              </span>
                              <span className="font-medium">
                                {formatCurrency(user.totalSpent)}
                              </span>
                            </div>
                          )}
                      </div>

                      <div className="mt-4 flex justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResetPassword(user)}
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                        {user.role !== "Admin" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Hiển thị 1-{filteredUsers.length} của {filteredUsers.length} người
              dùng
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

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete confirmation dialog */}
      <Dialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa nhiều người dùng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa {selectedUsers.length} người dùng đã
              chọn? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBulkDeleteDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Advanced Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lọc nâng cao</DialogTitle>
            <DialogDescription>
              Tùy chỉnh các bộ lọc để tìm người dùng chính xác hơn.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Vai trò</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-admin" />
                  <label htmlFor="role-admin" className="text-sm">
                    Admin
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-staff" />
                  <label htmlFor="role-staff" className="text-sm">
                    Nhân viên
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="role-customer" />
                  <label htmlFor="role-customer" className="text-sm">
                    Khách hàng
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-active" />
                  <label htmlFor="status-active" className="text-sm">
                    Hoạt động
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-locked" />
                  <label htmlFor="status-locked" className="text-sm">
                    Bị khóa
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ngày tham gia</Label>
              <div className="flex items-center gap-2">
                <Input type="date" placeholder="Từ" />
                <span>-</span>
                <Input type="date" placeholder="Đến" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Số đơn hàng</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Từ" />
                <span>-</span>
                <Input type="number" placeholder="Đến" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFilterDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={() => setFilterDialogOpen(false)}>Áp dụng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={viewUserOpen} onOpenChange={setViewUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thông tin người dùng</DialogTitle>
          </DialogHeader>

          {currentUser && (
            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={
                        currentUser.role === "Admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : currentUser.role === "Nhân viên"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {currentUser.role}
                    </Badge>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        currentUser.status === "Hoạt động"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {currentUser.status}
                    </span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Thông tin</TabsTrigger>
                  <TabsTrigger value="activity">Hoạt động</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">ID:</div>
                    <div>{currentUser.id}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Vai trò:</div>
                    <div>{currentUser.role}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Trạng thái:</div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          currentUser.status === "Hoạt động"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {currentUser.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Số điện thoại:</div>
                    <div>{currentUser.phone || "Chưa cập nhật"}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Đăng nhập gần nhất:</div>
                    <div>{currentUser.lastLogin || "Chưa đăng nhập"}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Ngày tạo:</div>
                    <div>{currentUser.createdAt}</div>
                  </div>

                  {currentUser.role === "Khách hàng" && (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Số đơn hàng:</div>
                        <div>{currentUser.orders || 0}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Tổng chi tiêu:</div>
                        <div>{formatCurrency(currentUser.totalSpent || 0)}</div>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <div className="text-sm text-muted-foreground text-center py-6">
                    {currentUser.role === "Khách hàng" ? (
                      currentUser.orders && currentUser.orders > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b">
                            <span>Đơn hàng gần nhất:</span>
                            <span className="font-medium">15/04/2023</span>
                          </div>
                          <div className="flex items-center justify-between pb-2 border-b">
                            <span>Sản phẩm đã mua:</span>
                            <span className="font-medium">
                              {currentUser.orders * 2}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pb-2 border-b">
                            <span>Giá trị trung bình/đơn:</span>
                            <span className="font-medium">
                              {formatCurrency(
                                (currentUser.totalSpent || 0) /
                                  (currentUser.orders || 1)
                              )}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ShieldAlert className="h-10 w-10 text-muted-foreground mb-2" />
                          <p>Người dùng chưa có đơn hàng nào</p>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center">
                        {currentUser.role === "Admin" ? (
                          <>
                            <ShieldCheck className="h-10 w-10 text-muted-foreground mb-2" />
                            <p>Tài khoản quản trị viên</p>
                          </>
                        ) : (
                          <>
                            <UserCog className="h-10 w-10 text-muted-foreground mb-2" />
                            <p>Tài khoản nhân viên</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setViewUserOpen(false);
                    handleEditUser(currentUser);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setViewUserOpen(false);
                    handleResetPassword(currentUser);
                  }}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Đặt lại mật khẩu
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
            <DialogDescription>
              Điền thông tin người dùng mới vào form bên dưới.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input
                id="name"
                name="name"
                value={userForm.name}
                onChange={handleFormChange}
                placeholder="Nhập tên người dùng"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleFormChange}
                placeholder="Nhập email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                value={userForm.phone}
                onChange={handleFormChange}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Select value={userForm.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                    <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select
                  value={userForm.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                    <SelectItem value="Bị khóa">Bị khóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={userForm.password}
                onChange={handleFormChange}
                placeholder="Nhập mật khẩu"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={userForm.confirmPassword}
                onChange={handleFormChange}
                placeholder="Nhập lại mật khẩu"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={saveUser}
              className="bg-pink-600 hover:bg-pink-700"
              disabled={
                !userForm.name ||
                !userForm.email ||
                !userForm.password ||
                userForm.password !== userForm.confirmPassword
              }
            >
              Thêm người dùng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin người dùng.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Tên người dùng</Label>
              <Input
                id="edit-name"
                name="name"
                value={userForm.name}
                onChange={handleFormChange}
                placeholder="Nhập tên người dùng"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleFormChange}
                placeholder="Nhập email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">Số điện thoại</Label>
              <Input
                id="edit-phone"
                name="phone"
                value={userForm.phone}
                onChange={handleFormChange}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role">Vai trò</Label>
                <Select value={userForm.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                    <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Trạng thái</Label>
                <Select
                  value={userForm.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                    <SelectItem value="Bị khóa">Bị khóa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUserOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={saveUser}
              className="bg-pink-600 hover:bg-pink-700"
              disabled={!userForm.name || !userForm.email}
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Đặt lại mật khẩu</DialogTitle>
            <DialogDescription>
              Đặt lại mật khẩu cho người dùng {currentUser?.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-password">Mật khẩu mới</Label>
              <Input
                id="reset-password"
                name="password"
                type="password"
                value={userForm.password}
                onChange={handleFormChange}
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="reset-confirmPassword"
                name="confirmPassword"
                type="password"
                value={userForm.confirmPassword}
                onChange={handleFormChange}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setResetPasswordOpen(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={resetPassword}
              className="bg-pink-600 hover:bg-pink-700"
              disabled={
                !userForm.password ||
                userForm.password !== userForm.confirmPassword
              }
            >
              Đặt lại mật khẩu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
