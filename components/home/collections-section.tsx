import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { collections } from "@/lib/data"

export function CollectionsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
            NUESTRAS COLECCIONES
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Descubre Cada Historia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.slice(0, 4).map((collection, index) => (
            <Link
              key={collection.id}
              href={`/colecciones/${collection.slug}`}
              className={`group relative overflow-hidden ${index === 0 ? "md:row-span-2" : ""}`}
            >
              <div className={`relative ${index === 0 ? "aspect-[3/4]" : "aspect-[16/9]"}`}>
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
                  <h3 className="text-2xl sm:text-3xl font-semibold text-background mb-2">{collection.name}</h3>
                  <p className="text-sm text-background/80 mb-4 line-clamp-2 font-[family-name:var(--font-montserrat)]">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-background group-hover:text-gold transition-colors font-[family-name:var(--font-montserrat)]">
                    Explorar
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
