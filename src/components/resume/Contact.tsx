import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            el.children,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
          )
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="section">
      <div className="contact-content" ref={contentRef}>
        <div className="section-label" style={{ justifyContent: 'center' }}>contact</div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Get In Touch</h2>
        <div className="contact-items">
          <div className="contact-item">
            📞 <a href="tel:+918563919236">+91-8563919236</a>
          </div>
          <div className="contact-item">
            ✉ <a href="mailto:sharmashiv789@gmail.com">sharmashiv789@gmail.com</a>
          </div>
          <div className="contact-item">
            🔗 <a href="https://linkedin.com/in/sharmashiv789" target="_blank" rel="noreferrer">
              linkedin.com/in/sharmashiv789
            </a>
          </div>
        </div>
        <a className="btn btn-primary" href="mailto:sharmashiv789@gmail.com">
          ✉ Say Hello
        </a>
      </div>
    </section>
  )
}
