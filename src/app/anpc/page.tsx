import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ANPC — Soluționarea alternativă a litigiilor",
  description:
    "Informații despre soluționarea alternativă a litigiilor prin ANPC și platforma SOL — SDG Print & Design.",
  alternates: { canonical: "https://printpeperete.com/anpc" },
};

export default function ANPCPage() {
  return (
    <main style={{ paddingTop: 100, paddingBottom: 96, minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            Legal
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              fontSize: "clamp(36px,5vw,56px)",
              letterSpacing: "0.03em",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            ANPC &amp; SAL / SOL
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>
            Soluționarea alternativă a litigiilor — conform OUG 34/2014 și Legii 158/2015
          </p>
        </div>

        <div style={{ background: "#141414", border: "1px solid #2A2A2A", borderRadius: 16, padding: "40px 48px" }}>
          <div style={{ fontSize: 15, color: "#D1D5DB", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 24 }}>
              SDG Print &amp; Design SRL este dedicat rezolvării amiabile a oricăror nemulțumiri. Dacă ai o sesizare
              privind un produs sau serviciu, te rugăm să ne contactezi în primul rând direct:
            </p>

            <div
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                borderRadius: 10,
                padding: 20,
                marginBottom: 32,
              }}
            >
              <p style={{ margin: 0, fontSize: 14 }}>
                <strong style={{ color: "#F97316" }}>Contact direct:</strong>
                <br />
                Email:{" "}
                <a href="mailto:contact@printpeperete.com" style={{ color: "#F97316" }}>
                  contact@printpeperete.com
                </a>
                <br />
                Telefon:{" "}
                <a href="tel:0779281047" style={{ color: "#F97316" }}>
                  0779 281 047
                </a>
                <br />
                Program: Luni–Vineri 09:00–18:00
              </p>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: 22,
                color: "#F97316",
                marginBottom: 12,
                letterSpacing: "0.04em",
              }}
            >
              Autoritatea Națională pentru Protecția Consumatorilor (ANPC)
            </h2>
            <p style={{ marginBottom: 24 }}>
              Dacă litigiul nu se soluționează pe cale amiabilă, poți sesiza ANPC sau utiliza platforma europeană de
              soluționare online a litigiilor (SOL):
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              <a
                href="https://anpc.ro"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#1E1E1E",
                  border: "1px solid #2A2A2A",
                  borderRadius: 10,
                  padding: "16px 20px",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 24 }}>🏛️</span>
                <div>
                  <div style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}>ANPC — anpc.ro</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                    Autoritatea Națională pentru Protecția Consumatorilor
                  </div>
                </div>
                <span style={{ marginLeft: "auto", color: "#F97316", fontSize: 18 }}>→</span>
              </a>

              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#1E1E1E",
                  border: "1px solid #2A2A2A",
                  borderRadius: 10,
                  padding: "16px 20px",
                  textDecoration: "none",
                }}
              >
                <span style={{ fontSize: 24 }}>🇪🇺</span>
                <div>
                  <div style={{ fontSize: 15, color: "#fff", fontWeight: 600 }}>Platforma SOL — ec.europa.eu/consumers/odr</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
                    Soluționarea Online a Litigiilor — Comisia Europeană
                  </div>
                </div>
                <span style={{ marginLeft: "auto", color: "#F97316", fontSize: 18 }}>→</span>
              </a>
            </div>

            <p style={{ fontSize: 13, color: "#6B7280" }}>
              Conform OUG 34/2014 privind drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii
              și Legii nr. 158/2015 privind alternativa de soluționare a litigiilor în domeniul consumatorilor.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link
            href="/"
            style={{ fontSize: 14, color: "#F97316", textDecoration: "none" }}
          >
            ← Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </main>
  );
}
