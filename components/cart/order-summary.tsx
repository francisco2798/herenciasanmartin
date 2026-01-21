"use client"

import Link from "next/link"
import { ArrowRight, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/format"

interface OrderSummaryProps {
  showCheckoutButton?: boolean
}

export function OrderSummary({ showCheckoutButton = true }: OrderSummaryProps) {
  const { totalPrice, totalItems } = useCart()

  const shipping = totalPrice > 5000000 ? 0 : 150000
  const total = totalPrice + shipping

  return (
    <div className="bg-secondary/30 p-6 lg:p-8 rounded-lg">
      <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-[family-name:var(--font-montserrat)]">
            Subtotal ({totalItems} {totalItems === 1 ? "artículo" : "artículos"})
          </span>
          <span className="font-[family-name:var(--font-montserrat)]">{formatPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-[family-name:var(--font-montserrat)]">Envío</span>
          <span className="font-[family-name:var(--font-montserrat)]">
            {shipping === 0 ? "Gratis" : formatPrice(shipping)}
          </span>
        </div>

        {totalPrice < 5000000 && (
          <p className="text-xs text-primary font-[family-name:var(--font-montserrat)]">
            Envío gratis en compras mayores a {formatPrice(5000000)}
          </p>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="font-[family-name:var(--font-montserrat)]">{formatPrice(total)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <>
          <Button asChild size="lg" className="w-full mt-6 font-[family-name:var(--font-montserrat)]">
            <Link href="/checkout">
              Proceder al Pago
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-[family-name:var(--font-montserrat)]">Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 text-primary" />
              <span className="font-[family-name:var(--font-montserrat)]">Envío asegurado</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
