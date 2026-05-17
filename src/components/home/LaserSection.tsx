"use client";
import React from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const materials = [
  "Lemn (MDF, placaj, masiv)",
  "Plexiglas / Acril",
  "Piele naturală și ecologică",
  "Hârtie și carton",
  "Textile (bumbac, poliester)",
  "Cauciuc (ștampile)",
  "Plastic (anumite tipuri)",
  "Sticlă (gravare)",
  "Plăci bicolore",
  "Silicon",
];

const feats = [
  { icon: "🎯", label: "Precizie ridicată", desc: "Ideală pentru detalii fine și texte mici" },
  { icon: "✂️", label: "Tăiere + gravare", desc: "Același echipament, rezultate complete" },
  { icon: "⚡", label: "Execuție rapidă", desc: "Producție repetabilă și constantă" },
  { icon: "🤲", label: "Fără contact", desc: "Nu deteriorează materialul adiacent" },
];

const services = [
  "Cadouri personalizate (cutii, rame, trofee)",
  "Produse corporate (logo pe lemn / acril)",
  "Agende și portofele gravate",
  "Litere volumetrice",
  "Plăcuțe firme și semnalistică",
  "Decupaje precise și prototipuri",
  "Ștampile din cauciuc",
  "Gravură pe sticlă și piele",
  "Elemente decorative",
];

const industries = [
  "Publicitate & semnalistică",
  "Corporate gifting",
  "Producție & prototipare",
  "Design interior",
  "Evenimente & activări",
];

export default function LaserSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="resp-section"
      style={{
        background: "radial-gradient(ellipse 50% 55% at 100% 0%, rgba(59,130,246,0.07) 0%, transparent 65%), radial-gradient(ellipse 35% 40% at 0% 100%, rgba(249,115,22,0.05) 0%, transparent 55%), #0a0a0a",
        borderTop: "1px solid #1a1a1a",
        padding: "96px 40px",
        position: "relative",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(45deg, rgba(59,130,246,0.045) 0px, rgba(59,130,246,0.045) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(-45deg, rgba(59,130,246,0.03) 0px, rgba(59,130,246,0.03) 1px, transparent 1px, transparent 12px)",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
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
              Laser CO₂ profesional
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 60px)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              marginBottom: 12,
            }}
          >
            Gravare și debitare
            <br />
            laser CO₂ profesională
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 560 }}>
            Folosim o mașină industrială laser CO₂ de înaltă precizie pentru gravare și debitare pe
            o gamă largă de materiale.
          </p>
        </div>

        <div className="grid-2-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Left */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(-24px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
            }}
          >
            {/* Feature cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 36,
              }}
            >
              {feats.map((f, i) => (
                <div
                  key={i}
                  className="feature-card has-icon-pop"
                >
                  <div className="icon-pop" style={{ fontSize: 24, marginBottom: 8 }}>{f.icon}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      letterSpacing: "0.03em",
                      marginBottom: 4,
                      color: "#fff",
                    }}
                  >
                    {f.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
                    {f.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Materiale */}
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                letterSpacing: "0.04em",
                marginBottom: 12,
                color: "#fff",
              }}
            >
              Materiale compatibile
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
              {materials.map((m) => (
                <span key={m} className="surface-chip">
                  {m}
                </span>
              ))}
            </div>

            <button className="btn-primary">Cere ofertă gravare laser →</button>
          </div>

          {/* Right */}

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(24px)",
              transition: "opacity 0.7s 0.3s, transform 0.7s 0.3s",
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                letterSpacing: "0.04em",
                marginBottom: 16,
                color: "#fff",
              }}
            >
              Servicii realizate
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
              {services.map((s, i) => (
                <div key={i} className="advantage-item">
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              <div className="porto-card" style={{ borderRadius: 10, height: 140, border: "1px solid var(--bg-border)", position: "relative" }}>
                <Image
                  src="/assets/servicii/co2-laser-natural-wood.png"
                  alt="Gravare laser CO2 pe lemn"
                  fill
                  sizes="(max-width: 900px) 50vw, 300px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="porto-card" style={{ borderRadius: 10, height: 140, border: "1px solid var(--bg-border)", position: "relative" }}>
                <Image
                  src="/assets/servicii/laser-engraved-finisher-products.png"
                  alt="Produse gravate laser"
                  fill
                  sizes="(max-width: 900px) 50vw, 300px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--bg-border)",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 10,
                }}
              >
                Industrii deservite
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {industries.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      background: "rgba(249,115,22,0.1)",
                      color: "var(--accent)",
                      border: "1px solid rgba(249,115,22,0.2)",
                      borderRadius: 5,
                      padding: "4px 10px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
