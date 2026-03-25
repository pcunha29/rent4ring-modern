"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import type { Feature } from "./features-data";

export type { Feature };

export default function FeatureCard({ feature }: { feature: Feature }) {
  const t = useTranslations("whyRent4Ring");
  const gradient = feature.gradient;
  const hasImage = "image" in feature && feature.image;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform duration-200 h-full",
      )}
    >
      <div
        className={cn(
          "relative h-36 shrink-0 overflow-hidden sm:h-40",
          !hasImage && cn("bg-linear-to-br", gradient),
        )}
        aria-hidden
      >
        {hasImage && (
          <>
            <Image
              src={feature.image}
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 340px"
            />
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-br opacity-80",
                gradient,
              )}
              aria-hidden
            />
          </>
        )}
      </div>
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
