import { useEffect, useRef } from 'react'
import gsap from 'gsap'

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

function SkillGroupCard({ group }: { group: typeof skillGroups[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // IntersectionObserver guarantees reliable animation trigger
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const tags = card.querySelectorAll<HTMLElement>('.skill-tag')
          gsap.fromTo(
            tags,
            { scale: 0.7, opacity: 0, y: 15 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.03,
              ease: 'back.out(1.8)',
            }
          )
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(card)

    // Interactive magnetic hover effect for skill tags
    const tags = card.querySelectorAll<HTMLElement>('.skill-tag')
    const handleMove = (e: MouseEvent) => {
      const tag = e.currentTarget as HTMLElement
      const rect = tag.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(tag, {
        x: x * 0.35,
        y: y * 0.35,
        scale: 1.12,
        duration: 0.25,
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
      observer.disconnect()
      tags.forEach(tag => {
        tag.removeEventListener('mousemove', handleMove)
        tag.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <div className="skill-group" ref={cardRef}>
      <div className="skill-group-title">// {group.title}</div>
      <div className="skill-tags">
        {group.skills.map((s, j) => (
          <span className="skill-tag" key={j}>{s}</span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="reveal">
        <div className="section-label">skills</div>
        <h2 className="section-title">Technical Skills</h2>
      </div>
      <div className="skills-groups">
        {skillGroups.map((g, i) => (
          <SkillGroupCard key={i} group={g} />
        ))}
      </div>
    </section>
  )
}
