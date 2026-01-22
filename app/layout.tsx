import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Herencia san Martin esmeraldas",
  description:
    "Descubre nuestra exclusiva colección de joyería de lujo con esmeraldas colombianas y metales preciosos. Piezas únicas diseñadas para quienes aprecian la excelencia.",
  keywords: [
    "joyería de lujo",
    "esmeraldas colombianas",
    "oro 18k",
    "platino",
    "anillos de compromiso",
    "collares de esmeraldas",
  ],
  authors: [{ name: "Esmeralda Herencia san Martin esmeraldas" }],
  openGraph: {
    title: "Herencia san Martin esmeraldas",
    description: "Exclusiva colección de joyería con esmeraldas colombianas",
    type: "website",
  },
    generator: 'Francisco Gaviria Jimenez'
}

export const viewport: Viewport = {
  themeColor: "#1a5f4a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${montserrat.variable} font-serif antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
