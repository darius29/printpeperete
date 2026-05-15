import React from "react";
import { FILTERS, PROJECTS } from "@/lib/data/projects";

interface FilterBarProps {
  active: string;
  sortBy: string;
  search: string;
  onFilter: (id: string) => void;
  onSort: (id: string) => void;
  onSearch: (v: string) => void;
  resultCount: number;
}

const SORT_OPTIONS = [
  { id: "default", label: "Implicit" },
  { id: "area-desc", label: "Suprafață ↓" },
  { id: "duration-asc", label: "Durată ↑" },
] as const;

function catCount(id: string): number {
  return id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === id).length;
}

export default function FilterBar({
  active,
  sortBy,
  search,
  onFilter,
  onSort,
  onSearch,
  resultCount,
}: FilterBarProps) {
  const activeFilter = FILTERS.find((f) => f.id === active);

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`filter-pill${active === f.id ? " active" : ""}`}
            onClick={() => onFilter(f.id)}
          >
            <span>{f.icon}</span> {f.label}
            <span className="count">{catCount(f.id)}</span>
          </button>
        ))}
      </div>

      {/* Search + Sort row */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {/* Search input */}
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <span style={{
            position: "absolute", left: 12, top: "50%",
            transform: "translateY(-50%)", fontSize: 14, color: "#4B5563",
          }}>
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Caută proiect, locație, tag..."
            style={{
              width: "100%",
              background: "#141414",
              border: "1px solid #2A2A2A",
              borderRadius: 8,
              padding: "9px 14px 9px 34px",
              color: "#fff",
              fontSize: 13,
              fontFamily: "var(--font-ui)",
              outline: "none",
              colorScheme: "dark" as React.CSSProperties["colorScheme"],
            }}
          />
        </div>

        {/* Sort buttons */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#6B7280" }}>Sortare:</span>
          {SORT_OPTIONS.map((s) => (
            <button
              key={s.id}
              className={`sort-btn${sortBy === s.id ? " active" : ""}`}
              onClick={() => onSort(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <span style={{ fontSize: 12, color: "#6B7280", marginLeft: "auto" }}>
          {resultCount} proiect{resultCount !== 1 ? "e" : ""}{" "}
          {active !== "all" && activeFilter ? `în categoria "${activeFilter.label}"` : ""}
          {search ? ` pentru "${search}"` : ""}
        </span>
      </div>
    </div>
  );
}
