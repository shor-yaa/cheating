"use client";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { TrendingSection } from "@/components/landing/trending-section"
import { FeaturedSection } from "@/components/landing/featured-section"
import LiveSearch from "@/components/ui/LiveSearch";
import AuthForm from "@/components/form/AuthForm";
import { CtaSection } from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TrendingSection />
        <FeaturedSection />
        <CtaSection />
        <AuthForm />.
        <LiveSearch />
        <div className="max-w-md mx-auto my-10 p-6 border rounded-xl bg-card">
  <h3 className="text-xl font-bold mb-4 text-white">Task 4: FAQ Accordion</h3>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>What is NEXUS Stream?</AccordionTrigger>
      <AccordionContent>
        NEXUS is a next-generation streaming platform built for cinematic worlds.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it free to use?</AccordionTrigger>
      <AccordionContent>
        Yes! You can explore cinematic worlds with our basic members plan.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
      </main>
    </div>
  )
}
