"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Bell,
  Shield,
  Monitor,
  Volume2,
  Globe,
  Palette,
  ChevronRight,
  Camera,
  LogOut,
  Zap,
  Star,
  Clock,
  Heart,
} from "lucide-react"
import { CursorGlow } from "@/components/effects/cursor-glow"
import { ParticleBackground } from "@/components/effects/particle-background"
import { ScrollProgress } from "@/components/effects/scroll-progress"
import { Navbar } from "@/components/layout/navbar"
import { GlassCard } from "@/components/effects/glass-card"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Watched", value: "142", icon: Clock },
  { label: "Favorites", value: "38", icon: Heart },
  { label: "Avg Rating", value: "8.4", icon: Star },
  { label: "Hours", value: "312", icon: Monitor },
]

interface SettingToggleProps {
  label: string
  description: string
  icon: React.ElementType
  defaultOn?: boolean
}

function SettingToggle({ label, description, icon: Icon, defaultOn = false }: SettingToggleProps) {
  const [on, setOn] = useState(defaultOn)

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={cn(
          "relative h-7 w-12 rounded-full transition-all",
          on
            ? "bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.3)]"
            : "bg-secondary"
        )}
        role="switch"
        aria-checked={on}
        aria-label={label}
      >
        <motion.div
          animate={{ x: on ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "h-5 w-5 rounded-full",
            on ? "bg-primary-foreground" : "bg-muted-foreground"
          )}
        />
      </button>
    </div>
  )
}

interface SettingLinkProps {
  label: string
  description: string
  icon: React.ElementType
  value?: string
}

function SettingLink({ label, description, icon: Icon, value }: SettingLinkProps) {
  return (
    <button className="flex w-full items-center justify-between py-4 text-left transition-colors hover:bg-secondary/30 rounded-lg px-2 -mx-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span className="text-xs text-muted-foreground">{value}</span>
        )}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </button>
  )
}

export default function ProfilePage() {
  const [activeAvatar, setActiveAvatar] = useState(0)

  return (
    <div className="relative min-h-screen bg-background">
      <CursorGlow />
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pt-24 pb-20 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          {/* Avatar */}
          <div className="relative mx-auto mb-4 inline-block">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-neon-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              <div
                className="h-full w-full"
                style={{
                  background: `linear-gradient(${135 + activeAvatar * 45}deg, rgba(0,240,255,0.3), rgba(255,51,102,0.3))`,
                }}
              />
            </div>
            <button
              className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Change avatar"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <h1 className="text-2xl font-bold text-foreground">Alex Mercer</h1>
          <p className="text-sm text-muted-foreground">alex@nexus.stream</p>

          {/* Avatar Options */}
          <div className="mt-4 flex justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => setActiveAvatar(i)}
                className={cn(
                  "h-10 w-10 rounded-xl transition-all",
                  activeAvatar === i
                    ? "border-2 border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-110"
                    : "border border-border hover:border-neon-cyan/30"
                )}
                style={{
                  background: `linear-gradient(${135 + i * 45}deg, rgba(0,240,255,${0.1 + i * 0.06}), rgba(255,51,102,${0.1 + i * 0.06}))`,
                }}
                aria-label={`Avatar style ${i + 1}`}
              />
            ))}
          </div>

          {/* Membership Badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5 text-xs font-medium text-neon-cyan">
            <Zap className="h-3 w-3" />
            Premium Member
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <GlassCard className="p-4 text-center">
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-neon-cyan" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Settings Sections */}
        <div className="flex flex-col gap-6">
          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Account
            </h2>
            <GlassCard className="divide-y divide-border/50 px-4">
              <SettingLink
                icon={User}
                label="Edit Profile"
                description="Change your display name and bio"
              />
              <SettingLink
                icon={Mail}
                label="Email"
                description="Manage your email address"
                value="alex@nexus.stream"
              />
              <SettingLink
                icon={Shield}
                label="Password & Security"
                description="Update password and 2FA settings"
              />
            </GlassCard>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Preferences
            </h2>
            <GlassCard className="divide-y divide-border/50 px-4">
              <SettingToggle
                icon={Bell}
                label="Push Notifications"
                description="Get alerts for new releases"
                defaultOn={true}
              />
              <SettingToggle
                icon={Volume2}
                label="Autoplay Trailers"
                description="Automatically play trailers on hover"
                defaultOn={true}
              />
              <SettingToggle
                icon={Palette}
                label="Enhanced Animations"
                description="Show particle effects and cursor glow"
                defaultOn={true}
              />
              <SettingLink
                icon={Globe}
                label="Language"
                description="Choose your preferred language"
                value="English"
              />
              <SettingLink
                icon={Monitor}
                label="Playback Quality"
                description="Default streaming resolution"
                value="4K Ultra HD"
              />
            </GlassCard>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="px-4 py-3">
              <button className="flex w-full items-center gap-3 py-2 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <LogOut className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent">Sign Out</p>
                  <p className="text-xs text-muted-foreground">
                    End your current session
                  </p>
                </div>
              </button>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
