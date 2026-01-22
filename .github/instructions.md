# Copilot Instructions for Esmeraldas Jewelry Store (Next.js)

## Project Overview
- **Type:** E-commerce web app for luxury jewelry (esmeraldas)
- **Framework:** Next.js 16 (App Router, TypeScript, RSC)
- **Styling:** Tailwind CSS, shadcn/ui components, custom fonts
- **State:** React Context for cart, localStorage persistence
- **Data:** In-memory (lib/data.ts), no backend/API

## Key Directories & Files
- `app/` — Route-based pages (Next.js App Router)
  - `admin/` — Admin UI for managing products/collections (client components)
  - `catalogo/`, `carrito/`, `checkout/`, etc. — Main user flows
- `components/` — UI and feature components (organized by domain)
- `lib/` — Data models (`types.ts`), static data (`data.ts`), cart context (`cart-context.tsx`), utilities
- `styles/`, `public/` — Global CSS, static assets

## Patterns & Conventions
- **Client/server components:** Use `"use client"` for interactive pages/components (e.g., admin, cart)
- **UI:** Use shadcn/ui primitives (see `components/ui/`), custom Montserrat/Cormorant fonts
- **Data:** Products/collections are imported from `lib/data.ts` (no DB)
- **Cart:** Use `CartProvider` (lib/cart-context.tsx) at root; access with `useCart()`
- **Type safety:** All product/cart/collection data uses interfaces from `lib/types.ts`
- **Aliases:** Use `@/` for root imports (see `tsconfig.json`/`components.json`)
- **Spanish language:** All UI and content is in Spanish

## Developer Workflows
- **Start dev server:** `pnpm dev` or `npm run dev`
- **Build:** `pnpm build` or `npm run build`
- **Lint:** `pnpm lint` or `npm run lint`
- **No tests** or backend integration present

## Examples
- **Add a new product:** Update `lib/data.ts` and ensure type matches `Product` in `lib/types.ts`
- **Add a new page:** Create a new folder in `app/` (e.g., `app/nueva-pagina/page.tsx`)
- **Use a UI component:** Import from `@/components/ui/` (e.g., `import { Button } from "@/components/ui/button"`)

## Special Notes
- **Images:** Use Next.js `<Image />` with static assets in `public/`
- **No API routes:** All data is static/in-memory
- **Admin UI is for demo only:** Changes do not persist (no backend)

---
For more details, see `lib/types.ts`, `lib/data.ts`, and `app/layout.tsx` for project structure and conventions.
