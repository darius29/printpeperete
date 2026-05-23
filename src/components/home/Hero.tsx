"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import GrainOverlay from "@/components/ui/GrainOverlay";

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (document.hidden) return;
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

export default function Hero() {
  const rotatingWords = [
    "pereți",
    "spații",
    "branduri",
    "showroom-uri",
    "birouri",
  ];
  const word = useTypewriter(rotatingWords, 75, 2200);

  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.28}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* BG: hero image */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          height: "110%",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <Image
          src="/assets/hero/homepage-hero.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* BG layers: dark overlay + accent gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.70) 100%), radial-gradient(ellipse 150% 90% at 50% 0%, rgba(249,115,22,0.28) 0%, transparent 70%), radial-gradient(ellipse 100% 60% at 50% 100%, rgba(234,88,12,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <GrainOverlay />
      </div>

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          width: "100%",
          paddingTop: 68,
        }}
      >
        <div style={{ maxWidth: 820, animation: "fadeUp 0.9s ease both" }}>
          {/* Badge */}
          <div
            className="badge-float"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.25)",
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 32,
              animation: "fadeIn 0.6s 0.2s both",
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
              SDG Print — Timișoara, România
            </span>
          </div>

          {/* H1 */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8vw, 88px)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              color: "#fff",
              marginBottom: 24,
              animation: "fadeUp 0.9s 0.15s both",
            }}
          >
            Transformăm
            <br />
            <span
              className="hero-typewriter"
              style={{
                color: "var(--accent)",
                display: "inline-block",
                minWidth: "min(420px, 100%)",
              }}
            >
              {word}
              <span
                style={{
                  animation: "blink 1s infinite",
                  borderRight: "3px solid var(--accent)",
                  marginLeft: 2,
                }}
              />
            </span>
            <br />
            în vizual cu impact.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "var(--text-hero)",
              lineHeight: 1.7,
              maxWidth: 580,
              marginBottom: 40,
              animation: "fadeUp 0.9s 0.3s both",
            }}
          >
            Print UV direct pe perete, gravură și debitare laser CO₂, obiecte
            personalizate și branding vizual pentru firme, HoReCa, showroom-uri
            și spații comerciale.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 32,
              animation: "fadeUp 0.9s 0.45s both",
            }}
          >
            <Link href="/contact" className="btn-primary">
              Cere ofertă personalizată →
            </Link>
            <Link href="/portofoliu" className="btn-outline">
              ↳ Vezi portofoliul
            </Link>
          </div>

          {/* Inline specs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              marginBottom: 24,
              animation: "fadeUp 0.9s 0.6s both",
            }}
          >
            {[
              { label: "Print direct pe suprafață" },
              { label: "Culori vii CMYK" },
              { label: "Tehnologie UV instant" },
              { label: "Materiale multiple" },
            ].map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", alignItems: "center", gap: 7 }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 16,
                    color: "var(--text-hero)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
