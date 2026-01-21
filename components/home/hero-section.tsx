import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1200&width=1920"
          alt="Joyería de esmeraldas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <span className="inline-block text-sm tracking-[0.3em] text-gold mb-6 font-[family-name:var(--font-montserrat)]">
            COLECCIÓN PRIMAVERA 2025
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-background leading-tight mb-6 text-balance">
            Donde la Naturaleza se Convierte en Arte
          </h1>

          <p className="text-lg text-background/80 mb-8 leading-relaxed font-[family-name:var(--font-montserrat)] font-light">
            Descubre nuestra exclusiva colección de joyas con esmeraldas colombianas de la más alta calidad, engastadas
            en los metales más preciosos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-[family-name:var(--font-montserrat)]"
            >
              <Link href="/catalogo">
                Explorar Colección
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background/30 text-background hover:bg-background/10 px-8 font-[family-name:var(--font-montserrat)] bg-transparent"
            >
              <Link href="/cotizacion">Solicitar Cotización</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-background/60">
          <span className="text-xs tracking-widest font-[family-name:var(--font-montserrat)]">DESCUBRIR</span>
          <div className="w-px h-12 bg-background/30 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
