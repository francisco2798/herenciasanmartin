import { Download, MessageCircle, Shield, Truck } from "lucide-react"

const services = [
  {
    icon: Shield,
    title: "Certificado de Autenticidad",
    description: "Cada pieza incluye certificación de autenticidad y calidad de las gemas.",
  },
  {
    icon: Truck,
    title: "Envío Seguro",
    description: "Entrega asegurada en empaques de lujo a cualquier parte del mundo.",
  },
  {
    icon: Download,
    title: "Catálogo Digital",
    description: "Descarga nuestro catálogo completo en alta resolución.",
  },
  {
    icon: MessageCircle,
    title: "Atención Personalizada",
    description: "Asesoría experta para ayudarte a encontrar la pieza perfecta.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
            EXPERIENCIA PREMIUM
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">Nuestros Servicios</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="text-center p-6 border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-montserrat)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
