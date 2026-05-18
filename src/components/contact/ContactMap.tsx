export default function ContactMap() {
  return (
    <section
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--bg-border)",
        borderBottom: "1px solid var(--bg-border)",
        padding: "64px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 42px)",
            letterSpacing: "0.03em",
            marginBottom: 24,
            color: "#fff",
          }}
        >
          Găsești-ne în Timișoara
        </h2>
        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid var(--bg-border)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d88421.56!2d21.2087!3d45.7489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xd7d21d8b1d5ed769!2sTimi%C8%99oara!5e0!3m2!1sro!2sro!4f1.1"
            width="100%"
            height="400"
            style={{ border: "none", display: "block" }}
            loading="lazy"
            title="Locație SDG Print & Design Timișoara"
            allowFullScreen
          />
        </div>
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <a
            href="https://www.google.com/maps/place/Timi%C8%99oara"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              fontSize: 14,
              fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Deschide în Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
}
