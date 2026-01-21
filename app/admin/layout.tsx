"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, FolderOpen, Settings, ArrowLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Productos", href: "/admin/productos", icon: Package },
  { name: "Colecciones", href: "/admin/colecciones", icon: FolderOpen },
  { name: "Configuración", href: "/admin/configuracion", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors font-[family-name:var(--font-montserrat)] ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border hidden lg:block">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-[family-name:var(--font-montserrat)]">Volver a la tienda</span>
          </Link>
          <div className="flex flex-col mt-4">
            <span className="text-xl font-semibold tracking-wider text-foreground">ESMERALDA</span>
            <span className="text-xs tracking-[0.2em] text-muted-foreground font-[family-name:var(--font-montserrat)]">
              ADMIN PANEL
            </span>
          </div>
        </div>

        <nav className="px-4 space-y-1">
          <NavLinks />
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-wider text-foreground">ESMERALDA</span>
          <span className="text-[10px] tracking-[0.15em] text-muted-foreground font-[family-name:var(--font-montserrat)]">
            ADMIN
          </span>
        </div>

        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6">
              <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-4">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-[family-name:var(--font-montserrat)]">Volver a la tienda</span>
              </Link>
            </div>
            <nav className="px-4 space-y-1">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">{children}</main>
    </div>
  )
}
