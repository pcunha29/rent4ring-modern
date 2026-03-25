import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.book" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
    alternates: localeAlternates(locale, "book"),
  };
}

export default function BookLayout({ children }: Props) {
  return children;
}
