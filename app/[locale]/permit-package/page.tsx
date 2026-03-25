import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BASE_URL, localeAlternates } from "@/lib/seo";
const CONTACT_EMAIL = "info@rent4ring.de";
const PACKAGE_PRICES = [
  { key: "mini", price: "1199€", imagePath: "/vehicles/r4r-mini-cooper.jpg" },
  { key: "yaris", price: "1799€", imagePath: "/vehicles/r4r-yaris.jpg" },
  { key: "supra", price: "2199€", imagePath: "/vehicles/r4r-supra.jpg" },
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.permitPackage" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "permit-package"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}/permit-package`,
    },
  };
}

export default async function PermitPackagePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("permitPackage");

  return (
    <div className="w-full pb-14 md:pb-20">
      <section className="relative min-h-[340px] w-full overflow-hidden pt-24 md:min-h-[420px] md:pt-32">
        <Image
          src="/vehicles/r4r-supra.jpg"
          alt={t("title")}
          fill
          priority
          sizes="100vw"
          className="object-cover saturate-[0.6] blur-[2px]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 45%, rgba(250,250,250,1) 100%)",
          }}
          aria-hidden
        />
        <Container className="relative z-10 flex min-h-[340px] flex-col justify-center md:min-h-[420px]">
          <h1 className="mt-3 max-w-2xl font-serif text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/85 md:text-lg">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      <Container className="-mt-10 max-w-5xl md:-mt-16">
        <section className="relative z-10 rounded-2xl border border-border/60 bg-card/95 p-5 shadow-xl backdrop-blur-sm md:p-8">
          <p className="text-sm text-muted-foreground md:text-base">
            {t("description1")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {t("description2")}
          </p>

          <div className="my-6 h-px w-full bg-border/70" />

          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
            {t("pricingTitle")}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {PACKAGE_PRICES.map((pkg) => (
              <article
                key={pkg.key}
                className="group overflow-hidden rounded-xl border border-border/70 bg-linear-to-b from-card to-muted/20 shadow-md transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={pkg.imagePath}
                    alt={t(pkg.key)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium text-foreground md:text-base">
                    {t(pkg.key)}
                  </span>
                  <span className="text-base font-semibold text-foreground md:text-lg">
                    {pkg.price}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 flex justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="min-w-56 font-semibold uppercase shadow-lg"
            >
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Permit%20Package%20Inquiry`}
              >
                {t("emailButton")}
              </a>
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
