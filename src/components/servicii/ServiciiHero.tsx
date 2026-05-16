import GrainOverlay from "@/components/ui/GrainOverlay";

export default function ServiciiHero() {
  const tags = ["Wall Print UV", "Laser CO₂", "Obiecte personalizate", "Print textile"];
  return (
    <section className="hero-pad-xl" style={{ position: "relative", padding: "140px 40px 80px", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,.07) 0%, transparent 65%), var(--bg-void)",
      }} />
      <GrainOverlay />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <div className="badge-float" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.25)", borderRadius: 20, padding: "6px 18px", marginBottom: 28, animation: "fadeIn 0.6s .1s both" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block", boxShadow: "0 0 8px var(--accent)" }} />
          <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.04em" }}>Print UV · Laser CO₂ · Textile · Design</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-bebas-neue)", fontSize: "clamp(52px,8vw,88px)", letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 20, animation: "fadeUp .9s .15s both" }}>
          Serviciile<br /><span style={{ color: "var(--accent)" }}>noastre</span>
        </h1>
        <p style={{ fontSize: "clamp(15px,1.8vw,17px)", color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px", animation: "fadeUp .9s .3s both" }}>
          De la pereți personalizați până la textile și obiecte promoționale — soluții vizuale complete pentru firme și persoane fizice.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp .9s .45s both" }}>
          {tags.map(tag => (
            <span key={tag} style={{ background: "rgba(249,115,22,.1)", color: "var(--accent)", border: "1px solid rgba(249,115,22,.25)", fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, letterSpacing: "0.03em" }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
