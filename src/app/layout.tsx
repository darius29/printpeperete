import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { defaultSEO } from "@/lib/seo";
import { LocalBusinessSchema } from "@/components/StructuredData";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WAWidget from "@/components/layout/WAWidget";
import MobileBar from "@/components/layout/MobileBar";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = defaultSEO;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <LocalBusinessSchema />
        <meta name="theme-color" content="#0C0C0C" />
      </head>
      <body style={{ background: "#0C0C0C" }}>
        <Nav />
        {children}
        <Footer />
        <WAWidget />
        <MobileBar />
      </body>
    </html>
  );
}
