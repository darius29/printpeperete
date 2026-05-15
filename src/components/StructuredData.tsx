export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://printpeperete.com",
    name: "SDG Print & Design",
    description: "Print UV direct pe perete și gravare laser CO₂ în Timișoara și toată România.",
    url: "https://printpeperete.com",
    telephone: "+40779281047",
    email: "contact@printpeperete.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Timișoara",
      addressRegion: "Timiș",
      addressCountry: "RO",
    },
    geo: { "@type": "GeoCoordinates", latitude: 45.7489, longitude: 21.2087 },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "14:00" },
    ],
    areaServed: { "@type": "Country", name: "Romania" },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
