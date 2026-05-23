import type { Metadata } from "next";
import { pageSEO } from "@/lib/seo";
import { BEFORE_AFTER_ITEMS } from "@/lib/data/beforeAfter";
import BeforeAfterHero from "@/components/before-after/BeforeAfterHero";
import MegaSlider from "@/components/before-after/MegaSlider";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata: Metadata = pageSEO.beforeAfter;

export default function BeforeAfterPage() {
  return (
    <main>
      <BeforeAfterHero />
      <section className="resp-px cta-section section-divider" style={{ padding: "0 40px 96px", maxWidth: 1200, margin: "0 auto", background: "var(--bg-void)" }}>
        {BEFORE_AFTER_ITEMS.map((item, i) => (
          <MegaSlider key={i} item={item} index={i} />
        ))}
      </section>
      <FinalCTA
        title="Vrei o transformare"
        titleAccent="similară?"
        subtitle="Trimite-ne o poză cu spațiul tău și primești ofertă personalizată + simulare vizuală gratuită."
        primaryLabel="Cere ofertă personalizată →"
        secondaryLabel="↳ Vezi portofoliul complet"
      />
    </main>
  );
}
