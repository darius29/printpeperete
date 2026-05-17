import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description:
    "Termenii și condițiile de utilizare a serviciilor SDG Print & Design — print UV pe perete și gravare laser în Timișoara.",
  alternates: { canonical: "https://printpeperete.com/termeni-si-conditii" },
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

export default function TermeniPage() {
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
            Termeni și condiții
          </h1>
          <p style={{ fontSize: 14, color: "#6B7280" }}>
            Ultima actualizare: 01 mai 2026 · SDG Print &amp; Design SRL
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
          <Section title="1. Obiectul serviciilor">
            <p>
              SDG Print &amp; Design SRL (denumit în continuare „Prestator") oferă servicii de printare UV directă pe
              suprafețe diverse, gravare laser CO₂, personalizare textile și obiecte, precum și design grafic personalizat,
              pentru clienți persoane fizice și juridice din România și Uniunea Europeană.
            </p>
          </Section>

          <Section title="2. Acceptarea termenilor">
            <p>
              Prin transmiterea unei cereri de ofertă prin orice canal (formular online, email, telefon sau WhatsApp),
              Clientul confirmă că a citit, înțeles și acceptat în integralitate prezentele Termeni și Condiții.
            </p>
          </Section>

          <Section title="3. Comandă și plată">
            <p style={{ marginBottom: 12 }}>
              3.1. O comandă devine fermă exclusiv prin confirmarea scrisă (email) a Prestatorului și achitarea unui avans
              de minim 50% din valoarea totală a comenzii, dacă nu se convine altfel în scris.
            </p>
            <p style={{ marginBottom: 12 }}>
              3.2. Diferența de plată se achită integral înainte de livrare/montaj, dacă nu există un acord scris
              privind altă modalitate de plată.
            </p>
            <p>
              3.3. Prețurile comunicate sunt în lei RON, includ TVA conform legislației în vigoare și sunt valabile 30
              de zile calendaristice de la data ofertei, dacă nu se specifică altfel.
            </p>
          </Section>

          <Section title="4. Livrare și execuție">
            <p style={{ marginBottom: 12 }}>
              4.1. Termenul standard de execuție este de 48 de ore lucrătoare de la confirmarea comenzii și primirea
              fișierelor finale de design aprobate. Termenele mai lungi se stabilesc de comun acord.
            </p>
            <p style={{ marginBottom: 12 }}>
              4.2. Prestatorul nu poate fi responsabilizat pentru întârzieri cauzate de furnizarea tardivă a materialelor
              sau fișierelor de către Client.
            </p>
            <p>
              4.3. Clientul este responsabil pentru pregătirea și accesul la locația de intervenție în condițiile
              stabilite prealabil (acces, temperatură, umiditate).
            </p>
          </Section>

          <Section title="5. Drepturi de proprietate intelectuală">
            <p style={{ marginBottom: 12 }}>
              5.1. Clientul garantează că deține toate drepturile necesare (de autor, marcă înregistrată, licențe) asupra
              materialelor grafice transmise și că utilizarea lor pentru executarea comenzii nu încalcă drepturile
              terților.
            </p>
            <p>
              5.2. SDG Print &amp; Design SRL nu răspunde pentru eventualele litigii izvorâte din utilizarea neautorizată
              de către Client a unor elemente grafice protejate. Orice prejudiciu suportat de Prestatorului din această cauză
              va fi recuperat integral de la Client.
            </p>
          </Section>

          <Section title="6. Reclamații și garanții">
            <p style={{ marginBottom: 12 }}>
              6.1. Eventualele neconformități vizibile se reclamă la recepția lucrării sau în maxim 48 de ore de la
              livrare, în scris (email la contact@printpeperete.com).
            </p>
            <p style={{ marginBottom: 12 }}>
              6.2. Prestatorul remediează gratuit defectele de execuție constatate, cu condiția că acestea nu sunt cauzate
              de utilizare necorespunzătoare, factori externi sau modificări ulterioare ale suprafeței.
            </p>
            <p>
              6.3. Culoarea finală poate prezenta variații minore față de proofurile digitale, inerente procesului
              tehnic de printare. Aceste variații nu constituie motiv de reclamație dacă se încadrează în toleranțele
              standard ale industriei (ΔE ≤ 3).
            </p>
          </Section>

          <Section title="7. Limitarea răspunderii">
            <p>
              Răspunderea Prestatorului este limitată la valoarea comenzii în cauză. SDG Print &amp; Design SRL nu
              răspunde pentru pierderi indirecte, de profit, de imagine sau alte daune colaterale.
            </p>
          </Section>

          <Section title="8. Forța majoră">
            <p>
              Niciuna dintre părți nu va fi responsabilă pentru neexecutarea obligațiilor în cazul unui eveniment de
              forță majoră (calamități naturale, greve generalizate, restricții guvernamentale). Partea afectată notifică
              cealaltă parte în 48 de ore de la producerea evenimentului.
            </p>
          </Section>

          <Section title="9. Legea aplicabilă și jurisdicție">
            <p>
              Prezentul contract este guvernat de legea română. Orice litigiu se va soluționa pe cale amiabilă, iar în
              caz de eșec, prin instanțele competente din Timișoara, România.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              SDG Print &amp; Design SRL · Timișoara, România
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
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
