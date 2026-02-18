export default function ContactPage() {
    return (
      <main style={{ padding: "60px 40px", maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Contact Us
        </h1>
  
        <p style={{ fontSize: "18px", marginBottom: "40px" }}>
          We'd love to hear from you. Please reach out with any questions
          about wines, events, or wine club membership.
        </p>
  
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          
          <div>
            <h2>Contact Information</h2>
            <p>4910 Underwood Ave</p>
            <p>Omaha, NE 68132</p>
            <p>Phone: 402-504-4021</p>
            <p>Email: info@howardstreetwine.com</p>
  
            <h3 style={{ marginTop: "20px" }}>Hours</h3>
            <p>Monday - Saturday: 10:00 AM - 7:30 PM</p>
            <p>Sunday: 12:00 PM - 6:00 PM</p>
          </div>
  
          <div>
            <h2>Send Us a Message</h2>
            <input placeholder="Name" style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
            <input placeholder="Phone" style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
            <textarea placeholder="Message" style={{ width: "100%", padding: "10px", height: "120px" }} />
            <button style={{
              marginTop: "15px",
              padding: "12px 20px",
              backgroundColor: "#8B5E3C",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}>
              Send
            </button>
          </div>
  
        </div>
      </main>
    );
  }
  