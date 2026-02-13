"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FEATURES = [
  { id: "brakes", gradient: "from-amber-950/90 to-primary" },
  { id: "suspension", gradient: "from-sky-950/80 to-primary" },
  { id: "tires", gradient: "from-stone-800 to-primary" },
  { id: "safety", gradient: "from-stone-900 to-primary" },
] as const;

export type Feature = (typeof FEATURES)[number];

export function getFeatures(): readonly Feature[] {
  return FEATURES;
}

export default function FeatureCard({ feature }: { feature: Feature }) {
  const t = useTranslations("whyRent4Ring");

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform duration-200",
      )}
    >
      <div
        className={cn(
          "relative h-36 shrink-0 bg-linear-to-br sm:h-40",
          feature.gradient,
        )}
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
          {t(`features.${feature.id}.label`)}
        </span>
        <h3 className="mt-1.5 font-serif text-lg font-bold tracking-tight sm:text-xl">
          {t(`features.${feature.id}.title`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/90">
          {t(`features.${feature.id}.description`)}
        </p>
      </div>
    </article>
  );
}
