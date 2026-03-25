import type { Metadata } from "next";
import { Inter, Nunito, Roboto_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics";
import { AmplitudeProvider } from "@/lib/amplitude";

import "./globals.css";
const amplitude = import("@amplitude/unified");

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-serif",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rent4ring.de"),
  title: {
    template: "%s | Rent4Ring",
    default:
      "Rent4Ring - Premium Nürburgring Rental Cars for the Nordschleife",
  },
  description:
    "Rent track-prepared cars at the Nürburgring Nordschleife. MINI Cooper S, GR Yaris, GR Supra, Porsche GT3 RS, Ferrari 296 GTB and more. Touristenfahrten & track days since 2009.",
  keywords: [
    "Rent4Ring",
    "Nürburgring",
    "Nürburgring rental cars",
    "Nordschleife",
    "Nordschleife car rental",
    "Nürburgring Nordschleife",
    "rent a car Nürburgring",
    "Green Hell rental",
    "Nürburgring experience",
    "track car rental Germany",
    "Touristenfahrten",
    "Touristenfahrt Nürburgring",
    "Track Days Nürburgring",
    "Track Days Germany",
    "Porsche GT3 RS rental Nürburgring",
    "Ferrari rental Nürburgring",
    "Nürburgring lap rental",
    "sports car rental Nordschleife",
  ],
  openGraph: {
    type: "website",
    siteName: "Rent4Ring",
    title: "Rent4Ring -  Premium Nürburgring Rental Cars",
    description:
      "Rent track-prepared cars at the Nürburgring Nordschleife. Touristenfahrten & track days since 2009.",
    images: [
      {
        url: "/r4r-welcome.jpg",
        width: 1200,
        height: 630,
        alt: "Rent4Ring - Premium Nürburgring Rental Cars",
      },
    ],
    locale: "en",
    alternateLocale: "de",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://rent4ring.de",
    languages: {
      en: "https://rent4ring.de/en",
      de: "https://rent4ring.de/de",
      "x-default": "https://rent4ring.de/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  amplitude.then((amplitude) => amplitude.track("Sign Up"));
  return (
    <html lang="en">
      <AnalyticsProvider />
      <AmplitudeProvider />
      <body
        className={`${inter.variable} ${nunito.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
