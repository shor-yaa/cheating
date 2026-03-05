"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverScale?: number
  tiltStrength?: number
}

export function GlassCard({
  children,
  className,
  hoverScale = 1.02,
  tiltStrength = 10,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltStrength, -tiltStrength]), {
    damping: 20,
    stiffness: 150,
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltStrength, tiltStrength]), {
    damping: 20,
    stiffness: 150,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: hoverScale }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "glass neon-border rounded-xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
