export default function Education() {
  return (
    <section id="education" className="section">
      <div className="reveal">
        <div className="section-label">education</div>
        <h2 className="section-title">Education &amp; Certifications</h2>
      </div>
      <div className="edu-grid reveal-children">
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
