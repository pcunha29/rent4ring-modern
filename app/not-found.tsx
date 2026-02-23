"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routing } from "@/i18n/routing";
import en from "@/messages/en.json";
import de from "@/messages/de.json";

const messages = { en: en.notFound, de: de.notFound } as const;

export default function RootNotFound() {
  const pathname = usePathname() ?? "";
  const locale = routing.locales.includes(pathname.split("/")[1] as "en" | "de")
    ? (pathname.split("/")[1] as "en" | "de")
    : routing.defaultLocale;
  const base = locale === routing.defaultLocale ? "" : `/${locale}`;
  const t = messages[locale];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-muted/50">
      <Container className="relative z-10 flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
          {t.eyebrow}
        </p>
        <p
          className="font-mono text-6xl font-bold tabular-nums text-muted-foreground/60 md:text-8xl"
          aria-hidden
        >
          {t.code}
        </p>
        <div className="my-6 flex justify-center">
          <iframe
            src="https://giphy.com/embed/2E1yf7GARXlzW"
            width="280"
            height="160"
            className="rounded-lg border-0"
            allowFullScreen
            title="Nürburgring track"
          />
        </div>
        <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl mt-4 mb-6 max-w-2xl">
          {t.title}
        </h1>
        <p className="max-w-md text-base leading-relaxed text-muted-foreground mb-10 md:text-lg">
          {t.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <Link href={`${base}/`}>{t.backHome}</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href={`${base}/book`}>{t.bookExperience}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
