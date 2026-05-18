import Link from "next/link";

const COLS = [
  { title: "Servicii", links: [{ label: "Print UV pe perete", href: "/servicii" }, { label: "Gravare laser CO₂", href: "/servicii" }, { label: "Obiecte personalizate", href: "/servicii" }, { label: "Print textile", href: "/servicii" }, { label: "Design personalizat", href: "/servicii" }] },
  { title: "Info", links: [{ label: "Portofoliu", href: "/portofoliu" }, { label: "Before / After", href: "/before-after" }, { label: "Despre Noi", href: "/despre-noi" }, { label: "Contact", href: "/contact" }] },
  { title: "Legal", links: [{ label: "Termeni și condiții", href: "/termeni-si-conditii" }, { label: "Politică confidențialitate", href: "/politica-de-confidentialitate" }, { label: "Politică cookies", href: "/politica-de-cookies" }, { label: "ANPC", href: "/anpc" }] },
];

export default function Footer() {
  return (
    <footer className="footer-wrap" style={{ background: "radial-gradient(ellipse 80% 30% at 50% 0%, rgba(249,115,22,0.10) 0%, transparent 55%), #0a0a0a", borderTop: "1px solid #1a1a1a", padding: "48px 40px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-footer" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "0.06em", marginBottom: 10 }}>SDG <span style={{ color: "var(--accent)" }}>PRINT</span> & Design</div>
            <p style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.7, maxWidth: 240 }}>Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România.</p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, letterSpacing: "0.06em", marginBottom: 12 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} className="footer-link">{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#4B5563" }}>© 2026 SDG PRINT & Design. Toate drepturile rezervate.</span>
          <span style={{ fontSize: 12, color: "#4B5563" }}>Timișoara, Arad, Cluj-Napoca și toată România</span>
        </div>
      </div>
    </footer>
  );
}
