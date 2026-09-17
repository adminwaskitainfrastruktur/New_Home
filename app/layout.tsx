import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: {
    default: "PT Waskita Karya Infrastruktur",
    template: "%s — Waskita Karya Infrastruktur",
  },
  description:
    "A fast-growing infrastructure and energy company investing in and operating facilities across power, oil and gas, mining, property, transportation and utilities.",
  metadataBase: new URL("https://waskitainfrastruktur.co.id"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LangProvider initial="en">
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
