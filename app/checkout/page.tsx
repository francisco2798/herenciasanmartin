"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Building2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderSummary } from "@/components/cart/order-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearCart()
    router.push("/pedido-confirmado")
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="pt-28 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-semibold mb-4">No hay productos en tu carrito</h1>
            <Button asChild className="font-[family-name:var(--font-montserrat)]">
              <Link href="/catalogo">Ir al catálogo</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/carrito"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 font-[family-name:var(--font-montserrat)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al carrito
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-6">Información de Contacto</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-[family-name:var(--font-montserrat)]">
                        Nombre
                      </Label>
                      <Input id="firstName" required className="font-[family-name:var(--font-montserrat)]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-[family-name:var(--font-montserrat)]">
                        Apellido
                      </Label>
                      <Input id="lastName" required className="font-[family-name:var(--font-montserrat)]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-[family-name:var(--font-montserrat)]">
                        Correo electrónico
                      </Label>
                      <Input id="email" type="email" required className="font-[family-name:var(--font-montserrat)]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-[family-name:var(--font-montserrat)]">
                        Teléfono
                      </Label>
                      <Input id="phone" type="tel" required className="font-[family-name:var(--font-montserrat)]" />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h2 className="text-xl font-semibold mb-6">Dirección de Envío</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="font-[family-name:var(--font-montserrat)]">
                        Dirección
                      </Label>
                      <Input
                        id="address"
                        placeholder="Calle, número, apartamento"
                        required
                        className="font-[family-name:var(--font-montserrat)]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="font-[family-name:var(--font-montserrat)]">
                          Ciudad
                        </Label>
                        <Input id="city" required className="font-[family-name:var(--font-montserrat)]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="font-[family-name:var(--font-montserrat)]">
                          Departamento
                        </Label>
                        <Input id="state" required className="font-[family-name:var(--font-montserrat)]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip" className="font-[family-name:var(--font-montserrat)]">
                          Código Postal
                        </Label>
                        <Input id="zip" className="font-[family-name:var(--font-montserrat)]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="font-[family-name:var(--font-montserrat)]">
                        Notas adicionales (opcional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Instrucciones especiales de entrega..."
                        className="font-[family-name:var(--font-montserrat)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-xl font-semibold mb-6">Método de Pago</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-center space-x-3 border border-border p-4 rounded-lg has-[:checked]:border-primary">
                      <RadioGroupItem value="card" id="card" />
                      <Label
                        htmlFor="card"
                        className="flex-1 cursor-pointer flex items-center gap-3 font-[family-name:var(--font-montserrat)]"
                      >
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        Tarjeta de crédito o débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border border-border p-4 rounded-lg has-[:checked]:border-primary">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label
                        htmlFor="transfer"
                        className="flex-1 cursor-pointer flex items-center gap-3 font-[family-name:var(--font-montserrat)]"
                      >
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        Transferencia bancaria
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4 p-4 bg-secondary/30 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="font-[family-name:var(--font-montserrat)]">
                          Número de tarjeta
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required
                          className="font-[family-name:var(--font-montserrat)]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry" className="font-[family-name:var(--font-montserrat)]">
                            Fecha de expiración
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            required
                            className="font-[family-name:var(--font-montserrat)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="font-[family-name:var(--font-montserrat)]">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            required
                            className="font-[family-name:var(--font-montserrat)]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "transfer" && (
                    <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                      <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                        Recibirás los datos bancarios para realizar la transferencia una vez confirmado el pedido.
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-[family-name:var(--font-montserrat)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <OrderSummary showCheckoutButton={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
