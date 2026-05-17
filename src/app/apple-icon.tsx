import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0C0C0C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#F97316",
            borderRadius: "36px 36px 0 0",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 2,
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: 52, fontWeight: 900, fontFamily: "sans-serif", lineHeight: 1 }}>
            S
          </span>
          <span style={{ color: "#F97316", fontSize: 68, fontWeight: 900, fontFamily: "sans-serif", lineHeight: 1 }}>
            D
          </span>
          <span style={{ color: "#FFFFFF", fontSize: 52, fontWeight: 900, fontFamily: "sans-serif", lineHeight: 1 }}>
            G
          </span>
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#9CA3AF",
            fontFamily: "sans-serif",
            letterSpacing: "0.15em",
            marginTop: 8,
            display: "flex",
          }}
        >
          PRINT
        </div>
      </div>
    ),
    { ...size }
  );
}
