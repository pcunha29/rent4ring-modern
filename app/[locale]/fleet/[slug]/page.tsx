import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FLEET_SLUGS, FLEET_DATA, type FleetSlug } from "@/lib/fleet-data";

export function generateStaticParams() {
  return FLEET_SLUGS.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "fleet" });
  const vehicle = FLEET_DATA[slug as FleetSlug];
  if (!vehicle) return {};
  const brand = t(`cars.${slug}.brand`);
  const model = t(`cars.${slug}.model`);
  return {
    title: `${brand} ${model} — Rent4Ring`,
    description: t(`cars.${slug}.description`).slice(0, 160),
  };
}

export default async function FleetDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vehicle = FLEET_DATA[slug as FleetSlug];
  if (!vehicle) notFound();

  const t = await getTranslations({ locale, namespace: "fleet" });
  const d = await getTranslations({ locale, namespace: "fleet.detail" });

  const brand = t(`cars.${slug}.brand`);
  const model = t(`cars.${slug}.model`);
  const tagline = t(`cars.${slug}.tagline`);
  const description = t(`cars.${slug}.description`);

  const features = vehicle.featuresKeys.map((key) => t(`cars.${slug}.${key}`));

  const specs = [
    { label: d("specManufacturer"), value: brand },
    { label: d("specModel"), value: model },
    { label: d("specType"), value: vehicle.type },
    { label: d("specEngine"), value: vehicle.engine },
    { label: d("specTransmission"), value: vehicle.transmission },
    { label: d("specPower"), value: vehicle.specPower },
    { label: d("specWeight"), value: vehicle.weight },
  ];

  return (
    <div className="w-full pb-16 md:pb-24">
      {/* Hero image */}
      <section className="relative min-h-[320px] w-full overflow-hidden md:min-h-[420px]">
        <Image
          src={vehicle.imagePath}
          alt={`${brand} ${model}`}
          fill
          priority
          className="object-cover saturate-[0.50] blur-[2px]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"
          aria-hidden
        />
        <Container className="relative z-10 flex min-h-[320px] flex-col justify-end pb-10 md:min-h-[420px] md:pb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            {tagline}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {brand} {model}
          </h1>
        </Container>
      </section>

      <Container className="mt-10 md:mt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          {/* Left column — description, features, specs */}
          <div>
            {/* Description */}
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>

            {/* Features */}
            <section className="mt-8">
              <h2 className="font-serif text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {d("highlights")}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground md:text-base"
                  >
                    <span className="text-secondary">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Specifications table */}
            <section className="mt-10">
              <h2 className="font-serif text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {d("specifications")}
              </h2>
              <dl className="mt-4 divide-y divide-border rounded-xl border border-muted-foreground/10 bg-card">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between px-5 py-3.5"
                  >
                    <dt className="text-sm font-semibold text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="text-sm font-semibold text-foreground text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          {/* Right column — pricing packages */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-serif text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {d("pricing")}
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              {vehicle.packages.map((pkg) => (
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
                  <p className="text-sm text-muted-foreground">
                    {d("firstLap")}
                  </p>
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
                  <Button
                    variant={pkg.featured ? "default" : "secondary"}
                    size="sm"
                    className="mt-4 w-full font-semibold uppercase"
                    asChild
                  >
                    <Link href={`/book?carId=${vehicle.carId}`}>
                      {d("bookNow")}: €{pkg.firstLap},-
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
