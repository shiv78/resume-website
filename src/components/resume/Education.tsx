import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-card', {
        scrollTrigger: {
          trigger: '.edu-grid',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="education" className="section" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">education</div>
        <h2 className="section-title">Education &amp; Certifications</h2>
      </div>
      <div className="edu-grid">
        <div className="edu-card">
          <div className="edu-card-label">Education</div>
          <div className="edu-card-title">B.Tech, Computer Science &amp; Engineering</div>
          <div className="edu-card-sub">Dr. A.P.J. Abdul Kalam Technical University (AKTU)</div>
          <div className="edu-card-sub">Uttar Pradesh, India</div>
          <div className="edu-card-period">Jun 2013 – May 2017</div>
        </div>
        <div className="edu-card">
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
