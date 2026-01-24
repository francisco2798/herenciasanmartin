"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  ImageIcon,
  Quote,
  Diamond,
} from "lucide-react"
import type { CompanyInfo } from "@/lib/types"

interface CompanyInfoFormProps {
  companyInfo: CompanyInfo
  onChange: (info: CompanyInfo) => void
}

export function CompanyInfoForm({
  companyInfo,
  onChange,
}: CompanyInfoFormProps) {
  const handleChange = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...companyInfo, [field]: value })
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange("logo", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="border-[#2A2A2A] bg-[#111111]/90 backdrop-blur-sm overflow-hidden">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      
      <CardHeader className="border-b border-[#2A2A2A] bg-[#0A0A0A]/50">
        <CardTitle className="flex items-center gap-3 text-[#F5F5F0] font-serif tracking-wide">
          <div className="p-2 rounded-lg bg-[#1A1A1A] border border-[#D4AF37]/20">
            <Building2 className="h-5 w-5 text-[#D4AF37]" />
          </div>
          Información de la Joyería
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="companyName"
              className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase"
            >
              <Building2 className="h-3.5 w-3.5" />
              Nombre de la Joyería
            </Label>
            <Input
              id="companyName"
              placeholder="Joyería Esmeraldas Herencia de San Martín"
              value={companyInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="slogan"
              className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase"
            >
              <Quote className="h-3.5 w-3.5" />
              Slogan / Lema
            </Label>
            <Input
              id="slogan"
              placeholder="Herencia de San Martín"
              value={companyInfo.slogan || ""}
              onChange={(e) => handleChange("slogan", e.target.value)}
              className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="catalogTitle"
              className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase"
            >
              <FileText className="h-3.5 w-3.5" />
              Título del Catálogo
            </Label>
            <Input
              id="catalogTitle"
              placeholder="Catálogo Exclusivo 2026"
              value={companyInfo.catalogTitle}
              onChange={(e) => handleChange("catalogTitle", e.target.value)}
              className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="contacto@esmeraldasherencia.com"
              value={companyInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase"
            >
              <Phone className="h-3.5 w-3.5" />
              Teléfono
            </Label>
            <Input
              id="phone"
              placeholder="+57 310 123 4567"
              value={companyInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase"
            >
              <MapPin className="h-3.5 w-3.5" />
              Dirección
            </Label>
            <Input
              id="address"
              placeholder="Carrera 7 #45-23, Bogotá, Colombia"
              value={companyInfo.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] placeholder:text-[#8B8B7A]/50 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label
              htmlFor="logo"
              className="flex items-center gap-2 text-[#D4AF37] text-xs tracking-wide uppercase"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Logo de la Joyería
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="flex-1 bg-[#1A1A1A] border-[#2A2A2A] text-[#F5F5F0] file:bg-[#D4AF37]/10 file:text-[#D4AF37] file:border-[#D4AF37]/30 file:border file:rounded-md file:px-3 file:mr-3 file:font-medium hover:file:bg-[#D4AF37]/20"
              />
              {companyInfo.logo && (
                <div className="relative">
                  <div className="absolute inset-0 bg-[#047857] blur-md opacity-30" />
                  <img
                    src={companyInfo.logo || "/placeholder.svg"}
                    alt="Logo preview"
                    className="relative h-16 w-16 rounded-lg border-2 border-[#D4AF37]/50 object-contain bg-[#0A0A0A] p-1"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Bottom gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </Card>
  )
}
