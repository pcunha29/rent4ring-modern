"use client";

let amplitudeModule: typeof import("@amplitude/unified") | null = null;

function getAmplitude() {
  if (amplitudeModule) return Promise.resolve(amplitudeModule);
  return import("@amplitude/unified").then((mod) => {
    amplitudeModule = mod;
    return mod;
  });
}

function track(event: string, properties?: Record<string, unknown>) {
  getAmplitude().then((amp) => amp.track(event, properties));
}

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

export function identifyUser(props: {
  locale: string;
  device_type: string;
  entry_page: string;
}) {
  getAmplitude().then((amp) => {
    const identify = new amp.Identify();
    identify.setOnce("locale", props.locale);
    identify.setOnce("device_type", props.device_type);
    identify.setOnce("entry_page", props.entry_page);
    amp.identify(identify);
  });
}
