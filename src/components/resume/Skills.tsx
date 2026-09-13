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
  return (
    <section id="skills" className="section">
      <div className="reveal">
        <div className="section-label">skills</div>
        <h2 className="section-title">Technical Skills</h2>
      </div>
      <div className="skills-groups reveal-children">
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
