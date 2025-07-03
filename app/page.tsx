"use client"

import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { CommunityShowcaseSection } from "@/components/landing/community-showcase-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <CommunityShowcaseSection />
      <Footer />
    </main>
  )
}
