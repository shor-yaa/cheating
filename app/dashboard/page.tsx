"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
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
  contentType: "movies" | "shows";
};

const Recommendations: FC<RecommendationsProps> = ({ items, viewMode, setViewMode, contentType }) => (
  <>
    <RecommendationCarousel movies={items} title={`Recommended ${contentType === "movies" ? "Movies" : "Shows"}`} />
    <RecommendationCarousel movies={items.slice(0, 4)} title={`Trending ${contentType === "movies" ? "Movies" : "Shows"}`} />
  </>
)

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeSidebar, setActiveSidebar] = useState("Home")
  const [contentType, setContentType] = useState<"movies" | "shows">("movies")
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseXSpring = useMotionValue(0)
  const mouseYSpring = useMotionValue(0)

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

  const movies = useMemo(
    () => [
      { id: 1, title: "Inception", genre: "Sci-Fi", rating: "8.8", poster: "/images/media-1.jpg" },
      { id: 2, title: "The Dark Knight", genre: "Action", rating: "9.0", poster: "/images/media-2.jpg" },
      { id: 3, title: "Interstellar", genre: "Sci-Fi", rating: "8.6", poster: "/images/media-3.jpg" },
      { id: 4, title: "Parasite", genre: "Thriller", rating: "8.5", poster: "/images/media-4.jpg" },
      { id: 5, title: "Oppenheimer", genre: "Biography", rating: "8.3", poster: "/images/media-5.jpg" },
      { id: 6, title: "The Shawshank Redemption", genre: "Drama", rating: "9.3", poster: "/images/media-6.jpg" },
      { id: 7, title: "Pulp Fiction", genre: "Crime", rating: "8.9", poster: "/images/media-1.jpg" },
      { id: 8, title: "The Godfather", genre: "Crime", rating: "9.2", poster: "/images/media-2.jpg" },
      { id: 9, title: "Forrest Gump", genre: "Drama", rating: "8.8", poster: "/images/media-3.jpg" },
      { id: 10, title: "The Matrix", genre: "Sci-Fi", rating: "8.7", poster: "/images/media-4.jpg" },
    ],
    []
  )

  const shows = useMemo(
    () => [
      { id: 11, title: "Breaking Bad", genre: "Crime", rating: "9.5", poster: "/images/media-5.jpg" },
      { id: 12, title: "Game of Thrones", genre: "Fantasy", rating: "9.2", poster: "/images/media-6.jpg" },
      { id: 13, title: "The Mandalorian", genre: "Sci-Fi", rating: "8.7", poster: "/images/media-1.jpg" },
      { id: 14, title: "Stranger Things", genre: "Sci-Fi", rating: "8.7", poster: "/images/media-2.jpg" },
      { id: 15, title: "The Crown", genre: "Biography", rating: "8.6", poster: "/images/media-3.jpg" },
      { id: 16, title: "The Office", genre: "Comedy", rating: "8.9", poster: "/images/media-4.jpg" },
      { id: 17, title: "Friends", genre: "Comedy", rating: "8.9", poster: "/images/media-5.jpg" },
      { id: 18, title: "Black Mirror", genre: "Sci-Fi", rating: "8.8", poster: "/images/media-6.jpg" },
      { id: 19, title: "The Witcher", genre: "Fantasy", rating: "8.2", poster: "/images/media-1.jpg" },
      { id: 20, title: "House of Cards", genre: "Drama", rating: "8.6", poster: "/images/media-2.jpg" },
    ],
    []
  )

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "start 500px"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  // Auto-rotate featured movie
  useEffect(() => {
    const currentList = contentType === "movies" ? movies : shows
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % currentList.length)
    }, 8000) // Change every 8 seconds

    return () => clearInterval(interval)
  }, [contentType, movies, shows])

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
      mouseXSpring.set(x * 50)
      mouseYSpring.set(y * 50)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseXSpring, mouseYSpring])

  // Navigate to next featured movie
  const goToNextMovie = () => {
    const currentList = contentType === "movies" ? movies : shows
    setFeaturedIndex((prev) => (prev + 1) % currentList.length)
  }

  // Navigate to previous featured movie
  const goToPreviousMovie = () => {
    const currentList = contentType === "movies" ? movies : shows
    setFeaturedIndex((prev) => (prev - 1 + currentList.length) % currentList.length)
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden" ref={containerRef}>
      <Navbar />

      <main className="pt-20 w-full relative">
          {/* Optimized Interactive Background - Reduced animations for better performance */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Primary cyan orb - simplified animation */}
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-32 -left-20 h-[400px] w-[400px] rounded-full bg-neon-cyan/10 blur-[120px]"
            />
            {/* Secondary pink orb */}
            <motion.div
              animate={{
                x: [-30, 20, 30, -30],
                y: [0, 30, -40, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-neon-pink/10 blur-[100px]"
            />
          </div>

          {/* Parallax Background Elements with opacity */}
          <motion.div
            style={{ y: y1, opacity }}
            className="absolute top-32 -left-20 h-[400px] w-[400px] rounded-full bg-neon-cyan/3 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />
          <motion.div
            style={{ y: y2, opacity }}
            className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-neon-pink/3 blur-[80px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Hero Section with Featured Movie */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-2xl"
          >
            {/* Animated glow effect based on mouse position */}
            <motion.div
              animate={{
                background: [
                  `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)`,
                ],
              }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute inset-0 pointer-events-none z-10"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${(contentType === "movies" ? movies : shows)[featuredIndex].poster}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="relative h-full flex flex-col justify-center px-6 lg:px-12">
              <motion.div
                key={featuredIndex}
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
                    {(contentType === "movies" ? movies : shows)[featuredIndex].title}
                  </h1>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
                    <Star className="h-4 w-4 fill-neon-cyan text-neon-cyan" />
                    <span className="text-neon-cyan font-bold">{(contentType === "movies" ? movies : shows)[featuredIndex].rating}</span>
                  </div>
                  <span className="text-muted-foreground">{(contentType === "movies" ? movies : shows)[featuredIndex].genre}</span>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                  {contentType === "movies" 
                    ? "Discover a world of cinematic excellence. Experience award-winning films that push the boundaries of storytelling."
                    : "Binge-watch captivating series that will keep you engaged for hours. Premium content at your fingertips."
                  }
                </p>

                <div className="flex gap-4 pt-4 flex-wrap">
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
                  <motion.button
                    onClick={goToPreviousMovie}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg border border-neon-pink/30 text-neon-pink font-bold hover:bg-neon-pink/10 transition-all"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    onClick={goToNextMovie}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-lg bg-neon-pink/20 text-neon-pink font-bold border border-neon-pink/50 hover:bg-neon-pink/30 transition-all"
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Content Sections */}
          <div className="pt-8 px-4 lg:px-8">
            {/* Content Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-secondary/40 backdrop-blur-sm border border-neon-cyan/20 rounded-full p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setContentType("movies")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    contentType === "movies"
                      ? "bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Movies
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setContentType("shows")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    contentType === "shows"
                      ? "bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  TV Shows
                </motion.button>
              </div>
            </div>

            <Recommendations
              items={contentType === "movies" ? movies : shows}
              viewMode={viewMode}
              setViewMode={setViewMode}
              contentType={contentType}
            />
          </div>
        </main>
    </div>
  )
}
