"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products, categoryLabels, materialLabels } from "@/lib/data"

function CotizacionForm() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("producto")

  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (productId) {
      setSelectedProduct(productId)
    }
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/sendQuote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setIsSubmitted(true);
    } else {
      alert("Error al enviar la solicitud");
    }
  } catch (error) {
    console.error(error);
    alert("Error de conexión");
  } finally {
    setIsSubmitting(false);
  }
};

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">¡Solicitud Enviada!</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto font-[family-name:var(--font-montserrat)]">
          Hemos recibido tu solicitud de cotización. Nuestro equipo se pondrá en contacto contigo en las próximas 24-48
          horas.
        </p>
        <Button onClick={() => setIsSubmitted(false)} className="font-[family-name:var(--font-montserrat)]">
          Enviar otra solicitud
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-[family-name:var(--font-montserrat)]">
            Nombre completo *
          </Label>
          <Input id="name" required className="font-[family-name:var(--font-montserrat)]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-[family-name:var(--font-montserrat)]">
            Correo electrónico *
          </Label>
          <Input id="email" type="email" required className="font-[family-name:var(--font-montserrat)]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-[family-name:var(--font-montserrat)]">
            Teléfono *
          </Label>
          <Input id="phone" type="tel" required className="font-[family-name:var(--font-montserrat)]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="font-[family-name:var(--font-montserrat)]">
            Empresa (opcional)
          </Label>
          <Input id="company" className="font-[family-name:var(--font-montserrat)]" />
        </div>
      </div>

      {/* Product Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Detalles del producto</h3>

        <div className="space-y-2">
          <Label className="font-[family-name:var(--font-montserrat)]">Producto de interés</Label>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
              <SelectValue placeholder="Selecciona un producto (opcional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom" className="font-[family-name:var(--font-montserrat)]">
                Diseño personalizado
              </SelectItem>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id} className="font-[family-name:var(--font-montserrat)]">
                  {product.name} - {product.sku}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-[family-name:var(--font-montserrat)]">Tipo de joya</Label>
            <Select>
              <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="font-[family-name:var(--font-montserrat)]">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="font-[family-name:var(--font-montserrat)]">Material preferido</Label>
            <Select>
              <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(materialLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="font-[family-name:var(--font-montserrat)]">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="font-[family-name:var(--font-montserrat)]">
            Presupuesto aproximado
          </Label>
          <Select>
            <SelectTrigger className="font-[family-name:var(--font-montserrat)]">
              <SelectValue placeholder="Selecciona un rango" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-5" className="font-[family-name:var(--font-montserrat)]">
                Menos de $5,000,000 COP
              </SelectItem>
              <SelectItem value="5-10" className="font-[family-name:var(--font-montserrat)]">
                $5,000,000 - $10,000,000 COP
              </SelectItem>
              <SelectItem value="10-20" className="font-[family-name:var(--font-montserrat)]">
                $10,000,000 - $20,000,000 COP
              </SelectItem>
              <SelectItem value="20-50" className="font-[family-name:var(--font-montserrat)]">
                $20,000,000 - $50,000,000 COP
              </SelectItem>
              <SelectItem value="50+" className="font-[family-name:var(--font-montserrat)]">
                Más de $50,000,000 COP
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="font-[family-name:var(--font-montserrat)]">
          Describe tu solicitud *
        </Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Cuéntanos sobre la pieza que buscas, ocasión especial, personalización deseada, o cualquier detalle importante..."
          required
          className="font-[family-name:var(--font-montserrat)]"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full font-[family-name:var(--font-montserrat)]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Solicitar Cotización"}
      </Button>

      <p className="text-xs text-muted-foreground text-center font-[family-name:var(--font-montserrat)]">
        Al enviar este formulario, aceptas ser contactado por nuestro equipo de ventas.
      </p>
    </form>
  )
}

export default function CotizacionPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Info */}
            <div>
              <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
                SERVICIO PERSONALIZADO
              </span>
              <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-6">Solicita tu Cotización</h1>
              <p className="text-muted-foreground leading-relaxed mb-8 font-[family-name:var(--font-montserrat)]">
                ¿Buscas una pieza única o tienes requerimientos especiales? Nuestro equipo de expertos está listo para
                ayudarte a encontrar o crear la joya perfecta.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-semibold font-[family-name:var(--font-montserrat)]">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Cuéntanos tu idea</h3>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      Describe la pieza que buscas o el diseño personalizado que tienes en mente.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-semibold font-[family-name:var(--font-montserrat)]">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Recibe propuestas</h3>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      Nuestros expertos evaluarán tu solicitud y te enviarán opciones personalizadas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-semibold font-[family-name:var(--font-montserrat)]">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Crea tu joya</h3>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      Una vez aprobado el diseño, nuestros artesanos crearán tu pieza única.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
              <Suspense fallback={<div className="animate-pulse h-96 bg-secondary/30 rounded-lg" />}>
                <CotizacionForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
