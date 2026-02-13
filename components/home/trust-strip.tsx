"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

const STAT_KEYS = ["stat1", "stat2", "stat3", "stat4"] as const;

export function TrustStrip() {
  const t = useTranslations("trustStrip");

  return (
    <section
      className="bg-muted py-12 md:py-16"
      aria-label={t("ariaLabel")}
    >
      <Container>
        <div className="grid grid-cols-2 gap-8 border-y border-border py-8 md:grid-cols-4 md:gap-12 md:py-10">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <span className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {t(`${key}.value`)}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t(`${key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
