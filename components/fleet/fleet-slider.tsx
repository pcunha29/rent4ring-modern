"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FLEET_SLUGS = [
  "mini-cooper-s",
  "toyota-gr-yaris",
  "toyota-gr-supra",
  "porsche-taycan-turbo-gt",
  "porsche-spyder-rs",
  "porsche-911-gt3-rs-992",
  "ferrari-296-gtb",
] as const;

const FLEET_DATA: Record<
  (typeof FLEET_SLUGS)[number],
  {
    priceFrom: number;
    vehicleCount: number;
    spec0_100: string;
    specPower: string;
    specTopSpeed: string;
    imagePath: string;
    carId: number;
  }
> = {
  "mini-cooper-s": {
    priceFrom: 179,
    vehicleCount: 8,
    spec0_100: "6.2s",
    specPower: "192 HP",
    specTopSpeed: "242 km/h",
    imagePath: "/vehicles/r4r-MINI-COOPER-S-rental-10.jpg",
    carId: 44,
  },
  "toyota-gr-yaris": {
    priceFrom: 219,
    vehicleCount: 8,
    spec0_100: "5.5s",
    specPower: "261 HP",
    specTopSpeed: "230 km/h",
    imagePath: "/vehicles/r4r-yaris-97.jpeg",
    carId: 44,
  },
  "toyota-gr-supra": {
    priceFrom: 249,
    vehicleCount: 6,
    spec0_100: "4.3s",
    specPower: "387 HP",
    specTopSpeed: "250 km/h",
    imagePath: "/vehicles/r4r-gr-supra-rental-11.jpg",
    carId: 44,
  },
  "porsche-taycan-turbo-gt": {
    priceFrom: 299,
    vehicleCount: 1,
    spec0_100: "2.6s",
    specPower: "1,093 HP",
    specTopSpeed: "305 km/h",
    imagePath: "/vehicles/r4r-2.jpg",
    carId: 44,
  },
  "porsche-spyder-rs": {
    priceFrom: 399,
    vehicleCount: 1,
    spec0_100: "3.2s",
    specPower: "525 HP",
    specTopSpeed: "296 km/h",
    imagePath: "/vehicles/r4r-2.jpg",
    carId: 44,
  },
  "porsche-911-gt3-rs-992": {
    priceFrom: 699,
    vehicleCount: 1,
    spec0_100: "3.2s",
    specPower: "525 HP",
    specTopSpeed: "296 km/h",
    imagePath: "/vehicles/r4r-2.jpg",
    carId: 44,
  },
  "ferrari-296-gtb": {
    priceFrom: 699,
    vehicleCount: 1,
    spec0_100: "2.9s",
    specPower: "830 HP",
    specTopSpeed: "330 km/h",
    imagePath: "/vehicles/r4r-2.jpg",
    carId: 44,
  },
};

export function FleetSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("fleet");

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
              className="size-10 rounded-full text-foreground hover:bg-primary/10 hover:text-primary"
              aria-label={t("prevLabel")}
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 rounded-full text-foreground hover:bg-primary/10 hover:text-primary"
              aria-label={t("nextLabel")}
              onClick={() => scroll("right")}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </header>

        <div
          ref={scrollRef}
          className={cn(
            "flex gap-8 overflow-x-auto overflow-y-hidden pb-4",
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
                  "group flex w-[min(100%,300px)] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-card shadow-lg transition-transform duration-200",
                  "sm:w-[320px] md:w-[340px]",
                  "hover:shadow-xl hover:-translate-y-0.5",
                )}
              >
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
                    <span className="shrink-0 text-right">
                      <span className="font-semibold text-secondary">
                        €{data.priceFrom}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        /lap
                      </span>
                    </span>
                  </div>
                  <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-border pt-5">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        0-100
                      </dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        {data.spec0_100}
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
                        {t("specTopSpeed")}
                      </dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        {data.specTopSpeed}
                      </dd>
                    </div>
                  </dl>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-5 w-full border-border font-semibold uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    asChild
                  >
                    <Link href={`/book?carId=${data.carId}`}>
                      {t("bookNow")}
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
