"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    icon: "🖨️",
    title: "Print UV direct pe perete",
    desc: "Print direct pe suprafață, fără autocolant, fără lipire. Impact vizual imediat, culori vii, finisaj permanent.",
    tag: "Principal",
  },
  {
    icon: "⚡",
    title: "Gravare și debitare laser CO₂",
    desc: "Precizie industrială pentru gravare și tăiere pe lemn, acril, piele și multe altele. Detalii fine, tăieturi curate.",
    tag: "Laser",
  },
  {
    icon: "🎁",
    title: "Obiecte personalizate",
    desc: "Căni, huse și cadouri corporate cu branding clar și finisaj premium. Serii mici sau mari.",
    tag: "Custom",
  },
  {
    icon: "👕",
    title: "Print textile",
    desc: "Tricouri, hanorace și uniforme cu print clar, rezistent și confortabil pentru echipe și evenimente.",
    tag: "Textile",
  },
];

export default function Services() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="resp-section"
      style={{
        position: "relative",
        background: "radial-gradient(ellipse 50% 60% at 0% 0%, rgba(249,115,22,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 100% 100%, rgba(249,115,22,0.04) 0%, transparent 55%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "calc(-50vw + 50%)",
          right: "calc(-50vw + 50%)",
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E"), linear-gradient(rgba(249,115,22,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.035) 1px, transparent 1px)`,
          backgroundSize: "auto, 60px 60px, 60px 60px",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 40px", position: "relative", zIndex: 1 }}>
      <div
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(24px)",
          transition: "opacity 0.7s, transform 0.7s",
          marginBottom: 56,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
          <span
            style={{
              fontSize: 12,
              color: "var(--accent)",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Ce facem
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 56px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            marginBottom: 16,
          }}
        >
          Serviciile noastre
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: 520,
          }}
        >
          Două tehnologii principale, o gamă completă de soluții vizuale pentru firme și spații
          comerciale.
        </p>
      </div>

      <div className="grid-2-services" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {services.map((s, i) => (
          <div
            key={i}
            className={`service-card has-icon-pop scale-in stagger-${i + 1} ${inView ? "is-visible" : ""}`}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <span className="icon-pop" style={{ fontSize: 36 }}>{s.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: "rgba(249,115,22,0.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(249,115,22,0.25)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {s.tag}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                letterSpacing: "0.03em",
                marginBottom: 10,
                color: "#fff",
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 20 }}>
              {s.desc}
            </p>
            <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.01em" }}>
              Detalii complete →
            </span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
