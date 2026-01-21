import Link from "next/link"
import { Check, Download, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function PedidoConfirmadoPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
              <Check className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">¡Pedido Confirmado!</h1>

          <p className="text-lg text-muted-foreground mb-8 font-[family-name:var(--font-montserrat)]">
            Gracias por tu compra. Hemos recibido tu pedido y te enviaremos un correo con los detalles y el seguimiento.
          </p>

          <div className="bg-secondary/30 p-6 rounded-lg mb-8">
            <div className="flex items-center justify-center gap-2 text-foreground mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-[family-name:var(--font-montserrat)]">
                Recibirás la confirmación en tu correo electrónico
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
              Número de pedido: #EL-{Date.now().toString().slice(-8)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-[family-name:var(--font-montserrat)]">
              <Link href="/catalogo">Seguir Comprando</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-[family-name:var(--font-montserrat)] bg-transparent"
            >
              <Link href="/">
                <Download className="mr-2 h-4 w-4" />
                Descargar Factura
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
