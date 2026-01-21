import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { collections } from "@/lib/data"

export default function ColeccionesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
              NUESTRAS COLECCIONES
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">Cada Pieza Cuenta una Historia</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-montserrat)]">
              Descubre nuestras colecciones exclusivas, cada una inspirada en la belleza de las esmeraldas colombianas y
              diseñada para momentos únicos.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Link key={collection.id} href={`/catalogo?collection=${collection.name}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <span className="text-xs tracking-widest text-background/70 mb-2 block font-[family-name:var(--font-montserrat)]">
                      {collection.season.toUpperCase()}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-background mb-2">{collection.name}</h2>
                    <p className="text-sm text-background/80 mb-4 line-clamp-2 font-[family-name:var(--font-montserrat)]">
                      {collection.description}
                    </p>
                    <span className="inline-flex items-center text-sm text-background group-hover:text-gold transition-colors font-[family-name:var(--font-montserrat)]">
                      Ver colección
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
