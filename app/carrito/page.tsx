"use client"

import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CartItem } from "@/components/cart/cart-item"
import { OrderSummary } from "@/components/cart/order-summary"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function CarritoPage() {
  const { items, clearCart } = useCart()

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold text-foreground">Carrito de Compras</h1>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive font-[family-name:var(--font-montserrat)]"
              >
                Vaciar carrito
              </Button>
            )}
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>

                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mt-6 font-[family-name:var(--font-montserrat)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continuar comprando
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary />
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-8 font-[family-name:var(--font-montserrat)]">
                Descubre nuestra exclusiva colección de joyas y encuentra la pieza perfecta.
              </p>
              <Button asChild size="lg" className="font-[family-name:var(--font-montserrat)]">
                <Link href="/catalogo">Explorar Catálogo</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
