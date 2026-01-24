"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Diamond, Loader2,FileDown } from "lucide-react"
import { CompanyInfoForm } from "@/components/gener/company-info-form"
import { ProductForm } from "@/components/gener/product-form"
import { ProductList } from "@/components/gener/product-list"
import { generateCatalogPDF } from "@/lib/generate-catalog-pdf"
import type { Product, CompanyInfo } from "@/lib/types"

export default function CatalogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "Joyería Esmeraldas Herencia de San Martín",
    logo: "",
    email: "contacto@esmeraldasherencia.com",
    phone: "+57 310 123 4567",
    address: "Carrera 7 #45-23, Bogotá, Colombia",
    catalogTitle: "Catálogo Exclusivo 2026",
    slogan: "Herencia de San Martín",
  })
  const [products, setProducts] = useState<Product[]>([])

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product])
  }

  const handleRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const existingCollections = [
    ...new Set(products.map((p) => p.collection).filter(Boolean)),
  ]

  const handleGeneratePDF = async () => {
    if (products.length === 0) {
      alert("Agrega al menos una pieza de joyería para generar el catálogo")
      return
    }

    setIsGenerating(true)
    try {
      await generateCatalogPDF(companyInfo, products)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error al generar el PDF. Por favor intenta de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <header className="mb-16 text-center">
          {/* Diamond icon with glow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="relative">
              <div className="absolute inset-0 bg-[#047857] blur-xl opacity-50" />
              <div className="relative inline-flex items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#111111] p-4">
                <Diamond className="h-10 w-10 text-[#D4AF37]" />
              </div>
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* Brand name */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-wide text-[#F5F5F0] font-serif">
            HERENCIA
          </h1>
          <p className="text-2xl md:text-3xl font-light tracking-[0.3em] text-[#D4AF37] mt-2">
            SAN MARTÍN
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-[#D4AF37]/50" />
            
            <div className="h-px w-16 bg-[#D4AF37]/50" />
          </div>

          <p className="mt-6 text-sm tracking-[0.2em] uppercase text-[#8B8B7A]">
            Joyería Fina con Esmeraldas Colombianas
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10">
          {/* Company Info Section */}
          <CompanyInfoForm companyInfo={companyInfo} onChange={setCompanyInfo} />

          {/* Add Product Section */}
          <ProductForm
            onAddProduct={handleAddProduct}
            collections={existingCollections}
          />

          {/* Products List */}
          <ProductList
            products={products}
            onRemoveProduct={handleRemoveProduct}
          />

          {/* Generate PDF Button */}
          <div className="sticky bottom-6 flex justify-center pt-6">
            <Button
              size="lg"
              onClick={handleGeneratePDF}
              disabled={isGenerating || products.length === 0}
              className="relative overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#E5C761] to-[#D4AF37] hover:from-[#E5C761] hover:via-[#D4AF37] hover:to-[#E5C761] text-[#0A0A0A] font-semibold shadow-xl shadow-[#D4AF37]/20 px-10 py-7 text-base tracking-wide border-0 transition-all duration-500"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Generando Catálogo...
                </>
              ) : (
                <>
                  <FileDown className="mr-3 h-5 w-5" />
                  Descargar Catálogo PDF
                </>
              )}
            </Button>
          </div>

          {/* Product count info */}
          {products.length > 0 && (
            <p className="text-center text-sm tracking-wide text-[#8B8B7A] pb-4">
              {products.length} pieza{products.length !== 1 ? "s" : ""} exclusiva{products.length !== 1 ? "s" : ""} en el catálogo
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#2A2A2A] pt-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <Diamond className="h-4 w-4 text-[#047857]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
          <p className="text-sm tracking-[0.15em] text-[#D4AF37]">
            HERENCIA SAN MARTÍN
          </p>
          <p className="mt-2 text-xs tracking-wide text-[#8B8B7A]">
            Joyería Artesanal de la Más Alta Calidad
          </p>
        </footer>
      </div>
    </main>
  )
}
