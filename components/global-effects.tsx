"use client"

import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { ScrollProgress } from "@/components/effects/scroll-progress"

export function GlobalEffects() {
  return (
    <>
      <CursorGlow />
      <ParticleBackground />
      <ScrollProgress />
    </>
  )
}