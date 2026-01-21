"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/format"
import { materialLabels } from "@/lib/data"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group relative">
      <Link href={`/producto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                Agotado
              </Badge>
            </div>
          )}
          {product.compareAtPrice && product.inStock && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Oferta</Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/producto/${product.id}`}>
              <h3 className="text-lg font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
              {materialLabels[product.material]}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground font-[family-name:var(--font-montserrat)]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through font-[family-name:var(--font-montserrat)]">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-transparent"
            disabled={!product.inStock}
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">SKU: {product.sku}</p>
      </div>
    </div>
  )
}
