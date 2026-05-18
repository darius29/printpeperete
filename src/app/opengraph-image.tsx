import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SDG Print & Design — Print UV pe perete | Timișoara";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0C0C0C",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Bottom-left subtle glow */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Grid lines decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(42,42,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,42,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Logo line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              SDG
            </span>
            <span
              style={{
                fontSize: 96,
                fontWeight: 900,
                color: "#F97316",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              PRINT
            </span>
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "0.06em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            & Design
          </div>
          {/* Orange divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: "#F97316",
              margin: "28px 0 24px",
              display: "flex",
              borderRadius: 2,
            }}
          />
          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: "#9CA3AF",
              letterSpacing: "0.08em",
              display: "flex",
            }}
          >
            Print UV pe perete · Gravare Laser · Timișoara
          </div>
          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 32,
            }}
          >
            {["Livrare 48h", "Consultanță gratuită", "Toată România"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(249,115,22,0.12)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    borderRadius: 20,
                    padding: "8px 20px",
                    fontSize: 18,
                    color: "#F97316",
                    fontWeight: 600,
                    display: "flex",
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>
        {/* URL bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 20,
            color: "#4B5563",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          printpeperete.com
        </div>
      </div>
    ),
    { ...size }
  );
}
