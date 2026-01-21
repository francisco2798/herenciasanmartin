"use client"

import type React from "react"

import { useState } from "react"
import { Check, Mail, MapPin, Phone, Clock } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.2em] text-primary mb-2 block font-[family-name:var(--font-montserrat)]">
              ESTAMOS AQUÍ PARA TI
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">Contáctanos</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-[family-name:var(--font-montserrat)]">
              ¿Tienes preguntas sobre nuestras joyas o servicios? Nuestro equipo está disponible para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Teléfono</h3>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">+57 (1) 234-5678</p>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">+57 300 123 4567</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Correo electrónico</h3>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    contacto@esmeraldaluxe.com
                  </p>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    ventas@esmeraldaluxe.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Showroom</h3>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">Calle 82 #11-75</p>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">Bogotá, Colombia</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Horario de atención</h3>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Lunes a Viernes: 9:00 AM - 7:00 PM
                  </p>
                  <p className="text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Sábados: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 sm:p-8 rounded-lg border border-border">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">¡Mensaje Enviado!</h2>
                    <p className="text-muted-foreground mb-6 font-[family-name:var(--font-montserrat)]">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} className="font-[family-name:var(--font-montserrat)]">
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-[family-name:var(--font-montserrat)]">
                          Nombre *
                        </Label>
                        <Input id="name" required className="font-[family-name:var(--font-montserrat)]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-[family-name:var(--font-montserrat)]">
                          Correo electrónico *
                        </Label>
                        <Input id="email" type="email" required className="font-[family-name:var(--font-montserrat)]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-[family-name:var(--font-montserrat)]">
                          Teléfono
                        </Label>
                        <Input id="phone" type="tel" className="font-[family-name:var(--font-montserrat)]" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="font-[family-name:var(--font-montserrat)]">
                          Asunto *
                        </Label>
                        <Input id="subject" required className="font-[family-name:var(--font-montserrat)]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-[family-name:var(--font-montserrat)]">
                        Mensaje *
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="¿En qué podemos ayudarte?"
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
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
