export interface Product {
  id: string
  sku: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: "anillos" | "collares" | "aretes" | "pulseras" | "pendientes"
  material: "oro-18k" | "oro-24k" | "plata-925" | "platino"
  gemstone: "esmeralda" | "diamante" | "rubi" | "zafiro" | "sin-piedra"
  weight: string
  collection: string
  season: string
  inStock: boolean
  stockQuantity: number
  featured: boolean
  createdAt: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  season: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface QuoteRequest {
  name: string
  email: string
  phone: string
  message: string
  productId?: string
  productName?: string
}

export interface FilterOptions {
  category: string[]
  material: string[]
  gemstone: string[]
  collection: string[]
  season: string[]
  priceRange: [number, number]
  inStock: boolean | null
}

export interface CompanyInfo {
  name: string
  logo: string
  email: string
  phone: string
  address: string
  catalogTitle: string
  website?: string
  slogan?: string
}

export type JewelryCategory = 
  | 'Anillos' 
  | 'Pulseras' 
  | 'Topos' 
  | 'Aretes' 
  | 'Cadenas' 
  | 'Collares' 
  | 'Pendientes'

export type JewelryMaterial = 
  | 'Oro 18K' 
  | 'Oro 24K' 
  | 'Plata 925' 
  | 'Platino'

export const JEWELRY_CATEGORIES: JewelryCategory[] = [
  'Anillos',
  'Pulseras',
  'Topos',
  'Aretes',
  'Cadenas',
  'Collares',
  'Pendientes',
]

export const JEWELRY_MATERIALS: JewelryMaterial[] = [
  'Oro 18K',
  'Oro 24K',
  'Plata 925',
  'Platino',
]
