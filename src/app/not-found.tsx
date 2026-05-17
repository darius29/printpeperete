import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        {/* 404 number */}
        <div
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(100px, 20vw, 160px)",
            letterSpacing: "0.05em",
            lineHeight: 1,
            background: "linear-gradient(135deg, #F97316, #EA580C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 8,
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(24px, 4vw, 36px)",
            letterSpacing: "0.03em",
            marginBottom: 16,
            color: "#fff",
          }}
        >
          Pagina nu a fost găsită
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#9CA3AF",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          Pagina pe care o cauți nu există sau a fost mutată. Încearcă una din
          link-urile de mai jos.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" style={{ padding: "13px 28px", fontSize: 15 }}>
            Acasă →
          </Link>
          <Link href="/contact" className="btn-outline" style={{ padding: "13px 28px", fontSize: 15 }}>
            Contact
          </Link>
        </div>

        {/* Quick links */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid #2A2A2A",
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { href: "/servicii", label: "Servicii" },
            { href: "/portofoliu", label: "Portofoliu" },
            { href: "/before-after", label: "Before/After" },
            { href: "/despre-noi", label: "Despre noi" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontSize: 13, color: "#6B7280", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F97316")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6B7280")}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
