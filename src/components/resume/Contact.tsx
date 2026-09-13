export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="contact-content reveal">
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
