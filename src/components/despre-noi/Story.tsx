"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

const paragraphs = [
  "SDG Print & Design a pornit cu un singur scop: să aducă personalizarea la un nivel profesional, rapid și accesibil. Am investit în echipamente de nivel industrial — un printer UV direct pe suprafață și un laser CO₂ — ca să putem oferi rezultate reale, nu promisiuni.",
  "Lucrăm cu antreprenori, agenții de design și persoane fizice din Timișoara și din toată România — de la un obiect personalizat pentru un eveniment, până la muraluri și instalații vizuale pentru spații comerciale.",
  "Ceea ce ne diferențiază nu este doar tehnologia, ci modul în care tratăm fiecare comandă: cu atenție, comunicare transparentă și dorința sinceră ca rezultatul final să depășească așteptările.",
];

const tags = ["Timișoara", "Print UV direct", "Execuție premium", "B2B + B2C"];

const processMini = [
  { icon: "⚙️", label: "Echipament UV" },
  { icon: "🎨", label: "Pregătire design" },
  { icon: "✅", label: "Execuție finală" },
];

export default function Story() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="resp-section"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--bg-border)",
        borderBottom: "1px solid var(--bg-border)",
        padding: "96px 40px",
      }}
    >
      <div
        className="grid-2-main"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Left: story text */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(-24px)",
            transition: "opacity .7s, transform .7s",
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
              Povestea noastră
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px,4.5vw,52px)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              marginBottom: 24,
            }}
          >
            De ce am pornit
            <br />
            SDG Print
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75 }}>
                {p}
              </p>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
            {tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 11,
                  background: "rgba(249,115,22,.1)",
                  color: "var(--accent)",
                  border: "1px solid rgba(249,115,22,.25)",
                  borderRadius: 5,
                  padding: "4px 12px",
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: image placeholder + process mini-cards */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateX(24px)",
            transition: "opacity .7s .2s, transform .7s .2s",
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--bg-border)",
              borderRadius: 16,
              overflow: "hidden",
              aspectRatio: "4/3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 30% 40%, rgba(249,115,22,.08) 0%, transparent 60%)",
              }}
            />
            <div style={{ textAlign: "center", position: "relative" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🖨️</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  letterSpacing: "0.04em",
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                Atelierul nostru
              </div>
              <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Timișoara, România</div>
            </div>
            {/* Corner badge */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(249,115,22,.15)",
                border: "1px solid rgba(249,115,22,.3)",
                borderRadius: 8,
                padding: "8px 12px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  color: "var(--accent)",
                  letterSpacing: "0.04em",
                }}
              >
                Est. 2024
              </div>
            </div>
          </div>

          {/* Process mini-cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 10 }}>
            {processMini.map((p) => (
              <div
                key={p.label}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--bg-border)",
                  borderRadius: 10,
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{p.icon}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
