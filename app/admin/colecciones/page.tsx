"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { products } from "@/lib/data"
import { supabase } from "@/lib/supabase"
import type { Collection } from "@/lib/types"
import { deleteImageAndRow } from "@/lib/api/deleteimage";


export default function AdminColeccionesPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [editPreview, setEditPreview] = useState<string | null>(null)

  // Leer colecciones al montar
  useEffect(() => {
    const fetchCollections = async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching collections:", error)
      } else {
        setCollections(data || [])
      }
    }
    fetchCollections()
  }, [])

  // Contar productos por colección
  const getProductCount = (collectionName: string) => {
    return products.filter((p) => p.collection === collectionName).length
  }

  // Eliminar colección
 const waitForDeletion = async (path: string, attempts = 6, delayMs = 1000) => {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`/api/check-file?path=${encodeURIComponent(path)}`);
      const json = await res.json();
      if (!res.ok) {
        console.warn("check-file returned non-ok:", res.status, json);
        // si hay error del servidor, esperar y reintentar
      } else {
        if (!json.exists) return true; // ya no existe
      }
    } catch (e) {
      console.warn("Error checking file existence:", e);
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return false; // no confirmado
};

const handleDelete = async (collectionId: string, filePath?: string | null) => {
  if (!confirm("¿Seguro que quieres eliminar esta colección y su imagen?")) return;

  try {
    // Llamada al endpoint que borra storage + fila
    await deleteImageAndRow({ id: collectionId, filePath: filePath ?? undefined });

    // Opcional: optimista, quitar del estado inmediatamente
    setCollections(prev => prev.filter(c => c.id !== collectionId));

    // Si quieres confirmar que el archivo fue eliminado físicamente:
    if (filePath) {
      const confirmed = await waitForDeletion(filePath);
      if (!confirmed) {
        console.warn("No se confirmó la eliminación del archivo en storage:", filePath);
        // aquí puedes notificar al usuario o reintentar
      } else {
        console.log("El archivo fue eliminado del storage:", filePath);
      }
    }

  } catch (err) {
    console.error("Delete failed:", err);
    alert("No se pudo eliminar. Revisa la consola para más detalles.");
  }
};


  // Subir archivo a Storage y devolver publicUrl (o null si falla)
  const uploadImageAndGetUrl = async (file: File, folder = "collections") => {
    try {
      const filePath = `${folder}/${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage.from("images").upload(filePath, file, {
        upsert: true,
      })
      if (uploadError) {
        console.error("Upload error:", uploadError)
        return null
      }
      const { data: publicData } = supabase.storage.from("images").getPublicUrl(filePath)
      return publicData.publicUrl
    } catch (err) {
      console.error("Upload exception:", err)
      return null
    }
  }

const uploadToServer = async (file: File) => {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Upload failed");
  return json.url as string;
};




  // Añadir colección
  const handleAddCollection = async (formData: FormData) => {
    const name = (formData.get("name") as string) || ""
    const description = (formData.get("description") as string) || ""
    const season = (formData.get("season") as string) || ""


   // dentro de handleAddCollection
const file = formData.get("image") as File | null;
let imageUrl = "/placeholder.svg";
if (file && file.size > 0) {
  imageUrl = await uploadToServer(file);
}
// luego insertar la colección con image: imageUrl



    const newCollection = {
      name,
      description,
      season,
      image: imageUrl,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
    }

    const { data, error } = await supabase.from("collections").insert(newCollection).select().single()

    if (error) {
      console.error("Error adding collection:", error)
    } else if (data) {
      setCollections((prev) => [data, ...prev])
      setIsNewDialogOpen(false)
    }
  }

  // Editar colección
  const handleEditCollection = async (formData: FormData) => {
    if (!editingCollection) return

    const name = (formData.get("name") as string) || editingCollection.name
    const description = (formData.get("description") as string) || editingCollection.description
    const season = (formData.get("season") as string) || editingCollection.season
    const file = formData.get("image") as File | null

    let imageUrl = editingCollection.image || "/placeholder.svg"
    if (file && file.size > 0) {
      const uploaded = await uploadImageAndGetUrl(file, `collections/${editingCollection.slug}`)
      if (uploaded) imageUrl = uploaded
    }

    const { data, error } = await supabase
      .from("collections")
      .update({ name, description, season, image: imageUrl })
      .eq("id", editingCollection.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating collection:", error)
    } else if (data) {
      setCollections((prev) => prev.map((c) => (c.id === editingCollection.id ? data : c)))
      setEditingCollection(null)
      setEditPreview(null)
      setIsEditDialogOpen(false)
    }
  }

  // Abrir diálogo de edición y preparar preview
  const openEditDialog = (collection: Collection) => {
    setEditingCollection(collection)
    setEditPreview(collection.image || null)
    setIsEditDialogOpen(true)
  }

  // Manejar preview cuando el usuario selecciona un archivo en edición
  const handleEditFileChange = (file?: File | null) => {
    if (!file) {
      setEditPreview(editingCollection?.image || null)
      return
    }
    const url = URL.createObjectURL(file)
    setEditPreview(url)
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

        {/* Nueva colección */}
        <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
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
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.currentTarget as HTMLFormElement
                const formData = new FormData(form)
                await handleAddCollection(formData)
                form.reset()
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea id="description" name="description" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="season">Temporada</Label>
                <Input id="season" name="season" placeholder="Primavera 2025" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Imagen</Label>
                <input id="image" name="image" type="file" accept="image/*" />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

                      {/* Listado de colecciones */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((collection) => (
                    <Card key={collection.id} className="overflow-hidden">
                      <div className="relative aspect-video bg-secondary/30">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold">{collection.name}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {collection.season ?? ""}
                            </Badge>
                          </div>

                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(collection)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => handleDelete(collection.id, collection.file_path ?? undefined)}
                                      >
                                        Eliminar

                            </Button>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {collection.description}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {getProductCount(collection.name)} productos
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

      {/* Diálogo de edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => { if (!open) { setEditingCollection(null); setEditPreview(null); } setIsEditDialogOpen(open); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Colección</DialogTitle>
          </DialogHeader>

          {editingCollection ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.currentTarget as HTMLFormElement
                const formData = new FormData(form)

                // Si hay un archivo seleccionado, interceptamos para crear preview y enviar
                const fileInput = form.querySelector('input[name="image"]') as HTMLInputElement | null
                if (fileInput && fileInput.files && fileInput.files[0]) {
                  handleEditFileChange(fileInput.files[0])
                }

                await handleEditCollection(formData)
                form.reset()
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre</Label>
                <Input id="edit-name" name="name" defaultValue={editingCollection.name} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea id="edit-description" name="description" defaultValue={editingCollection.description} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-season">Temporada</Label>
                <Input id="edit-season" name="season" defaultValue={editingCollection.season} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Imagen (subir nueva)</Label>
                <input
                  id="edit-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    handleEditFileChange(file)
                  }}
                />
              </div>

              {/* Preview de la imagen actual / seleccionada */}
              {editPreview ? (
                <div className="w-full h-48 relative rounded overflow-hidden">
                  <Image src={editPreview} alt="Preview" fill className="object-cover" />
                </div>
              ) : null}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false)
                    setEditingCollection(null)
                    setEditPreview(null)
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          ) : (
            <p>No hay colección seleccionada.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}