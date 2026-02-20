"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

const STAT_KEYS = ["stat1", "stat2", "stat3", "stat4"] as const;

export function TrustStrip() {
  const t = useTranslations("trustStrip");

  return (
    <section
      className="relative min-h-[200px] overflow-hidden py-14 md:min-h-[250px] md:py-20"
      aria-label={t("ariaLabel")}
    >
      <div className="absolute inset-0">
        <Image
          src="/r4r-welcome2.jpg"
          alt=""
          fill
          className="object-cover opacity-40 saturate-[0.2] blur-[3px]"
          sizes="100vw"
          priority={false}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-linear-to-b from-background/25 via-background/75 to-muted"
          aria-hidden
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-8 border-y border-border/80 py-10 md:grid-cols-4 md:gap-14 md:py-14">
          {STAT_KEYS.map((key) => (
            <div
              key={key}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <span className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t(`${key}.value`)}
              </span>
              <span className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {t(`${key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
