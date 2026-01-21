import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
              SELECCIÓN EXCLUSIVA
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Piezas Destacadas</h2>
          </div>
          <Button
            asChild
            variant="link"
            className="text-primary hover:text-primary/80 p-0 font-[family-name:var(--font-montserrat)]"
          >
            <Link href="/catalogo">
              Ver todo el catálogo
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
