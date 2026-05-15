"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

const advantages = [
  "Print direct pe perete — fără folie, fără lipire",
  "Design permanent și rezistent la uzură",
  "Culori vii și realiste, sistem CMYK",
  "Execuție rapidă, fără deranj în spațiu",
  "Potrivit pentru spații comerciale și rezidențiale",
  "Fără miros neplăcut, non-toxic",
];

const surfaces = [
  "Pereți tencuiți / gletuiți",
  "Lemn și MDF",
  "Sticlă",
  "Metal",
  "Plastic rigid",
  "Beton",
  "Gresie",
];

const specs = [
  { val: "290 cm", label: "Înălțime maximă" },
  { val: "2–6 m²/h", label: "Viteză print" },
  { val: "2880 DPI", label: "Rezoluție" },
  { val: "UV instant", label: "Tehnologie" },
  { val: "CMYK", label: "Sistem culori" },
  { val: "Non-toxic", label: "Cerneală" },
];

const domains = [
  { icon: "🍽️", label: "HoReCa", sub: "Hoteluri, restaurante, cafenele" },
  { icon: "💼", label: "Birouri", sub: "Showroom-uri și spații de lucru" },
  { icon: "🛍️", label: "Retail", sub: "Magazine și spații comerciale" },
  { icon: "🎓", label: "Educație", sub: "Școli, săli de conferință" },
  { icon: "🏠", label: "Rezidențial", sub: "Decor interior premium" },
  { icon: "🏭", label: "Industrial", sub: "Spații de producție" },
];

export default function WallPrintSpotlight() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        padding: "96px 40px",
      }}
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
            marginBottom: 64,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
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
                Serviciu principal
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
              Print UV direct
              <br />
              pe perete
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 500 }}>
              Realizăm print direct pe perete și pe alte suprafețe rigide, fără autocolant, fără
              lipire și fără compromisuri.
            </p>
          </div>
          <button className="btn-primary">Cere ofertă wall print →</button>
        </div>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Left: specs + advantages */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(-24px)",
              transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
            }}
          >
            {/* Specs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 10,
                marginBottom: 36,
              }}
            >
              {specs.map((sp) => (
                <div
                  key={sp.val}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--bg-border)",
                    borderRadius: 10,
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      color: "var(--accent)",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {sp.val}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-tertiary)",
                      marginTop: 5,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {sp.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Advantages */}
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                letterSpacing: "0.04em",
                marginBottom: 14,
                color: "#fff",
              }}
            >
              Avantaje principale
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 32,
              }}
            >
              {advantages.map((a, i) => (
                <div key={i} className="advantage-item">
                  <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {a}
                  </span>
                </div>
              ))}
            </div>

            {/* Surfaces */}
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                letterSpacing: "0.04em",
                marginBottom: 12,
                color: "#fff",
              }}
            >
              Pe ce suprafețe printăm
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {surfaces.map((s) => (
                <span key={s} className="surface-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right: domains */}
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
              Unde se folosește
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 32,
              }}
            >
              {domains.map((d, i) => (
                <div key={i} className="domain-card">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{d.icon}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      letterSpacing: "0.03em",
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {d.label}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.4 }}>
                    {d.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA callout */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06))",
                border: "1px solid rgba(249,115,22,0.2)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  letterSpacing: "0.02em",
                  marginBottom: 8,
                  color: "#fff",
                }}
              >
                Transformă orice perete
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                Orice perete devine o operă vizuală în câteva ore — fără autocolante, fără
                compromisuri.
              </p>
              <button className="btn-outline" style={{ fontSize: 13, padding: "10px 20px" }}>
                Consultanță gratuită →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
