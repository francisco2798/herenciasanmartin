import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ImageGallery } from "@/components/product/image-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { RelatedProducts } from "@/components/product/related-products"
import { products } from "@/lib/data"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    return {
      title: "Producto no encontrado | Esmeralda Luxe",
    }
  }

  return {
    title: `${product.name} | Esmeralda Luxe`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ImageGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <RelatedProducts currentProduct={product} />

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
