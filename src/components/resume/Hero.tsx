import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ParticleNetwork from './ParticleNetwork'

const titles = [
  'Lead AI & Data Engineer',
  'Agentic AI Architect',
  'Azure Cloud & GenAI Solutions',
]

function useTypewriter(strings: string[], typingSpeed = 60, deletingSpeed = 30, pauseTime = 2000) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = strings[index]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setIndex((index + 1) % strings.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, index, isDeleting, strings, typingSpeed, deletingSpeed, pauseTime])

  return text
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const typed = useTypewriter(titles)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-terminal-tag', { opacity: 0, y: -20, duration: 0.6, delay: 0.2 })
        .from('.hero-name', { opacity: 0, y: 40, duration: 0.8, scale: 0.95 }, '-=0.3')
        .from('.hero-title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
        .from('.hero-meta > *', { opacity: 0, y: 20, duration: 0.4, stagger: 0.1 }, '-=0.3')
        .from('.hero-certs > *', { opacity: 0, scale: 0, duration: 0.4, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.2')
        .from('.hero-buttons > *', { opacity: 0, y: 20, duration: 0.5, stagger: 0.15 }, '-=0.2')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <ParticleNetwork />
      <div className="hero-content">
        <div className="hero-terminal-tag">
          <span>$</span> shiv --profile
        </div>
        <h1 className="hero-name">Shiv Shankar Sharma</h1>
        <p className="hero-title">
          <span className="typed-text">{typed}</span>
          <span className="typed-cursor">|</span>
        </p>
        <div className="hero-meta">
          <span>📍 Delhi NCR, India</span>
          <a href="tel:+918563919236">📞 +91-8563919236</a>
          <a href="mailto:sharmashiv789@gmail.com">✉ sharmashiv789@gmail.com</a>
          <a href="https://linkedin.com/in/sharmashiv789" target="_blank" rel="noreferrer">
            🔗 linkedin.com/in/sharmashiv789
          </a>
        </div>
        <div className="hero-certs">
          <span className="cert-badge">DP-203</span>
          <span className="cert-badge">PL-300</span>
        </div>
        <div className="hero-buttons">
          <a
            className="btn btn-primary"
            href="https://docs.google.com/document/d/1cbg0_d8J5d2NSU6eDgD0XPlBW_AsvBo0N-WVg_5mDpQ/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            ↓ Download Resume
          </a>
          <a className="btn btn-outline" href="#contact">
            Contact →
          </a>
        </div>
      </div>
    </section>
  )
}
