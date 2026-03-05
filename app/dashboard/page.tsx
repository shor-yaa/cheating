"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Home,
  Compass,
  Clock,
  Heart,
  Settings,
  Play,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react"
import { GlassCard } from "@/components/effects/glass-card"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { ScrollProgress } from "@/components/effects/scroll-progress"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { cn } from "@/lib/utils"
import { FC } from "react";
import RecommendationCarousel from "@/components/RecommendationCarousel";

type RecommendationsProps = {
  items: Array<{
    id: number;
    title: string;
    genre: string;
    rating: string;
    poster: string;
  }>;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
};

const Recommendations: FC<RecommendationsProps> = ({ items, viewMode, setViewMode }) => (
  <>
    <RecommendationCarousel movies={items} title="Recommended For You" />
    <RecommendationCarousel movies={items.slice(0, 4)} title="Trending Now" />
  </>
)

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeSidebar, setActiveSidebar] = useState("Home")

  const sidebarItems = useMemo(
    () => [
      { icon: Home, label: "Home", active: true },
      { icon: Compass, label: "Discover", href: "/search" },
      { icon: Clock, label: "Watch Later" },
      { icon: Heart, label: "Favorites" },
      { icon: Settings, label: "Settings", href: "/profile" },
    ],
    []
  )

  const recommendations = useMemo(
    () => [
      { id: 1, title: "Cyberpunk Nights", genre: "Sci-Fi", rating: "9.1", poster: "/images/media-1.jpg" },
      { id: 2, title: "Digital Dreams", genre: "Thriller", rating: "8.7", poster: "/images/media-2.jpg" },
      { id: 3, title: "Quantum Leap", genre: "Adventure", rating: "8.9", poster: "/images/media-3.jpg" },
      { id: 4, title: "Midnight Circuit", genre: "Neo-Noir", rating: "8.6", poster: "/images/media-4.jpg" },
      { id: 5, title: "The Deep", genre: "Mystery", rating: "8.9", poster: "/images/media-5.jpg" },
      { id: 6, title: "Velocity X", genre: "Action", rating: "8.4", poster: "/images/media-6.jpg" },
      { id: 7, title: "Neon Shadows", genre: "Sci-Fi", rating: "9.2", poster: "/images/media-1.jpg" },
      { id: 8, title: "Electric Dreams", genre: "Drama", rating: "8.8", poster: "/images/media-2.jpg" },
      { id: 9, title: "Crystal Code", genre: "Thriller", rating: "8.5", poster: "/images/media-3.jpg" },
      { id: 10, title: "Synthetic Soul", genre: "Sci-Fi", rating: "9.0", poster: "/images/media-4.jpg" },
    ],
    []
  )

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <CursorGlow />
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />

      <main className="pt-20 w-full">
          {/* Hero Section with Featured Movie */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/media-1.jpg')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-center px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl space-y-6"
              >
                <div className="space-y-2">
                  <p className="text-neon-cyan font-semibold text-sm uppercase tracking-widest">
                    Featured Title
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
                    Cyberpunk Nights
                  </h1>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
                    <Star className="h-4 w-4 fill-neon-cyan text-neon-cyan" />
                    <span className="text-neon-cyan font-bold">9.1</span>
                  </div>
                  <span className="text-muted-foreground">Sci-Fi, Action, Thriller</span>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                  Dive into a neon-soaked world where technology and humanity collide. Experience an unforgettable journey through digital landscapes and cybernetic dreams.
                </p>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg bg-neon-cyan text-black font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    Play Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 rounded-lg border border-neon-cyan/30 text-neon-cyan font-bold hover:bg-neon-cyan/10 transition-all"
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Content Sections */}
          <div className="pt-8 px-4 lg:px-8">
            <Recommendations
              items={recommendations}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
        </main>
    </div>
  )
}
