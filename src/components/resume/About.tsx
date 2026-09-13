import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation - reveal words
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      })

      // Glow line animation
      gsap.from('.about-glow-line', {
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
        },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        delay: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">about</div>
        <h2 className="section-title">Professional Summary</h2>
      </div>
      <div className="about-glow-line" />
      <p className="about-text">
        Results-driven Lead AI &amp; Data Engineer with 8+ years of experience
        architecting scalable Azure cloud data platforms, production-grade Agentic
        AI systems, and enterprise Knowledge Graph / GraphRAG solutions. Proven
        record leading cross-functional engineering teams of (data, infra, App),
        designing multi-agent LangGraph / FastAPI backends, cutting LLM operating
        costs by 40%, and delivering terabyte-scale data pipelines with PySpark
        and Databricks. Skilled at translating complex business requirements into
        deterministic, cost-optimized, and observable AI / data architectures.
      </p>
    </section>
  )
}
