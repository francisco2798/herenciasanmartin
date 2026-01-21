import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/data"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  currentProduct: Product
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category || p.collection === currentProduct.collection),
    )
    .slice(0, 4)

  if (relatedProducts.length === 0) return null

  return (
    <section className="py-16 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8 text-center">
          También te puede interesar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
