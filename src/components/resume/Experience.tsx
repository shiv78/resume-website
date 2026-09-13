import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Project {
  name: string
  bullets: string[]
}

interface Role {
  company: string
  role: string
  period: string
  location: string
  projects: Project[]
}

const roles: Role[] = [
  {
    company: 'Tiger Analytics',
    role: 'Lead AI & Data Engineer / Architect',
    period: 'Jan 2025 – Present',
    location: 'Gurugram, India',
    projects: [
      {
        name: 'ReimaginedBI (Sense AI) — Persona-Based Self-Serve Decision Intelligence Platform',
        bullets: [
          'Led a cross-functional engineering team of 6 to architect and deploy an enterprise agentic analytics platform on Azure Kubernetes Service (AKS) via automated Azure DevOps CI/CD.',
          'Engineered a cyclic multi-agent LangGraph StateGraph (Router, Text-to-SQL, Vector Retrieval, Insight Synthesizer) with multi-turn conversation state persisted in a Redis cluster.',
          'Designed a unified custom AI gateway interface enabling seamless integration and cross-cloud interoperability between Azure OpenAI and AWS Bedrock service endpoints.',
          'Architected an asynchronous Celery and Redis Pub/Sub task queue to decouple conversational Chat API services, offloading background indexing and audit logging pipelines to lower response latency to under 30ms.',
          'Enforced Hexagonal (Ports & Adapters) architecture, decoupling generative narration from deterministic SQL/Python metric calculations for auditable analytics.',
          'Built an automated decision-tree root-cause-analysis engine, cutting diagnostic turnaround from 2 weeks to under 30 seconds.',
          'Integrated Microsoft Presidio PII masking (90%+ accuracy) with hybrid masking and Row-Level Security; restructured prompt architecture to enable Azure OpenAI prompt caching, cutting LLM costs by 40%.',
          'Implemented end-to-end OpenTelemetry and MLflow observability featuring query-level LLM cost analytics, integrated chat traceability, and a comprehensive 100-query automated evaluation framework.',
        ],
      },
      {
        name: 'Domain Context Engine (DCE) — Enterprise Knowledge Graph & GraphRAG Platform',
        bullets: [
          'Architected a multimodal document-ingestion knowledge base pipeline on Azure ADLS Gen2 (Document Intelligence, python-docx, openpyxl) with SHA-256 deduplication, feeding a vectorized Azure AI Search index.',
          'Orchestrated a 6-pipeline autonomous knowledge-asset builder in LangGraph across 6 domains (Processes, KPIs, Personas, Systems, Concepts, Use Cases), leveraging Gemini 2.5 Pro, Claude Sonnet 4.6, and GPT-4.1.',
          'Designed a two-stage hybrid deduplication engine (cosine similarity + cross-encoder re-ranking) and a 3-pass NetworkX/Apache AGE graph-construction pipeline powering a 5-stage GraphRAG engine for zero-hallucination, multi-hop query answering.',
          'Built a Finite-State-Machine governance layer for asset versioning, edit locking, and role-based SME validation with full audit tracking.',
        ],
      },
    ],
  },
  {
    company: 'TekSystems (Client: Expedia Group)',
    role: 'Data Engineer II',
    period: 'Jun 2023 – Dec 2024',
    location: 'Gurugram, India',
    projects: [
      {
        name: 'Scout Recommendation Engine & Real-Time Data Platform',
        bullets: [
          'Designed a Delta Lake architecture on Azure processing terabytes of raw travel and booking data with ACID transactions and enforced schema validation.',
          'Built and optimized end-to-end ETL pipelines using Azure Databricks, Azure Data Factory, and PySpark, reducing pipeline execution latency.',
          'Led exploratory data analysis on multi-terabyte datasets in Databricks to identify anomalies, partition skew, and data-quality degradation.',
          'Spearheaded an automated multi-channel data-hygiene monitoring system, increasing partner property recommendation profit by 10%.',
          'Automated CI/CD deployment pipelines with Azure DevOps and Git, streamlining artifact promotion across staging and production.',
        ],
      },
    ],
  },
  {
    company: 'Fractal Analytics',
    role: 'Data Engineer',
    period: 'May 2021 – Jun 2023',
    location: 'Gurugram, India',
    projects: [
      {
        name: 'Unilever Price Optimization & Simulation Engine',
        bullets: [
          'Partnered with business stakeholders to translate requirements into enterprise-grade ETL pipelines using Azure Data Factory and Databricks.',
          'Implemented Medallion Architecture (Bronze/Silver/Gold) with automated schema and data-quality validation.',
          'Optimized Spark partitioning, broadcast joins, and SQL query tuning, significantly accelerating processing speed for large-scale pricing datasets.',
          'Built pricing-calculation logic and dimensional mapping tables supporting dynamic simulation scenarios for global commercial teams.',
        ],
      },
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Programmer Analyst',
    period: 'Jun 2018 – May 2021',
    location: 'Noida, India',
    projects: [
      {
        name: 'iReach — Commercial Field Intelligence & Digital Sales Analytics',
        bullets: [
          'Built and maintained end-to-end ETL pipelines using Azure Data Factory, PySpark, and Azure Synapse Analytics for large-scale sales reporting.',
          'Designed semantic data models and interactive Power BI dashboards used for executive performance tracking.',
          'Automated schema creation and validation with custom Python scripts, reducing manual engineering turnaround time by 95%.',
        ],
      },
    ],
  },
  {
    company: 'Adeptia India Pvt. Ltd.',
    role: 'Software Engineer',
    period: 'Nov 2017 – May 2018',
    location: 'Noida, India',
    projects: [
      {
        name: 'Regulatory Compliance Pipeline',
        bullets: [
          'Developed data transformation and ingestion logic for a regulatory compliance pipeline, landing processed data into AWS S3.',
          'Used Amazon Redshift SQL for large-scale performance analysis, resolving data-discrepancy tickets for regulatory reporting.',
        ],
      },
    ],
  },
]

function TimelineCard({ role }: { role: Role }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          gsap.fromTo(
            item,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
          )
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(item)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="timeline-item" ref={itemRef}>
      <div className="timeline-dot" />
      <div className="timeline-header">
        <div className="timeline-company">{role.company}</div>
        <div className="timeline-role">{role.role}</div>
        <div className="timeline-period">{role.period} · {role.location}</div>
      </div>
      {role.projects.map((proj, j) => (
        <div className="timeline-project" key={j}>
          <div className="timeline-project-name">{proj.name}</div>
          <ul className="timeline-bullets">
            {proj.bullets.map((b, k) => (
              <li key={k}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="reveal">
        <div className="section-label">experience</div>
        <h2 className="section-title">Professional Experience</h2>
      </div>
      <div className="timeline">
        {roles.map((role, i) => (
          <TimelineCard key={i} role={role} />
        ))}
      </div>
    </section>
  )
}
