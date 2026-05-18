"use client";
import React, { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

const FAQ_ITEMS = [
  {
    q: "Cât rezistă printul?",
    a: "În condiții normale, printul are o durată mare de viață și își păstrează intensitatea culorilor ani de zile.",
  },
  {
    q: "Pe ce suprafețe se poate aplica?",
    a: "Putem printa pe lemn natural, MDF, acril, piele, plastic, placaj și alte materiale speciale.",
  },
  {
    q: "Se poate printa peste lavabil?",
    a: "Da, în multe cazuri se poate printa pe perete vopsit lavabil, după evaluarea suprafeței.",
  },
  {
    q: "Cât durează execuția?",
    a: "În funcție de proiect, execuția poate dura de la câteva ore la câteva zile.",
  },
  {
    q: "Cum se calculează prețul?",
    a: "Prețul depinde de dimensiune, complexitate, material și locație. Trimite-ne detalii pentru ofertă personalizată.",
  },
  {
    q: "Faceți deplasări în afara Timișoarei?",
    a: "Da, deservim clienți din toată România.",
  },
  {
    q: "Se poate folosi design-ul meu?",
    a: "Sigur. Poți veni cu propriul design sau îl realizăm noi de la zero.",
  },
  {
    q: "Ce fișiere acceptați?",
    a: "Preferăm fișiere vectoriale (AI, PDF, SVG), dar acceptăm și PNG/JPG la rezoluție mare.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section
      className="resp-px"
      style={{ padding: "0 40px 96px", maxWidth: 1200, margin: "0 auto" }}
    >
      <SectionHeader
        label="FAQ"
        title="Întrebări frecvente"
        subtitle="Tot ce trebuie să știi înainte să ne contactezi"
      />

      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--bg-border)",
          borderRadius: "var(--r-xl)",
          padding: "8px 32px",
          marginTop: 40,
        }}
      >
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const isLast = i === FAQ_ITEMS.length - 1;

          return (
            <div
              key={i}
              style={{
                borderBottom: isLast ? "none" : "1px solid var(--bg-border)",
              }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                    fontSize: 15,
                    color: isOpen ? "var(--accent)" : "var(--text-primary)",
                    transition: "color var(--t-fast)",
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    color: isOpen ? "var(--accent)" : "var(--text-secondary)",
                    fontSize: 20,
                    flexShrink: 0,
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform var(--t-fast), color var(--t-fast)",
                    display: "inline-block",
                    lineHeight: 1,
                  }}
                >
                  ›
                </span>
              </button>

              <div
                style={{
                  maxHeight: isOpen ? 400 : 0,
                  overflow: "hidden",
                  transition: "max-height var(--t-normal)",
                }}
              >
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    paddingBottom: 20,
                    margin: 0,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
