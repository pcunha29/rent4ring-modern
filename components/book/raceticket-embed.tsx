"use client";

import { useEffect, useId } from "react";
import { useLocale } from "next-intl";
import Script from "next/script";

const WIDGET_CSS = "https://raceticket.de/widget/raceticket-widget.css";
const WIDGET_JS = "https://raceticket.de/widget/raceticket-widget.js";
const HOST_SLUG = "rent4ring";

type WidgetInitOpts = {
  container: string;
  hostSlug: string;
  locale?: "en" | "de";
  filterCarGroupId?: number;
  filterCarMode?: string;
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

/** Remove widget UI injected outside our container (e.g. subtotal bar in body) */
function cleanupWidgetDOM() {
  if (typeof document === "undefined") return;
  // 1) Direct children of body with rt- class or raceticket id
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
  // 2) Any rt-subtotal / rt-summary / rt-bar tree (bar may be nested under a wrapper)
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
}: {
  filterCarGroupId?: number;
}) {
  const locale = useLocale() as "en" | "de";
  const id = useId().replace(/:/g, "");
  const containerId = `raceticket-widget-${id}`;

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

  const initWidget = () => {
    const widget = getWidget();
    if (!widget) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    widget.init({
      container: `#${containerId}`,
      hostSlug: HOST_SLUG,
      locale,
      filterCarGroupId: filterCarGroupId ?? undefined,
      //filterCarMode: filterCarGroupId != null ? "preselect" : "",
    });
  };

  // When script is already loaded (e.g. after navigating back), init in useEffect.
  // Runs on mount and when filterCarGroupId changes; containerId is stable per instance (useId).
  useEffect(() => {
    const widget = getWidget();
    if (!widget) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(containerId);
      if (!el) return;
      widget.init({
        container: `#${containerId}`,
        hostSlug: HOST_SLUG,
        locale,
        filterCarGroupId: filterCarGroupId ?? undefined,
        //filterCarMode: filterCarGroupId != null ? "preselect" : "",
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      const w = getWidget();
      if (w && typeof w.destroy === "function") w.destroy();
      cleanupWidgetDOM();
    };
  }, [containerId, filterCarGroupId, locale]);

  // Cleanup on unmount (e.g. when leaving the book page) – remove any widget UI left in body
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
        onLoad={() => {
          requestAnimationFrame(initWidget);
        }}
      />
      <div
        id={containerId}
        className="min-h-[480px] w-full"
        data-raceticket-container
      />
    </>
  );
}
