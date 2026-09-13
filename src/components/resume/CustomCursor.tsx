import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current!
    const ring = ringRef.current!
    const mouse = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    // Smooth follow loop
    const tick = () => {
      // Dot follows quickly
      pos.x += (mouse.x - pos.x) * 0.35
      pos.y += (mouse.y - pos.y) * 0.35
      dot.style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px)`

      // Ring follows with delay
      ringPos.x += (mouse.x - ringPos.x) * 0.12
      ringPos.y += (mouse.y - ringPos.y) * 0.12
      ring.style.transform = `translate(${ringPos.x - 20}px, ${ringPos.y - 20}px)`

      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('a, button, .skill-tag, .highlight-card, .timeline-project')
    const onEnter = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'rgba(0,229,200,0.5)', duration: 0.3 })
      gsap.to(dot, { scale: 2, background: '#00e5c8', duration: 0.3 })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(0,229,200,0.3)', duration: 0.3 })
      gsap.to(dot, { scale: 1, background: '#00e5c8', duration: 0.3 })
    }

    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window
  if (isTouchDevice) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
