"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  Upload,
  X,
  Grid,
  List,
  Filter,
  Download,
  UploadCloud,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Define product type
interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: string
  description?: string
  images: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

// Define form type
interface ProductForm {
  id?: number
  name: string
  category: string
  price: number
  stock: number
  description: string
  images: string[]
  featured: boolean
}

export default function AdminProducts() {
  // Sample data - in a real app, this would come from a database
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Kem dưỡng ẩm Thanh Tâm",
      category: "Chăm sóc da",
      price: 450000,
      stock: 45,
      status: "Còn hàng",
      description: "Kem dưỡng ẩm giúp cung cấp độ ẩm sâu cho da, làm dịu da khô và kích ứng.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: true,
      createdAt: "01/01/2023",
      updatedAt: "15/03/2023",
    },
    {
      id: 2,
      name: "Serum Vitamin C",
      category: "Chăm sóc da",
      price: 650000,
      stock: 28,
      status: "Còn hàng",
      description: "Serum giàu vitamin C giúp làm sáng da và chống lão hóa hiệu quả.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: true,
      createdAt: "15/01/2023",
      updatedAt: "20/03/2023",
    },
    {
      id: 3,
      name: "Phấn nước Thanh Tâm",
      category: "Trang điểm",
      price: 550000,
      stock: 32,
      status: "Còn hàng",
      description: "Phấn nước che phủ hoàn hảo, mang lại làn da mịn màng tự nhiên.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: false,
      createdAt: "20/01/2023",
      updatedAt: "25/03/2023",
    },
    {
      id: 4,
      name: "Son lì Thanh Tâm",
      category: "Trang điểm",
      price: 350000,
      stock: 56,
      status: "Còn hàng",
      description: "Son lì lên màu chuẩn, bền màu suốt ngày dài.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: true,
      createdAt: "05/02/2023",
      updatedAt: "10/04/2023",
    },
    {
      id: 5,
      name: "Dầu gội Thanh Tâm",
      category: "Chăm sóc tóc",
      price: 250000,
      stock: 0,
      status: "Hết hàng",
      description: "Dầu gội dưỡng tóc mềm mượt, giảm gãy rụng hiệu quả.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: false,
      createdAt: "10/02/2023",
      updatedAt: "15/04/2023",
    },
    {
      id: 6,
      name: "Sữa tắm Thanh Tâm",
      category: "Chăm sóc cơ thể",
      price: 280000,
      stock: 5,
      status: "Sắp hết hàng",
      description: "Sữa tắm dưỡng ẩm, làm sạch nhẹ nhàng và lưu hương lâu.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: false,
      createdAt: "15/02/2023",
      updatedAt: "20/04/2023",
    },
    {
      id: 7,
      name: "Nước hoa Thanh Tâm",
      category: "Nước hoa",
      price: 850000,
      stock: 18,
      status: "Còn hàng",
      description: "Nước hoa với hương thơm quyến rũ, lưu hương dài lâu.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: true,
      createdAt: "01/03/2023",
      updatedAt: "05/05/2023",
    },
    {
      id: 8,
      name: "Mặt nạ dưỡng da",
      category: "Chăm sóc da",
      price: 150000,
      stock: 0,
      status: "Hết hàng",
      description: "Mặt nạ dưỡng ẩm sâu, phục hồi da chỉ sau một đêm.",
      images: ["/placeholder.svg?height=200&width=200"],
      featured: false,
      createdAt: "10/03/2023",
      updatedAt: "15/05/2023",
    },
  ])

  const categories = [
    { id: "skincare", name: "Chăm sóc da" },
    { id: "makeup", name: "Trang điểm" },
    { id: "haircare", name: "Chăm sóc tóc" },
    { id: "bodycare", name: "Chăm sóc cơ thể" },
    { id: "fragrance", name: "Nước hoa" },
  ]

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [editProductOpen, setEditProductOpen] = useState(false)
  const [viewProductOpen, setViewProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  const [productForm, setProductForm] = useState<ProductForm>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    images: [],
    featured: false,
  })

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price
      } else if (sortBy === "stock") {
        return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock
      }
      return 0
    })

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete !== null) {
      setProducts(products.filter((product) => product.id !== productToDelete))
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleBulkDelete = () => {
    setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
    setSelectedProducts([])
    setBulkDeleteDialogOpen(false)
  }

  const handleAddProduct = () => {
    setProductForm({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
      images: [],
      featured: false,
    })
    setAddProductOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description || "",
      images: [...product.images],
      featured: product.featured,
    })
    setEditProductOpen(true)
  }

  const handleViewProduct = (product: Product) => {
    setCurrentProduct(product)
    setViewProductOpen(true)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductForm({
      ...productForm,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    })
  }

  const handleCategoryChange = (value: string) => {
    setProductForm({
      ...productForm,
      category: value,
    })
  }

  const handleFeaturedChange = (checked: boolean) => {
    setProductForm({
      ...productForm,
      featured: checked,
    })
  }

  const handleAddImage = () => {
    // In a real app, this would open a file picker and upload the image
    // For this demo, we'll just add a placeholder
    setProductForm({
      ...productForm,
      images: [
        ...productForm.images,
        `/placeholder.svg?height=200&width=200&text=Image${productForm.images.length + 1}`,
      ],
    })
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...productForm.images]
    newImages.splice(index, 1)
    setProductForm({
      ...productForm,
      images: newImages,
    })
  }

  const saveProduct = () => {
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    if (productForm.id) {
      // Edit existing product
      setProducts(
        products.map((product) =>
          product.id === productForm.id
            ? {
                ...product,
                name: productForm.name,
                category: productForm.category,
                price: productForm.price,
                stock: productForm.stock,
                description: productForm.description,
                images: productForm.images,
                featured: productForm.featured,
                status: productForm.stock > 10 ? "Còn hàng" : productForm.stock > 0 ? "Sắp hết hàng" : "Hết hàng",
                updatedAt: formattedDate,
              }
            : product,
        ),
      )
      setEditProductOpen(false)
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: productForm.name,
        category: productForm.category,
        price: productForm.price,
        stock: productForm.stock,
        description: productForm.description,
        images: productForm.images,
        featured: productForm.featured,
        status: productForm.stock > 10 ? "Còn hàng" : productForm.stock > 0 ? "Sắp hết hàng" : "Hết hàng",
        createdAt: formattedDate,
        updatedAt: formattedDate,
      }
      setProducts([...products, newProduct])
      setAddProductOpen(false)
    }
  }

  const toggleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id))
    }
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const exportProducts = () => {
    // In a real app, this would generate a CSV or Excel file
    alert("Xuất danh sách sản phẩm thành công!")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportProducts}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm mới
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách sản phẩm</CardTitle>
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
                placeholder="Tìm kiếm sản phẩm..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <select
                className="border rounded-md px-3 py-2"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                className="border rounded-md px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Còn hàng">Còn hàng</option>
                <option value="Sắp hết hàng">Sắp hết hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </select>

              <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Lọc nâng cao
              </Button>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="bg-muted p-2 rounded-md mb-4 flex justify-between items-center">
              <span>{selectedProducts.length} sản phẩm đã chọn</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedProducts([])}>
                  Bỏ chọn
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setBulkDeleteDialogOpen(true)}>
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
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead className="w-[80px]">Hình ảnh</TableHead>
                    <TableHead>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          setSortBy("name")
                          toggleSortOrder()
                        }}
                      >
                        Tên sản phẩm
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead className="text-right">
                      <div
                        className="flex items-center justify-end cursor-pointer"
                        onClick={() => {
                          setSortBy("price")
                          toggleSortOrder()
                        }}
                      >
                        Giá
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">
                      <div
                        className="flex items-center justify-end cursor-pointer"
                        onClick={() => {
                          setSortBy("stock")
                          toggleSortOrder()
                        }}
                      >
                        Tồn kho
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                        Không tìm thấy sản phẩm nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id} className="group">
                        <TableCell>
                          <Checkbox
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={() => toggleSelectProduct(product.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>
                          <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                            <img
                              src={product.images[0] || "/placeholder.svg?height=40&width=40"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{product.name}</span>
                            {product.featured && (
                              <Badge
                                variant="outline"
                                className="w-fit mt-1 bg-yellow-50 text-yellow-700 border-yellow-200"
                              >
                                Nổi bật
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(product.price)}</TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === "Còn hàng"
                                ? "bg-green-100 text-green-800"
                                : product.status === "Sắp hết hàng"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                            <Button variant="ghost" size="icon" onClick={() => handleViewProduct(product)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(product.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-10 text-muted-foreground">Không tìm thấy sản phẩm nào</div>
              ) : (
                filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative">
                      <div className="absolute top-2 right-2 z-10">
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleSelectProduct(product.id)}
                          className="bg-white/80"
                        />
                      </div>
                      <div className="h-48 overflow-hidden bg-gray-100">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=200&width=200"}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      {product.featured && <Badge className="absolute top-2 left-2 bg-yellow-500">Nổi bật</Badge>}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                        <span className="font-medium">{formatCurrency(product.price)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            product.status === "Còn hàng"
                              ? "bg-green-100 text-green-800"
                              : product.status === "Sắp hết hàng"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                        <span className="text-sm">Tồn kho: {product.stock}</span>
                      </div>
                      <div className="mt-4 flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleViewProduct(product)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Hiển thị 1-{filteredProducts.length} của {filteredProducts.length} sản phẩm
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

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
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

      {/* Bulk Delete confirmation dialog */}
      <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa nhiều sản phẩm</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa {selectedProducts.length} sản phẩm đã chọn? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
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
            <DialogDescription>Tùy chỉnh các bộ lọc để tìm sản phẩm chính xác hơn.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Danh mục</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category.id}`} />
                    <label htmlFor={`category-${category.id}`} className="text-sm">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Khoảng giá</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Từ" />
                <span>-</span>
                <Input type="number" placeholder="Đến" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Còn hàng
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Sắp hết hàng
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                  Hết hàng
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tính năng</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <label htmlFor="featured" className="text-sm">
                  Sản phẩm nổi bật
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFilterDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => setFilterDialogOpen(false)}>Áp dụng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            <DialogDescription>Điền thông tin sản phẩm mới vào form bên dưới.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="details">Chi tiết sản phẩm</TabsTrigger>
              <TabsTrigger value="images">Hình ảnh</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input
                  id="name"
                  name="name"
                  value={productForm.name}
                  onChange={handleFormChange}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Select value={productForm.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Giá (VNĐ)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={productForm.price}
                  onChange={handleFormChange}
                  placeholder="Nhập giá sản phẩm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Số lượng tồn kho</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={productForm.stock}
                  onChange={handleFormChange}
                  placeholder="Nhập số lượng tồn kho"
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả sản phẩm</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={productForm.description}
                  onChange={handleFormChange}
                  placeholder="Nhập mô tả sản phẩm"
                  className="h-32"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="featured" checked={productForm.featured} onCheckedChange={handleFeaturedChange} />
                <label
                  htmlFor="featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Đánh dấu là sản phẩm nổi bật
                </label>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Hình ảnh sản phẩm</Label>
                <div className="grid grid-cols-3 gap-2">
                  {productForm.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="h-20 w-full object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="h-20 w-full border border-dashed rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
                  >
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-1">Kéo thả hình ảnh vào đây</h3>
                <p className="text-sm text-muted-foreground mb-4">hoặc nhấp để chọn file</p>
                <Button variant="outline" size="sm">
                  Chọn file
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddProductOpen(false)}>
              Hủy
            </Button>
            <Button onClick={saveProduct} className="bg-pink-600 hover:bg-pink-700">
              Thêm sản phẩm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editProductOpen} onOpenChange={setEditProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin sản phẩm.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="details">Chi tiết sản phẩm</TabsTrigger>
              <TabsTrigger value="images">Hình ảnh</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Tên sản phẩm</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={productForm.name}
                  onChange={handleFormChange}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Danh mục</Label>
                <Select value={productForm.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-price">Giá (VNĐ)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={productForm.price}
                  onChange={handleFormChange}
                  placeholder="Nhập giá sản phẩm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-stock">Số lượng tồn kho</Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  value={productForm.stock}
                  onChange={handleFormChange}
                  placeholder="Nhập số lượng tồn kho"
                />
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-description">Mô tả sản phẩm</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={productForm.description}
                  onChange={handleFormChange}
                  placeholder="Nhập mô tả sản phẩm"
                  className="h-32"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="edit-featured" checked={productForm.featured} onCheckedChange={handleFeaturedChange} />
                <label
                  htmlFor="edit-featured"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Đánh dấu là sản phẩm nổi bật
                </label>
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Hình ảnh sản phẩm</Label>
                <div className="grid grid-cols-3 gap-2">
                  {productForm.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="h-20 w-full object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="h-20 w-full border border-dashed rounded flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-colors"
                  >
                    <Upload className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProductOpen(false)}>
              Hủy
            </Button>
            <Button onClick={saveProduct} className="bg-pink-600 hover:bg-pink-700">
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product Dialog */}
      <Dialog open={viewProductOpen} onOpenChange={setViewProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          </DialogHeader>

          {currentProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <div className="aspect-square overflow-hidden rounded-md bg-gray-100 mb-4">
                  <img
                    src={currentProduct.images[0] || "/placeholder.svg?height=300&width=300"}
                    alt={currentProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {currentProduct.images.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${currentProduct.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{currentProduct.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{currentProduct.category}</p>
                    {currentProduct.featured && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Nổi bật
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Giá</p>
                    <p className="font-semibold text-lg text-pink-600">{formatCurrency(currentProduct.price)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Tồn kho</p>
                    <p className="font-semibold">{currentProduct.stock}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        currentProduct.status === "Còn hàng"
                          ? "bg-green-100 text-green-800"
                          : currentProduct.status === "Sắp hết hàng"
                            ? "bg-yellow-100 text-yellow-800"
                            : currentProduct.status === "Hết hàng"
                      }`}
                    >
                      {currentProduct.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Mô tả</p>
                  <p className="text-sm">{currentProduct.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Ngày tạo</p>
                    <p>{currentProduct.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cập nhật lần cuối</p>
                    <p>{currentProduct.updatedAt}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setViewProductOpen(false)
                      handleEditProduct(currentProduct)
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Chỉnh sửa
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setViewProductOpen(false)
                      handleDeleteClick(currentProduct.id)
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
