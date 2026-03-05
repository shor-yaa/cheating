"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Zap,
  Check,
} from "lucide-react"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { MagneticButton } from "@/components/effects/magnetic-button"
import Link from "next/link"

type AuthMode = "signin" | "signup"

const signupSteps = [
  { id: 1, label: "Account" },
  { id: 2, label: "Profile" },
  { id: 3, label: "Preferences" },
]

const genres = [
  "Sci-Fi",
  "Thriller",
  "Fantasy",
  "Action",
  "Drama",
  "Horror",
  "Comedy",
  "Documentary",
  "Animation",
  "Romance",
]

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signin")
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < 5
          ? [...prev, genre]
          : prev
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <CursorGlow />
      <ParticleBackground />

      {/* Back to home */}
      <Link
        href="/"
        className="glass absolute top-6 left-6 z-20 flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 neon-border">
              <Zap className="h-5 w-5 text-neon-cyan" />
            </div>
            <span className="text-xl font-bold neon-text text-neon-cyan">
              NEXUS
            </span>
          </Link>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass relative mb-6 flex rounded-xl p-1"
        >
          {(["signin", "signup"] as AuthMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m)
                setStep(1)
              }}
              className={`relative flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                mode === m ? "text-neon-cyan" : "text-muted-foreground"
              }`}
            >
              {mode === m && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">
                {m === "signin" ? "Sign In" : "Sign Up"}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Step Indicator (Sign Up only) */}
        <AnimatePresence>
          {mode === "signup" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                {signupSteps.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                          step > s.id
                            ? "bg-neon-cyan text-primary-foreground"
                            : step === s.id
                              ? "border border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                              : "border border-border bg-secondary text-muted-foreground"
                        }`}
                      >
                        {step > s.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          s.id
                        )}
                      </div>
                      <span
                        className={`hidden text-xs font-medium sm:block ${
                          step >= s.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < signupSteps.length - 1 && (
                      <div
                        className={`mx-3 h-[1px] w-12 sm:w-16 ${
                          step > s.id
                            ? "bg-neon-cyan"
                            : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass neon-border rounded-2xl p-6"
        >
          <AnimatePresence mode="wait">
            {mode === "signin" ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sign in to continue your journey
                  </p>
                </div>

                {/* Email */}
                <div className="group relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-neon-cyan" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-xl border border-border bg-secondary/50 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-neon-cyan/50 focus:bg-secondary focus:ring-1 focus:ring-neon-cyan/30 focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div className="group relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-neon-cyan" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full rounded-xl border border-border bg-secondary/50 py-3 pr-10 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-neon-cyan/50 focus:bg-secondary focus:ring-1 focus:ring-neon-cyan/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <MagneticButton strength={0.15} className="mt-2">
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-cyan py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                  >
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.div
                key={`signup-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {step === 1 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Create account
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Start your streaming adventure
                      </p>
                    </div>
                    <div className="group relative">
                      <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-neon-cyan" />
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full rounded-xl border border-border bg-secondary/50 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-neon-cyan/50 focus:bg-secondary focus:ring-1 focus:ring-neon-cyan/30 focus:outline-none"
                      />
                    </div>
                    <div className="group relative">
                      <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-neon-cyan" />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-xl border border-border bg-secondary/50 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-neon-cyan/50 focus:bg-secondary focus:ring-1 focus:ring-neon-cyan/30 focus:outline-none"
                      />
                    </div>
                    <div className="group relative">
                      <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-neon-cyan" />
                      <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full rounded-xl border border-border bg-secondary/50 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-neon-cyan/50 focus:bg-secondary focus:ring-1 focus:ring-neon-cyan/30 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Your profile
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Tell us a bit about yourself
                      </p>
                    </div>
                    <div className="group relative">
                      <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-neon-cyan" />
                      <input
                        type="text"
                        placeholder="Display name"
                        className="w-full rounded-xl border border-border bg-secondary/50 py-3 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-neon-cyan/50 focus:bg-secondary focus:ring-1 focus:ring-neon-cyan/30 focus:outline-none"
                      />
                    </div>
                    {/* Avatar selection placeholder */}
                    <div className="flex gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <button
                          key={i}
                          className={`h-16 w-16 rounded-xl transition-all ${
                            i === 1
                              ? "border-2 border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                              : "border border-border hover:border-neon-cyan/30"
                          }`}
                          style={{
                            background: `linear-gradient(${135 + i * 45}deg, rgba(0,240,255,${0.1 + i * 0.05}), rgba(255,51,102,${0.1 + i * 0.05}))`,
                          }}
                        >
                          <span className="sr-only">Avatar option {i}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Pick your genres
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Select up to 5 genres you love
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            selectedGenres.includes(genre)
                              ? "border border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                              : "border border-border bg-secondary/50 text-muted-foreground hover:border-neon-cyan/20 hover:text-foreground"
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="mt-2 flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  )}
                  <MagneticButton strength={0.15} className="flex-1">
                    {step < 3 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-cyan py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <Link
                        href="/dashboard"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-cyan py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                      >
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
