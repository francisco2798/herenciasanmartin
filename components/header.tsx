"use client"

import Link from "next/link"
import Image from "next/image";

import { useState } from "react"
import { Menu, ShoppingBag, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Catálogo", href: "/catalogo" },
  { name: "Colecciones", href: "/colecciones" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Contacto", href: "/contacto" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image 
                  src="/logo2.png" 
                  alt="Logo Esmeralda" 
                  width={50} 
                  height={50} 
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold tracking-wider text-primary">ESMERALDAS</span>
                  <span className="text-xs tracking-[0.3em] text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Herencia san Martin
                  </span>
                </div>
              </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide font-[family-name:var(--font-montserrat)]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>

            <Link href="/admin">

            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
              <span className="sr-only"> cuenta </span>
            </Button>

            </Link>

            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-[family-name:var(--font-montserrat)]">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <div className="flex flex-col gap-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="border-border" />
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-montserrat)]"
                  >
                    Panel de Administración
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
