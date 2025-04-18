"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Upload,
  X,
  Filter,
  ArrowUpDown,
  Eye,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Define category type
interface Category {
  id: string
  name: string
  description?: string
  image?: string
  productCount: number
  status: "active" | "inactive"
  createdAt: string
}

// Define form type
interface CategoryForm {
  id?: string
  name: string
  description: string
  image: string
  status: "active" | "inactive"
}

export default function AdminCategories() {
  // Sample data - in a real app, this would come from a database
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "skincare",
      name: "Chăm sóc da",
      description: "Các sản phẩm chăm sóc da mặt và cơ thể",
      image: "/placeholder.svg?height=200&width=200",
      productCount: 45,
      status: "active",
      createdAt: "15/03/2023",
    },
    {
      id: "makeup",
      name: "Trang điểm",
      description: "Các sản phẩm trang điểm cho mặt, mắt và môi",
      image: "/placeholder.svg?height=200&width=200",
      productCount: 38,
      status: "active",
      createdAt: "20/03/2023",
    },
    {
      id: "haircare",
      name: "Chăm sóc tóc",
      description: "Các sản phẩm chăm sóc và tạo kiểu tóc",
      image: "/placeholder.svg?height=200&width=200",
      productCount: 24,
      status: "active",
      createdAt: "25/03/2023",
    },
    {
      id: "bodycare",
      name: "Chăm sóc cơ thể",
      description: "Các sản phẩm chăm sóc cơ thể và tắm gội",
      image: "/placeholder.svg?height=200&width=200",
      productCount: 18,
      status: "active",
      createdAt: "01/04/2023",
    },
    {
      id: "fragrance",
      name: "Nước hoa",
      description: "Các sản phẩm nước hoa và xịt thơm",
      image: "/placeholder.svg?height=200&width=200",
      productCount: 16,
      status: "inactive",
      createdAt: "05/04/2023",
    },
  ])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [addCategoryOpen, setAddCategoryOpen] = useState(false)
  const [editCategoryOpen, setEditCategoryOpen] = useState(false)
  const [viewCategoryOpen, setViewCategoryOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const [categoryForm, setCategoryForm] = useState<CategoryForm>({
    name: "",
    description: "",
    image: "",
    status: "active",
  })

  const [viewingCategory, setViewingCategory] = useState<Category | null>(null)

  // Filter and sort categories
  const filteredCategories = categories
    .filter((category) => {
      // Apply search filter
      const matchesSearch =
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false

      // Apply status filter
      const matchesStatus = statusFilter === "all" || category.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "productCount") {
        return sortDirection === "asc" ? a.productCount - b.productCount : b.productCount - a.productCount
      } else if (sortField === "createdAt") {
        // Simple date comparison for demo purposes
        return sortDirection === "asc" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt)
      }
      return 0
    })

  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete !== null) {
      setCategories(categories.filter((category) => category.id !== categoryToDelete))
      setDeleteDialogOpen(false)
      setCategoryToDelete(null)
    }
  }

  const handleBulkDelete = () => {
    if (selectedCategories.length > 0) {
      setCategories(categories.filter((category) => !selectedCategories.includes(category.id)))
      setSelectedCategories([])
    }
  }

  const handleAddCategory = () => {
    setCategoryForm({
      name: "",
      description: "",
      image: "",
      status: "active",
    })
    setAddCategoryOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setCategoryForm({
      id: category.id,
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      status: category.status,
    })
    setEditCategoryOpen(true)
  }

  const handleViewCategory = (category: Category) => {
    setViewingCategory(category)
    setViewCategoryOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCategoryForm({
      ...categoryForm,
      [name]: value,
    })
  }

  const handleStatusChange = (value: string) => {
    setCategoryForm({
      ...categoryForm,
      status: value as "active" | "inactive",
    })
  }

  const handleAddImage = () => {
    // In a real app, this would open a file picker and upload the image
    // For this demo, we'll just add a placeholder
    setCategoryForm({
      ...categoryForm,
      image: `/placeholder.svg?height=200&width=200&text=Category`,
    })
  }

  const handleRemoveImage = () => {
    setCategoryForm({
      ...categoryForm,
      image: "",
    })
  }

  const saveCategory = () => {
    if (categoryForm.id) {
      // Edit existing category
      setCategories(
        categories.map((category) =>
          category.id === categoryForm.id
            ? {
                ...category,
                name: categoryForm.name,
                description: categoryForm.description,
                image: categoryForm.image,
                status: categoryForm.status,
              }
            : category,
        ),
      )
      setEditCategoryOpen(false)
    } else {
      // Add new category
      const newId = categoryForm.name.toLowerCase().replace(/\s+/g, "-")
      const newCategory: Category = {
        id: newId,
        name: categoryForm.name,
        description: categoryForm.description,
        image: categoryForm.image,
        productCount: 0,
        status: categoryForm.status,
        createdAt: new Date().toLocaleDateString("vi-VN"),
      }
      setCategories([...categories, newCategory])
      setAddCategoryOpen(false)
    }
  }

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const toggleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(filteredCategories.map((cat) => cat.id))
    }
  }

  const toggleSelectCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm danh mục mới
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Danh sách</TabsTrigger>
          <TabsTrigger value="grid">Dạng lưới</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle>Danh sách danh mục</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm danh mục..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Lọc theo trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="active">Đang hoạt động</SelectItem>
                      <SelectItem value="inactive">Không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {selectedCategories.length > 0 && (
                <div className="bg-muted p-2 rounded-md mb-4 flex items-center justify-between">
                  <span className="text-sm">Đã chọn {selectedCategories.length} danh mục</span>
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa đã chọn
                  </Button>
                </div>
              )}

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={
                            selectedCategories.length === filteredCategories.length && filteredCategories.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[80px]">Hình ảnh</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>
                        <div className="flex items-center">
                          Tên danh mục
                          {sortField === "name" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead>Mô tả</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort("productCount")}>
                        <div className="flex items-center justify-end">
                          Số sản phẩm
                          {sortField === "productCount" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => toggleSort("createdAt")}>
                        <div className="flex items-center justify-end">
                          Ngày tạo
                          {sortField === "createdAt" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Không tìm thấy danh mục nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map((category) => (
                        <TableRow key={category.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Checkbox
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => toggleSelectCategory(category.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                              <img
                                src={category.image || "/placeholder.svg?height=40&width=40"}
                                alt={category.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                          <TableCell className="text-right">{category.productCount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={category.status === "active" ? "default" : "secondary"}
                              className={
                                category.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {category.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{category.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Mở menu</span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewCategory(category)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Xem chi tiết</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Chỉnh sửa</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(category.id)}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Xóa</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Hiển thị {filteredCategories.length > 0 ? 1 : 0}-{filteredCategories.length} của{" "}
                  {filteredCategories.length} danh mục
                </div>
                <nav className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="icon" className="bg-pink-600 text-white">
                    1
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </nav>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={category.image || "/placeholder.svg?height=200&width=300"}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={category.status === "active" ? "default" : "secondary"}
                      className={
                        category.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {category.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.productCount} sản phẩm</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewCategory(category)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Xem chi tiết</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(category.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Xóa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card
              className="border-dashed border-2 flex flex-col items-center justify-center p-6 hover:bg-gray-50 cursor-pointer"
              onClick={handleAddCategory}
            >
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-pink-600" />
              </div>
              <p className="font-medium text-center">Thêm danh mục mới</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa danh mục</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Category Dialog */}
      <Dialog open={viewCategoryOpen} onOpenChange={setViewCategoryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết danh mục</DialogTitle>
          </DialogHeader>

          {viewingCategory && (
            <div className="space-y-4 py-4">
              <div className="aspect-video overflow-hidden rounded-md bg-gray-100 mb-4">
                <img
                  src={viewingCategory.image || "/placeholder.svg?height=200&width=300"}
                  alt={viewingCategory.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p>{viewingCategory.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Trạng thái</p>
                  <div className="flex items-center mt-1">
                    {viewingCategory.status === "active" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
                        <span>Đang hoạt động</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-gray-600 mr-1" />
                        <span>Không hoạt động</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tên danh mục</p>
                  <p className="font-medium">{viewingCategory.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Số sản phẩm</p>
                  <p>{viewingCategory.productCount}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Mô tả</p>
                  <p>{viewingCategory.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ngày tạo</p>
                  <p>{viewingCategory.createdAt}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewCategoryOpen(false)}>
              Đóng
            </Button>
            {viewingCategory && (
              <Button
                className="bg-pink-600 hover:bg-pink-700"
                onClick={() => {
                  setViewCategoryOpen(false)
                  handleEditCategory(viewingCategory)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogDescription>Điền thông tin danh mục mới vào form bên dưới.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên danh mục</Label>
              <Input
                id="name"
                name="name"
                value={categoryForm.name}
                onChange={handleFormChange}
                placeholder="Nhập tên danh mục"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                name="description"
                value={categoryForm.description}
                onChange={handleFormChange}
                placeholder="Nhập mô tả danh mục"
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select value={categoryForm.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hình ảnh danh mục</Label>
              {categoryForm.image ? (
                <div className="relative group">
                  <img
                    src={categoryForm.image || "/placeholder.svg"}
                    alt="Category"
                    className="h-40 w-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="h-40 w-full border border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
                >
                  <Upload className="h-8 w-8 mb-2" />
                  <span>Tải lên hình ảnh</span>
                </button>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCategoryOpen(false)}>
              Hủy
            </Button>
            <Button onClick={saveCategory} className="bg-pink-600 hover:bg-pink-700" disabled={!categoryForm.name}>
              Thêm danh mục
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={editCategoryOpen} onOpenChange={setEditCategoryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin danh mục.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Tên danh mục</Label>
              <Input
                id="edit-name"
                name="name"
                value={categoryForm.name}
                onChange={handleFormChange}
                placeholder="Nhập tên danh mục"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={categoryForm.description}
                onChange={handleFormChange}
                placeholder="Nhập mô tả danh mục"
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">Trạng thái</Label>
              <Select value={categoryForm.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hình ảnh danh mục</Label>
              {categoryForm.image ? (
                <div className="relative group">
                  <img
                    src={categoryForm.image || "/placeholder.svg"}
                    alt="Category"
                    className="h-40 w-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="h-40 w-full border border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
                >
                  <Upload className="h-8 w-8 mb-2" />
                  <span>Tải lên hình ảnh</span>
                </button>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCategoryOpen(false)}>
              Hủy
            </Button>
            <Button onClick={saveCategory} className="bg-pink-600 hover:bg-pink-700" disabled={!categoryForm.name}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
