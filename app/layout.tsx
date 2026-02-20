import type { Metadata } from "next";
import { Inter, Nunito, Roboto_Mono } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics";
import "./globals.css";

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
  title: "Rent4Ring",
  description:
    "Welcome to Rent4Ring - Premium Nürburgring Rental Cars for an Unforgettable Experience",
  keywords: [
    "Rent4Ring",
    "Nürburgring",
    "Rental Cars",
    "Nordschleife",
    "Nürburgring Nordschleife",
    "Touristenfahrten",
    "Touristenfahrt",
    "Touristenfahrt Nürburgring",
    "Track Days",
    "Track Days Nürburgring",
    "Track Days Germany",
    "Track Days Europe",
  ],
  openGraph: {
    title: "Rent4Ring",
    description:
      "Welcome to Rent4Ring - Premium Nürburgring Rental Cars for an Unforgettable Experience",
    images: ["/r4r-welcome.jpg"],
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
    <html lang="en">
      <AnalyticsProvider />
      <body
        className={`${inter.variable} ${nunito.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
