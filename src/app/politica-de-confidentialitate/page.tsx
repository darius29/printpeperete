import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politică de confidențialitate",
  description:
    "Politica de confidențialitate SDG Print & Design — cum colectăm și protejăm datele tale personale.",
  alternates: { canonical: "https://printpeperete.com/politica-de-confidentialitate" },
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <h2
      style={{
        fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
        fontSize: 24,
        letterSpacing: "0.04em",
        color: "#F97316",
        marginBottom: 16,
      }}
    >
      {title}
    </h2>
    <div style={{ fontSize: 15, color: "#D1D5DB", lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function PrivacyPage() {
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
            Politică de confidențialitate
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>
            Ultima actualizare: 01 mai 2026 · Conform Regulamentului UE 2016/679 (GDPR)
          </p>
        </div>

        <div
          style={{
            background: "#141414",
            border: "1px solid #2A2A2A",
            borderRadius: 16,
            padding: "40px 48px",
          }}
        >
          <Section title="1. Cine suntem — Operatorul de date">
            <p>
              <strong style={{ color: "#fff" }}>SDG Print &amp; Design SRL</strong>
              <br />
              Sediu: Timișoara, România
              <br />
              Email: contact@printpeperete.com
              <br />
              Telefon: 0779 281 047
              <br />
              Website: printpeperete.com
            </p>
            <p style={{ marginTop: 12 }}>
              În calitate de operator de date cu caracter personal, SDG Print &amp; Design SRL prelucrează datele tale
              conform prezentei politici și în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația română
              aplicabilă.
            </p>
          </Section>

          <Section title="2. Ce date colectăm și de ce">
            <p style={{ marginBottom: 12 }}>Colectăm datele pe care le furnizezi voluntar prin formularul de contact:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><strong style={{ color: "#fff" }}>Nume și prenume</strong> — pentru a-ți adresa oferta personalizat</li>
              <li><strong style={{ color: "#fff" }}>Număr de telefon</strong> — pentru comunicare directă privind oferta</li>
              <li><strong style={{ color: "#fff" }}>Adresă de email</strong> — pentru transmiterea ofertei și confirmărilor</li>
              <li><strong style={{ color: "#fff" }}>Mesaj / detalii proiect</strong> — pentru elaborarea ofertei</li>
              <li><strong style={{ color: "#fff" }}>Locație proiect</strong> (opțional) — pentru logistica deplasării</li>
              <li><strong style={{ color: "#fff" }}>Fișiere design</strong> (opțional) — exclusiv pentru execuția comenzii</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              <strong style={{ color: "#fff" }}>Nu colectăm</strong> date sensibile, date de plată directe, date despre minori sau date biometrice.
            </p>
          </Section>

          <Section title="3. Temeiul legal al prelucrării">
            <p>
              Prelucrăm datele tale pe baza{" "}
              <strong style={{ color: "#fff" }}>consimțământului tău explicit</strong> (art. 6(1)(a) GDPR), exprimat prin
              completarea și trimiterea formularului de contact. Poți retrage consimțământul în orice moment
              contactându-ne la adresa de email de mai sus.
            </p>
            <p style={{ marginTop: 12 }}>
              Pentru clienții existenți, prelucrarea poate fi întemeiată și pe executarea unui contract (art. 6(1)(b) GDPR)
              sau pe interesul legitim al operatorului (art. 6(1)(f) GDPR) în scopul gestionării relației comerciale.
            </p>
          </Section>

          <Section title="4. Cui transmitem datele">
            <p style={{ marginBottom: 12 }}>
              Datele tale nu sunt vândute, închiriate sau transmise unor terți în scop comercial. Le partajăm strict cu:
            </p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li>
                <strong style={{ color: "#fff" }}>Resend Inc.</strong> (SUA) — furnizorul nostru de servicii email
                tranzacțional, utilizat exclusiv pentru trimiterea confirmărilor. Datele sunt transferate în baza
                clauzelor contractuale standard UE.
              </li>
              <li>
                <strong style={{ color: "#fff" }}>Google Analytics</strong> (dacă este activat) — date anonimizate de
                navigare (IP-ul este anonimizat).
              </li>
            </ul>
          </Section>

          <Section title="5. Cât timp păstrăm datele">
            <p>
              Datele din formularele de contact sunt păstrate maxim <strong style={{ color: "#fff" }}>3 ani</strong> de
              la ultima interacțiune, ulterior fiind șterse definitiv. Comenzile finalizate (facturi, corespondență
              comercială) se arhivează conform obligațiilor legale contabile (10 ani).
            </p>
          </Section>

          <Section title="6. Drepturile tale GDPR">
            <p style={{ marginBottom: 12 }}>Conform GDPR, beneficiezi de următoarele drepturi:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              <li><strong style={{ color: "#fff" }}>Acces</strong> — să primești o copie a datelor pe care le deținem despre tine</li>
              <li><strong style={{ color: "#fff" }}>Rectificare</strong> — să corectezi datele inexacte</li>
              <li><strong style={{ color: "#fff" }}>Ștergere</strong> — „dreptul de a fi uitat", în condițiile legii</li>
              <li><strong style={{ color: "#fff" }}>Restricționare</strong> — limitarea prelucrării în anumite situații</li>
              <li><strong style={{ color: "#fff" }}>Portabilitate</strong> — primirea datelor într-un format structurat</li>
              <li><strong style={{ color: "#fff" }}>Opoziție</strong> — refuzul prelucrării în scop de marketing direct</li>
              <li><strong style={{ color: "#fff" }}>Retragerea consimțământului</strong> — în orice moment, fără efect retroactiv</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Exercitarea drepturilor se face prin email la{" "}
              <a href="mailto:contact@printpeperete.com" style={{ color: "#F97316" }}>
                contact@printpeperete.com
              </a>
              . Răspundem în maxim 30 de zile.
            </p>
            <p style={{ marginTop: 12 }}>
              Dacă consideri că drepturile tale nu au fost respectate, poți depune plângere la{" "}
              <strong style={{ color: "#fff" }}>ANSPDCP</strong>:{" "}
              <a href="https://www.dataprotection.ro" style={{ color: "#F97316" }} target="_blank" rel="noopener noreferrer">
                dataprotection.ro
              </a>
            </p>
          </Section>

          <Section title="7. Securitatea datelor">
            <p>
              Implementăm măsuri tehnice și organizatorice adecvate pentru protecția datelor tale: conexiuni HTTPS,
              acces restricționat la sistemele interne și parteneri de încredere certificați (Resend, hosting).
            </p>
          </Section>

          <Section title="8. Modificări ale politicii">
            <p>
              Putem actualiza prezenta politică periodic. Versiunea actualizată va fi publicată pe această pagină cu data
              revizuirii. Utilizarea continuă a serviciilor după publicarea modificărilor constituie acceptarea acestora.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
