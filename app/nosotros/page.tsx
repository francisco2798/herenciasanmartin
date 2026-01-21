import Image from "next/image"
import { Award, Diamond, Heart, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

const values = [
  {
    icon: Diamond,
    title: "Calidad Superior",
    description:
      "Seleccionamos únicamente esmeraldas colombianas de la más alta calidad, certificadas y con trazabilidad completa.",
  },
  {
    icon: Heart,
    title: "Pasión Artesanal",
    description:
      "Cada pieza es elaborada a mano por maestros joyeros con décadas de experiencia en el arte de la joyería fina.",
  },
  {
    icon: Shield,
    title: "Garantía Total",
    description:
      "Todas nuestras joyas incluyen certificado de autenticidad y garantía de por vida en estructura y engastes.",
  },
  {
    icon: Award,
    title: "Excelencia Reconocida",
    description: "Más de 20 años creando joyas excepcionales para clientes exigentes en Colombia y el mundo.",
  },
]

export default function NosotrosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
                NUESTRA HISTORIA
              </span>
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6">
                Tradición y Excelencia en Joyería Fina
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6 font-[family-name:var(--font-montserrat)]">
                Desde hace más de dos décadas, Esmeralda Luxe ha sido sinónimo de elegancia y calidad en el mundo de la
                joyería de alta gama. Nuestra pasión por las esmeraldas colombianas nos ha llevado a crear piezas únicas
                que trascienden generaciones.
              </p>
              <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-montserrat)]">
                Trabajamos directamente con las minas más prestigiosas de Colombia para garantizar que cada esmeralda
                que utilizamos cumple con los más altos estándares de color, claridad y brillo.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/luxury-jewelry-workshop-craftsman-emerald.jpg"
                alt="Artesano trabajando en joyería"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
              LO QUE NOS DEFINE
            </span>
            <h2 className="text-3xl font-semibold text-foreground">Nuestros Valores</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-montserrat)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-primary-foreground mb-4">Descubre la Magia de las Esmeraldas</h2>
          <p className="text-primary-foreground/80 mb-8 font-[family-name:var(--font-montserrat)]">
            Visita nuestro showroom en Bogotá o explora nuestra colección en línea.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
