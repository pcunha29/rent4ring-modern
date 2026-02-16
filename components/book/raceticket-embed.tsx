"use client";

import { useEffect } from "react";
import Script from "next/script";

const WIDGET_CSS = "https://raceticket.de/widget/raceticket-widget.css";
const WIDGET_JS = "https://raceticket.de/widget/raceticket-widget.js";
const HOST_SLUG = "rent4ring";

export function RaceTicketEmbed({ filterCarId }: { filterCarId?: number }) {
  useEffect(() => {
    const id = "raceticket-widget-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    document.head.appendChild(link);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  const initWidget = () => {
    if (
      typeof window !== "undefined" &&
      (
        window as unknown as {
          RaceTicketWidget?: {
            init: (opts: {
              container: string;
              hostSlug: string;
              filterCarId?: number;
              filterCarMode?: string;
            }) => void;
          };
        }
      ).RaceTicketWidget
    ) {
      console.log("filterCarId", filterCarId);
      console.log("filterCarMode", filterCarId ? "preselect" : "");
      (
        window as unknown as {
          RaceTicketWidget: {
            init: (opts: {
              container: string;
              hostSlug: string;
              filterCarId?: number;
              filterCarMode?: string;
            }) => void;
          };
        }
      ).RaceTicketWidget.init({
        container: "#raceticket-widget",
        hostSlug: HOST_SLUG,
        filterCarId: filterCarId || undefined,
        filterCarMode: filterCarId ? "preselect" : "",
      });
    }
  };

  return (
    <>
      <Script src={WIDGET_JS} strategy="afterInteractive" onLoad={initWidget} />
      <div id="raceticket-widget" className="min-h-[480px] w-full" />
    </>
  );
}
