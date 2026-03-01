import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

// Inter — tipografía moderna, legible y profesional
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default:  SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "servicios industriales",
    "mantenimiento industrial",
    "Mar del Plata",
    "Kaizer Servicios",
    "instalaciones industriales",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type:        "website",
    locale:      "es_AR",
    siteName:    SITE_NAME,
    title:       SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index:  true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090E",
  width:      "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={inter.variable}>
      <body className="min-h-dvh flex flex-col antialiased bg-kaizer-dark text-kaizer-white">
        {/* Navbar fijo en el top */}
        <Navbar />

        {/* Offset del navbar fijo (h-16) */}
        <main className="flex-1 pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
