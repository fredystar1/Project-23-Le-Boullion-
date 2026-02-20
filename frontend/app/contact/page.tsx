export default function ContactPage() {
  return (
    <main
      style={{
        padding: "80px 40px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* CSS hover without JS */}
      <style>{`
        .sendBtn {
          margin-top: 20px;
          padding: 14px;
          width: 100%;
          background-color: #8B5E3C;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .sendBtn:hover {
          background-color: #6f472e;
        }
      `}</style>

      <h1
        style={{
          fontSize: "52px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Contact Us
      </h1>

      <p
        style={{
          fontSize: "18px",
          marginBottom: "60px",
          textAlign: "center",
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        We'd love to hear from you. Please fill out the form below or reach
        out directly using the contact information provided.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
      >
        {/* Contact Info Card */}
        <div
          style={{
            backgroundColor: "#f6f3ee",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            color: "#000",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Contact Information</h2>

          <p>4910 Underwood Ave</p>
          <p>Omaha, NE 68132</p>

          <div style={{ marginTop: "20px" }}>
            <p>Phone: 402-504-4021</p>
            <p>Email: info@howardstreetwine.com</p>
          </div>

          <h3 style={{ marginTop: "30px" }}>Hours</h3>
          <p>Monday - Saturday: 10:00 AM - 7:30 PM</p>
          <p>Sunday: 12:00 PM - 6:00 PM</p>
        </div>

        {/* Contact Form Card */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            color: "#000",
          }}
        >
          <h2 style={{ marginBottom: "25px" }}>Send Us a Message</h2>

          <input
            placeholder="Name"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              backgroundColor: "#faf7f2",
            }}
          />

          <input
            placeholder="Phone"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              backgroundColor: "#faf7f2",
            }}
          />

          <textarea
            placeholder="Message"
            style={{
              width: "100%",
              padding: "14px",
              height: "140px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              resize: "none",
              backgroundColor: "#faf7f2",
            }}
          />

          <button className="sendBtn">Send Message</button>
        </div>
      </div>
    </main>
  );
}