"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Diamond, Trash2, ImageIcon, Sparkles, Scale, Layers } from "lucide-react"
import type { Product, JewelryCategory } from "@/lib/types"

interface ProductListProps {
  products: Product[]
  onRemoveProduct: (id: string) => void
}

const CATEGORY_ORDER: JewelryCategory[] = [
  "Anillos",
  "Collares",
  "Aretes",
  "Pulseras",
  "Pendientes",
  "Cadenas",
  "Topos",
]

export function ProductList({ products, onRemoveProduct }: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card className="border-[#2A2A2A] bg-[#111111]/90 backdrop-blur-sm overflow-hidden">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#047857] blur-xl opacity-30" />
            <div className="relative rounded-full border border-[#D4AF37]/30 bg-[#1A1A1A] p-5">
              <Diamond className="h-12 w-12 text-[#D4AF37]" />
            </div>
          </div>
          <h3 className="text-xl font-serif tracking-wide text-[#F5F5F0]">
            No hay piezas en el catálogo
          </h3>
          <p className="mt-2 text-sm text-[#8B8B7A] tracking-wide">
            Agrega piezas de joyería usando el formulario de arriba
          </p>
        </CardContent>
      </Card>
    )
  }

  // Group by category
  const productsByCategory = products.reduce(
    (acc, product) => {
      const category = product.category || "Sin categoría"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    },
    {} as Record<string, Product[]>
  )

  // Sort categories
  const sortedCategories = CATEGORY_ORDER.filter(
    (cat) => productsByCategory[cat]
  )

  return (
    <Card className="border-[#2A2A2A] bg-[#111111]/90 backdrop-blur-sm overflow-hidden">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      
      <CardHeader className="border-b border-[#2A2A2A] bg-[#0A0A0A]/50">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-3 text-[#F5F5F0] font-serif tracking-wide">
            <div className="p-2 rounded-lg bg-[#1A1A1A] border border-[#D4AF37]/20">
              <Diamond className="h-5 w-5 text-[#D4AF37]" />
            </div>
            Catálogo de Joyería
          </span>
          <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 text-sm font-medium">
            {products.length} pieza{products.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {sortedCategories.map((category) => {
          const categoryProducts = productsByCategory[category]
          if (!categoryProducts) return null

          return (
            <div key={category} className="border-b border-[#2A2A2A] last:border-b-0">
              {/* Category Header */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#047857] via-[#047857] to-[#065F46] px-5 py-3">
                <Diamond className="h-4 w-4 text-[#D4AF37]" />
                <h4 className="font-serif font-semibold text-[#F5F5F0] tracking-wide">{category}</h4>
                <span className="text-xs text-[#F5F5F0]/60 tracking-wide">
                  ({categoryProducts.length})
                </span>
              </div>

              {/* Products */}
              <div className="divide-y divide-[#2A2A2A]">
                {categoryProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start gap-5 p-5 transition-all duration-300 hover:bg-[#1A1A1A]/50 group"
                  >
                    {/* Image */}
                    {product.image ? (
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-[#047857] blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="relative h-24 w-24 rounded-lg border-2 border-[#D4AF37]/30 object-cover shadow-lg group-hover:border-[#D4AF37]/60 transition-colors"
                        />
                      </div>
                    ) : (
                      <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-[#2A2A2A] bg-[#0A0A0A]">
                        <ImageIcon className="h-10 w-10 text-[#8B8B7A]/30" />
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Code and Name */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge
                          variant="outline"
                          className="border-[#D4AF37]/40 text-[#D4AF37] bg-[#D4AF37]/5 text-xs tracking-wide"
                        >
                          {product.code}
                        </Badge>
                        <h5 className="font-serif font-semibold text-[#F5F5F0] text-lg truncate">
                          {product.name}
                        </h5>
                      </div>

                      {/* Collection */}
                      {product.collection && (
                        <p className="flex items-center gap-2 text-xs text-[#D4AF37]/80 tracking-wide">
                          <Layers className="h-3.5 w-3.5" />
                          Colección: {product.collection}
                        </p>
                      )}

                      {/* Material and Weight */}
                      <div className="flex items-center gap-4 text-xs text-[#8B8B7A]">
                        {product.material && (
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                            {product.material}
                          </span>
                        )}
                        {product.weight && (
                          <span className="flex items-center gap-1.5">
                            <Scale className="h-3.5 w-3.5 text-[#D4AF37]" />
                            {product.weight}
                          </span>
                        )}
                      </div>

                      {/* Available Materials */}
                      {product.availableMaterials &&
                        product.availableMaterials.length > 0 && (
                          <p className="text-xs text-[#8B8B7A]/70 tracking-wide">
                            También disponible en: {product.availableMaterials.join(", ")}
                          </p>
                        )}

                      {/* Description */}
                      {product.description && (
                        <p className="text-xs text-[#8B8B7A]/60 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>

                    {/* Price and Delete */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <p className="font-serif font-bold text-[#D4AF37] text-xl">
                        ${product.price.toLocaleString("es-CO")}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveProduct(product.id)}
                        className="text-[#8B8B7A]/50 hover:bg-red-950/50 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar pieza</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
