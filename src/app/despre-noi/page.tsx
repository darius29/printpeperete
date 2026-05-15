import type { Metadata } from "next";
import { pageSEO } from "@/lib/seo";
import DespreHero from "@/components/despre-noi/DespreHero";
import Story from "@/components/despre-noi/Story";
import Differentiators from "@/components/despre-noi/Differentiators";
import Equipment from "@/components/despre-noi/Equipment";
import ComparisonTable from "@/components/despre-noi/ComparisonTable";
import Coverage from "@/components/despre-noi/Coverage";
import FinalCTA from "@/components/ui/FinalCTA";

export const metadata: Metadata = pageSEO.despreNoi;

export default function DespreNoiPage() {
  return (
    <main>
      <DespreHero />
      <Story />
      <Differentiators />
      <Equipment />
      <ComparisonTable />
      <Coverage />
      <FinalCTA
        title="Vrei să discutăm"
        titleAccent="proiectul tău?"
        subtitle="Suntem gata să îți propunem cea mai bună soluție de print personalizat."
        primaryLabel="Cere ofertă personalizată →"
        secondaryLabel="↳ Vezi portofoliul"
      />
    </main>
  );
}
