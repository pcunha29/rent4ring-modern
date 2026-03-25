import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { PricingSection } from "./pricing-section";
import { TrackVehicleDetailView } from "./track-view";
import { JsonLd } from "@/components/seo/json-ld";
import { FLEET_SLUGS, FLEET_DATA, type FleetSlug } from "@/lib/fleet-data";
import { BASE_URL, localeAlternates } from "@/lib/seo";

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
  const description = t(`cars.${slug}.description`).slice(0, 160);
  return {
    title: `${brand} ${model}`,
    description,
    alternates: localeAlternates(locale, `fleet/${slug}`),
    openGraph: {
      title: `${brand} ${model} — Rent4Ring`,
      description,
      url: `${BASE_URL}/${locale}/fleet/${slug}`,
      images: [
        {
          url: vehicle.imagePath,
          width: 1200,
          height: 630,
          alt: `${brand} ${model} — Nürburgring Rental`,
        },
      ],
    },
  };
}

export default async function FleetDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const vehicle = FLEET_DATA[slug as FleetSlug];
  if (!vehicle) notFound();

  const t = await getTranslations({ locale, namespace: "fleet" });
  const d = await getTranslations({ locale, namespace: "fleet.detail" });
  const rc = await getTranslations({ locale, namespace: "bookingGate" });

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

  const lowestLap = Math.min(...vehicle.packages.map((p) => p.firstLap));
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brand} ${model} — Nürburgring Rental`,
    description,
    image: `${BASE_URL}${vehicle.imagePath}`,
    brand: { "@type": "Brand", name: brand },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/${locale}/fleet/${slug}`,
      priceCurrency: "EUR",
      price: lowestLap,
      priceValidUntil: new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Rent4Ring",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Fleet",
        item: `${BASE_URL}/${locale}#fleet`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${brand} ${model}`,
        item: `${BASE_URL}/${locale}/fleet/${slug}`,
      },
    ],
  };

  return (
    <div className="w-full pb-16 md:pb-24">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <TrackVehicleDetailView
        car_slug={slug}
        car_id={vehicle.carId}
        brand={brand}
        model={model}
        price_from={vehicle.priceFrom}
        has_basic_package={vehicle.packages.some((p) => p.nameKey === "basic")}
        has_insurance={vehicle.premiumInsurance !== null}
      />
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

            {/* Mobile pricing placement: description -> pricing -> highlights */}
            <div className="mt-8 lg:hidden">
              <PricingSection packages={vehicle.packages} carId={vehicle.carId} />
            </div>

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

            {/* Rental Conditions */}
            <section className="mt-10">
              <h2 className="font-serif text-xl font-bold tracking-tight text-foreground md:text-2xl">
                {rc("rentalConditions")}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <ul className="space-y-1.5">
                  <li>{rc("minAge")}</li>
                  <li>{rc("minExperience")}</li>
                  <li>{rc("skillLevel")}</li>
                  <li>{rc("heightLimit")}</li>
                </ul>

                {vehicle.basicLiability !== null && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-foreground">
                      {rc("damageExcess")}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-border p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {rc("basicLiability")}
                        </p>
                        <p className="mt-1 text-xl font-bold text-foreground">
                          €{vehicle.basicLiability.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          *{rc("basicLiabilityNote")}
                        </p>
                      </div>
                      {vehicle.reducedLiability !== null && (
                        <div className="rounded-lg border border-secondary/40 bg-secondary/5 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                            {rc("reducedLiability")}
                          </p>
                          <p className="mt-1 text-xl font-bold text-foreground">
                            €{vehicle.reducedLiability.toLocaleString()}
                          </p>
                          {vehicle.premiumInsurance !== null && (
                            <div className="mt-2 border-t border-border/50 pt-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                                {rc("premiumInsurance")}
                              </p>
                              <div className="mt-1 space-y-0.5">
                                <p className="text-xs text-muted-foreground">
                                  {rc("firstDriver")}: <span className="font-semibold text-foreground">€{vehicle.premiumInsurance.firstDriver},-</span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {rc("additionalDriver")}: <span className="font-semibold text-foreground">€{vehicle.premiumInsurance.additionalDriver},-</span>
                                </p>
                              </div>
                            </div>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground">
                            {rc("reducedLiabilityNote")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <p className="font-semibold text-foreground">
                    {rc("importantInfo")}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    <li>{rc("idRequired")}</li>
                    <li>{rc("licenceRequired")}</li>
                    <li>{rc("fullDayPolicy")}</li>
                    <li className="font-medium text-foreground">{rc("depositNote")}</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right column — pricing packages (desktop only) */}
          <div className="hidden lg:block">
            <PricingSection packages={vehicle.packages} carId={vehicle.carId} />
          </div>
        </div>
      </Container>
    </div>
  );
}
