import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0C0C0C",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          border: "1.5px solid #2A2A2A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 900,
              fontFamily: "sans-serif",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            S
          </span>
          <span
            style={{
              color: "#F97316",
              fontSize: 14,
              fontWeight: 900,
              fontFamily: "sans-serif",
              lineHeight: 1,
            }}
          >
            D
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 900,
              fontFamily: "sans-serif",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            G
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
