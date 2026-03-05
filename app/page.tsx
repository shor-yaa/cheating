"use client"

import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { ScrollProgress } from "@/components/effects/scroll-progress"
import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { TrendingSection } from "@/components/landing/trending-section"
import { FeaturedSection } from "@/components/landing/featured-section"
import { CtaSection } from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <CursorGlow />
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <TrendingSection />
        <FeaturedSection />
        <CtaSection />
      </main>
    </div>
  )
}
