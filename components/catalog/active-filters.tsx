"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { categoryLabels, materialLabels, gemstoneLabels } from "@/lib/data"
import type { FilterOptions } from "@/lib/types"

interface ActiveFiltersProps {
  filters: FilterOptions
  onRemove: (key: keyof FilterOptions, value: string) => void
}

export function ActiveFilters({ filters, onRemove }: ActiveFiltersProps) {
  const activeFilters: { key: keyof FilterOptions; value: string; label: string }[] = []

  filters.category.forEach((v) => activeFilters.push({ key: "category", value: v, label: categoryLabels[v] }))
  filters.material.forEach((v) => activeFilters.push({ key: "material", value: v, label: materialLabels[v] }))
  filters.gemstone.forEach((v) => activeFilters.push({ key: "gemstone", value: v, label: gemstoneLabels[v] }))
  filters.collection.forEach((v) => activeFilters.push({ key: "collection", value: v, label: v }))
  filters.season.forEach((v) => activeFilters.push({ key: "season", value: v, label: v }))

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.map((filter) => (
        <Badge
          key={`${filter.key}-${filter.value}`}
          variant="secondary"
          className="gap-1 pr-1 font-[family-name:var(--font-montserrat)]"
        >
          {filter.label}
          <button
            onClick={() => onRemove(filter.key, filter.value)}
            className="ml-1 rounded-full hover:bg-foreground/10 p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  )
}
