"use client";

import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Rent4Ring+GmbH+%26+Co.+KG/@50.3431937,6.952336,985m/data=!3m1!1e3!4m6!3m5!1s0x47bfad2b4e0f4257:0xab66aeadfdeea77b!8m2!3d50.3430471!4d6.952068!16s%2Fg%2F1tjxdt2_?entry=ttu";

export function VisitGarage() {
  const t = useTranslations("visitGarage");

  return (
    <section
      className={cn(
        "relative flex min-h-[min(28rem,50vw)] w-full items-center justify-center overflow-hidden py-16 md:min-h-80 md:py-20",
      )}
      aria-labelledby="visit-us-heading"
    >
      <Image
        src="/r4r-welcome.jpg"
        alt=""
        fill
        className="object-cover opacity-40 saturate-[0.6] blur-[2px]"
        sizes="100vw"
        priority={false}
      />
      {/* Optional subtle overlay so the card stands out on dark map */}
      <div className="absolute inset-0 bg-foreground/20" aria-hidden />
      <Container className="relative z-10 flex justify-center">
        <div
          className={cn(
            "flex max-w-sm flex-col items-center rounded-lg bg-card px-8 py-8 text-center shadow-lg",
            "border border-border",
          )}
        >
          <MapPin className="mb-4 size-10 text-secondary" aria-hidden />
          <h2
            id="visit-us-heading"
            className="mb-2 text-sm font-bold uppercase tracking-wider text-card-foreground"
          >
            {t("title")}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">{t("address")}</p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold text-secondary",
              "underline decoration-secondary/60 underline-offset-4",
              "transition-colors hover:text-secondary/90 hover:decoration-secondary",
            )}
          >
            {t("getDirections")}
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </a>
        </div>
      </Container>
    </section>
  );
}
