"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

const COLORS = ["#00f0ff", "#4466ff", "#ff3366", "#7b61ff"] as const

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)

  const initParticles = useCallback(
    (width: number, height: number) => {
      const count = Math.min(80, Math.floor((width * height) / 15000))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Avoid the initial "spotlight stuck at (0,0)" look on first paint.
      if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
        mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 }
      }
      initParticles(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Cursor-reactive "energy field" background layer.
      // Kept very subtle so it reads as ambient depth behind the particles/content.
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const radius = Math.min(canvas.width, canvas.height) * 0.6

      ctx.save()
      ctx.globalCompositeOperation = "source-over"
      const field = ctx.createRadialGradient(mx, my, 0, mx, my, radius)
      field.addColorStop(0, "rgba(0, 240, 255, 0.08)")
      field.addColorStop(0.35, "rgba(68, 102, 255, 0.04)")
      field.addColorStop(0.65, "rgba(255, 51, 102, 0.02)")
      field.addColorStop(1, "rgba(5, 5, 16, 0)")
      ctx.fillStyle = field
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Mouse influence
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx += dx * 0.00005
          p.vy += dy * 0.00005
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          const d = Math.hypot(p.x - other.x, p.y - other.y)
          if (d < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = (1 - d / 150) * 0.15
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
