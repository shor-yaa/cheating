"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Star, Play, Filter, Clock } from "lucide-react"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { ScrollProgress } from "@/components/effects/scroll-progress"
import { Navbar } from "@/components/layout/navbar"
import { GlassCard } from "@/components/effects/glass-card"
import Link from "next/link"
import { cn } from "@/lib/utils"

const allMedia = [
  { id: 1, title: "Neon Shadows", genre: "Sci-Fi", subgenre: "Thriller", rating: 9.2, year: 2026, image: "/images/media-1.jpg", duration: "2h 14m" },
  { id: 2, title: "Beyond the Void", genre: "Sci-Fi", subgenre: "Space Opera", rating: 8.8, year: 2026, image: "/images/media-2.jpg", duration: "1h 58m" },
  { id: 3, title: "Dragon Epoch", genre: "Fantasy", subgenre: "Dark Fantasy", rating: 9.5, year: 2025, image: "/images/media-3.jpg", duration: "2h 31m" },
  { id: 4, title: "Midnight Circuit", genre: "Thriller", subgenre: "Neo-Noir", rating: 8.6, year: 2026, image: "/images/media-4.jpg", duration: "1h 47m" },
  { id: 5, title: "The Deep", genre: "Mystery", subgenre: "Underwater", rating: 8.9, year: 2025, image: "/images/media-5.jpg", duration: "2h 05m" },
  { id: 6, title: "Velocity X", genre: "Action", subgenre: "Racing", rating: 8.4, year: 2026, image: "/images/media-6.jpg", duration: "1h 52m" },
  { id: 7, title: "Phantom Signal", genre: "Sci-Fi", subgenre: "Horror", rating: 8.1, year: 2025, image: "/images/media-1.jpg", duration: "1h 39m" },
  { id: 8, title: "Crown of Ashes", genre: "Fantasy", subgenre: "Epic", rating: 9.0, year: 2026, image: "/images/media-3.jpg", duration: "2h 45m" },
  { id: 9, title: "Zero Gravity", genre: "Action", subgenre: "Adventure", rating: 7.8, year: 2025, image: "/images/media-6.jpg", duration: "1h 55m" },
]

const genres = ["All", "Sci-Fi", "Fantasy", "Thriller", "Mystery", "Action"]
const sortOptions = ["Trending", "Rating", "Newest", "A-Z"]

const recentSearches = ["Neon Shadows", "Dragon Epoch", "sci-fi thriller", "action movies 2026"]

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [activeGenre, setActiveGenre] = useState("All")
  const [activeSort, setActiveSort] = useState("Trending")
  const [showFilters, setShowFilters] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const filteredMedia = useMemo(() => {
    let result = allMedia

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q) ||
          m.subgenre.toLowerCase().includes(q)
      )
    }

    if (activeGenre !== "All") {
      result = result.filter((m) => m.genre === activeGenre)
    }

    switch (activeSort) {
      case "Rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case "Newest":
        result = [...result].sort((a, b) => b.year - a.year)
        break
      case "A-Z":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return result
  }, [query, activeGenre, activeSort])

  const suggestions = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return allMedia
      .filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.toLowerCase().includes(q)
      )
      .slice(0, 5)
  }, [query])

  return (
    <div className="relative min-h-screen bg-background">
      <CursorGlow />
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            <span className="gradient-text">Discover</span> Your Next Obsession
          </h1>
          <p className="text-muted-foreground">
            Explore our entire library of futuristic entertainment
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <div
            className={cn(
              "glass relative flex items-center rounded-2xl transition-all",
              isFocused && "neon-border shadow-[0_0_30px_rgba(0,240,255,0.1)]"
            )}
          >
            <Search className="ml-4 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search titles, genres, actors..."
              className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="mr-2 rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "mr-2 rounded-lg p-2 transition-colors",
                showFilters
                  ? "bg-neon-cyan/10 text-neon-cyan"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Toggle filters"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {isFocused && query && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass neon-border absolute top-full z-20 mt-2 w-full overflow-hidden rounded-xl"
              >
                {suggestions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/detail/${item.id}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-neon-cyan/5"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-10 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.genre} - {item.year}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-neon-cyan text-neon-cyan" />
                      <span className="text-neon-cyan">{item.rating}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Searches */}
          <AnimatePresence>
            {isFocused && !query && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass neon-border absolute top-full z-20 mt-2 w-full overflow-hidden rounded-xl p-4"
              >
                <p className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                  <Clock className="h-3 w-3" /> Recent Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-neon-cyan/20 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="glass rounded-xl p-4">
                <div className="mb-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground uppercase">
                    Sort By
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setActiveSort(opt)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          activeSort === opt
                            ? "border border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan"
                            : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Genre Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                activeGenre === genre
                  ? "bg-neon-cyan text-primary-foreground shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  : "border border-border bg-secondary/50 text-muted-foreground hover:border-neon-cyan/20 hover:text-foreground"
              )}
            >
              {genre}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-muted-foreground"
        >
          {filteredMedia.length} title{filteredMedia.length !== 1 ? "s" : ""}{" "}
          found
          {query && (
            <span>
              {" "}
              for &ldquo;<span className="text-neon-cyan">{query}</span>&rdquo;
            </span>
          )}
        </motion.p>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeGenre}-${activeSort}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {filteredMedia.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/detail/${item.id}`}>
                  <GlassCard className="group overflow-hidden">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon-cyan/20 backdrop-blur-sm">
                          <Play className="h-5 w-5 text-neon-cyan" />
                        </div>
                        <span className="text-xs text-foreground/80">
                          {item.duration}
                        </span>
                      </div>
                      {/* Rating */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-background/60 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-neon-cyan text-neon-cyan" />
                        <span className="text-neon-cyan">{item.rating}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-neon-cyan">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{item.subgenre}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/50" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredMedia.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
            <h3 className="text-lg font-semibold text-foreground">
              No results found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
