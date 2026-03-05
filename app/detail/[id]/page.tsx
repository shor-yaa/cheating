"use client"

import { useState, use } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Star,
  Heart,
  Share2,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Film,
  ArrowLeft,
} from "lucide-react"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { ScrollProgress } from "@/components/effects/scroll-progress"
import { GlassCard } from "@/components/effects/glass-card"
import { MagneticButton } from "@/components/effects/magnetic-button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mediaData: Record<
  string,
  {
    id: number
    title: string
    genre: string
    subgenre: string
    rating: number
    year: number
    image: string
    duration: string
    description: string
    longDescription: string
    cast: string[]
    director: string
    episodes?: number
    seasons?: number
  }
> = {
  "1": {
    id: 1,
    title: "Neon Shadows",
    genre: "Sci-Fi",
    subgenre: "Thriller",
    rating: 9.2,
    year: 2026,
    image: "/images/media-1.jpg",
    duration: "2h 14m",
    description:
      "In a rain-soaked megacity where reality blurs with code, a rogue hacker uncovers a conspiracy that threatens to rewrite the fabric of human consciousness.",
    longDescription:
      "Set in 2089, Neo-Shanghai is a sprawling metropolis where augmented reality overlays every surface and neural interfaces connect citizens to the Mesh, a global consciousness network. When elite hacker Kira Tanaka stumbles upon hidden code buried deep within the Mesh, she discovers a shadow organization manipulating memories on a massive scale. With the help of a decommissioned android and a street-level data broker, Kira must navigate the neon-lit underbelly of the city to expose the truth before her own memories are erased. The series weaves together themes of identity, free will, and the price of technological progress in a visually stunning cyberpunk world.",
    cast: ["Maya Chen", "Riku Tanaka", "Dev Patel", "Zoe Kravitz"],
    director: "Denis Villeneuve",
    seasons: 2,
    episodes: 16,
  },
  "2": {
    id: 2,
    title: "Beyond the Void",
    genre: "Sci-Fi",
    subgenre: "Space Opera",
    rating: 8.8,
    year: 2026,
    image: "/images/media-2.jpg",
    duration: "1h 58m",
    description:
      "Humanity's last colony ship drifts through uncharted space, carrying the hopes of a dying civilization toward a signal that promises salvation or destruction.",
    longDescription:
      "The Prometheus Ark has been traveling for 300 years. Its inhabitants have never known Earth, only the sterile corridors and artificial skies of the generation ship. When the ship's AI detects a mysterious signal from an impossible source, a team of explorers must venture into the void between galaxies. What they find challenges everything they know about the universe, humanity's origins, and the true purpose of their voyage. As factions form and trust fractures, the crew must decide whether the signal represents first contact or an elaborate trap.",
    cast: ["Oscar Isaac", "Saoirse Ronan", "John Boyega", "Tilda Swinton"],
    director: "Christopher Nolan",
    seasons: 1,
    episodes: 8,
  },
  "3": {
    id: 3,
    title: "Dragon Epoch",
    genre: "Fantasy",
    subgenre: "Dark Fantasy",
    rating: 9.5,
    year: 2025,
    image: "/images/media-3.jpg",
    duration: "2h 31m",
    description:
      "When the last dragon awakens after a thousand-year slumber, ancient prophecies collide with political intrigue in a world where magic has been forbidden.",
    longDescription:
      "The Kingdom of Valdris has outlawed magic for centuries, maintaining order through an iron-fisted monarchy. But when earthquakes shatter the sealed vaults beneath the Crystal Mountains, the last living dragon emerges, and with it, the return of magic itself. Princess Sera, a secret practitioner of forbidden arts, must navigate a treacherous court while forging an unlikely alliance with the dragon and a band of outcasts. Together they face an ancient evil that the original dragon riders sacrificed everything to contain.",
    cast: ["Florence Pugh", "Pedro Pascal", "Idris Elba", "Anya Taylor-Joy"],
    director: "Chloé Zhao",
    seasons: 3,
    episodes: 24,
  },
  "4": {
    id: 4,
    title: "Midnight Circuit",
    genre: "Thriller",
    subgenre: "Neo-Noir",
    rating: 8.6,
    year: 2026,
    image: "/images/media-4.jpg",
    duration: "1h 47m",
    description:
      "A burned-out detective chases a serial killer through rain-soaked streets, only to discover the truth hits closer to home than he ever imagined.",
    longDescription:
      "Detective Marcus Cole hasn't slept in three days. The Midnight Caller, a serial killer who leaves cryptic messages at each crime scene, is escalating. As Marcus deciphers the clues, he realizes the killer isn't just choosing random victims, they're recreating unsolved cases from Marcus's own career. Each murder forces him to confront the compromises he's made, the cases he buried, and the person he's become.",
    cast: ["Denzel Washington", "Lupita Nyong'o", "Rami Malek"],
    director: "David Fincher",
    duration: "1h 47m",
  },
  "5": {
    id: 5,
    title: "The Deep",
    genre: "Mystery",
    subgenre: "Underwater",
    rating: 8.9,
    year: 2025,
    image: "/images/media-5.jpg",
    duration: "2h 05m",
    description:
      "A research team discovers an ancient civilization at the bottom of the ocean, but the deeper they go, the more they realize something is watching them.",
    longDescription:
      "The Mariana Research Station sits at the deepest point of the Pacific Ocean. When Dr. Elena Vasquez's team discovers impossible structures predating human civilization by millions of years, their scientific mission becomes a fight for survival. The ruins are not empty. Something has been waiting in the darkness, and it has been aware of humanity far longer than humanity has been aware of itself. Part cosmic horror, part deep-sea thriller.",
    cast: ["Ana de Armas", "Daniel Kaluuya", "Cate Blanchett"],
    director: "Guillermo del Toro",
  },
  "6": {
    id: 6,
    title: "Velocity X",
    genre: "Action",
    subgenre: "Racing",
    rating: 8.4,
    year: 2026,
    image: "/images/media-6.jpg",
    duration: "1h 52m",
    description:
      "In a world where antigravity racing is the ultimate sport, an underdog pilot must battle corporate sabotage and impossible odds to win the championship.",
    longDescription:
      "The World Velocity Championship is the most-watched sporting event on Earth. Pilots push the limits of physics in sleek hovercrafts that reach speeds of 900 km/h through tracks carved into mountains, cities, and even through orbital stations. Rookie pilot Jin Park, racing for a bankrupt team, discovers that the championship is rigged by a megacorporation. With everything on the line, Jin must use skill, courage, and a prototype engine to beat the system.",
    cast: ["Steven Yeun", "Zendaya", "Ke Huy Quan"],
    director: "Joseph Kosinski",
  },
}

