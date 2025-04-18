"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    rating: number
    reviewCount: number
    category: string
    isNew?: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user, addToWishlist, removeFromWishlist, isInWishlist } = useAuth()

  const isProductInWishlist = isInWishlist(product.id)

  const handleWishlistToggle = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
            />
          </div>
        </Link>

        {product.isNew && <Badge className="absolute top-2 left-2 bg-pink-600">Mới</Badge>}

        <Button
          variant="outline"
          size="icon"
          className={`absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white ${
            isProductInWishlist ? "text-pink-600" : ""
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${isProductInWishlist ? "fill-pink-600 text-pink-600" : ""}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium line-clamp-2 group-hover:text-pink-600 transition-colors">{product.name}</h3>
        </Link>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="mx-1.5 text-gray-300">·</span>
          <span className="text-sm text-gray-500">{product.reviewCount} đánh giá</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-semibold text-lg">{formatCurrency(product.price)}</div>
        <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm
        </Button>
      </CardFooter>
    </Card>
  )
}
