"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BookingGateModal } from "@/components/booking-gate-modal";
import type { PricingPackage } from "@/lib/fleet-data";

export function PricingSection({
  packages,
  carId,
}: {
  packages: PricingPackage[];
  carId: number;
}) {
  const d = useTranslations("fleet.detail");

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <h2 className="font-serif text-xl font-bold tracking-tight text-foreground md:text-2xl">
        {d("pricing")}
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {packages.map((pkg) => (
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
            <BookingGateModal
              bookingUrl={`/book?carId=${carId}`}
              trigger={
                <Button
                  variant={pkg.featured ? "default" : "secondary"}
                  size="sm"
                  className="mt-4 w-full font-semibold uppercase cursor-pointer"
                >
                  {d("bookNow")}: €{pkg.firstLap},-
                </Button>
              }
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
