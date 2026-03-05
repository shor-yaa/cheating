 "use client"

import { motion } from "framer-motion";
import React, { useState, FC, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Star, Heart } from "lucide-react";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  rating: string;
  poster: string;
  genre?: string;
};

type RecommendationCarouselProps = {
  movies: Movie[];
  title?: string;
};

const RecommendationCarousel: FC<RecommendationCarouselProps> = ({ 
  movies, 
  title = "Recommended For You" 
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full mb-16"
    >
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-neon-cyan to-neon-pink rounded-full" />
            {title}
          </h2>
          <Link href="/search" className="inline-flex items-center gap-2">
            <motion.span
              whileHover={{ x: 5 }}
              className="text-neon-cyan hover:text-neon-pink transition-colors text-sm font-semibold cursor-pointer"
            >
              View All
            </motion.span>
            <ChevronRight className="h-4 w-4 text-neon-cyan group-hover:text-neon-pink" />
          </Link>
        </div>

        <div className="relative group">
          {/* Left Navigation Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full transition-all ${
              canScrollLeft
                ? "bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                : "bg-muted/20 border border-muted/30 text-muted-foreground opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          {/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
                className="relative flex-shrink-0 group/card"
              >
                {/* Glow Effect */}
                {hovered === index && (
                  <motion.div
                    layoutId="glow"
                    className="absolute -inset-3 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-blue rounded-2xl blur-xl opacity-40 -z-10"
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Card Container wrapped in Link for SPA navigation */}
                <Link href={`/detail/${movie.id}`} className="block">
                  <motion.div
                    className="relative w-72 h-[420px] rounded-2xl overflow-hidden cursor-pointer bg-secondary/40 border-2 border-neon-cyan/20 backdrop-blur-sm flex-shrink-0"
                    animate={{
                      scale: hovered === index ? 1.08 : 1,
                      y: hovered === index ? -24 : 0,
                      borderColor: hovered === index ? "rgba(0, 240, 255, 0.6)" : "rgba(0, 240, 255, 0.2)",
                    }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* Poster Image */}
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                    {/* Hover Content */}
                    <motion.div
                      animate={{
                        opacity: hovered === index ? 1 : 0,
                        y: hovered === index ? 0 : 30,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                    >
                      {/* Top Section */}
                      <div />

                      {/* Bottom Section */}
                      <div className="space-y-4">
                        {/* Play Button with Icon */}
                        <div className="flex gap-3">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.12, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 px-4 py-3 rounded-lg bg-neon-cyan/95 hover:bg-neon-cyan text-black font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all"
                          >
                            <Play className="h-5 w-5 fill-black" />
                            Play
                          </motion.button>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-3 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                          >
                            <Heart className="h-5 w-5" />
                          </motion.button>
                        </div>

                        {/* Movie Info */}
                        <div className="space-y-2">
                          <h3 className="text-base font-bold text-white line-clamp-2">
                            {movie.title}
                          </h3>

                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-neon-cyan/20 border border-neon-cyan/40">
                              <Star className="h-3.5 w-3.5 fill-neon-cyan text-neon-cyan" />
                              <span className="text-xs text-neon-cyan font-bold">
                                {movie.rating}
                              </span>
                            </div>
                            {movie.genre && (
                              <span className="text-xs text-muted-foreground bg-black/40 px-2 py-1 rounded">
                                {movie.genre}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Static Rating Badge (visible always) */}
                    <motion.div 
                      animate={{
                        y: hovered === index ? -50 : 0,
                        opacity: hovered === index ? 0 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-4 right-4 px-3 py-2 rounded-lg bg-black/70 backdrop-blur-md border border-neon-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    >
                      <span className="text-sm font-bold text-neon-cyan flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-current" />
                        {movie.rating}
                      </span>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full transition-all ${
              canScrollRight
                ? "bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                : "bg-muted/20 border border-muted/30 text-muted-foreground opacity-50 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.section>
  );
};

export default RecommendationCarousel;