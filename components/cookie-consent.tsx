"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "r4r-cookie-consent-v1";

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "allowed" || stored === "declined") {
        setVisible(false);
        return;
      }
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "allowed");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("ariaLabel")}
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg",
        "rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl",
        "sm:left-6 sm:right-auto sm:bottom-6",
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted"
            aria-hidden
          >
            <Cookie className="size-5 text-muted-foreground" />
          </div>
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium leading-snug text-foreground">
              {t("message")}
            </p>
            <Link
              href="/privacy"
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("privacyLink")}
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0 sm:flex-nowrap">
          <Button
            variant="secondary"
            size="sm"
            onClick={decline}
            className="w-full sm:w-auto"
          >
            {t("decline")}
          </Button>
          <Button size="sm" onClick={accept} className="w-full sm:w-auto">
            {t("allow")}
          </Button>
        </div>
      </div>
    </div>
  );
}
