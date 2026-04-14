"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFaqItemExpanded } from "@/lib/amplitude";

const FAQ_ITEM_COUNT = 10;

export function FaqAccordion() {
  const t = useTranslations("faq");
  const [openInsuranceFromHash, setOpenInsuranceFromHash] = useState(false);

  useEffect(() => {
    setOpenInsuranceFromHash(
      typeof window !== "undefined" &&
        window.location.hash === "#insurance-faq",
    );
  }, []);

  return (
    <Accordion
      key={openInsuranceFromHash ? "insurance-faq-open" : "insurance-faq-default"}
      type="single"
      collapsible
      defaultValue={openInsuranceFromHash ? "item-3" : undefined}
      className="w-full"
      onValueChange={(value) => {
        if (!value) return;
        const idx = parseInt(value.replace("item-", ""), 10);
        trackFaqItemExpanded({
          question_index: idx,
          question_key: `item${idx}`,
        });
      }}
    >
      {Array.from({ length: FAQ_ITEM_COUNT }, (_, i) => i + 1).map((num) => (
        <AccordionItem
          key={num}
          value={`item-${num}`}
          id={num === 3 ? "insurance-faq" : undefined}
          className={num === 3 ? "scroll-mt-28" : undefined}
        >
          <AccordionTrigger className="text-left">
            {t(`item${num}.question`)}
          </AccordionTrigger>
          <AccordionContent>
            <p className="whitespace-pre-line text-muted-foreground">
              {t(`item${num}.answer`)}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
