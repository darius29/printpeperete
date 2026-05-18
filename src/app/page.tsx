import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { pageSEO } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Services from "@/components/home/Services";
import WallPrintSpotlight from "@/components/home/WallPrintSpotlight";

const LaserSection = dynamic(() => import("@/components/home/LaserSection"));
const Process = dynamic(() => import("@/components/home/Process"));
const BeforeAfterPreview = dynamic(() => import("@/components/home/BeforeAfterPreview"));
const FinalCTA = dynamic(() => import("@/components/ui/FinalCTA"));

export const metadata: Metadata = pageSEO.home;

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <Services />
      <WallPrintSpotlight />
      <LaserSection />
      <Process />
      <BeforeAfterPreview />
      <FinalCTA
        title="Vrei să transformi"
        titleAccent="spațiul tău?"
        subtitle="Trimite-ne detaliile proiectului și revenim cu o ofertă personalizată în maxim 24h."
        primaryLabel="Cere ofertă personalizată →"
        secondaryLabel="↳ Vezi portofoliul"
      />
    </main>
  );
}
