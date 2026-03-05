"use client"

import { motion } from "framer-motion"
import {
  Zap,
  Home,
  Search,
  ArrowLeft,
  Satellite,
  Radio,
  Wifi,
  WifiOff,
} from "lucide-react"
import { MagneticButton } from "@/components/effects/magnetic-button"
import { ParticleBackground } from "@/components/effects/particle-background"
import { CursorGlow } from "@/components/effects/cursor-glow"
import Link from "next/link"

const floatingIcons = [
  { icon: Satellite, x: "15%", y: "20%", delay: 0, rotate: 15 },
  { icon: Radio, x: "75%", y: "15%", delay: 0.5, rotate: -20 },
  { icon: Wifi, x: "85%", y: "60%", delay: 1.0, rotate: 10 },
  { icon: WifiOff, x: "10%", y: "70%", delay: 1.5, rotate: -15 },
  { icon: Zap, x: "50%", y: "80%", delay: 2.0, rotate: 25 },
]

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <CursorGlow />
      <ParticleBackground />

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            scale: [0.5, 1, 1, 0.5],
            y: [0, -20, 0, 20, 0],
            rotate: [0, item.rotate, 0, -item.rotate, 0],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute text-neon-cyan"
          style={{ left: item.x, top: item.y }}
          aria-hidden="true"
        >
          <item.icon className="h-12 w-12 md:h-16 md:w-16" />
        </motion.div>
      ))}

      {/* Glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute h-[400px] w-[400px] rounded-full bg-neon-cyan/10 blur-[120px]"
        aria-hidden="true"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute h-[300px] w-[300px] translate-x-32 translate-y-16 rounded-full bg-neon-pink/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center px-4">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="mb-6"
        >
          <h1 className="text-[10rem] font-black leading-none tracking-tighter gradient-text md:text-[14rem]">
            404
          </h1>
        </motion.div>

        {/* Glitch line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mb-8 h-[2px] w-48 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          aria-hidden="true"
        />

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl text-balance">
            Signal Lost in the Void
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground text-pretty">
            The content you are looking for has drifted beyond our network. 
            It may have been moved, deleted, or never existed in this dimension.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton strength={0.2}>
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl bg-neon-cyan px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              href="/search"
              className="flex items-center gap-2 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/10"
            >
              <Search className="h-4 w-4" />
              Search Content
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Go back to previous page
          </button>
        </motion.div>
      </div>
    </div>
  )
}
