import { Metadata } from "next";
import { pageSEO } from "@/lib/seo";
import ServiciiHero from "@/components/servicii/ServiciiHero";
import ServiciiMainServices from "@/components/servicii/ServiciiMainServices";
import PriceCalculator from "@/components/servicii/PriceCalculator";
import MaterialeSection from "@/components/servicii/MaterialeSection";
import ServiciiGrid from "@/components/servicii/ServiciiGrid";
import ProcessSteps from "@/components/servicii/ProcessSteps";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata: Metadata = pageSEO.servicii;

export default function ServiciiPage() {
  return (
    <main>
      <ServiciiHero />
      <ServiciiMainServices />
      <PriceCalculator />
      <MaterialeSection />
      <ServiciiGrid />
      <ProcessSteps />
      <FinalCTA
        title="Ai nevoie de un"
        titleAccent="pachet personalizat?"
        subtitle="Combin\u0103m serviciile \u00Een func\u021bie de obiectivele tale de branding sau amenajare. Consultan\u021b\u0103 gratuit\u0103, f\u0103r\u0103 angajament."
        primaryLabel="Cere ofert\u0103 personalizat\u0103 \u2192"
        secondaryLabel="\u21B3 Vezi portofoliul"
      />
    </main>
  );
}
