"use client";

import { useEffect } from "react";
import { trackVehicleDetailViewed } from "@/lib/amplitude";

export function TrackVehicleDetailView(props: {
  car_slug: string;
  car_id: number;
  brand: string;
  model: string;
  price_from: number;
  has_basic_package: boolean;
  has_insurance: boolean;
}) {
  useEffect(() => {
    trackVehicleDetailViewed(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.car_slug]);

  return null;
}
