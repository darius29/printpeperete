"use client";
import React, { useState } from "react";
import { Project } from "@/lib/data/projects";
import { useInView } from "@/hooks/useInView";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface MasonryGridProps {
  projects: Project[];
}

export default function MasonryGrid({ projects }: MasonryGridProps) {
  const [ref, inView] = useInView(0.05);
  const [selected, setSelected] = useState<Project | null>(null);

  // Split into 3 columns
  const cols: Project[][] = [[], [], []];
  projects.forEach((p, i) => cols[i % 3].push(p));

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="grid-masonry" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, alignItems: "start" }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {col.map((p, pi) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={ci + pi * 3}
                onClick={setSelected}
                inView={inView}
              />
            ))}
          </div>
        ))}
      </div>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
