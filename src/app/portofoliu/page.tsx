"use client";
import { useState } from "react";
import { PROJECTS } from "@/lib/data/projects";
import PortofoliuHero from "@/components/portofoliu/PortofoliuHero";
import FilterBar from "@/components/portofoliu/FilterBar";
import MasonryGrid from "@/components/portofoliu/MasonryGrid";
import PortofoliuCTA from "@/components/portofoliu/PortofoliuCTA";

export default function PortofoliuPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(12);

  const filtered = PROJECTS
    .filter(p => activeFilter === "all" || p.cat === activeFilter)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sortBy === "area-desc") return parseInt(b.area) - parseInt(a.area);
      if (sortBy === "duration-asc") return a.duration.localeCompare(b.duration);
      return 0;
    });

  const shown = filtered.slice(0, visible);

  return (
    <main>
      <PortofoliuHero />
      <section style={{ padding: "0 40px 96px", maxWidth: 1200, margin: "0 auto" }}>
        <FilterBar
          active={activeFilter}
          sortBy={sortBy}
          search={search}
          onFilter={(id) => { setActiveFilter(id); setVisible(12); }}
          onSort={setSortBy}
          onSearch={setSearch}
          resultCount={filtered.length}
        />
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: .3 }}>🔍</div>
            <div style={{ fontSize: 18, color: "var(--text-tertiary)", marginBottom: 8 }}>Niciun proiect găsit</div>
            <button onClick={() => { setSearch(""); setActiveFilter("all"); }} style={{ background: "none", border: "none", color: "var(--accent)", fontSize: 14, cursor: "pointer", fontFamily: "var(--font-ui)" }}>
              Resetează filtrele
            </button>
          </div>
        ) : (
          <MasonryGrid projects={shown} />
        )}
        {visible < filtered.length && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => setVisible(v => v + 6)} className="btn-outline" style={{ fontSize: 14, padding: "13px 32px" }}>
              Încarcă mai multe ({filtered.length - visible} rămase) ↓
            </button>
          </div>
        )}
      </section>
      <PortofoliuCTA />
    </main>
  );
}
