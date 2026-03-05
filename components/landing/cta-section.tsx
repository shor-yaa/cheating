"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/effects/magnetic-button"
import Link from "next/link"

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32">
      {/* Parallax glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[500px] w-[500px] rounded-full bg-neon-cyan/10 blur-[150px]" />
      </motion.div>

      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-6xl text-balance">
            Ready to Enter the
            <br />
            <span className="gradient-text">Next Dimension?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Join millions of viewers already experiencing the future of
            entertainment. Your journey starts with a single click.
          </p>
          <MagneticButton strength={0.2} className="inline-block">
            <Link
              href="/auth"
              className="group inline-flex items-center gap-3 rounded-xl bg-neon-cyan px-10 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative mt-32 border-t border-border/50 pt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row lg:px-8">
          <p className="text-sm text-muted-foreground">
            NEXUS Stream. The future is now.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Privacy
            </span>
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Terms
            </span>
            <span className="cursor-pointer transition-colors hover:text-foreground">
              Support
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
