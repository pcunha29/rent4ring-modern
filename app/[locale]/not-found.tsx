"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function NotFoundContent() {
  const t = useTranslations("notFound");

  return (
    <section
      className={cn(
        "relative min-h-[70vh] w-full flex flex-col items-center justify-center",
        "bg-muted/50",
      )}
      aria-labelledby="not-found-title"
    >
      <Container className="relative z-10 flex flex-col items-center justify-center py-24 text-center">
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.2em] text-secondary",
            "mb-3",
          )}
        >
          {t("eyebrow")}
        </p>
        <p
          className="font-mono text-6xl font-bold tabular-nums text-muted-foreground/60 md:text-8xl"
          aria-hidden
        >
          {t("code")}
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
        <h1
          id="not-found-title"
          className={cn(
            "font-serif text-3xl font-bold leading-tight tracking-tight text-foreground",
            "sm:text-4xl md:text-5xl",
            "mt-4 mb-6 max-w-2xl",
          )}
        >
          {t("title")}
        </h1>
        <p
          className={cn(
            "max-w-md text-base leading-relaxed text-muted-foreground",
            "mb-10 md:text-lg",
          )}
        >
          {t("description")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <Link href="/">{t("backHome")}</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/book">{t("bookExperience")}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
