"use client";

import { useEffect, useId, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import Script from "next/script";

const WIDGET_CSS = "https://raceticket.de/widget/raceticket-widget.css";
const WIDGET_JS = "https://raceticket.de/widget/raceticket-widget.js";
const HOST_SLUG = "rent4ring";

const INIT_DELAY_MS = 1000;

type WidgetInitOpts = {
  container: string;
  hostSlug: string;
  locale?: "en" | "de";
  filterCarGroupId?: number;
  filterCarMode?: string;
  filterRentalQuantity?: number;
  filterRentalPackageId?: number;
};

function getWidget() {
  if (typeof window === "undefined") return undefined;
  return (
    window as unknown as {
      RaceTicketWidget?: {
        init: (opts: WidgetInitOpts) => void;
        destroy?: () => void;
      };
    }
  ).RaceTicketWidget;
}

function cleanupWidgetDOM() {
  if (typeof document === "undefined") return;
  const bodyChildren = Array.from(document.body.children);
  bodyChildren.forEach((el) => {
    const className = el.getAttribute("class") ?? "";
    const id = el.getAttribute("id") ?? "";
    const isRaceTicket =
      className.includes("rt-") ||
      id.startsWith("raceticket-") ||
      id.includes("raceticket");
    if (isRaceTicket) el.remove();
  });
  const barLike = document.querySelectorAll(
    '[class*="rt-subtotal"], [class*="rt-summary"], [class*="rt-bar"], [class*="rt-sticky"]',
  );
  barLike.forEach((el) => {
    let top: Element = el;
    while (top.parentElement && top.parentElement !== document.body)
      top = top.parentElement;
    if (top.parentElement === document.body) top.remove();
  });
}

export function RaceTicketEmbed({
  filterCarGroupId,
  filterRentalPackageId,
  filterRentalQuantity,
}: {
  filterCarGroupId?: number;
  filterRentalPackageId?: number;
  filterRentalQuantity?: number;
}) {
  const locale = useLocale() as "en" | "de";
  const id = useId().replace(/:/g, "");
  const containerId = `raceticket-widget-${id}`;
  const initTimerRef = useRef<ReturnType<typeof setTimeout>>(0 as never);

  const hasFilters =
    filterCarGroupId != null ||
    filterRentalPackageId != null ||
    filterRentalQuantity != null;

  const buildOpts = useCallback(
    (): WidgetInitOpts => ({
      container: `#${containerId}`,
      hostSlug: HOST_SLUG,
      locale,
      ...(filterCarGroupId != null && { filterCarGroupId }),
      ...(filterRentalPackageId != null && { filterRentalPackageId }),
      ...(filterRentalQuantity != null && { filterRentalQuantity }),
    }),
    [
      containerId,
      locale,
      filterCarGroupId,
      filterRentalPackageId,
      filterRentalQuantity,
    ],
  );

  useEffect(() => {
    const linkId = "raceticket-widget-css";
    if (document.getElementById(linkId)) return;
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    document.head.appendChild(link);
    return () => {
      document.getElementById(linkId)?.remove();
    };
  }, []);

  const scheduleInit = useCallback(() => {
    clearTimeout(initTimerRef.current);
    const delay = hasFilters ? INIT_DELAY_MS : 0;
    initTimerRef.current = setTimeout(() => {
      const widget = getWidget();
      const el = document.getElementById(containerId);
      if (!widget || !el) return;
      widget.init(buildOpts());
    }, delay);
  }, [hasFilters, containerId, buildOpts]);

  useEffect(() => {
    const widget = getWidget();
    if (!widget) return;
    scheduleInit();
    return () => {
      clearTimeout(initTimerRef.current);
      const w = getWidget();
      if (w && typeof w.destroy === "function") w.destroy();
      cleanupWidgetDOM();
    };
  }, [scheduleInit]);

  useEffect(() => {
    return () => {
      cleanupWidgetDOM();
    };
  }, []);

  return (
    <>
      <Script
        src={WIDGET_JS}
        strategy="afterInteractive"
        onLoad={scheduleInit}
      />
      <div
        id={containerId}
        className="min-h-[480px] w-full"
        data-raceticket-container
      />
    </>
  );
}
