export default function Contact() {
  return (
    <div className="container page-content">
      <h1 className="section-title">Contact</h1>
      <div className="contact-grid">
        <div className="contact-card">
          <h3>Get in touch</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea rows="4" placeholder="Write your message..." />
            </div>
            <button className="btn-primary" type="submit">
              Send Message
            </button>
          </form>
        </div>
        <div className="contact-card">
          <h3>Aravind Eye Care System</h3>
          <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
            No. 1, Anna Nagar, Madurai, Tamil Nadu, India.
            <br />
            Phone: +91-452-435 6100 (dummy)
            <br />
            Email: news@aravind.org (dummy)
          </p>
          <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>
            For centre-specific enquiries, please reach out to the respective
            Aravind Eye Hospital branch.
          </p>
        </div>
      </div>
    </div>
  );
}
