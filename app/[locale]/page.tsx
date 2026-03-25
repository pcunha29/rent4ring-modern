import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { FleetSlider } from "@/components/fleet/fleet-slider";
import { TrustStrip } from "@/components/home/trust-strip";
import { VisitGarage } from "@/components/visit-garage";
import BentoGrid from "@/components/why-rent4ring/bento-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { BASE_URL, localeAlternates } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, ""),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/${locale}`,
      images: [{ url: "/r4r-welcome.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Rent4Ring",
    description:
      "Premium Nürburgring Nordschleife rental cars. Track-prepared vehicles for Touristenfahrten and track days since 2009.",
    url: BASE_URL,
    telephone: "+49 2691 935735",
    email: "info@rent4ring.de",
    image: `${BASE_URL}/r4r-welcome.jpg`,
    priceRange: "€€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Burgstraße 1",
      addressLocality: "Nürburg",
      postalCode: "53520",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.3316,
      longitude: 6.9432,
    },
    sameAs: [
      "https://www.facebook.com/rent4ring",
      "https://x.com/rent4ring",
      "https://www.instagram.com/rent4ringofficial",
    ],
    foundingDate: "2009",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 50.3316, longitude: 6.9432 },
      geoRadius: "50000",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Rent4Ring GmbH und Co. KG",
    legalName: "Rent4Ring GmbH und Co. KG",
    url: BASE_URL,
    logo: `${BASE_URL}/logo_home.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+49-2691-935735",
      contactType: "customer service",
      availableLanguage: ["English", "German"],
    },
    sameAs: [
      "https://www.facebook.com/rent4ring",
      "https://x.com/rent4ring",
      "https://www.instagram.com/rent4ringofficial",
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <FleetSlider />
      <TrustStrip />
      <BentoGrid />
      <VisitGarage />
    </>
  );
}
