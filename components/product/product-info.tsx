"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Minus, Plus, Share2, ShoppingBag, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/format"
import { categoryLabels, materialLabels, gemstoneLabels } from "@/lib/data"
import type { Product } from "@/lib/types"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const incrementQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity((q) => q + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1)
    }
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
        <Link href="/" className="hover:text-foreground transition-colors">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link href="/catalogo" className="hover:text-foreground transition-colors">
          Catálogo
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/catalogo?category=${product.category}`} className="hover:text-foreground transition-colors">
          {categoryLabels[product.category]}
        </Link>
      </nav>

      {/* Title & SKU */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">{product.name}</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-montserrat)]">
          SKU: {product.sku}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-foreground font-[family-name:var(--font-montserrat)]">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through font-[family-name:var(--font-montserrat)]">
              {formatPrice(product.compareAtPrice)}
            </span>
            <Badge className="bg-primary text-primary-foreground">
              -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-foreground/80 leading-relaxed">{product.description}</p>

      <Separator />

      {/* Specifications */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">Material</span>
          <p className="font-medium mt-1">{materialLabels[product.material]}</p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
            Gema Principal
          </span>
          <p className="font-medium mt-1">{gemstoneLabels[product.gemstone]}</p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">Peso</span>
          <p className="font-medium mt-1">{product.weight}</p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">Colección</span>
          <p className="font-medium mt-1">{product.collection}</p>
        </div>
      </div>

      <Separator />

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-sm font-[family-name:var(--font-montserrat)]">
          {product.inStock ? `Disponible (${product.stockQuantity} en stock)` : "Agotado - Consultar disponibilidad"}
        </span>
      </div>

      {/* Quantity & Add to Cart */}
      {product.inStock && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-none"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-[family-name:var(--font-montserrat)]">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-none"
              onClick={incrementQuantity}
              disabled={quantity >= product.stockQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            size="lg"
            className="flex-1 gap-2 font-[family-name:var(--font-montserrat)]"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-5 w-5" />
            Agregar al Carrito
          </Button>
        </div>
      )}

      {/* WhatsApp */}
      <WhatsAppButton productName={product.name} fixed={false} />

      {/* Shipping Info */}
      <div className="bg-secondary/50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium">Envío asegurado</p>
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
              Entrega segura con embalaje de lujo. Consulta tiempos de entrega.
            </p>
          </div>
        </div>
      </div>

      {/* Quote Button */}
      <Button
        asChild
        variant="outline"
        size="lg"
        className="w-full font-[family-name:var(--font-montserrat)] bg-transparent"
      >
        <Link href={`/cotizacion?producto=${product.id}`}>Solicitar Cotización Personalizada</Link>
      </Button>
    </div>
  )
}
