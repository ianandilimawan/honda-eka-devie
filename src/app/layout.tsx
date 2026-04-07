import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Devie Honda - E-Catalog Motor Honda Terbaru 2026",
  description: "Cek informasi harga, spesifikasi, promo & kredit motor Honda terbaru resmi dari PT Astra Honda Motor. Temukan motor Honda impian Anda dengan layanan terbaik.",
  keywords: "honda, motor honda, honda indonesia, harga motor honda, spesifikasi honda, promo honda, dealer honda",
  authors: [{ name: "Devie Honda" }],
  openGraph: {
    title: "Devie Honda - E-Catalog Motor Honda Terbaru 2026",
    description: "Cek informasi harga, spesifikasi, promo & kredit motor Honda terbaru resmi dari PT Astra Honda Motor.",
    type: "website",
    locale: "id_ID",
    siteName: "Devie Honda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devie Honda - E-Catalog Motor Honda Terbaru 2026",
    description: "Cek informasi harga, spesifikasi, promo & kredit motor Honda terbaru resmi dari PT Astra Honda Motor.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteContent = getSiteContent();

  return (
    <html lang="id" className={manrope.variable}>
      <head>
        <link rel="icon" href="https://www.astra-honda.com/assets/images/logo/honda.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="https://www.astra-honda.com/assets/images/logo/honda.svg" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>
        <Footer content={siteContent} />
      </body>
    </html>
  );
}