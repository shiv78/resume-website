import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  radius: number
  opacity: number
  pulseSpeed: number
  pulseOffset: number
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    let mouse = { x: -1000, y: -1000 }
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles with active autonomous drift speed
    const count = Math.min(75, Math.max(35, Math.floor(window.innerWidth / 20)))
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 0.7 + 0.35 // Continuous autonomous velocity
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 2.2 + 1.2,
        opacity: Math.random() * 0.45 + 0.35,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse = { x: -1000, y: -1000 }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const connectionDist = 140
    const mouseDist = 180
    const mouseRepelDist = 120

    function animate() {
      time += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Continuous floating oscillation + autonomous drift
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.25
        p.y += p.vy + Math.cos(time + p.pulseOffset) * 0.25

        // Smooth recovery to base speed when not repelled
        p.vx += (p.baseVx - p.vx) * 0.04
        p.vy += (p.baseVy - p.vy) * 0.04

        // Mouse repulsion physics
        const dmx = p.x - mouse.x
        const dmy = p.y - mouse.y
        const distMouse = Math.sqrt(dmx * dmx + dmy * dmy)
        if (distMouse < mouseRepelDist && distMouse > 0) {
          const force = ((mouseRepelDist - distMouse) / mouseRepelDist) * 1.8
          p.vx += (dmx / distMouse) * force
          p.vy += (dmy / distMouse) * force
        }

        // Screen boundary wrapping
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        // Pulsing glowing particle dot
        const dynamicOpacity = p.opacity + Math.sin(time * 2 + p.pulseOffset) * 0.15
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 200, ${Math.max(0.2, dynamicOpacity)})`
        ctx.shadowColor = '#00e5c8'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Dynamic line connection to mouse when nearby
        if (distMouse < mouseDist) {
          const alpha = (1 - distMouse / mouseDist) * 0.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(0, 229, 200, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Inter-particle neural graph connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.22
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 229, 200, ${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
    />
  )
}
