export default function AreaCoverage() {
  const counties = [
    "Timiș",
    "Arad",
    "Bihor",
    "Cluj",
    "Alba",
    "Hunedoara",
    "Caraș-Severin",
    "Mureș",
    "Sibiu",
    "+ România",
  ];

  return (
    <div
      style={{
        background: "var(--bg-elevated, #141414)",
        border: "1px solid var(--bg-border, #2A2A2A)",
        borderRadius: 14,
        padding: 20,
      }}
    >
      <h4
        style={{
          fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
          fontSize: 16,
          letterSpacing: "0.04em",
          marginBottom: 12,
        }}
      >
        Zonă de acoperire
      </h4>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {counties.map((county) => (
          <span
            key={county}
            style={{
              fontSize: 11,
              background: "#1E1E1E",
              color: "var(--text-secondary, #9CA3AF)",
              border: "1px solid var(--bg-border, #2A2A2A)",
              borderRadius: 5,
              padding: "3px 8px",
            }}
          >
            {county}
          </span>
        ))}
      </div>
    </div>
  );
}
