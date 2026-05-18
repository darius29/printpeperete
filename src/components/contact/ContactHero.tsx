"use client";

import { type RefObject } from "react";
import { useInView } from "@/hooks/useInView";

export default function ContactHero() {
  const [refRaw, inView] = useInView(0.12);
  const ref = refRaw as RefObject<HTMLElement>;

  return (
    <section
      ref={ref}
      className="hero-pad-xl"
      style={{
        position: "relative",
        padding: "140px 40px 60px",
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transition: "opacity .7s, transform .7s",
      }}
    >
      {/* Radial gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 150% 90% at 50% 0%, rgba(249,115,22,.22) 0%, transparent 70%), var(--bg-void)",
          pointerEvents: "none",
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.5,
          animation: "grain 8s steps(2) infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          textAlign: "center",
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
            animation: "fadeIn .6s .1s both",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent, #F97316)",
              display: "inline-block",
              boxShadow: "0 0 8px #F97316",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: "var(--accent, #F97316)",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Răspuns în max 24h · Consultanță gratuită
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(52px,8vw,88px)",
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            marginBottom: 20,
            animation: "fadeUp .9s .15s both",
          }}
        >
          Hai să
          <br />
          <span style={{ color: "var(--accent, #F97316)" }}>discutăm</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(15px,1.8vw,17px)",
            color: "var(--text-secondary, #9CA3AF)",
            lineHeight: 1.75,
            maxWidth: 520,
            margin: "0 auto",
            animation: "fadeUp .9s .3s both",
          }}
        >
          Trimite-ne detaliile proiectului și revenim rapid cu o ofertă
          personalizată. Upload fișier design inclus.
        </p>
      </div>
    </section>
  );
}
