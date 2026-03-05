"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingGateModal } from "@/components/booking-gate-modal";
import type { PricingPackage } from "@/lib/fleet-data";

function LapStepper({
  value,
  onChange,
  min = 1,
  max = 100,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums text-foreground">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function PricingSection({
  packages,
  carId,
}: {
  packages: PricingPackage[];
  carId: number;
}) {
  const d = useTranslations("fleet.detail");
  const [laps, setLaps] = useState<Record<string, number>>({});

  const getLaps = (key: string) => laps[key] ?? 1;

  const getTotal = (pkg: PricingPackage, lapCount: number) =>
    pkg.firstLap + Math.max(0, lapCount - 1) * pkg.additionalLap;

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <h2 className="font-serif text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {d("pricing")}
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {packages.map((pkg) => {
          const lapCount = getLaps(pkg.nameKey);
          const total = getTotal(pkg, lapCount);

          return (
            <div
              key={pkg.nameKey}
              className={`rounded-xl border bg-card p-5 ${
                pkg.featured
                  ? "border-secondary shadow-lg"
                  : "border-muted-foreground/10"
              }`}
            >
              <h3 className="font-serif text-base font-bold text-foreground">
                {d(`packages.${pkg.nameKey}`)}
              </h3>
              <p className="mt-3 text-3xl font-bold text-foreground">
                € {pkg.firstLap},-
              </p>
              <p className="text-sm text-muted-foreground">{d("firstLap")}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {d(`packages.${pkg.descriptionKey}`)}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">
                  {d("additionalLap")}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  € {pkg.additionalLap},-
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {d("numberOfLaps")}
                </span>
                <LapStepper
                  value={lapCount}
                  onChange={(v) =>
                    setLaps((prev) => ({ ...prev, [pkg.nameKey]: v }))
                  }
                />
              </div>

              {lapCount > 1 && (
                <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {d("total")}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    € {total},-
                  </span>
                </div>
              )}

              <BookingGateModal
                bookingUrl={`/book?carId=${carId}&packageId=${pkg.filterRentalPackageId}&laps=${lapCount}`}
                trigger={
                  <Button
                    variant={pkg.featured ? "default" : "secondary"}
                    size="sm"
                    className="mt-4 w-full font-semibold uppercase cursor-pointer"
                  >
                    {d("bookNow")}: €{total},-
                  </Button>
                }
              />
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {d("depositNote")}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
