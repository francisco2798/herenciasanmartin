import jsPDF from "jspdf"
import type { Product, CompanyInfo, JewelryCategory } from "./types"

// Colores de lujo - Negro mate, Dorado y Esmeralda
const COLORS = {
  black: { r: 10, g: 10, b: 10 },        // #0A0A0A
  blackSoft: { r: 17, g: 17, b: 17 },     // #111111
  blackCard: { r: 22, g: 22, b: 22 },     // #161616
  gold: { r: 212, g: 175, b: 55 },        // #D4AF37
  goldLight: { r: 229, g: 199, b: 97 },   // #E5C761
  goldDark: { r: 163, g: 136, b: 41 },    // #A38829
  emerald: { r: 4, g: 120, b: 87 },       // #047857
  emeraldLight: { r: 5, g: 150, b: 105 }, // #059669
  emeraldDark: { r: 6, g: 95, b: 70 },    // #065F46
  cream: { r: 245, g: 245, b: 240 },      // #F5F5F0
  gray: { r: 139, g: 139, b: 122 },       // #8B8B7A
}

// Orden de categorías
const CATEGORY_ORDER: JewelryCategory[] = [
  "Anillos",
  "Collares",
  "Aretes",
  "Pulseras",
  "Pendientes",
  "Cadenas",
  "Topos",
]

