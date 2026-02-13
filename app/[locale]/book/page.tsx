"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { RaceTicketEmbed } from "@/components/book/raceticket-embed";

export default function BookPage() {
  const t = useTranslations("book");

  return (
    <div className="w-full pt-24 pb-16 md:pt-28 md:pb-24">
      <Container className="max-w-4xl">
        <header className="mb-10 text-center md:mb-14">
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
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-6">
          <RaceTicketEmbed />
        </div>
      </Container>
    </div>
  );
}
