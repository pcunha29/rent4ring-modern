"use client";

import { useEffect, useRef } from "react";

export function AmplitudeProvider() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const apiKey = process.env.AMPLITUDE_API_KEY;
    if (!apiKey) return;

    initialized.current = true;

    import("@amplitude/unified").then((amplitude) => {
      amplitude.initAll(apiKey, {
        serverZone: "EU",
        analytics: { autocapture: true },
        sessionReplay: { sampleRate: 1 },
      });
    });
  }, []);

  return null;
}
