import type { Metadata } from "next";
import { pageSEO } from "@/lib/seo";

export const metadata: Metadata = pageSEO.portofoliu;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
