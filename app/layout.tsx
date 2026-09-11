import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappButton } from "@/components/whatsapp-button";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CustomCursor } from "@/components/custom-cursor";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sylo — Amazon Prep Center & Curated Shop",
  description:
    "Sylo is a family-run Amazon prep center handling receiving, inspection, FBA labeling, storage, and kitting for sellers in any country — plus a curated edit of what we sell on Amazon.",
};

import { LanguageProvider } from "@/lib/language-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <LanguageProvider>
          <SmoothScrollProvider>
            <a
              href="#main"
              className="fixed left-4 top-[-60px] z-[999] rounded-sm bg-ivory-100 px-4.5 py-3 font-semibold text-ink-900 transition-[top] focus:top-4"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
            <WhatsappButton />
            <CustomCursor />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

