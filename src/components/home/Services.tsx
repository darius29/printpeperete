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
      className="resp-section section-divider"
      style={{
        position: "relative",
        background: "var(--bg-void)",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source
          src="/assets/videos/LoopSmallDustFlameParticle.mp4"
          type="video/mp4"
        />
        <source
          src="/assets/videos/LoopSmallDustFlameParticle.mov"
          type="video/quicktime"
        />
      </video>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(12,12,12,0.80)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "96px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.7s, transform 0.7s",
            marginBottom: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{ width: 32, height: 2, background: "var(--accent)" }}
            />
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
            Două tehnologii principale, o gamă completă de soluții vizuale
            pentru firme și spații comerciale.
          </p>
        </div>

        <div
          className="grid-2-services"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
          }}
        >
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
                <span className="icon-pop" style={{ fontSize: 36 }}>
                  {s.icon}
                </span>
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
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                {s.desc}
              </p>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--accent)",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                Detalii complete →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
