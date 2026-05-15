import { MetadataRoute } from "next";

const BASE_URL = "https://printpeperete.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/servicii`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/portofoliu`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/despre-noi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/before-after`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
