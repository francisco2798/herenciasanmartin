import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-wider">ESMERALDA</span>
              <span className="text-xs tracking-[0.3em] text-background/60 font-[family-name:var(--font-montserrat)]">
                Herencia san Martin esmeraldas
              </span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed font-[family-name:var(--font-montserrat)]">
              Joyería de alta gama con esmeraldas colombianas de la más alta calidad. Cada pieza es una obra maestra
              única.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">Navegación</h3>
            <ul className="space-y-2 font-[family-name:var(--font-montserrat)]">
              {["Catálogo", "Colecciones", "Nosotros", "Contacto"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">Servicios</h3>
            <ul className="space-y-2 font-[family-name:var(--font-montserrat)]">
              <li>
                <Link href="/cotizacion" className="text-sm text-background/70 hover:text-background transition-colors">
                  Cotización Personalizada
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo-pdf"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Descargar Catálogo PDF
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="text-sm text-background/70 hover:text-background transition-colors">
                  Garantía y Certificados
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-sm text-background/70 hover:text-background transition-colors">
                  Envíos y Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wide">Contacto</h3>
            <ul className="space-y-3 font-[family-name:var(--font-montserrat)]">
              <li className="flex items-center gap-3 text-sm text-background/70 min-w-[250px]">
                <Phone className="h-4 w-4" />
                <span>+57 3008609538</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span> herenciasanmartinesmeraldas@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Calle 82 #11-75, chia-bogota,Colombia</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60 font-[family-name:var(--font-montserrat)]">
              © 2025 Herencia san Martin esmeraldas. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/60 font-[family-name:var(--font-montserrat)]">
              <Link href="/privacidad" className="hover:text-background transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-background transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
