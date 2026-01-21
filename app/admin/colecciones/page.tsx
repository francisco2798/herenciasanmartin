"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { collections as initialCollections, products } from "@/lib/data"
import type { Collection } from "@/lib/types"

export default function AdminColeccionesPage() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getProductCount = (collectionName: string) => {
    return products.filter((p) => p.collection === collectionName).length
  }

  const handleDelete = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Colecciones</h1>
          <p className="text-muted-foreground mt-1 font-[family-name:var(--font-montserrat)]">
            Organiza tus productos por colecciones
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-[family-name:var(--font-montserrat)]">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Colección
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva Colección</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setIsDialogOpen(false)
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="font-[family-name:var(--font-montserrat)]">
                  Nombre
                </Label>
                <Input id="name" required className="font-[family-name:var(--font-montserrat)]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="font-[family-name:var(--font-montserrat)]">
                  Descripción
                </Label>
                <Textarea id="description" className="font-[family-name:var(--font-montserrat)]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="season" className="font-[family-name:var(--font-montserrat)]">
                  Temporada
                </Label>
                <Input id="season" placeholder="Primavera 2025" className="font-[family-name:var(--font-montserrat)]" />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="font-[family-name:var(--font-montserrat)] bg-transparent"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="font-[family-name:var(--font-montserrat)]">
                  Crear
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Card key={collection.id} className="overflow-hidden">
            <div className="relative aspect-video bg-secondary/30">
              <Image src={collection.image || "/placeholder.svg"} alt={collection.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold">{collection.name}</h3>
                  <Badge variant="secondary" className="mt-1 font-[family-name:var(--font-montserrat)]">
                    {collection.season}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(collection.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 font-[family-name:var(--font-montserrat)]">
                {collection.description}
              </p>
              <p className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                {getProductCount(collection.name)} productos
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
