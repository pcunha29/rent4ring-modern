"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[65vh] md:min-h-[85vh] w-full overflow-hidden">
      <Image
        src="/vehicles/gt3rs-3.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Overlay: darker on left for text readability */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-b from-background/95 via-background/60 to-transparent",
          "md:from-background/90 md:via-background/50",
        )}
      />
      <Container
        className={cn(
          "relative z-10 flex mt-8 md:mt-0 min-h-[65vh] flex-col items-center justify-center text-center md:min-h-[85vh] md:items-end md:text-right py-20",
        )}
      >
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.2em] text-secondary",
            "mb-4 sm:mb-5",
          )}
        >
          {t("est")}
        </p>
        <h1
          className={cn(
            "font-serif text-4xl font-bold leading-tight tracking-tight text-primary",
            "sm:text-5xl md:text-5xl lg:text-6xl",
            "mb-6 md:mb-8",
          )}
        >
          <span className="block">{t("headlineLine1")}</span>
          <span className="block">{t("headlineLine2")}</span>
        </h1>
        <p
          className={cn(
            "max-w-xl text-base font-medium leading-relaxed text-black",
            "mb-8 md:mb-10 md:text-lg",
          )}
        >
          {t("description")}
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-4">
          <Button variant="default" size="lg" asChild>
            <Link href="/book">{t("bookExperience")}</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/#fleet">{t("exploreFleet")}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
