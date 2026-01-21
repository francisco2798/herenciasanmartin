"use client"

import { useState, useMemo } from "react"
import { LayoutGrid, List } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ProductCard } from "@/components/product-card"
import { FilterSidebar } from "@/components/catalog/filter-sidebar"
import { SortDropdown, type SortOption } from "@/components/catalog/sort-dropdown"
import { ActiveFilters } from "@/components/catalog/active-filters"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import type { FilterOptions } from "@/lib/types"

const maxPrice = Math.max(...products.map((p) => p.price))

export default function CatalogoPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    material: [],
    gemstone: [],
    collection: [],
    season: [],
    priceRange: [0, maxPrice],
    inStock: null,
  })
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Apply filters
    if (filters.category.length > 0) {
      result = result.filter((p) => filters.category.includes(p.category))
    }
    if (filters.material.length > 0) {
      result = result.filter((p) => filters.material.includes(p.material))
    }
    if (filters.gemstone.length > 0) {
      result = result.filter((p) => filters.gemstone.includes(p.gemstone))
    }
    if (filters.collection.length > 0) {
      result = result.filter((p) => filters.collection.includes(p.collection))
    }
    if (filters.season.length > 0) {
      result = result.filter((p) => filters.season.includes(p.season))
    }
    if (filters.inStock) {
      result = result.filter((p) => p.inStock)
    }
    result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [filters, sortBy])

  const removeFilter = (key: keyof FilterOptions, value: string) => {
    if (Array.isArray(filters[key])) {
      setFilters({
        ...filters,
        [key]: (filters[key] as string[]).filter((v) => v !== value),
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
              NUESTRA COLECCIÓN
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">Catálogo de Joyas</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-montserrat)]">
              Descubre nuestra exclusiva selección de joyas con esmeraldas colombianas y metales preciosos de la más
              alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <FilterSidebar filters={filters} onFiltersChange={setFilters} maxPrice={maxPrice} />

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="lg:hidden">
                    <FilterSidebar filters={filters} onFiltersChange={setFilters} maxPrice={maxPrice} />
                  </div>
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <SortDropdown value={sortBy} onChange={setSortBy} />

                  <div className="hidden sm:flex items-center border border-border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 rounded-none rounded-l-md"
                      onClick={() => setViewMode("grid")}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-9 w-9 rounded-none rounded-r-md"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              <div className="mb-6">
                <ActiveFilters filters={filters} onRemove={removeFilter} />
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "flex flex-col gap-6"
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    No se encontraron productos con los filtros seleccionados.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        category: [],
                        material: [],
                        gemstone: [],
                        collection: [],
                        season: [],
                        priceRange: [0, maxPrice],
                        inStock: null,
                      })
                    }
                    className="font-[family-name:var(--font-montserrat)]"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
