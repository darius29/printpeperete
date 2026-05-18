"use client";
import React from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    num: "01",
    title: "Discuție & obiective",
    desc: "Colectăm dimensiuni, context și direcția vizuală dorită pentru proiect. Consultanță gratuită.",
  },
  {
    num: "02",
    title: "Propunere creativă",
    desc: "Pregătim variante de design și recomandăm materialele potrivite pentru suprafața ta.",
  },
  {
    num: "03",
    title: "Execuție & predare",
    desc: "Programăm producția și livrăm cu verificare finală a calității. Garanție completă.",
  },
];

export default function Process() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="resp-section cv-auto"
      style={{
        padding: "96px 40px",
        background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(249,115,22,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 50% 0%, rgba(249,115,22,0.04) 0%, transparent 55%)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
            marginBottom: 64,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
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
              Cum funcționează
            </span>
            <div style={{ width: 32, height: 2, background: "var(--accent)" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "0.02em",
              lineHeight: 0.95,
              marginBottom: 12,
            }}
          >
            Un proces simplu,
            <br />
            clar și previzibil
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Fiecare etapă este documentată, ca să ai control complet de la brief la livrare.
          </p>
        </div>

        <div
          className="grid-3-process"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Connector line */}
          <div
            className="process-connector"
            style={{
              position: "absolute",
              top: 30,
              left: "16.6%",
              right: "16.6%",
              height: 2,
              background:
                "linear-gradient(to right, var(--accent) 0%, var(--bg-border) 50%, var(--accent) 100%)",
              zIndex: 0,
            }}
          >
            <div
              className={`line-grow ${inView ? "is-visible" : ""}`}
              style={{ position: "absolute", inset: 0, background: "inherit" }}
            />
          </div>

          {steps.map((s, i) => (
            <div
              key={i}
              className={`fade-up stagger-${i + 2} ${inView ? "is-visible" : ""}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 24px",
              }}
            >
              <div className="step-num" style={{ marginBottom: 24, background: "var(--bg-void)" }}>
                {s.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  letterSpacing: "0.03em",
                  marginBottom: 12,
                  color: "#fff",
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 56,
            opacity: inView ? 1 : 0,
            transition: "opacity 0.7s 0.7s",
          }}
        >
          <Link href="/contact" className="btn-primary">Începe proiectul →</Link>
        </div>
      </div>
    </section>
  );
}