const similarMedia = [
  { id: 2, title: "Beyond the Void", image: "/images/media-2.jpg", rating: 8.8 },
  { id: 5, title: "The Deep", image: "/images/media-5.jpg", rating: 8.9 },
  { id: 6, title: "Velocity X", image: "/images/media-6.jpg", rating: 8.4 },
  { id: 3, title: "Dragon Epoch", image: "/images/media-3.jpg", rating: 9.5 },
]

export default function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [expanded, setExpanded] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [liked, setLiked] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)

  const media = mediaData[id] || mediaData["1"]

  return (
    <div className="relative min-h-screen bg-background">
      <CursorGlow />
      <ParticleBackground />
      <ScrollProgress />

      {/* Hero Banner */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={media.image}
          alt={media.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6 z-20"
        >
          <Link
            href="/search"
            className="glass flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </motion.div>

        {/* Trailer Overlay */}
        <AnimatePresence>
          {showTrailer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-background/90"
              onClick={() => setShowTrailer(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="glass neon-border flex aspect-video w-full max-w-3xl items-center justify-center rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-neon-cyan/10">
                    <Play className="h-8 w-8 text-neon-cyan" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Trailer Preview
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {media.title} - Official Trailer
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <main className="relative z-10 mx-auto -mt-40 max-w-7xl px-4 pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Genre Badge */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan">
                  {media.genre}
                </span>
                <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                  {media.subgenre}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl text-balance">
                {media.title}
              </h1>

              {/* Meta */}
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-neon-cyan text-neon-cyan" />
                  <span className="font-semibold text-neon-cyan">
                    {media.rating}
                  </span>
                  <span>/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {media.year}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {media.duration}
                </div>
                {media.seasons && (
                  <div className="flex items-center gap-1">
                    <Film className="h-4 w-4" />
                    {media.seasons} Season{media.seasons > 1 ? "s" : ""},{" "}
                    {media.episodes} Episodes
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mb-8 flex flex-wrap gap-3">
                <MagneticButton strength={0.2}>
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="group flex items-center gap-2 rounded-xl bg-neon-cyan px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                  >
                    <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                    Watch Trailer
                  </button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <button className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                    <Plus className="h-4 w-4" />
                    My List
                  </button>
                </MagneticButton>
                <button
                  onClick={() => setLiked(!liked)}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl border transition-all",
                    liked
                      ? "border-neon-pink/50 bg-neon-pink/10 text-neon-pink"
                      : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                  aria-label={liked ? "Unlike" : "Like"}
                >
                  <Heart
                    className={cn("h-5 w-5", liked && "fill-neon-pink")}
                  />
                </button>
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Share"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              <GlassCard className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Synopsis
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {media.description}
                </p>
                <AnimatePresence>
                  {expanded && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 leading-relaxed text-muted-foreground"
                    >
                      {media.longDescription}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 flex items-center gap-1 text-sm font-medium text-neon-cyan transition-colors hover:text-neon-cyan/80"
                >
                  {expanded ? "Show Less" : "Read More"}
                  {expanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
              </GlassCard>

              {/* Cast */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Cast & Crew
                </h3>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Director:</span>{" "}
                    <span className="font-medium text-foreground">
                      {media.director}
                    </span>
                  </div>
                  {media.cast.map((actor) => (
                    <div
                      key={actor}
                      className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground"
                    >
                      {actor}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="mb-6 p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Rate This Title
                </h3>
                <div className="mb-3 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setUserRating(star)}
                      className="transition-transform hover:scale-125"
                      aria-label={`Rate ${star} out of 10`}
                    >
                      <Star
                        className={cn(
                          "h-6 w-6 transition-colors",
                          (hoveredStar || userRating) >= star
                            ? "fill-neon-cyan text-neon-cyan"
                            : "text-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-muted-foreground"
                  >
                    You rated this{" "}
                    <span className="font-semibold text-neon-cyan">
                      {userRating}/10
                    </span>
                  </motion.p>
                )}
              </GlassCard>
            </motion.div>

            {/* Similar Titles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                You Might Also Like
              </h3>
              <div className="flex flex-col gap-3">
                {similarMedia
                  .filter((m) => m.id !== media.id)
                  .slice(0, 3)
                  .map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <Link href={`/detail/${item.id}`}>
                        <GlassCard className="group flex items-center gap-3 overflow-hidden p-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-16 w-24 rounded-lg object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground group-hover:text-neon-cyan">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3 fill-neon-cyan text-neon-cyan" />
                              <span className="text-neon-cyan">
                                {item.rating}
                              </span>
                            </div>
                          </div>
                        </GlassCard>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
