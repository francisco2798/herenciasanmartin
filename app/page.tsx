import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CollectionsSection } from "@/components/home/collections-section"
import { ServicesSection } from "@/components/home/services-section"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CollectionsSection />
      <ServicesSection />
      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