export async function generateCatalogPDF(
  companyInfo: CompanyInfo,
  products: Product[]
): Promise<void> {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - margin * 2
  let yPosition = margin

  // Helper: Nueva página si es necesario
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      doc.addPage()
      addLuxuryPageDecoration()
      yPosition = margin + 15
      return true
    }
    return false
  }

  // Decoración de página de lujo
  const addLuxuryPageDecoration = () => {
    // Fondo negro mate
    doc.setFillColor(COLORS.black.r, COLORS.black.g, COLORS.black.b)
    doc.rect(0, 0, pageWidth, pageHeight, "F")

    // Patrón geométrico sutil (líneas doradas)
    doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
    doc.setLineWidth(0.1)
    for (let i = 0; i < pageWidth; i += 30) {
      doc.line(i, 0, i, pageHeight)
    }
    for (let i = 0; i < pageHeight; i += 30) {
      doc.line(0, i, pageWidth, i)
    }

    // Borde superior dorado
    doc.setFillColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
    doc.rect(0, 0, pageWidth, 4, "F")
    
    // Borde inferior dorado
    doc.rect(0, pageHeight - 4, pageWidth, 4, "F")

    // Líneas laterales doradas decorativas
    doc.setLineWidth(0.5)
    doc.line(8, 10, 8, pageHeight - 10)
    doc.line(pageWidth - 8, 10, pageWidth - 8, pageHeight - 10)
  }

  // Helper: Cargar imagen como base64
  const loadImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = () => resolve(null)
        reader.readAsDataURL(blob)
      })
    } catch {
      return null
    }
  }

  // === PORTADA ELEGANTE ===
  // Fondo negro
  doc.setFillColor(COLORS.black.r, COLORS.black.g, COLORS.black.b)
  doc.rect(0, 0, pageWidth, pageHeight, "F")

  // Patrón geométrico en la portada
  doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.setLineWidth(0.05)
  for (let i = 0; i < pageWidth; i += 20) {
    doc.line(i, 0, i, pageHeight)
  }
  for (let i = 0; i < pageHeight; i += 20) {
    doc.line(0, i, pageWidth, i)
  }

  // Marco dorado exterior
  doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.setLineWidth(2)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
  doc.setLineWidth(0.5)
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28)

  // Diamante decorativo superior
  doc.setFillColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  const diamondY = 35
  doc.triangle(pageWidth / 2, diamondY - 8, pageWidth / 2 - 6, diamondY, pageWidth / 2 + 6, diamondY, "F")
  doc.triangle(pageWidth / 2, diamondY + 8, pageWidth / 2 - 6, diamondY, pageWidth / 2 + 6, diamondY, "F")

  // Logo centrado
  if (companyInfo.logo) {
    try {
      const logoBase64 = await loadImageAsBase64(companyInfo.logo)
      if (logoBase64) {
        // Marco dorado para el logo
        doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
        doc.setLineWidth(1)
        doc.rect(pageWidth / 2 - 27, 48, 54, 54)
        doc.addImage(logoBase64, "PNG", pageWidth / 2 - 25, 50, 50, 50)
      }
    } catch {
      // Logo failed
    }
  }

  // Nombre de la empresa
  yPosition = 120
  doc.setFontSize(36)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(COLORS.cream.r, COLORS.cream.g, COLORS.cream.b)
  doc.text("HERENCIA", pageWidth / 2, yPosition, { align: "center" })

  yPosition += 14
  doc.setFontSize(18)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.text("SAN MARTÍN", pageWidth / 2, yPosition, { align: "center", charSpace: 8 })

  // Línea decorativa dorada
  yPosition += 15
  doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.setLineWidth(1)
  doc.line(pageWidth / 2 - 50, yPosition, pageWidth / 2 + 50, yPosition)
  
  // Diamante central
  const midDiamond = yPosition + 10
  doc.setFillColor(COLORS.emerald.r, COLORS.emerald.g, COLORS.emerald.b)
  doc.triangle(pageWidth / 2, midDiamond - 5, pageWidth / 2 - 4, midDiamond, pageWidth / 2 + 4, midDiamond, "F")
  doc.triangle(pageWidth / 2, midDiamond + 5, pageWidth / 2 - 4, midDiamond, pageWidth / 2 + 4, midDiamond, "F")

  // Título del catálogo
  yPosition += 35
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(COLORS.cream.r, COLORS.cream.g, COLORS.cream.b)
  doc.text(
    companyInfo.catalogTitle || "CATÁLOGO EXCLUSIVO",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  )

  // Año
  yPosition += 10
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.text(new Date().getFullYear().toString(), pageWidth / 2, yPosition, {
    align: "center",
  })

  // Slogan
  yPosition += 30
  doc.setFontSize(11)
  doc.setFont("helvetica", "italic")
  doc.setTextColor(COLORS.gray.r, COLORS.gray.g, COLORS.gray.b)
  doc.text(
    "Joyería Fina con Esmeraldas Colombianas",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  )

  // Información de contacto en portada
  yPosition = pageHeight - 55
  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(COLORS.gray.r, COLORS.gray.g, COLORS.gray.b)

  if (companyInfo.address) {
    doc.text(companyInfo.address, pageWidth / 2, yPosition, { align: "center" })
    yPosition += 6
  }
  if (companyInfo.phone) {
    doc.text(companyInfo.phone, pageWidth / 2, yPosition, { align: "center" })
    yPosition += 6
  }
  if (companyInfo.email) {
    doc.text(companyInfo.email, pageWidth / 2, yPosition, { align: "center" })
  }

  // === PÁGINAS DE PRODUCTOS ===
  doc.addPage()
  addLuxuryPageDecoration()
  yPosition = margin + 20

  // Agrupar productos por categoría
  const productsByCategory = products.reduce(
    (acc, product) => {
      const category = product.category || "Sin categoría"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    },
    {} as Record<string, Product[]>
  )

  // Ordenar categorías
  const sortedCategories = CATEGORY_ORDER.filter(
    (cat) => productsByCategory[cat]
  )

  for (const category of sortedCategories) {
    const categoryProducts = productsByCategory[category]
    if (!categoryProducts) continue

    // Encabezado de categoría elegante
    checkNewPage(50)

    // Fondo de categoría con gradiente esmeralda
    doc.setFillColor(COLORS.emerald.r, COLORS.emerald.g, COLORS.emerald.b)
    doc.roundedRect(margin, yPosition - 2, contentWidth, 16, 2, 2, "F")

    // Borde dorado
    doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
    doc.setLineWidth(0.8)
    doc.roundedRect(margin, yPosition - 2, contentWidth, 16, 2, 2)

    // Diamante decorativo
    const catDiamondX = margin + 12
    const catDiamondY = yPosition + 6
    doc.setFillColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
    doc.triangle(catDiamondX, catDiamondY - 4, catDiamondX - 3, catDiamondY, catDiamondX + 3, catDiamondY, "F")
    doc.triangle(catDiamondX, catDiamondY + 4, catDiamondX - 3, catDiamondY, catDiamondX + 3, catDiamondY, "F")

    // Texto de categoría
    doc.setFontSize(13)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(COLORS.cream.r, COLORS.cream.g, COLORS.cream.b)
    doc.text(category.toUpperCase(), margin + 22, yPosition + 8)

    // Cantidad de productos
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(COLORS.goldLight.r, COLORS.goldLight.g, COLORS.goldLight.b)
    doc.text(
      `${categoryProducts.length} pieza${categoryProducts.length > 1 ? "s" : ""}`,
      pageWidth - margin - 8,
      yPosition + 8,
      { align: "right" }
    )

    yPosition += 25

    // Productos en categoría
    for (const product of categoryProducts) {
      const productHeight = 72
      checkNewPage(productHeight)

      const productStartY = yPosition

      // Fondo de producto con borde de lujo
      doc.setFillColor(COLORS.blackCard.r, COLORS.blackCard.g, COLORS.blackCard.b)
      doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
      doc.setLineWidth(0.3)
      doc.roundedRect(margin, yPosition, contentWidth, 65, 3, 3, "FD")

      // Línea lateral esmeralda
      doc.setFillColor(COLORS.emerald.r, COLORS.emerald.g, COLORS.emerald.b)
      doc.rect(margin, yPosition, 4, 65, "F")

      // Imagen del producto
      const imgX = margin + 10
      const imgY = yPosition + 5
      const imgSize = 55

      if (product.images && product.images.length > 0) {
        try {
          const imgBase64 = await loadImageAsBase64(product.images[0])
          if (imgBase64) {
            // Marco dorado para la imagen
            doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
            doc.setLineWidth(1)
            doc.rect(imgX - 1, imgY - 1, imgSize + 2, imgSize + 2)
            doc.addImage(imgBase64, "JPEG", imgX, imgY, imgSize, imgSize)
          }
        } catch {
          drawLuxuryImagePlaceholder(doc, imgX, imgY, imgSize)
        }
      } else {
        drawLuxuryImagePlaceholder(doc, imgX, imgY, imgSize)
      }

      // Detalles del producto
      const textX = imgX + imgSize + 12
      const textWidth = contentWidth - imgSize - 35
      let textY = yPosition + 10

      // Código del producto con estilo
      doc.setFontSize(8)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
      doc.text(`REF: ${product.sku || "N/A"}`, textX, textY)

      // Nombre del producto
      textY += 8
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(COLORS.cream.r, COLORS.cream.g, COLORS.cream.b)
      const nameLines = doc.splitTextToSize(product.name, textWidth - 45)
      doc.text(nameLines[0], textX, textY)

      // Precio destacado con fondo
      doc.setFillColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
      const priceText = `$${product.price.toLocaleString("es-CO")}`
      const priceWidth = doc.getTextWidth(priceText) + 10
      doc.roundedRect(pageWidth - margin - priceWidth - 5, textY - 7, priceWidth + 4, 10, 1, 1, "F")
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(COLORS.black.r, COLORS.black.g, COLORS.black.b)
      doc.text(priceText, pageWidth - margin - 7, textY, { align: "right" })

      // Colección
      textY += 8
      doc.setFontSize(9)
      doc.setFont("helvetica", "italic")
      doc.setTextColor(COLORS.goldLight.r, COLORS.goldLight.g, COLORS.goldLight.b)
      if (product.collection) {
        doc.text(`Colección: ${product.collection}`, textX, textY)
      }

      // Material principal
      textY += 7
      doc.setFont("helvetica", "bold")
      doc.setTextColor(COLORS.emerald.r, COLORS.emerald.g, COLORS.emerald.b)
      doc.text(`Material: ${product.material || "No especificado"}`, textX, textY)

      // Peso
      if (product.weight) {
        doc.setFont("helvetica", "normal")
        doc.setTextColor(COLORS.gray.r, COLORS.gray.g, COLORS.gray.b)
        doc.text(`  |  Peso: ${product.weight}`, textX + 55, textY)
      }

      // ...no hay materiales disponibles en Product, se omite este bloque...

      // Descripción
      textY += 7
      doc.setFontSize(8)
      doc.setTextColor(COLORS.gray.r, COLORS.gray.g, COLORS.gray.b)
      if (product.description) {
        const descLines = doc.splitTextToSize(product.description, textWidth)
        doc.text(descLines.slice(0, 2), textX, textY)
      }

      yPosition = productStartY + 70
    }

    yPosition += 10
  }

  // === CONTRAPORTADA ELEGANTE ===
  doc.addPage()
  
  // Fondo negro
  doc.setFillColor(COLORS.black.r, COLORS.black.g, COLORS.black.b)
  doc.rect(0, 0, pageWidth, pageHeight, "F")

  // Patrón geométrico
  doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.setLineWidth(0.05)
  for (let i = 0; i < pageWidth; i += 20) {
    doc.line(i, 0, i, pageHeight)
  }
  for (let i = 0; i < pageHeight; i += 20) {
    doc.line(0, i, pageWidth, i)
  }

  // Marco dorado
  doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.setLineWidth(2)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
  doc.setLineWidth(0.5)
  doc.rect(14, 14, pageWidth - 28, pageHeight - 28)

  // Logo
  yPosition = 55
  if (companyInfo.logo) {
    try {
      const logoBase64 = await loadImageAsBase64(companyInfo.logo)
      if (logoBase64) {
        doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
        doc.setLineWidth(1)
        doc.rect(pageWidth / 2 - 22, yPosition - 2, 44, 44)
        doc.addImage(logoBase64, "PNG", pageWidth / 2 - 20, yPosition, 40, 40)
      }
    } catch {
      // Logo failed
    }
  }

  // Mensaje de agradecimiento
  yPosition = 115
  doc.setFontSize(22)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.text("Gracias por su Preferencia", pageWidth / 2, yPosition, {
    align: "center",
  })

  // Línea decorativa
  yPosition += 12
  doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.setLineWidth(0.5)
  doc.line(pageWidth / 2 - 40, yPosition, pageWidth / 2 + 40, yPosition)

  // Diamante
  const backDiamond = yPosition + 10
  doc.setFillColor(COLORS.emerald.r, COLORS.emerald.g, COLORS.emerald.b)
  doc.triangle(pageWidth / 2, backDiamond - 5, pageWidth / 2 - 4, backDiamond, pageWidth / 2 + 4, backDiamond, "F")
  doc.triangle(pageWidth / 2, backDiamond + 5, pageWidth / 2 - 4, backDiamond, pageWidth / 2 + 4, backDiamond, "F")

  yPosition += 25
  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(COLORS.cream.r, COLORS.cream.g, COLORS.cream.b)
  doc.text(
    "Cada pieza es elaborada con la más alta calidad",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  )
  yPosition += 7
  doc.text(
    "y el compromiso de nuestra herencia artesanal.",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  )

  // Información de contacto
  yPosition += 30
  doc.setFontSize(10)
  doc.setTextColor(COLORS.gray.r, COLORS.gray.g, COLORS.gray.b)

  if (companyInfo.address) {
    doc.text(companyInfo.address, pageWidth / 2, yPosition, { align: "center" })
    yPosition += 8
  }
  if (companyInfo.phone) {
    doc.text(`Teléfono: ${companyInfo.phone}`, pageWidth / 2, yPosition, {
      align: "center",
    })
    yPosition += 8
  }
  if (companyInfo.email) {
    doc.text(`Email: ${companyInfo.email}`, pageWidth / 2, yPosition, {
      align: "center",
    })
  }

  // Nombre de la marca
  yPosition = pageHeight - 50
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(COLORS.cream.r, COLORS.cream.g, COLORS.cream.b)
  doc.text("HERENCIA SAN MARTÍN", pageWidth / 2, yPosition, { align: "center" })

  // Fecha de generación
  yPosition += 15
  doc.setFontSize(8)
  doc.setTextColor(COLORS.gray.r, COLORS.gray.g, COLORS.gray.b)
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.text(`Catálogo generado: ${currentDate}`, pageWidth / 2, yPosition, {
    align: "center",
  })

  // === NUMERACIÓN DE PÁGINAS ===
  const totalPages = doc.getNumberOfPages()
  for (let i = 2; i < totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
    doc.text(`${i - 1}`, pageWidth / 2, pageHeight - 8, { align: "center" })
  }

  // Descargar PDF
  const fileName = `herencia-san-martin-catalogo-${new Date().toISOString().split("T")[0]}.pdf`
  doc.save(fileName)
}

function drawLuxuryImagePlaceholder(
  doc: jsPDF,
  x: number,
  y: number,
  size: number
) {
  doc.setFillColor(22, 22, 22)
  doc.setDrawColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.setLineWidth(0.5)
  doc.rect(x, y, size, size, "FD")
  
  // Diamante como placeholder
  const cx = x + size / 2
  const cy = y + size / 2
  doc.setFillColor(COLORS.gold.r, COLORS.gold.g, COLORS.gold.b)
  doc.triangle(cx, cy - 8, cx - 6, cy, cx + 6, cy, "F")
  doc.triangle(cx, cy + 8, cx - 6, cy, cx + 6, cy, "F")
  
  doc.setFontSize(6)
  doc.setTextColor(COLORS.gray.r, COLORS.gray.g, COLORS.gray.b)
  doc.text("Sin imagen", cx, cy + 18, { align: "center" })
}
