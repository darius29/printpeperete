"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        textAlign: "center",
        background: "var(--bg-void, #0C0C0C)",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        {/* 500 number */}
        <div
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(100px, 20vw, 160px)",
            letterSpacing: "0.05em",
            lineHeight: 1,
            background: "linear-gradient(135deg, #EF4444, #B91C1C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 8,
          }}
        >
          500
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            fontSize: "clamp(24px, 4vw, 36px)",
            letterSpacing: "0.03em",
            marginBottom: 16,
            color: "#fff",
          }}
        >
          Ceva nu a mers bine
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#9CA3AF",
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          A apărut o eroare neașteptată. Încearcă din nou sau revino mai târziu.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={reset}
            style={{
              padding: "13px 28px",
              fontSize: 15,
              fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
              fontWeight: 600,
              background: "var(--accent, #F97316)",
              color: "#fff",
              border: "none",
              borderRadius: "var(--r-md, 8px)",
              cursor: "pointer",
              transition: "background var(--t-fast, 150ms) var(--ease-out, ease-out)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "var(--accent-deep, #EA580C)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "var(--accent, #F97316)")
            }
          >
            Încearcă din nou
          </button>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 28px",
              fontSize: 15,
              fontFamily: "var(--font-ui, 'DM Sans', sans-serif)",
              fontWeight: 600,
              background: "transparent",
              color: "#fff",
              border: "1.5px solid var(--bg-border, #2A2A2A)",
              borderRadius: "var(--r-md, 8px)",
              textDecoration: "none",
              transition: "border-color var(--t-fast, 150ms) var(--ease-out, ease-out)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--accent, #F97316)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--bg-border, #2A2A2A)")
            }
          >
            ← Acasă
          </Link>
        </div>

        {error.digest && (
          <p
            style={{
              marginTop: 32,
              fontSize: 12,
              color: "var(--text-tertiary, #6B7280)",
              fontFamily: "monospace",
            }}
          >
            Cod eroare: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
