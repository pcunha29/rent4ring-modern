"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFaqItemExpanded } from "@/lib/amplitude";

const FAQ_ITEM_COUNT = 10;

export default function FAQPage() {
  const t = useTranslations("faq");

  return (
    <div className="w-full mt-24 py-12 md:py-16 lg:py-20">
      <Container className="max-w-3xl">
        <h1 className="mb-8 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("title")}
        </h1>
        <Accordion
          type="single"
          collapsible
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
          {Array.from({ length: FAQ_ITEM_COUNT }, (_, i) => i + 1).map(
            (num) => (
              <AccordionItem key={num} value={`item-${num}`}>
                <AccordionTrigger className="text-left">
                  {t(`item${num}.question`)}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="whitespace-pre-line text-muted-foreground">
                    {t(`item${num}.answer`)}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ),
          )}
        </Accordion>
      </Container>
    </div>
  );
}
