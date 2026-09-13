import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const highlights = [
  { metric: 40, suffix: '%', prefix: '', desc: 'Reduced LLM operational costs by re-engineering prompt structures to leverage Azure OpenAI prompt caching across a production multi-agent platform.' },
  { metric: 30, suffix: 's', prefix: '2wk → ', desc: 'Cut root-cause-analysis turnaround from 2 weeks to under 30 seconds by engineering an automated decision-tree RCA engine.' },
  { metric: 6, suffix: '', prefix: 'Team of ', desc: 'Led a cross-functional team of 6 engineers to architect and deploy an enterprise agentic analytics platform on Azure AKS.' },
  { metric: 10, suffix: '%', prefix: '+', desc: 'Increased partner property recommendation profit through an automated multi-channel data-hygiene monitoring system.' },
  { metric: 95, suffix: '%', prefix: '', desc: 'Reduced manual engineering turnaround time by automating schema creation and validation workflows with custom Python tooling.' },
  { metric: 90, suffix: '%+', prefix: '', desc: 'Achieved PII-masking accuracy and enforced row-level security across a production analytics platform serving enterprise stakeholders.' },
]

function CountUpItem({ target, suffix = '', prefix = '', desc }: { target: number; suffix?: string; prefix?: string; desc: string }) {
  const [count, setCount] = useState(target) // Default to target value so it's never blank
  const cardRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          setCount(0)
          const duration = 1800
          const start = performance.now()

          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(target)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(card)

    // 3D tilt interaction
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -10
      const rotateY = ((x - centerX) / centerX) * 10

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      observer.disconnect()
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [target])

  return (
    <div className="highlight-card" ref={cardRef}>
      <div className="highlight-metric">
        {prefix}{count}{suffix}
      </div>
      <div className="highlight-desc">{desc}</div>
    </div>
  )
}

export default function Highlights() {
  return (
    <section id="highlights" className="section">
      <div className="reveal">
        <div className="section-label">highlights</div>
        <h2 className="section-title">Key Highlights</h2>
      </div>
      <div className="highlights-grid">
        {highlights.map((h, i) => (
          <CountUpItem
            key={i}
            target={h.metric}
            suffix={h.suffix}
            prefix={h.prefix}
            desc={h.desc}
          />
        ))}
      </div>
    </section>
  )
}
