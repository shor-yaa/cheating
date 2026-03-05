"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Sparkles, Tv, Globe, Headphones } from "lucide-react"
import { GlassCard } from "@/components/effects/glass-card"

const features = [
  {
    icon: Tv,
    title: "4K Ultra HD",
    description:
      "Experience crystal-clear visuals with HDR support and Dolby Vision on every title in our library.",
  },
  {
    icon: Globe,
    title: "Stream Anywhere",
    description:
      "Watch on any device, anywhere. Seamless sync across mobile, desktop, and smart TV platforms.",
  },
  {
    icon: Headphones,
    title: "Spatial Audio",
    description:
      "Immersive 3D audio that surrounds you. Feel every explosion, whisper, and musical note.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description:
      "Our neural engine learns your taste and surfaces content you never knew you needed.",
  },
]

export function FeaturedSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="relative z-10 overflow-hidden py-32">
      {/* Parallax background elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-10 -left-20 h-[400px] w-[400px] rounded-full bg-neon-cyan/5 blur-[100px]"
        aria-hidden="true"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute right-0 bottom-10 h-[300px] w-[300px] rounded-full bg-neon-pink/5 blur-[80px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl text-balance">
            Why Choose <span className="gradient-text">NEXUS</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Built for the future. Powered by cutting-edge technology that transforms how you experience entertainment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <GlassCard className="h-full p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neon-cyan/10">
                  <feature.icon className="h-6 w-6 text-neon-cyan" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
