export default function ContactInfo() {
  const items = [
    {
      icon: "📍",
      label: "Adresă",
      val: "Timișoara, județul Timiș, România",
      color: "#F97316",
      href: undefined,
    },
    {
      icon: "📞",
      label: "Telefon",
      val: "0779 281 047",
      color: "#22C55E",
      href: "tel:0779281047",
    },
    {
      icon: "✉️",
      label: "Email",
      val: "contact@printpeperete.com",
      color: "#3B82F6",
      href: "mailto:contact@printpeperete.com",
    },
    {
      icon: "📱",
      label: "WhatsApp",
      val: "Chat rapid — click aici",
      color: "#25D366",
      href: "https://wa.me/40779281047",
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg-elevated, #141414)",
        border: "1px solid var(--bg-border, #2A2A2A)",
        borderRadius: 14,
        padding: 24,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: 22,
          letterSpacing: "0.03em",
          marginBottom: 4,
        }}
      >
        Date de contact
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--text-secondary, #9CA3AF)",
          marginBottom: 20,
          lineHeight: 1.6,
        }}
      >
        Preferi să ne contactezi direct? Suntem disponibili pe toate canalele.
      </p>

      <div>
        {items.map((c) => (
          <div
            key={c.label}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              padding: "16px 0",
              borderBottom: "1px solid #1a1a1a",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                background: `${c.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {c.icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary, #6B7280)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 2,
                }}
              >
                {c.label}
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {c.val}
                </a>
              ) : (
                <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>
                  {c.val}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
