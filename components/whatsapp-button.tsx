"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  productName?: string
  fixed?: boolean
}

export function WhatsAppButton({ productName, fixed = true }: WhatsAppButtonProps) {
  const phoneNumber = "573001234567"
  const message = productName
    ? `Hola, estoy interesado/a en el producto: ${productName}. ¿Podrían darme más información?`
    : "Hola, me gustaría obtener más información sobre su joyería."

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  if (fixed) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5C] transition-colors"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    )
  }

  return (
    <Button asChild className="bg-[#25D366] hover:bg-[#20BA5C] text-white gap-2">
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-5 w-5" />
        Consultar por WhatsApp
      </a>
    </Button>
  )
}
