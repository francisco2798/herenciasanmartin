"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { formatPrice } from "@/lib/format"
import { categoryLabels, materialLabels, collections } from "@/lib/data"
import type { FilterOptions } from "@/lib/types"

interface FilterSidebarProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  maxPrice: number
}

const seasons = ["Primavera 2025", "Verano 2025", "Otoño 2024", "Invierno 2024"]

export function FilterSidebar({ filters, onFiltersChange, maxPrice }: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = (key: keyof FilterOptions, value: unknown) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "category" | "material" | "gemstone" | "collection" | "season", value: string) => {
    const current = filters[key]
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    updateFilter(key, updated)
  }

  const clearFilters = () => {
    onFiltersChange({
      category: [],
      material: [],
      gemstone: [],
      collection: [],
      season: [],
      priceRange: [0, maxPrice],
      inStock: null,
    })
  }

  const hasActiveFilters =
    filters.category.length > 0 ||
    filters.material.length > 0 ||
    filters.gemstone.length > 0 ||
    filters.collection.length > 0 ||
    filters.season.length > 0 ||
    filters.inStock !== null ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < maxPrice

  const FilterContent = () => (
    <div className="space-y-6">
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground w-full justify-start font-[family-name:var(--font-montserrat)]"
        >
          <X className="mr-2 h-4 w-4" />
          Limpiar filtros
        </Button>
      )}

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold">
          Precio
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-2">
          <Slider
            value={filters.priceRange}
            min={0}
            max={maxPrice}
            step={500000}
            onValueChange={(value) => updateFilter("priceRange", value)}
            className="mb-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Category */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold">
          Categoría
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {Object.entries(categoryLabels).map(([value, label]) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer py-1">
              <Checkbox
                checked={filters.category.includes(value)}
                onCheckedChange={() => toggleArrayFilter("category", value)}
              />
              <span className="text-sm font-[family-name:var(--font-montserrat)]">{label}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Material */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold">
          Material
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {Object.entries(materialLabels).map(([value, label]) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer py-1">
              <Checkbox
                checked={filters.material.includes(value)}
                onCheckedChange={() => toggleArrayFilter("material", value)}
              />
              <span className="text-sm font-[family-name:var(--font-montserrat)]">{label}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Collection */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold">
          Colección
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {collections.map((col) => (
            <label key={col.id} className="flex items-center gap-3 cursor-pointer py-1">
              <Checkbox
                checked={filters.collection.includes(col.name)}
                onCheckedChange={() => toggleArrayFilter("collection", col.name)}
              />
              <span className="text-sm font-[family-name:var(--font-montserrat)]">{col.name}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Season */}
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold">
          Temporada
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {seasons.map((season) => (
            <label key={season} className="flex items-center gap-3 cursor-pointer py-1">
              <Checkbox
                checked={filters.season.includes(season)}
                onCheckedChange={() => toggleArrayFilter("season", season)}
              />
              <span className="text-sm font-[family-name:var(--font-montserrat)]">{season}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Stock */}
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-semibold">
          Disponibilidad
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          <label className="flex items-center gap-3 cursor-pointer py-1">
            <Checkbox
              checked={filters.inStock === true}
              onCheckedChange={(checked) => updateFilter("inStock", checked ? true : null)}
            />
            <span className="text-sm font-[family-name:var(--font-montserrat)]">Solo disponibles</span>
          </label>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-28">
          <h2 className="text-lg font-semibold mb-6">Filtrar por</h2>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="font-[family-name:var(--font-montserrat)] bg-transparent">
              Filtros
              {hasActiveFilters && (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtrar productos</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
