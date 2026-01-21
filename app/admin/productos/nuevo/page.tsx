"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoryLabels, materialLabels, gemstoneLabels, collections } from "@/lib/data"

export default function NuevoProductoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [featured, setFeatured] = useState(false)
  const [inStock, setInStock] = useState(true)

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `/placeholder.svg?height=800&width=800&query=luxury jewelry product ${images.length + 1}`
    setImages([...images, newImage])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    router.push("/admin/productos")
  }

  return (
    <div className="p-6 lg:p-8">
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 font-[family-name:var(--font-montserrat)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Nuevo Producto</h1>
        <p className="text-muted-foreground mt-1 font-[family-name:var(--font-montserrat)]">
          Agrega un nuevo producto al catálogo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-[family-name:var(--font-montserrat)]">
                      Nombre del producto *
                    </Label>
                    <Input id="name" required className="font-[family-name:var(--font-montserrat)]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku" className="font-[family-name:var(--font-montserrat)]">
                      SKU *
                    </Label>
                    <Input
                      id="sku"
                      placeholder="EV-AN-001"
                      required
                      className="font-[family-name:var(--font-montserrat)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="font-[family-name:var(--font-montserrat)]">
                    Descripción *
                  </Label>
                  <Textarea id="description" rows={4} required className="font-[family-name:var(--font-montserrat)]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="font-[family-name:var(--font-montserrat)]">Categoría *</Label>
                    <Select required>
                      <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value} className="font-[family-name:var(--font-montserrat)]">
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[family-name:var(--font-montserrat)]">Material *</Label>
                    <Select required>
                      <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(materialLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value} className="font-[family-name:var(--font-montserrat)]">
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[family-name:var(--font-montserrat)]">Gema principal</Label>
                    <Select>
                      <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(gemstoneLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value} className="font-[family-name:var(--font-montserrat)]">
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-[family-name:var(--font-montserrat)]">Colección</Label>
                    <Select>
                      <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        {collections.map((col) => (
                          <SelectItem
                            key={col.id}
                            value={col.name}
                            className="font-[family-name:var(--font-montserrat)]"
                          >
                            {col.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="font-[family-name:var(--font-montserrat)]">
                      Peso
                    </Label>
                    <Input id="weight" placeholder="8.5g" className="font-[family-name:var(--font-montserrat)]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Imágenes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-secondary/30 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Producto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-xs font-[family-name:var(--font-montserrat)]">Subir</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Precio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-[family-name:var(--font-montserrat)]">
                    Precio (COP) *
                  </Label>
                  <Input id="price" type="number" required className="font-[family-name:var(--font-montserrat)]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compareAtPrice" className="font-[family-name:var(--font-montserrat)]">
                    Precio anterior (opcional)
                  </Label>
                  <Input id="compareAtPrice" type="number" className="font-[family-name:var(--font-montserrat)]" />
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inStock" className="font-[family-name:var(--font-montserrat)]">
                    Disponible
                  </Label>
                  <Switch id="inStock" checked={inStock} onCheckedChange={setInStock} />
                </div>
                {inStock && (
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity" className="font-[family-name:var(--font-montserrat)]">
                      Cantidad en stock
                    </Label>
                    <Input
                      id="stockQuantity"
                      type="number"
                      min="0"
                      className="font-[family-name:var(--font-montserrat)]"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Visibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured" className="font-[family-name:var(--font-montserrat)]">
                      Producto destacado
                    </Label>
                    <p className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      Aparecerá en la homepage
                    </p>
                  </div>
                  <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" size="lg" className="font-[family-name:var(--font-montserrat)]" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar Producto"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="font-[family-name:var(--font-montserrat)] bg-transparent"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
