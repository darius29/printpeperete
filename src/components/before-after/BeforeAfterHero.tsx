"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

const STATS = [
  { val: "6+", label: "Proiecte showcase" },
  { val: "48h", label: "Timp mediu execuție" },
  { val: "100%", label: "Clienți mulțumiți" },
  { val: "0", label: "Zile de deranj" },
];

export default function BeforeAfterHero() {
  const [ref, inView] = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="hero-pad-xl"
      style={{
        position: "relative",
        padding: "140px 40px 80px",
        overflow: "hidden",
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
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(28px)",
          transition: "opacity .9s, transform .9s",
        }}
      >
        {/* Badge */}
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
          <span
            style={{
              fontSize: 12,
              color: "var(--accent)",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            6 transformări reale · Trage pentru comparație
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px,8vw,88px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            marginBottom: 20,
          }}
        >
          Înainte
          <br />
          <span style={{ color: "var(--accent)" }}>/ După</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(15px,1.8vw,17px)",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Transformări reale pentru spații comerciale, birouri, HoReCa și
          rezidențial. Fiecare proiect — o poveste de impact vizual.
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {STATS.map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  color: "var(--accent)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
