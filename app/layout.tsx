import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vexloft | Yazilim ile Geleceği Sekillendiriyoruz",
  description:
    "Mobil uygulama, web platformu, CRM, E-Ticaret, QR Menu ve dijital altyapı çözümleri. Antalya merkezli yazılım ajansı.",
  keywords: [
    "Mobil Uygulama Geliştirme",
    "Web Tasarım",
    "E-Ticaret",
    "QR Menu",
    "CRM",
    "Admin Panel",
    "Dashboard",
    "API Geliştirme",
    "Antalya Yazılım",
    "Dijital Çözümler",
    "Vexloft",
  ],
  openGraph: {
    title: "Vexloft | Yazılım ile Geleceği Sekillendiriyoruz",
    description:
      "Mobil uygulama, web platformu, CRM, E-Ticaret, QR Menu ve dijital altyapı çözümleri.",
    url: "https://vexloft.com",
    siteName: "Vexloft",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vexloft | Yazılım ile Geleceği Sekillendiriyoruz",
    description:
      "Mobil uygulama, web platformu, CRM, E-Ticaret, QR Menu ve dijital altyapı çözümleri.",
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
  return (
    <html
      lang="tr"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060a14] text-white">
        {children}
      </body>
    </html>
  );
}
