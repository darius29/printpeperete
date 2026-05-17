import React from "react";
import { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (p: Project) => void;
  inView: boolean;
}

export default function ProjectCard({ project, index, onClick, inView }: ProjectCardProps) {
  const serviceIcon =
    project.service === "Wall Print UV" ? "🖨️"
    : project.service === "Print Textile" ? "👕"
    : project.service === "Gravare Laser CO₂" ? "⚡"
    : "🎁";

  return (
    <div
      className="porto-card"
      onClick={() => onClick(project)}
      style={{
        height: project.h,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px) scale(.97)",
        transition: `opacity .55s ${Math.min(index * 0.07, 0.5)}s, transform .55s ${Math.min(index * 0.07, 0.5)}s`,
      }}
    >
      {/* Image or gradient placeholder */}
      <div style={{
        width: "100%", height: "100%",
        background: project.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,.04) 0%, transparent 60%)",
            }} />
            <div style={{ textAlign: "center", opacity: 0.2 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, letterSpacing: "0.05em", color: "#fff" }}>
                {serviceIcon}
              </div>
            </div>
            {/* Accent corner */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: 80, height: 80,
              background: `radial-gradient(circle at top right, ${project.accent}20, transparent)`,
            }} />
          </>
        )}
      </div>

      {/* Hover overlay */}
      <div className="porto-overlay">
        <div className="porto-overlay-content">
          <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
            {project.tags.slice(0, 2).map((t) => (
              <span key={t} style={{
                fontSize: 10,
                background: "rgba(249,115,22,.2)",
                color: "#F97316",
                border: "1px solid rgba(249,115,22,.3)",
                borderRadius: 4,
                padding: "2px 8px",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}>
                {t}
              </span>
            ))}
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            letterSpacing: "0.03em",
            marginBottom: 4,
            color: "#fff",
            lineHeight: 1.1,
          }}>
            {project.title}
          </h3>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>📍 {project.location}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>⏱ {project.duration}</span>
          </div>
        </div>
      </div>

      {/* Service badge */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(6px)",
        borderRadius: 6,
        padding: "4px 10px",
        fontSize: 10,
        color: "#9CA3AF",
        fontWeight: 500,
      }}>
        {project.service}
      </div>
    </div>
  );
}
