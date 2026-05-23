import type { Metadata } from "next";
import Script from "next/script";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { defaultSEO } from "@/lib/seo";
import { LocalBusinessSchema } from "@/components/StructuredData";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WAWidget from "@/components/layout/WAWidget";
import CookieBanner from "@/components/layout/CookieBanner";
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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        <LocalBusinessSchema />
        <meta name="theme-color" content="#0C0C0C" />
      </head>
      <body style={{ background: "var(--bg-void)" }}>
        <a href="#main-content" className="sr-only-focusable">
          Sari la conținut
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <WAWidget />
        <CookieBanner />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
              id="ga-script"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
