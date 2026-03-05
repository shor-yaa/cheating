"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Search, User, Menu, X, Zap, ListTodo } from "lucide-react"
import { MagneticButton } from "@/components/effects/magnetic-button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/search", label: "Discover" },
  { href: "/profile", label: "Profile" },
  { href: "/task", label: "Task" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass fixed top-0 right-0 left-0 z-50 border-b border-neon-cyan/10"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <MagneticButton strength={0.2}>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon-cyan/10 neon-border">
                <Zap className="h-5 w-5 text-neon-cyan" />
              </div>
              <span className="text-lg font-bold tracking-tight neon-text text-neon-cyan">
                NEXUS
              </span>
            </div>
          </MagneticButton>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <MagneticButton strength={0.15}>
                <div
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-neon-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-neon-cyan"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </MagneticButton>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/task">
            <MagneticButton strength={0.2}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan">
                <ListTodo className="h-4 w-4" />
                <span className="sr-only">Task</span>
              </div>
            </MagneticButton>
          </Link>
          <Link href="/search">
            <MagneticButton strength={0.2}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </div>
            </MagneticButton>
          </Link>
          <Link href="/auth">
            <MagneticButton strength={0.2}>
              <div className="flex h-9 items-center gap-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-4 text-sm font-medium text-neon-cyan transition-all hover:bg-neon-cyan/15 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <User className="h-4 w-4" />
                Sign In
              </div>
            </MagneticButton>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/task" aria-label="Task" onClick={() => setMobileOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan">
              <ListTodo className="h-5 w-5" />
            </div>
          </Link>
          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass overflow-hidden border-t border-neon-cyan/10 md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-neon-cyan/10 text-neon-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-3 text-center text-sm font-medium text-neon-cyan"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
