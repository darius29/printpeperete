"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

export default function PortofoliuHero() {
  const [ref, inView] = useInView(0.1);
  const count = useCounter(18, 1400, inView);

  const stats = [
    { val: count, suffix: "+", label: "Proiecte livrate", color: "#F97316" },
    { val: "48", suffix: "h", label: "Timp mediu execuție", color: "#22C55E" },
    { val: "4", suffix: "", label: "Categorii servicii", color: "#3B82F6" },
    { val: "100", suffix: "%", label: "Clienți satisfăcuți", color: "#A78BFA" },
  ] as const;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="hero-pad-xl"
      style={{ position: "relative", padding: "140px 40px 72px", overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 150% 90% at 50% 0%, rgba(249,115,22,.22) 0%, transparent 70%), var(--bg-void)",
      }} />

      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: "-50%", width: "200%", height: "200%",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.5, animation: "grain 8s steps(2) infinite", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid-porto-hero" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "flex-end" }}>

          {/* Left — headline */}
          <div style={{ animation: "fadeUp .9s .1s both" }}>
            {/* Badge */}
            <div className="badge-float" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.25)",
              borderRadius: 20, padding: "6px 18px", marginBottom: 28,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.04em" }}>
                Proiecte reale · Clienți mulțumiți
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px,8vw,88px)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              marginBottom: 20,
            }}>
              Portofoliu<br />
              <span style={{ color: "var(--accent)" }}>de lucrări</span>
            </h1>

            <p style={{ fontSize: "clamp(15px,1.8vw,17px)", color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 560 }}>
              Exemple reale de proiecte livrate în Timișoara și în toată România — wall print UV, gravare laser, textile și obiecte personalizate.
            </p>
          </div>

          {/* Right — stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, animation: "fadeIn .9s .4s both" }}>
            {stats.map((s) => (
              <div key={s.label} className="porto-stat-card" style={{
                background: "var(--bg-surface)",
                border: `1px solid ${s.color}22`,
                borderRadius: 12,
                padding: "16px 18px",
                textAlign: "center",
                minWidth: 110,
              }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  color: s.color,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}>
                  {s.val}{s.suffix}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4, lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
