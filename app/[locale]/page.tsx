"use client";

import { Hero } from "@/components/hero";
import { FleetSlider } from "@/components/fleet/fleet-slider";
import { TrustStrip } from "@/components/home/trust-strip";
import { VisitGarage } from "@/components/visit-garage";
import BentoGrid from "@/components/why-rent4ring/bento-grid";

export default function Home() {
  return (
    <>
      <Hero />
      <FleetSlider />
      <TrustStrip />
      <BentoGrid />
      <VisitGarage />
    </>
  );
}
