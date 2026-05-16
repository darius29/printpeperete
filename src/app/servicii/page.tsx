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
        subtitle="Combinăm serviciile în funcție de obiectivele tale de branding sau amenajare. Consultanță gratuită, fără angajament."
        primaryLabel="Cere ofertă personalizată →"
        secondaryLabel="↳ Vezi portofoliul"
      />
    </main>
  );
}
