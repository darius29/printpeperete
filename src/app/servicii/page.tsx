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
      <div style={{ position: "relative", overflow: "hidden" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source
            src="/assets/videos/LoopSmallDustFlameParticle.mp4"
            type="video/mp4"
          />
          <source
            src="/assets/videos/LoopSmallDustFlameParticle.mov"
            type="video/quicktime"
          />
        </video>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(12,12,12,0.80)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <ServiciiMainServices />
          <PriceCalculator />
          <MaterialeSection />
          <ServiciiGrid />
          <ProcessSteps />
        </div>
      </div>
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
