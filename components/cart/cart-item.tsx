"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/format"
import type { CartItem as CartItemType } from "@/lib/types"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const { product, quantity } = item

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Image */}
      <Link href={`/producto/${product.id}`} className="shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-secondary/30 overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div>
            <Link href={`/producto/${product.id}`}>
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-montserrat)]">
              SKU: {product.sku}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-end justify-between mt-4">
          {/* Quantity */}
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-[family-name:var(--font-montserrat)]">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stockQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-semibold text-foreground font-[family-name:var(--font-montserrat)]">
              {formatPrice(product.price * quantity)}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                {formatPrice(product.price)} c/u
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
