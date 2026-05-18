"use client";
import Link from "next/link";
import GrainOverlay from "@/components/ui/GrainOverlay";

const badges = [
  { val: "48h", label: "Livrare standard", color: "#F97316" },
  { val: "2880", label: "DPI rezoluție", color: "#22C55E" },
  { val: "10+", label: "Materiale", color: "#3B82F6" },
];

export default function DespreHero() {
  return (
    <section className="hero-pad-xl" style={{ position: "relative", padding: "140px 40px 80px", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,.07) 0%, transparent 65%), var(--bg-void)",
        }}
      />
      <GrainOverlay />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 720, animation: "fadeUp .9s .1s both" }}>
          {/* Label badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(249,115,22,.1)",
              border: "1px solid rgba(249,115,22,.25)",
              borderRadius: 20,
              padding: "6px 18px",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.04em" }}>
              Atelier Timișoara · Print UV · Laser CO₂
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px,7vw,80px)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              marginBottom: 24,
              animation: "fadeUp .9s .2s both",
            }}
          >
            Din pasiune
            <br />
            pentru <span style={{ color: "var(--accent)" }}>detalii</span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "clamp(15px,1.8vw,17px)",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: 580,
              marginBottom: 36,
              animation: "fadeUp .9s .3s both",
            }}
          >
            Suntem un atelier din Timișoara specializat în print UV direct pe suprafețe, gravare laser CO₂ și
            personalizare. Lucrăm cu atenție la detalii, echipamente moderne și un singur scop: rezultate care rămân.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp .9s .4s both" }}>
            <Link href="/contact" className="btn-primary">Cere ofertă personalizată →</Link>
            <Link href="/portofoliu" className="btn-outline">↳ Vezi portofoliul</Link>
          </div>
        </div>

        {/* Floating stat badges */}
        <div
          className="despre-badges"
          style={{
            position: "absolute",
            top: 0,
            right: 40,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            animation: "fadeIn 1s .6s both",
          }}
        >
          {badges.map((b) => (
            <div
              key={b.val}
              style={{
                background: "var(--bg-elevated)",
                border: `1px solid ${b.color}30`,
                borderRadius: 12,
                padding: "14px 18px",
                textAlign: "center",
                boxShadow: `0 4px 20px ${b.color}12`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  color: b.color,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {b.val}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 3 }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
