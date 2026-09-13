const highlights = [
  {
    metric: '40%',
    desc: 'Reduced LLM operational costs by re-engineering prompt structures to leverage Azure OpenAI prompt caching across a production multi-agent platform.',
  },
  {
    metric: '2 wk → 30s',
    desc: 'Cut root-cause-analysis turnaround from 2 weeks to under 30 seconds by engineering an automated decision-tree RCA engine.',
  },
  {
    metric: 'Team of 6',
    desc: 'Led a cross-functional team of 6 engineers to architect and deploy an enterprise agentic analytics platform on Azure AKS.',
  },
  {
    metric: '+10%',
    desc: 'Increased partner property recommendation profit through an automated multi-channel data-hygiene monitoring system.',
  },
  {
    metric: '95%',
    desc: 'Reduced manual engineering turnaround time by automating schema creation and validation workflows with custom Python tooling.',
  },
  {
    metric: '90%+',
    desc: 'Achieved PII-masking accuracy and enforced row-level security across a production analytics platform serving enterprise stakeholders.',
  },
]

export default function Highlights() {
  return (
    <section id="highlights" className="section">
      <div className="reveal">
        <div className="section-label">highlights</div>
        <h2 className="section-title">Key Highlights</h2>
      </div>
      <div className="highlights-grid reveal-children">
        {highlights.map((h, i) => (
          <div className="highlight-card" key={i}>
            <div className="highlight-metric">{h.metric}</div>
            <div className="highlight-desc">{h.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
