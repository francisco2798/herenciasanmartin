"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  Diamond,
  DollarSign,
  Tag,
  FileText,
  ImageIcon,
  Hash,
  Scale,
  Sparkles,
  Layers,
} from "lucide-react"
import type { Product, JewelryCategory, JewelryMaterial } from "@/lib/types"
import { JEWELRY_CATEGORIES, JEWELRY_MATERIALS } from "@/lib/types"

interface ProductFormProps {
  onAddProduct: (product: Product) => void
  collections: string[]
}

export function ProductForm({ onAddProduct, collections }: ProductFormProps) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    description: "",
    image: "",
    category: "" as JewelryCategory | "",
    material: "" as JewelryMaterial | "",
    availableMaterials: [] as JewelryMaterial[],
    weight: "",
    collection: "",
  })

  const handleChange = (field: string, value: string | JewelryMaterial[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMaterialToggle = (material: JewelryMaterial, checked: boolean) => {
    if (checked) {
      handleChange("availableMaterials", [...formData.availableMaterials, material])
    } else {
      handleChange(
        "availableMaterials",
        formData.availableMaterials.filter((m) => m !== material)
      )
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange("image", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.category) return

    const newProduct: Product = {
      id: crypto.randomUUID(),
      code: formData.code || `HSM-${Date.now().toString().slice(-6)}`,
      name: formData.name,
      price: Number.parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
      category: formData.category as JewelryCategory,
      material: formData.material as JewelryMaterial,
      availableMaterials: formData.availableMaterials,
      weight: formData.weight,
      collection: formData.collection,
    }

    onAddProduct(newProduct)
    setFormData({
      code: "",
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      material: "",
      availableMaterials: [],
      weight: "",
      collection: "",
    })
  }

  return (
    <Card className="border-[#2A2A2A] bg-[#111111]/90 backdrop-blur-sm overflow-hidden">
      {/* Emerald accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#047857] to-transparent" />
      
      <CardHeader className="border-b border-[#2A2A2A] bg-[#0A0A0A]/50">
        <CardTitle className="flex items-center gap-3 text-[#F5F5F0] font-serif tracking-wide">
          <div className="p-2 rounded-lg bg-[#1A1A1A] border border-[#047857]/30">
            <Plus className="h-5 w-5 text-[#047857]" />
          </div>
          Agregar Nueva Pieza
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primera fila: Código, Nombre, Precio */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="code" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <Hash className="h-3.5 w-3.5" />
                Código de Referencia
              </Label>
              <Input
                id="code"
                placeholder="HSM-001"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <Diamond className="h-3.5 w-3.5" />
                Nombre de la Pieza *
              </Label>
              <Input
                id="productName"
                placeholder="Anillo Esmeralda Imperial"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <DollarSign className="h-3.5 w-3.5" />
                Precio (COP) *
              </Label>
              <Input
                id="price"
                type="number"
                step="1000"
                min="0"
                placeholder="1,500,000"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
                className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>

          {/* Segunda fila: Categoría, Material, Peso */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <Tag className="h-3.5 w-3.5" />
                Categoría *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] focus:ring-[#D4AF37]/20">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  {JEWELRY_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-[#F5F5F0] focus:bg-[#2A2A2A] focus:text-[#D4AF37]">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="material" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Material Principal *
              </Label>
              <Select
                value={formData.material}
                onValueChange={(value) => handleChange("material", value)}
              >
                <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] focus:ring-[#D4AF37]/20">
                  <SelectValue placeholder="Seleccionar material" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  {JEWELRY_MATERIALS.map((mat) => (
                    <SelectItem key={mat} value={mat} className="text-[#F5F5F0] focus:bg-[#2A2A2A] focus:text-[#D4AF37]">
                      {mat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <Scale className="h-3.5 w-3.5" />
                Peso
              </Label>
              <Input
                id="weight"
                placeholder="5.2g"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>

          {/* Tercera fila: Colección e Imagen */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="collection" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <Layers className="h-3.5 w-3.5" />
                Colección
              </Label>
              <Input
                id="collection"
                list="collections"
                placeholder="Esmeraldas Colombianas"
                value={formData.collection}
                onChange={(e) => handleChange("collection", e.target.value)}
                className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
              />
              <datalist id="collections">
                {collections.map((col) => (
                  <option key={col} value={col} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productImage" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
                <ImageIcon className="h-3.5 w-3.5" />
                Imagen de la Pieza
              </Label>
              <Input
                id="productImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] file:bg-[#D4AF37]/10 file:text-[#D4AF37] file:border-[#D4AF37]/30 file:border file:rounded-md file:px-3 file:mr-3 file:font-medium hover:file:bg-[#D4AF37]/20"
              />
            </div>
          </div>

          {/* Materiales disponibles */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Materiales Disponibles para Pedido Personalizado
            </Label>
            <div className="flex flex-wrap gap-4 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A]/50 p-4">
              {JEWELRY_MATERIALS.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={formData.availableMaterials.includes(material)}
                    onCheckedChange={(checked) =>
                      handleMaterialToggle(material, checked as boolean)
                    }
                    className="border-[#D4AF37]/50 data-[state=checked]:bg-[#047857] data-[state=checked]:border-[#047857]"
                  />
                  <label
                    htmlFor={`material-${material}`}
                    className="text-sm font-medium leading-none text-[#F5F5F0]/80 cursor-pointer hover:text-[#D4AF37] transition-colors"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase">
              <FileText className="h-3.5 w-3.5" />
              Descripción
            </Label>
            <Textarea
              id="description"
              placeholder="Elegante pieza elaborada artesanalmente con esmeraldas colombianas de la más alta calidad..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
              className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 resize-none"
            />
          </div>

          {/* Botón de envío y preview */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              type="submit"
              className="flex-1 sm:flex-none bg-[#047857] hover:bg-[#059669] text-[#F5F5F0] font-semibold tracking-wide shadow-lg shadow-[#047857]/20 transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Pieza al Catálogo
            </Button>
            {formData.image && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#047857] blur-md opacity-30" />
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="relative h-14 w-14 rounded-lg border-2 border-[#D4AF37]/50 object-cover"
                  />
                </div>
                <span className="text-xs text-[#8B8B7A] tracking-wide">Vista previa</span>
              </div>
            )}
          </div>
        </form>
      </CardContent>
      
      {/* Bottom emerald accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#047857]/30 to-transparent" />
    </Card>
  )
}
