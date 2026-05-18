import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  icon: string;
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  inView: boolean;
  delay: number;
  image?: string;
}

export default function ServiceCard({ icon, tag, title, desc, chips, inView, delay, image }: ServiceCardProps) {
  const staggerIdx = Math.round(delay / 0.1) + 1;
  return (
    <div
      className={`scale-in stagger-${staggerIdx} ${inView ? "is-visible" : ""} has-icon-pop`}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--bg-border)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transition: `opacity .6s ${delay}s var(--ease-out), transform .6s ${delay}s var(--ease-out), box-shadow 0.28s, border-color 0.28s`,
      }}
    >
      {image && (
        <div className="porto-card" style={{ height: 180, borderRadius: 0, position: "relative" }}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 900px) 100vw, 400px"
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, var(--bg-surface) 100%)", zIndex: 1 }} />
        </div>
      )}
      <div style={{ padding: 28 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <span className="icon-pop" style={{ fontSize: 38 }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: "rgba(249,115,22,.1)", color: "var(--accent)", border: "1px solid rgba(249,115,22,.25)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{tag}</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: 24, letterSpacing: "0.03em", marginBottom: 10, color: "#fff" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 18 }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6, marginBottom: 20 }}>
        {chips.map(chip => (
          <span key={chip} style={{ fontSize: 11, background: "#1E1E1E", color: "var(--text-secondary)", border: "1px solid var(--bg-border)", borderRadius: 5, padding: "3px 9px" }}>{chip}</span>
        ))}
      </div>
      <Link href="/contact" className="btn-outline" style={{ fontSize: 13, padding: "9px 18px" }}>Cere ofertă →</Link>
      </div>
    </div>
  );
}
