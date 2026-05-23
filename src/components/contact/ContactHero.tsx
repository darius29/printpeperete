"use client";

import { type RefObject } from "react";
import Image from "next/image";
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
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/assets/hero/pinboard-studio-sdg-print-mostre-culori-brief-proiect.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(12,12,12,0.35) 0%, rgba(12,12,12,0.80) 65%, rgba(12,12,12,0.92) 100%)", zIndex: 1, pointerEvents: "none" }} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
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
            color: "var(--text-hero)",
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
