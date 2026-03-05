"use client"

import { motion } from "framer-motion"
import { Star, Play, TrendingUp } from "lucide-react"
import { GlassCard } from "@/components/effects/glass-card"
import Link from "next/link"

const trendingMedia = [
  {
    id: 1,
    title: "Neon Shadows",
    genre: "Sci-Fi Thriller",
    rating: 9.2,
    image: "/images/media-1.jpg",
    year: 2026,
  },
  {
    id: 2,
    title: "Beyond the Void",
    genre: "Space Opera",
    rating: 8.8,
    image: "/images/media-2.jpg",
    year: 2026,
  },
  {
    id: 3,
    title: "Dragon Epoch",
    genre: "Dark Fantasy",
    rating: 9.5,
    image: "/images/media-3.jpg",
    year: 2025,
  },
  {
    id: 4,
    title: "Midnight Circuit",
    genre: "Neo-Noir",
    rating: 8.6,
    image: "/images/media-4.jpg",
    year: 2026,
  },
  {
    id: 5,
    title: "The Deep",
    genre: "Mystery",
    rating: 8.9,
    image: "/images/media-5.jpg",
    year: 2025,
  },
  {
    id: 6,
    title: "Velocity X",
    genre: "Action",
    rating: 8.4,
    image: "/images/media-6.jpg",
    year: 2026,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function TrendingSection() {
  return (
    <section className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-2 text-neon-pink">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-semibold tracking-wider uppercase">
                Trending Now
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
              What Everyone Is Watching
            </h2>
          </div>
          <Link
            href="/search"
            className="hidden text-sm font-medium text-neon-cyan transition-colors hover:text-neon-cyan/80 md:block"
          >
            View All
          </Link>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {trendingMedia.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <Link href={`/detail/${item.id}`}>
                <GlassCard className="group overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neon-cyan/20 backdrop-blur-sm">
                        <Play className="h-6 w-6 text-neon-cyan" />
                      </div>
                    </div>
                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-background/60 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-neon-cyan text-neon-cyan" />
                      <span className="text-neon-cyan">{item.rating}</span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-neon-cyan">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{item.genre}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                      <span>{item.year}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
