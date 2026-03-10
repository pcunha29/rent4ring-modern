"use client";

import { useEffect, useRef } from "react";
import { identifyUser } from "@/lib/amplitude";

function getDeviceType() {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function AmplitudeProvider() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    console.log("[Amplitude] initializing...");
    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!apiKey) return;

    initialized.current = true;
    import("@amplitude/unified").then(async (amplitude) => {
      await amplitude.initAll(apiKey, {
        serverZone: "EU",
        analytics: { autocapture: true },
        sessionReplay: { sampleRate: 1 },
      });

      console.log(
        "[Amplitude] initialized — sessionId:",
        amplitude.getSessionId(),
        "deviceId:",
        amplitude.getDeviceId(),
      );

      identifyUser({
        locale: document.documentElement.lang || "en",
        device_type: getDeviceType(),
        entry_page: window.location.pathname,
      });
    });
  }, []);

  return null;
}
