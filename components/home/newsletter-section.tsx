"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-24 bg-primary">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-primary-foreground mb-4">
          Únete a Nuestra Exclusiva Lista
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-8 font-[family-name:var(--font-montserrat)]">
          Sé el primero en conocer nuevas colecciones, eventos exclusivos y ofertas especiales.
        </p>

        {subscribed ? (
          <p className="text-lg text-primary-foreground font-[family-name:var(--font-montserrat)]">
            ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 font-[family-name:var(--font-montserrat)]"
            />
            <Button type="submit" variant="secondary" className="px-8 font-[family-name:var(--font-montserrat)]">
              Suscribirse
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
