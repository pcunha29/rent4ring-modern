"use client";

import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { RaceTicketEmbed } from "@/components/book/raceticket-embed";

function BookPageContent() {
  const t = useTranslations("book");
  const searchParams = useSearchParams();

  const parseIntParam = (key: string) => {
    const v = searchParams.get(key);
    return v ? parseInt(v, 10) : undefined;
  };

  const carId = parseIntParam("carId");
  const packageId = parseIntParam("packageId");
  const laps = parseIntParam("laps");

  return (
    <div className="w-full pb-16 md:pb-24">
      <section className="relative min-h-[250px] w-full overflow-hidden pt-24 md:pt-48">
        <Image
          src="/vehicles/r4r-gr-supra-book.jpg"
          alt=""
          fill
          className="object-cover saturate-[0.50] blur-xs"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, rgba(250,250,250,0.4) 12%, transparent 5%, transparent 10%, var(--background) 90%, var(--background) 100%)",
          }}
          aria-hidden
        />
        <Container className="relative z-10 flex min-h-[250px] flex-col justify-center py-16 md:pb-20 pt-0">
          <header className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </header>
        </Container>
      </section>

      <Container className="mt-0 pt-0">
        <div className="rounded-xl bg-card">
          <RaceTicketEmbed
            filterCarGroupId={carId}
            filterRentalPackageId={packageId}
            filterRentalQuantity={laps}
          />
        </div>
      </Container>
    </div>
  );
}

function BookPageFallback() {
  const t = useTranslations("book");
  return (
    <div className="w-full pb-16 md:pb-24 pt-24 md:pt-48">
      <Container>
        <div className="rounded-xl bg-card p-4 md:p-6 min-h-[480px] flex items-center justify-center">
          <p className="text-muted-foreground">{t("title")}</p>
        </div>
      </Container>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookPageFallback />}>
      <BookPageContent />
    </Suspense>
  );
}
