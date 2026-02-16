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
  description: "Hello World",
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
