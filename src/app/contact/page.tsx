import type { Metadata } from "next";
import { pageSEO } from "@/lib/seo";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Schedule from "@/components/contact/Schedule";
import AreaCoverage from "@/components/contact/AreaCoverage";

export const metadata: Metadata = pageSEO.contact;

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <section style={{ padding: "0 40px 96px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
          <ContactForm />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <ContactInfo />
            <Schedule />
            <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,.1), rgba(234,88,12,.06))", border: "1px solid rgba(249,115,22,.2)", borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>⚡</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "0.03em" }}>Răspuns rapid garantat</div>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>Revenim cu ofertă personalizată în maxim 24h în zilele lucrătoare.</p>
              {["Consultanță gratuită, fără angajament", "Ofertă detaliată cu breakdown de prețuri", "Disponibili pe WhatsApp pentru întrebări rapide"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span> {t}
                </div>
              ))}
            </div>
            <AreaCoverage />
          </div>
        </div>
      </section>
    </main>
  );
}
