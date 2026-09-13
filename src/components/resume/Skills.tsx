import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    title: 'Generative & Agentic AI',
    skills: [
      'LangGraph', 'LangChain', 'Multi-Agent Orchestration', 'GraphRAG', 'RAG',
      'Prompt Engineering & Caching', 'Azure OpenAI', 'Claude Sonnet 4.6',
      'GPT-4o / 4.1', 'Gemini 2.5 Pro', 'Microsoft Presidio (PII Masking)',
    ],
  },
  {
    title: 'Knowledge Graphs & Search',
    skills: [
      'Apache AGE (openCypher / PostgreSQL)', 'NetworkX',
      'Azure AI Search (Hybrid Vector + Lexical)', 'Azure Document Intelligence',
      'Cross-Encoder Re-Ranking', 'Semantic Search', 'Ontology Modeling',
    ],
  },
  {
    title: 'Cloud & Big Data',
    skills: [
      'Microsoft Azure', 'ADLS Gen2', 'Databricks', 'Data Factory', 'Synapse',
      'AKS', 'Azure SQL', 'AWS (S3, Redshift)', 'Delta Lake',
      'Medallion Architecture', 'PySpark', 'Apache Spark',
    ],
  },
  {
    title: 'Backend & Engineering',
    skills: [
      'Python', 'FastAPI', 'SQL', 'Redis', 'Celery',
      'Hexagonal Architecture', 'Docker', 'Kubernetes', 'Git',
      'Azure DevOps CI/CD', 'REST APIs', 'Microservices',
    ],
  },
  {
    title: 'BI, Observability & Leadership',
    skills: [
      'Power BI (DAX)', 'OpenTelemetry', 'MLflow', 'Cost Telemetry',
      'Agile / Jira', 'Technical Leadership',
      'Cross-Functional Team Management', 'Stakeholder Communication',
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each skill group
      gsap.utils.toArray<HTMLElement>('.skill-group').forEach((group, i) => {
        gsap.from(group, {
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
          },
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        })

        // Cascade tags inside each group
        const tags = group.querySelectorAll('.skill-tag')
        gsap.from(tags, {
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
          },
          scale: 0,
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: 'back.out(1.7)',
          delay: 0.3,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic hover effect on skill tags
  useEffect(() => {
    const tags = document.querySelectorAll<HTMLElement>('.skill-tag')

    const handleMove = (e: MouseEvent) => {
      const tag = e.currentTarget as HTMLElement
      const rect = tag.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(tag, {
        x: x * 0.3,
        y: y * 0.3,
        scale: 1.15,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleLeave = (e: MouseEvent) => {
      gsap.to(e.currentTarget as HTMLElement, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    tags.forEach(tag => {
      tag.addEventListener('mousemove', handleMove)
      tag.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      tags.forEach(tag => {
        tag.removeEventListener('mousemove', handleMove)
        tag.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="reveal">
        <div className="section-label">skills</div>
        <h2 className="section-title">Technical Skills</h2>
      </div>
      <div className="skills-groups">
        {skillGroups.map((g, i) => (
          <div className="skill-group" key={i}>
            <div className="skill-group-title">// {g.title}</div>
            <div className="skill-tags">
              {g.skills.map((s, j) => (
                <span className="skill-tag" key={j}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
