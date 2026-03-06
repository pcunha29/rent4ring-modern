"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FLEET_SLUGS, FLEET_DATA } from "@/lib/fleet-data";

const DRIVE_LABEL: Record<string, string> = {
  FF: "FWD",
  FR: "RWD",
  MR: "RWD",
  RR: "RWD",
  AWD: "AWD",
};

export function FleetSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("fleet");
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: true,
  });

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const threshold = 8;
    setScrollState({
      canScrollLeft: scrollLeft > threshold,
      canScrollRight: scrollLeft < el.scrollWidth - el.clientWidth - threshold,
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth =
      scrollRef.current.querySelector("article")?.clientWidth ?? 340;
    const gap = 32;
    const amount = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section
      id="fleet"
      className="bg-muted py-16 md:py-20 lg:py-24"
      aria-labelledby="fleet-heading"
    >
      <Container>
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:mb-12">
          <div className="space-y-2">
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary"
              aria-hidden
            >
              {t("eyebrow")}
            </p>
            <h2
              id="fleet-heading"
              className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </div>
          <div className="flex shrink-0 gap-1.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "size-10 rounded-full text-foreground hover:bg-primary/10 hover:text-primary transition-colors",
                !scrollState.canScrollLeft &&
                  "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-foreground",
              )}
              aria-label={t("prevLabel")}
              aria-disabled={!scrollState.canScrollLeft}
              disabled={!scrollState.canScrollLeft}
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "size-10 rounded-full text-foreground hover:bg-primary/10 hover:text-primary transition-colors",
                !scrollState.canScrollRight &&
                  "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-foreground",
              )}
              aria-label={t("nextLabel")}
              aria-disabled={!scrollState.canScrollRight}
              disabled={!scrollState.canScrollRight}
              onClick={() => scroll("right")}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </header>

        <div className="relative">
          <div
            ref={scrollRef}
            className={cn(
              "flex gap-8 overflow-x-auto overflow-y-hidden pb-4 ",
              "scroll-smooth snap-x snap-mandatory",
              "[scrollbar-width:none] [-webkit-overflow-scrolling:touch]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {FLEET_SLUGS.map((slug) => {
              const data = FLEET_DATA[slug];
              const brand = t(`cars.${slug}.brand`);
              const model = t(`cars.${slug}.model`);
              const tagline = t(`cars.${slug}.tagline`);

              return (
                <article
                  key={slug}
                  className={cn(
                    "group relative flex w-[min(100%,300px)] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-muted-foreground/10 bg-card shadow-lg transition-transform duration-200",
                    "sm:w-[320px] md:w-[340px]",
                    "hover:shadow-xl hover:-translate-y-0.5",
                  )}
                >
                  <Link
                    href={`/fleet/${slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={`${brand} ${model} — ${t("viewMore")}`}
                  />
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <Image
                      src={data.imagePath}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 300px, 340px"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-sm font-semibold tracking-tight text-foreground sm:text-base">
                          {brand}
                        </p>
                        <h3 className="mt-0.5 font-serif text-lg font-bold tracking-tight text-foreground sm:text-xl">
                          {model}
                        </h3>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {tagline}
                        </p>
                      </div>
                      {/* <span className="shrink-0 text-right">
                        <span className="font-semibold text-secondary">
                          €{data.priceFrom}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          /lap
                        </span>
                      </span> */}
                    </div>
                    <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-border pt-5">
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {t("specDrive")}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-foreground">
                          {DRIVE_LABEL[data.type] ?? data.type}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {t("specPower")}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-foreground">
                          {data.specPower}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {t("specWeight")}
                        </dt>
                        <dd className="mt-0.5 font-semibold text-foreground">
                          {data.weight}
                        </dd>
                      </div>
                    </dl>
                    <span className="mt-5 inline-flex w-full items-center justify-center text-sm font-semibold uppercase text-muted-foreground underline underline-offset-4 transition-colors group-hover:text-foreground">
                      {t("viewMore")}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
