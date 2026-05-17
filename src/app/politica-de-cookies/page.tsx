import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politică cookies",
  description: "Politica de utilizare a cookie-urilor pe printpeperete.com — SDG Print & Design.",
  alternates: { canonical: "https://printpeperete.com/politica-de-cookies" },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: 24, letterSpacing: "0.04em", color: "#F97316", marginBottom: 16 }}>
      {title}
    </h2>
    <div style={{ fontSize: 15, color: "#D1D5DB", lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function CookiesPage() {
  return (
    <main style={{ paddingTop: 100, paddingBottom: 96, minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Legal</p>
          <h1 style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)", fontSize: "clamp(36px,5vw,56px)", letterSpacing: "0.03em", lineHeight: 1, marginBottom: 16 }}>
            Politică cookies
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>Ultima actualizare: 01 mai 2026</p>
        </div>

        <div style={{ background: "#141414", border: "1px solid #2A2A2A", borderRadius: 16, padding: "40px 48px" }}>
          <Section title="1. Ce sunt cookie-urile">
            <p>
              Cookie-urile sunt fișiere text de mici dimensiuni stocate în browserul tău când vizitezi un site web. Ele
              permit site-ului să își amintească acțiunile și preferințele tale pe o perioadă de timp, astfel încât să
              nu fie nevoie să le reintroduci la fiecare vizită.
            </p>
          </Section>

          <Section title="2. Ce cookie-uri folosim">
            <p style={{ marginBottom: 16 }}><strong style={{ color: "#fff" }}>a) Cookie-uri strict necesare</strong></p>
            <p style={{ marginBottom: 20 }}>
              Aceste cookie-uri sunt esențiale pentru funcționarea corectă a site-ului. Nu pot fi dezactivate. Ele
              includ cookie-uri tehnice generate de Next.js pentru rutare și preferința de consimțământ cookies (stocat
              în localStorage, nu cookie propriu-zis).
            </p>
            <p style={{ marginBottom: 16 }}><strong style={{ color: "#fff" }}>b) Cookie-uri de analiză și performanță (opționale)</strong></p>
            <p>
              Dacă îți exprimi consimțământul, folosim{" "}
              <strong style={{ color: "#fff" }}>Google Analytics 4</strong> pentru a înțelege cum este utilizat site-ul
              (pagini vizitate, durata sesiunii, sursa traficului). IP-ul tău este anonimizat. Datele sunt agregate și nu
              permit identificarea personală.
            </p>
          </Section>

          <Section title="3. Durata cookie-urilor">
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>Cookie-uri de sesiune: expiră la închiderea browserului</li>
              <li>Preferință consimțământ (localStorage): 365 de zile</li>
              <li>Google Analytics (_ga): 2 ani; (_ga_*): 2 ani</li>
            </ul>
          </Section>

          <Section title="4. Cum poți gestiona cookie-urile">
            <p style={{ marginBottom: 12 }}>
              Poți controla sau șterge cookie-urile oricând din setările browserului tău:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "#F97316" }}>
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/ro/kb/activati-dezactivati-cookie-uri" target="_blank" rel="noopener noreferrer" style={{ color: "#F97316" }}>
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "#F97316" }}>
                  Safari
                </a>
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Dezactivarea cookie-urilor de analiză nu afectează funcționarea site-ului. Poți revoca consimțământul
              și prin bannerul de cookies afișat la prima vizită.
            </p>
          </Section>

          <Section title="5. Contact">
            <p>
              Întrebări privind cookie-urile:{" "}
              <a href="mailto:contact@printpeperete.com" style={{ color: "#F97316" }}>
                contact@printpeperete.com
              </a>
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
