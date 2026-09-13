import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Education() {
  const cardRef1 = useRef<HTMLDivElement>(null)
  const cardRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
            )
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (cardRef1.current) observer.observe(cardRef1.current)
    if (cardRef2.current) observer.observe(cardRef2.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="education" className="section">
      <div className="reveal">
        <div className="section-label">education</div>
        <h2 className="section-title">Education &amp; Certifications</h2>
      </div>
      <div className="edu-grid">
        <div className="edu-card" ref={cardRef1}>
          <div className="edu-card-label">Education</div>
          <div className="edu-card-title">B.Tech, Computer Science &amp; Engineering</div>
          <div className="edu-card-sub">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</div>
          <div className="edu-card-sub">Uttar Pradesh, India</div>
          <div className="edu-card-period">Jun 2013 – May 2017</div>
        </div>
        <div className="edu-card" ref={cardRef2}>
          <div className="edu-card-label">Certifications</div>
          <ul className="cert-list">
            <li>Microsoft Certified: Azure Data Engineer Associate (DP-203)</li>
            <li>Microsoft Certified: Power BI Data Analyst Associate (PL-300)</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
