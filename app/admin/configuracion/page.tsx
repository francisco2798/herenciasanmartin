"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminConfiguracionPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Configuración</h1>
        <p className="text-muted-foreground mt-1 font-[family-name:var(--font-montserrat)]">
          Administra la configuración de tu tienda
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="font-[family-name:var(--font-montserrat)]">
            General
          </TabsTrigger>
          <TabsTrigger value="contacto" className="font-[family-name:var(--font-montserrat)]">
            Contacto
          </TabsTrigger>
          <TabsTrigger value="envios" className="font-[family-name:var(--font-montserrat)]">
            Envíos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Tienda</CardTitle>
              <CardDescription className="font-[family-name:var(--font-montserrat)]">
                Datos básicos de tu negocio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="font-[family-name:var(--font-montserrat)]">
                    Nombre de la tienda
                  </Label>
                  <Input
                    id="storeName"
                    defaultValue="Esmeraldas Herencia San Martin"
                    className="font-[family-name:var(--font-montserrat)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency" className="font-[family-name:var(--font-montserrat)]">
                    Moneda
                  </Label>
                  <Input id="currency" defaultValue="COP" className="font-[family-name:var(--font-montserrat)]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeDescription" className="font-[family-name:var(--font-montserrat)]">
                  Descripción
                </Label>
                <Textarea
                  id="storeDescription"
                  defaultValue="Joyería de alta gama con esmeraldas colombianas"
                  className="font-[family-name:var(--font-montserrat)]"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label className="font-[family-name:var(--font-montserrat)]">Modo mantenimiento</Label>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Desactiva temporalmente la tienda
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacto">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription className="font-[family-name:var(--font-montserrat)]">
                Datos de contacto visibles para clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-[family-name:var(--font-montserrat)]">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contacto@esmeraldaluxe.com"
                    className="font-[family-name:var(--font-montserrat)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-[family-name:var(--font-montserrat)]">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="+57 (1) 234-5678"
                    className="font-[family-name:var(--font-montserrat)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="font-[family-name:var(--font-montserrat)]">
                  WhatsApp (sin espacios ni símbolos)
                </Label>
                <Input
                  id="whatsapp"
                  defaultValue="573001234567"
                  className="font-[family-name:var(--font-montserrat)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-[family-name:var(--font-montserrat)]">
                  Dirección
                </Label>
                <Textarea
                  id="address"
                  defaultValue="Calle 82 #11-75, Bogotá, Colombia"
                  className="font-[family-name:var(--font-montserrat)]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="envios">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Envíos</CardTitle>
              <CardDescription className="font-[family-name:var(--font-montserrat)]">
                Políticas de envío y tarifas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingCost" className="font-[family-name:var(--font-montserrat)]">
                    Costo de envío (COP)
                  </Label>
                  <Input
                    id="shippingCost"
                    type="number"
                    defaultValue="150000"
                    className="font-[family-name:var(--font-montserrat)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeShippingMin" className="font-[family-name:var(--font-montserrat)]">
                    Envío gratis desde (COP)
                  </Label>
                  <Input
                    id="freeShippingMin"
                    type="number"
                    defaultValue="5000000"
                    className="font-[family-name:var(--font-montserrat)]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label className="font-[family-name:var(--font-montserrat)]">Envío internacional</Label>
                  <p className="text-xs text-muted-foreground font-[family-name:var(--font-montserrat)]">
                    Permitir envíos fuera de Colombia
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button onClick={handleSave} disabled={isSaving} className="font-[family-name:var(--font-montserrat)]">
          {isSaving ? "Guardando..." : "Guardar Configuración"}
        </Button>
      </div>
    </div>
  )
}
