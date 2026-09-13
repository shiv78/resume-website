import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomCursor from './components/resume/CustomCursor'
import Navbar from './components/resume/Navbar'
import Hero from './components/resume/Hero'
import About from './components/resume/About'
import Highlights from './components/resume/Highlights'
import Skills from './components/resume/Skills'
import Experience from './components/resume/Experience'
import Education from './components/resume/Education'
import Contact from './components/resume/Contact'

gsap.registerPlugin(ScrollTrigger)

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const elements = document.querySelectorAll('.reveal, .reveal-children')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()

  // Smooth parallax on section dividers
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.section-divider').forEach(divider => {
      gsap.fromTo(divider, {
        scaleX: 0,
      }, {
        scaleX: 1,
        scrollTrigger: {
          trigger: divider,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
        },
      })
    })
  }, [])

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <hr className="section-divider" />
      <About />
      <hr className="section-divider" />
      <Highlights />
      <hr className="section-divider" />
      <Skills />
      <hr className="section-divider" />
      <Experience />
      <hr className="section-divider" />
      <Education />
      <hr className="section-divider" />
      <Contact />
      <footer className="footer">
        <span>$ echo &quot;Built with React + Vite + GSAP&quot;</span>
      </footer>
    </>
  )
}
