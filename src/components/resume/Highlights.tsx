import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { metric: '40', suffix: '%', desc: 'Reduced LLM operational costs by re-engineering prompt structures to leverage Azure OpenAI prompt caching across a production multi-agent platform.' },
  { metric: '30', suffix: 's', prefix: '2wk→', desc: 'Cut root-cause-analysis turnaround from 2 weeks to under 30 seconds by engineering an automated decision-tree RCA engine.' },
  { metric: '6', suffix: '', prefix: 'Team of ', desc: 'Led a cross-functional team of 6 engineers to architect and deploy an enterprise agentic analytics platform on Azure AKS.' },
  { metric: '10', suffix: '%', prefix: '+', desc: 'Increased partner property recommendation profit through an automated multi-channel data-hygiene monitoring system.' },
  { metric: '95', suffix: '%', desc: 'Reduced manual engineering turnaround time by automating schema creation and validation workflows with custom Python tooling.' },
  { metric: '90', suffix: '%+', desc: 'Achieved PII-masking accuracy and enforced row-level security across a production analytics platform serving enterprise stakeholders.' },
]

function CountUp({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2000
          const start = performance.now()

          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="highlight-metric" ref={ref}>
      {prefix}{count}{suffix}
    </div>
  )
}

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.highlight-card', {
        scrollTrigger: {
          trigger: '.highlights-grid',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Mouse tilt effect on cards
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.highlight-card')
    const handleMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
    const handleLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMove)
      card.addEventListener('mouseleave', handleLeave)
    })
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMove)
        card.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <section id="highlights" className="section" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">highlights</div>
        <h2 className="section-title">Key Highlights</h2>
      </div>
      <div className="highlights-grid">
        {highlights.map((h, i) => (
          <div className="highlight-card" key={i}>
            <CountUp target={parseInt(h.metric)} suffix={h.suffix} prefix={h.prefix} />
            <div className="highlight-desc">{h.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
