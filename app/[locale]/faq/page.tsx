import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { BASE_URL, localeAlternates } from "@/lib/seo";
import { FaqAccordion } from "./faq-accordion";

const FAQ_ITEM_COUNT = 10;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.faq" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "faq"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/faq`,
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });

  const faqItems = Array.from({ length: FAQ_ITEM_COUNT }, (_, i) => ({
    question: t(`item${i + 1}.question`),
    answer: t(`item${i + 1}.answer`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="w-full mt-24 py-12 md:py-16 lg:py-20">
      <JsonLd data={faqJsonLd} />
      <Container className="max-w-3xl">
        <h1 className="mb-8 font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("title")}
        </h1>
        <FaqAccordion />
      </Container>
    </div>
  );
}
