"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { id: "perete", label: "Pereți tencuiți / gletuiți", img: "" },
  { id: "lemn", label: "Lemn și MDF", img: "/assets/surfaces/lemn.jpg" },
  { id: "sticla", label: "Sticlă", img: "/assets/surfaces/sticla.jpg" },
  { id: "metal", label: "Metal", img: "/assets/surfaces/metal.jpg" },
  {
    id: "plastic",
    label: "Plastic rigid",
    img: "/assets/surfaces/plastic.jpg",
  },
  { id: "beton", label: "Beton", img: "/assets/surfaces/beton.jpg" },
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
  const [activeSurface, setActiveSurface] = useState(surfaces[0].id);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const currentSurface = surfaces.find((s) => s.id === activeSurface)!;

  return (
    <section
      className="resp-section"
      style={{
        background:
          "radial-gradient(ellipse 55% 50% at 0% 100%, rgba(249,115,22,0.09) 0%, transparent 65%), radial-gradient(ellipse 45% 55% at 100% 0%, rgba(249,115,22,0.05) 0%, transparent 60%), #0a0a0a",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
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
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
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
            <p
              style={{
                fontSize: 16,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 500,
              }}
            >
              Realizăm print direct pe perete și pe alte suprafețe rigide, fără
              autocolant, fără lipire și fără compromisuri.
            </p>
          </div>
          <Link href="/contact" className="btn-primary">
            Cere ofertă wall print →
          </Link>
        </div>

        {/* Main grid */}
        <div
          className="grid-2-main"
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
                <div key={sp.val} className="spec-card">
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
                  <span
                    style={{
                      color: "var(--accent)",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
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
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
                marginBottom: 16,
              }}
            >
              {surfaces.map((s) => {
                const isActive = activeSurface === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSurface(s.id)}
                    className="surface-chip"
                    style={{
                      background: isActive
                        ? "rgba(249,115,22,0.1)"
                        : "transparent",
                      borderColor: isActive ? "var(--accent)" : undefined,
                      color: isActive ? "#fff" : undefined,
                      cursor: "pointer",
                      fontFamily: "var(--font-ui)",
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Surface image */}
            <div
              key={activeSurface}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--bg-border)",
                height: 260,
                animation: "fadeIn 0.3s ease",
                position: "relative",
              }}
            >
              {!imgError[activeSurface] ? (
                <Image
                  src={currentSurface.img}
                  alt={currentSurface.label}
                  fill
                  sizes="(max-width: 900px) 100vw, 560px"
                  onError={() =>
                    setImgError((prev) => ({ ...prev, [activeSurface]: true }))
                  }
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: "rgba(249,115,22,0.15)",
                      border: "1px solid rgba(249,115,22,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                    }}
                  >
                    🖼️
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      letterSpacing: "0.05em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {currentSurface.label}
                  </span>
                </div>
              )}
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
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 28,
                border: "1px solid var(--bg-border)",
                position: "relative",
                height: 220,
              }}
            >
              <Image
                src="/assets/servicii/uv-wall-printer.png"
                alt="Printer UV direct pe perete"
                fill
                sizes="(max-width: 900px) 100vw, 500px"
                style={{ objectFit: "cover" }}
              />
            </div>
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
                <div key={i} className={`domain-card has-icon-pop`}>
                  <div
                    className="icon-pop"
                    style={{ fontSize: 28, marginBottom: 8 }}
                  >
                    {d.icon}
                  </div>
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
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-tertiary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {d.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA callout */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.06))",
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
                Orice perete devine o operă vizuală în câteva ore — fără
                autocolante, fără compromisuri.
              </p>
              <Link
                href="/contact"
                className="btn-outline"
                style={{ fontSize: 13, padding: "10px 20px" }}
              >
                Consultanță gratuită →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
