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
  Star,
  EyeOff,
  Zap,
  Check,
  HelpCircle, // Added for FAB
} from "lucide-react"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { MagneticButton } from "@/components/effects/magnetic-button"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"
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
  
  // ROUND 3 STATES
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [showToast, setShowToast] = useState(false)

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : prev.length < 5
          ? [...prev, genre]
          : prev
    )
  }

  const handleToast = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background font-sans">
      <CursorGlow />
      <ParticleBackground />

      {/* 1. BREADCRUMB NAVIGATION */}
      <div className="absolute top-6 left-24 z-20 hidden md:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/" className="text-muted-foreground hover:text-neon-cyan">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><span className="text-neon-cyan">Authentication</span></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Back to home */}
      <Link
        href="/"
        className="glass absolute top-6 left-6 z-20 flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-white"
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

        {/* 2. STEP PROGRESS TRACKER (SIGN UP ONLY) */}
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
                        {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                      </div>
                    </div>
                    {i < signupSteps.length - 1 && (
                      <div className={`mx-3 h-[1px] w-12 ${step > s.id ? "bg-neon-cyan" : "bg-border"}`} />
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
              <motion.div key="signin" className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
                <div className="group relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-neon-cyan" />
                  <input type="email" placeholder="Email" className="w-full rounded-xl border border-border bg-secondary/50 py-3 pl-10 text-sm focus:outline-none focus:border-neon-cyan/50" />
                </div>
                <div className="group relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-neon-cyan" />
                  <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full rounded-xl border border-border bg-secondary/50 py-3 pl-10 text-sm focus:outline-none focus:border-neon-cyan/50" />
                </div>
                <MagneticButton className="mt-2">
                  <button onClick={handleToast} className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-cyan py-3 text-sm font-semibold text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                    Sign In <ArrowRight className="h-4 w-4" />
                  </button>
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.div key={`signup-${step}`} className="flex flex-col gap-4">
                {step === 1 && <input type="email" placeholder="Email" className="w-full rounded-xl border border-border bg-secondary/50 p-3 text-sm" />}
                {step === 2 && <input type="text" placeholder="Display Name" className="w-full rounded-xl border border-border bg-secondary/50 p-3 text-sm" />}
                {step === 3 && (
                   <div className="flex flex-wrap gap-2">
                   {genres.map((genre) => (
                     <button key={genre} onClick={() => toggleGenre(genre)} className={`rounded-lg px-3 py-1 text-xs border transition-all ${selectedGenres.includes(genre) ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan' : 'border-border hover:border-neon-cyan/30'}`}>{genre}</button>
                   ))}
                 </div>
                )}
                <div className="mt-2 flex gap-3">
                  {step > 1 && <button onClick={() => setStep(step - 1)} className="px-4 py-2 text-sm border border-border rounded-xl text-muted-foreground hover:text-foreground transition-colors">Back</button>}
                  <button onClick={() => step < 3 ? setStep(step + 1) : handleToast()} className="flex-1 bg-neon-cyan py-3 rounded-xl text-black font-bold text-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all">
                    {step < 3 ? "Continue" : "Get Started"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 3. RATING SYSTEM (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center glass p-4 rounded-2xl border border-neon-cyan/20">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Rate App</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} onClick={() => setRating(star)} className="transition-transform hover:scale-125">
              <Star className={`h-5 w-5 transition-colors ${star <= (hover || rating) ? "fill-neon-cyan text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" : "text-muted-foreground opacity-30"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* 4. TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] glass px-6 py-3 rounded-full border border-neon-cyan/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <span className="text-neon-cyan text-sm font-medium flex items-center gap-2">
              <Check className="h-4 w-4" /> Account Authenticated
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. ACTIVITY FEED (TOP RIGHT) */}
      <div className="fixed top-24 right-6 z-50 hidden
      