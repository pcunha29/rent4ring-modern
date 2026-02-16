"use client";

import { useEffect, useId } from "react";
import Script from "next/script";

const WIDGET_CSS = "https://raceticket.de/widget/raceticket-widget.css";
const WIDGET_JS = "https://raceticket.de/widget/raceticket-widget.js";
const HOST_SLUG = "rent4ring";

type WidgetInitOpts = {
  container: string;
  hostSlug: string;
  filterCarId?: number;
  filterCarMode?: string;
};

function getWidget() {
  if (typeof window === "undefined") return undefined;
  return (
    window as unknown as {
      RaceTicketWidget?: { init: (opts: WidgetInitOpts) => void };
    }
  ).RaceTicketWidget;
}

export function RaceTicketEmbed({ filterCarId }: { filterCarId?: number }) {
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
      filterCarId: 44,
      filterCarMode: "preselect",
    });
  };

  // When script is already loaded (e.g. after navigating back), init in useEffect.
  // Unique containerId per mount so the widget binds to the new DOM node, not a cached detached one.
  useEffect(() => {
    const widget = getWidget();
    if (!widget) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(containerId);
      if (!el) return;
      widget.init({
        container: `#${containerId}`,
        hostSlug: HOST_SLUG,
        filterCarId: 44,
        filterCarMode: "preselect",
      });
    });
    return () => cancelAnimationFrame(frame);
    // containerId is stable per instance (useId); filterCarId may change via searchParams
  }, [containerId, filterCarId]);

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
