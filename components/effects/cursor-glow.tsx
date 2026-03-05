"use client"

import { useEffect, useRef, useCallback } from "react"

const CYAN = "#00f0ff"
const BRACKET_SIZE = 16
const BRACKET_LEN = BRACKET_SIZE * 0.35
const FRAME_SIZE = 44

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    // True mouse position (dot follows this exactly)
    mouseX: 0,
    mouseY: 0,
    // Bracket position (trails behind with lerp)
    bracketX: 0,
    bracketY: 0,
    // Bracket spread (distance of brackets from center)
    spread: 8,
    targetSpread: 8,
    // Glow intensity
    glow: 0.3,
    targetGlow: 0.3,
    // Dot size
    dotSize: 3,
    targetDotSize: 3,
    // Click flash
    flashOpacity: 0,
    // Click ripple
    rippleRadius: 0,
    rippleOpacity: 0,
    // Second expanding glow ripple (wider, softer)
    ripple2Radius: 0,
    ripple2Opacity: 0,
    // Visibility
    visible: false,
    // Hover state
    isHovering: false,
    // Focus pulse (glow burst from center dot when focus locks)
    focusPulseOpacity: 0,
    focusPulseRadius: 0,
    // Micro jitter stabilization
    jitterTimeLeft: 0, // ms remaining for jitter effect
    jitterOffsetX: 0,
    jitterOffsetY: 0,
    // Click bracket outward pulse
    clickPulseSpread: 0,
  })
  const rafRef = useRef<number>(0)
  const lastFrameTime = useRef(0)

  const drawBracket = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      corner: "tl" | "tr" | "bl" | "br",
      spread: number,
      glowAmount: number,
      jitterX: number,
      jitterY: number
    ) => {
      const half = FRAME_SIZE / 2 + spread

      // Apply jitter offset to each bracket
      const jcx = cx + jitterX
      const jcy = cy + jitterY

      let ox = 0,
        oy = 0
      if (corner === "tl") {
        ox = jcx - half
        oy = jcy - half
      } else if (corner === "tr") {
        ox = jcx + half - BRACKET_SIZE
        oy = jcy - half
      } else if (corner === "bl") {
        ox = jcx - half
        oy = jcy + half - BRACKET_SIZE
      } else {
        ox = jcx + half - BRACKET_SIZE
        oy = jcy + half - BRACKET_SIZE
      }

      ctx.save()
      ctx.strokeStyle = CYAN
      ctx.lineWidth = 1.5
      ctx.lineCap = "round"
      ctx.shadowColor = CYAN
      ctx.shadowBlur = 4 + glowAmount * 10

      ctx.beginPath()
      if (corner === "tl") {
        ctx.moveTo(ox + BRACKET_LEN, oy)
        ctx.lineTo(ox, oy)
        ctx.lineTo(ox, oy + BRACKET_LEN)
      } else if (corner === "tr") {
        ctx.moveTo(ox + BRACKET_SIZE - BRACKET_LEN, oy)
        ctx.lineTo(ox + BRACKET_SIZE, oy)
        ctx.lineTo(ox + BRACKET_SIZE, oy + BRACKET_LEN)
      } else if (corner === "bl") {
        ctx.moveTo(ox, oy + BRACKET_SIZE - BRACKET_LEN)
        ctx.lineTo(ox, oy + BRACKET_SIZE)
        ctx.lineTo(ox + BRACKET_LEN, oy + BRACKET_SIZE)
      } else {
        ctx.moveTo(ox + BRACKET_SIZE - BRACKET_LEN, oy + BRACKET_SIZE)
        ctx.lineTo(ox + BRACKET_SIZE, oy + BRACKET_SIZE)
        ctx.lineTo(ox + BRACKET_SIZE, oy + BRACKET_SIZE - BRACKET_LEN)
      }
      ctx.stroke()
      ctx.restore()
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
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouseMove = (e: MouseEvent) => {
      const s = stateRef.current
      s.mouseX = e.clientX
      s.mouseY = e.clientY
      if (!s.visible) {
        s.visible = true
        s.bracketX = e.clientX
        s.bracketY = e.clientY
      }

      // Simple hover detection on true interactive elements
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const interactive = el?.closest(
        "button, [role='button'], a[href], input, textarea, select, [data-interactive]"
      )

      s.wasHovering = s.isHovering
      s.isHovering = !!interactive

      // Update targets based on hover
      if (s.isHovering) {
        // Tighten brackets and boost glow/dot on hover (zoom-in effect)
        s.targetSpread = 0  // Brackets come very close together on hover
        s.targetGlow = 0.95
        s.targetDotSize = 5
        // Small entrance pulse
        if (!s.wasHovering) {
          s.jitterTimeLeft = 0
        }
      } else {
        // Relaxed idle state
        s.targetSpread = 8
        s.targetGlow = 0.3
        s.targetDotSize = 3
      }
    }

    const onMouseLeave = () => {
      stateRef.current.visible = false
    }
    const onMouseEnter = () => {
      stateRef.current.visible = true
    }

    const onMouseDown = (e: MouseEvent) => {
      const s = stateRef.current
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const interactive = el?.closest(
        "button, [role='button'], a[href], input, textarea, select, [data-interactive]"
      )

      if (interactive) {
        // Trigger click effects only on actual clicks
        s.flashOpacity = 1.2
        s.rippleRadius = 0
        s.rippleOpacity = 0.8
        s.ripple2Radius = 0
        s.ripple2Opacity = 0.4
        s.clickPulseSpread = 10
        s.targetSpread = -2
        s.jitterTimeLeft = 0
        setTimeout(() => {
          s.clickPulseSpread = 0
          // After the click pulse, always return to the neutral spread
          s.targetSpread = 8
        }, 100)
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    window.addEventListener("mousedown", onMouseDown)

    lastFrameTime.current = performance.now()

    const loop = () => {
      const now = performance.now()
      const dt = Math.min(now - lastFrameTime.current, 32) // cap to ~30fps minimum
      lastFrameTime.current = now

      const s = stateRef.current
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      if (!s.visible) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      // Brackets should trail behind the center dot
      const bracketTargetX = s.mouseX
      const bracketTargetY = s.mouseY
      s.bracketX = lerp(s.bracketX, bracketTargetX, 0.3)  // Increased lerp for smoother, less laggy response
      s.bracketY = lerp(s.bracketY, bracketTargetY, 0.3)

      // Animate spread, glow, dot size
      const effectiveTargetSpread = s.targetSpread + s.clickPulseSpread
      s.spread = lerp(s.spread, effectiveTargetSpread, 0.18)
      s.glow = lerp(s.glow, s.targetGlow, 0.14)
      s.dotSize = lerp(s.dotSize, s.targetDotSize, 0.15)

      // Decay click pulse spread
      if (s.clickPulseSpread > 0.1) {
        s.clickPulseSpread = lerp(s.clickPulseSpread, 0, 0.12)
      } else {
        s.clickPulseSpread = 0
      }

      // Flash decay
      if (s.flashOpacity > 0.01) {
        s.flashOpacity = lerp(s.flashOpacity, 0, 0.07)
      } else {
        s.flashOpacity = 0
      }

      // Primary ripple animation
      if (s.rippleOpacity > 0.01) {
        s.rippleRadius += 3
        s.rippleOpacity = lerp(s.rippleOpacity, 0, 0.055)
      } else {
        s.rippleOpacity = 0
        s.rippleRadius = 0
      }

      // Secondary glow ripple
      if (s.ripple2Opacity > 0.005) {
        s.ripple2Radius += 1.8
        s.ripple2Opacity = lerp(s.ripple2Opacity, 0, 0.04)
      } else {
        s.ripple2Opacity = 0
        s.ripple2Radius = 0
      }

      // Focus pulse animation (burst from dot on focus lock)
      if (s.focusPulseOpacity > 0.01) {
        s.focusPulseRadius += 2.2
        s.focusPulseOpacity = lerp(s.focusPulseOpacity, 0, 0.06)
      } else {
        s.focusPulseOpacity = 0
        s.focusPulseRadius = 0
      }

      // Disable extra jitter to keep animation smooth
      s.jitterOffsetX = 0
      s.jitterOffsetY = 0

      const bx = s.bracketX
      const by = s.bracketY
      const mx = s.mouseX
      const my = s.mouseY

      // --- Draw ambient glow (large, soft) ---
      const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 160)
      glowGrad.addColorStop(0, `rgba(0, 240, 255, ${0.08 + s.glow * 0.06})`)
      glowGrad.addColorStop(1, "rgba(0, 240, 255, 0)")
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(mx, my, 160, 0, Math.PI * 2)
      ctx.fill()

      // --- Draw focus pulse ring (expanding glow on focus lock) ---
      if (s.focusPulseOpacity > 0) {
        ctx.save()
        ctx.strokeStyle = `rgba(0, 240, 255, ${s.focusPulseOpacity * 0.7})`
        ctx.lineWidth = 2
        ctx.shadowColor = CYAN
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(mx, my, s.focusPulseRadius, 0, Math.PI * 2)
        ctx.stroke()
        // Inner fill glow
        const fpGrad = ctx.createRadialGradient(
          mx, my, 0,
          mx, my, s.focusPulseRadius
        )
        fpGrad.addColorStop(0, `rgba(0, 240, 255, ${s.focusPulseOpacity * 0.15})`)
        fpGrad.addColorStop(1, "rgba(0, 240, 255, 0)")
        ctx.fillStyle = fpGrad
        ctx.beginPath()
        ctx.arc(mx, my, s.focusPulseRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // --- Draw brackets with jitter offset ---
      const jx = s.jitterOffsetX
      const jy = s.jitterOffsetY
      drawBracket(ctx, bx, by, "tl", s.spread, s.glow, jx, jy)
      drawBracket(ctx, bx, by, "tr", s.spread, s.glow, jx, jy)
      drawBracket(ctx, bx, by, "bl", s.spread, s.glow, jx, jy)
      drawBracket(ctx, bx, by, "br", s.spread, s.glow, jx, jy)

      // --- Draw crosshair micro-lines (at bracket position with jitter) ---
      ctx.save()
      ctx.strokeStyle = `rgba(0, 240, 255, 0.25)`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(bx + jx - 5, by + jy)
      ctx.lineTo(bx + jx + 5, by + jy)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(bx + jx, by + jy - 5)
      ctx.lineTo(bx + jx, by + jy + 5)
      ctx.stroke()
      ctx.restore()

      // --- Draw click flash (at dot position) ---
      if (s.flashOpacity > 0) {
        const flashGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 30)
        flashGrad.addColorStop(0, `rgba(0, 240, 255, ${s.flashOpacity * 0.9})`)
        flashGrad.addColorStop(0.5, `rgba(0, 240, 255, ${s.flashOpacity * 0.3})`)
        flashGrad.addColorStop(1, "rgba(0, 240, 255, 0)")
        ctx.fillStyle = flashGrad
        ctx.beginPath()
        ctx.arc(mx, my, 30, 0, Math.PI * 2)
        ctx.fill()
      }

      // --- Draw primary click ripple ---
      if (s.rippleOpacity > 0) {
        ctx.save()
        ctx.strokeStyle = `rgba(0, 240, 255, ${s.rippleOpacity})`
        ctx.lineWidth = 1.5
        ctx.shadowColor = CYAN
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(mx, my, s.rippleRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // --- Draw secondary expanding glow ripple ---
      if (s.ripple2Opacity > 0) {
        ctx.save()
        const r2Grad = ctx.createRadialGradient(
          mx, my, s.ripple2Radius * 0.7,
          mx, my, s.ripple2Radius
        )
        r2Grad.addColorStop(0, "rgba(0, 240, 255, 0)")
        r2Grad.addColorStop(1, `rgba(0, 240, 255, ${s.ripple2Opacity * 0.5})`)
        ctx.fillStyle = r2Grad
        ctx.beginPath()
        ctx.arc(mx, my, s.ripple2Radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // --- Draw center focus dot (at true mouse position) ---
      ctx.save()
      ctx.shadowColor = CYAN
      ctx.shadowBlur = 6 + s.glow * 16
      ctx.fillStyle = CYAN
      ctx.beginPath()
      ctx.arc(mx, my, s.dotSize, 0, Math.PI * 2)
      ctx.fill()
      // Second pass for stronger glow when hovering
      ctx.shadowBlur = 14 + s.glow * 22
      ctx.globalAlpha = 0.5
      ctx.beginPath()
      ctx.arc(mx, my, s.dotSize * 1.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      window.removeEventListener("mousedown", onMouseDown)
    }
  }, [drawBracket])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    />
  )
}
