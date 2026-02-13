"use client";

import { useTranslations } from "next-intl";

const WhyRent4RingCell = () => {
  const t = useTranslations("whyRent4Ring");

  return (
    <div
      className="flex min-h-75 flex-col justify-center overflow-hidden p-6"
      aria-labelledby="why-rent4ring-heading"
    >
      <div className="space-y-4">
        <h2
          id="why-rent4ring-heading"
          className="font-serif text-2xl font-semibold text-foreground"
        >
          {t("heading")}
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("intro1")}
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("intro2")}
        </p>
        <div className="h-1 w-16 rounded-full bg-secondary" aria-hidden />
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("closing")}
        </p>
      </div>
    </div>
  );
};

export default WhyRent4RingCell;
