"use client";

import * as amplitude from "@amplitude/unified";
import { useEffect, useRef } from "react";

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const isDev = process.env.NODE_ENV === "development";

if (typeof window !== "undefined" && apiKey && !isDev) {
  amplitude.initAll(apiKey, {
    serverZone: "EU",
    analytics: { autocapture: true },
    sessionReplay: { sampleRate: 1 },
  });
} else if (typeof window !== "undefined" && isDev) {
  console.log("[Amplitude] dev mode, amplitude not tracking atm");
}

// ---------------------------------------------------------------------------
// Internal helper — no-ops in dev, calls amplitude.track in production
// ---------------------------------------------------------------------------

function track(event: string, properties?: Record<string, unknown>) {
  if (isDev) {
    console.log(`[Amplitude] ${event}`, properties ?? "");
    return;
  }
  amplitude.track(event, properties);
}

// ---------------------------------------------------------------------------
// React component — mount in root layout to trigger identify once per session
// ---------------------------------------------------------------------------

function getDeviceType() {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function AmplitudeProvider() {
  const identified = useRef(false);

  useEffect(() => {
    if (identified.current || !apiKey || isDev) return;
    identified.current = true;

    const identify = new amplitude.Identify();
    identify.setOnce("locale", document.documentElement.lang || "en");
    identify.setOnce("device_type", getDeviceType());
    identify.setOnce("entry_page", window.location.pathname);
    amplitude.identify(identify);
  }, []);

  return null;
}

// ---------------------------------------------------------------------------
// Typed event helpers
// ---------------------------------------------------------------------------

export function trackCookieConsentResponded(response: "allowed" | "declined") {
  track("cookie_consent_responded", { response });
}

export function trackFleetCardClicked(props: {
  car_slug: string;
  car_id: number;
  brand: string;
  model: string;
  price_from: number;
  card_index: number;
}) {
  track("fleet_card_clicked", props);
}

export function trackVehicleDetailViewed(props: {
  car_slug: string;
  car_id: number;
  brand: string;
  model: string;
  price_from: number;
  has_basic_package: boolean;
  has_insurance: boolean;
}) {
  track("vehicle_detail_viewed", props);
}

export function trackLapCountChanged(props: {
  car_id: number;
  package_name: string;
  lap_count: number;
  total_price: number;
}) {
  track("lap_count_changed", props);
}

export function trackBookingGateOpened(props: {
  source: string;
  booking_url: string;
  car_id?: number;
  package_id?: number;
  laps?: number;
}) {
  track("booking_gate_opened", props);
}

export function trackBookingGateCompleted(props: {
  booking_url: string;
  car_id?: number;
  package_id?: number;
  laps?: number;
}) {
  track("booking_gate_completed", props);
}

export function trackBookingPageLoaded(props: {
  car_id?: number;
  package_id?: number;
  laps?: number;
  has_filters: boolean;
}) {
  track("booking_page_loaded", props);
}

export function trackLanguageSwitched(props: {
  from_locale: string;
  to_locale: string;
}) {
  track("language_switched", props);
}

export function trackFaqItemExpanded(props: {
  question_index: number;
  question_key: string;
}) {
  track("faq_item_expanded", props);
}

export function trackGetDirectionsClicked() {
  track("get_directions_clicked");
}
