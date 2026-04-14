"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Info, ChevronsDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  trackBookingGateOpened,
  trackBookingGateCompleted,
} from "@/lib/amplitude";
import { Link } from "@/i18n/navigation";

const HIDE_AT_PX = 4;
const SHOW_AGAIN_AT_PX = 28;

const CHECKS = [
  "check1",
  "check2",
  "check3",
  "check4",
  "check5",
  "check6",
] as const;

function parseUrlParams(url: string) {
  try {
    const search = url.includes("?") ? url.split("?")[1] : "";
    const params = new URLSearchParams(search);
    const int = (k: string) => {
      const v = params.get(k);
      return v ? parseInt(v, 10) : undefined;
    };
    return {
      car_id: int("carId"),
      package_id: int("packageId"),
      laps: int("laps"),
    };
  } catch {
    return {};
  }
}

export function BookingGateModal({
  bookingUrl = "/book",
  trigger,
  source = "navbar",
}: {
  bookingUrl?: string;
  trigger: React.ReactNode;
  source?: string;
}) {
  const t = useTranslations("bookingGate");
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(false);
  const settleCheckEarlyRef = useRef<number | null>(null);
  const settleCheckLateRef = useRef<number | null>(null);

  const clearSettleChecks = useCallback(() => {
    if (settleCheckEarlyRef.current !== null) {
      window.clearTimeout(settleCheckEarlyRef.current);
      settleCheckEarlyRef.current = null;
    }
    if (settleCheckLateRef.current !== null) {
      window.clearTimeout(settleCheckLateRef.current);
      settleCheckLateRef.current = null;
    }
  }, []);

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const remaining = Math.max(
      0,
      el.scrollHeight - el.scrollTop - el.clientHeight,
    );
    const hasOverflow = el.scrollHeight - el.clientHeight > HIDE_AT_PX;

    if (!hasOverflow) {
      isAtBottomRef.current = true;
      setShowScrollHint(false);
      return;
    }

    if (isAtBottomRef.current) {
      if (remaining > SHOW_AGAIN_AT_PX) {
        isAtBottomRef.current = false;
      }
    } else if (remaining <= HIDE_AT_PX) {
      isAtBottomRef.current = true;
    }

    setShowScrollHint(!isAtBottomRef.current);
  }, []);

  const scheduleSettleChecks = useCallback(() => {
    clearSettleChecks();
    settleCheckEarlyRef.current = window.setTimeout(checkOverflow, 120);
    settleCheckLateRef.current = window.setTimeout(checkOverflow, 280);
  }, [checkOverflow, clearSettleChecks]);

  const handleScroll = useCallback(() => {
    checkOverflow();
    scheduleSettleChecks();
  }, [checkOverflow, scheduleSettleChecks]);

  const handleScrollHintClick = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });

    scheduleSettleChecks();
    window.setTimeout(checkOverflow, 420);
  }, [checkOverflow, scheduleSettleChecks]);

  useEffect(() => {
    if (!open) {
      clearSettleChecks();
      return;
    }

    isAtBottomRef.current = false;
    const t1 = setTimeout(checkOverflow, 100);
    const t2 = setTimeout(checkOverflow, 350);
    const t3 = setTimeout(checkOverflow, 600);

    const el = scrollRef.current;
    const ro = el ? new ResizeObserver(checkOverflow) : null;
    if (el) ro?.observe(el);
    const onTouchEnd = () => scheduleSettleChecks();
    if (el) {
      el.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearSettleChecks();
      if (el) {
        el.removeEventListener("touchend", onTouchEnd);
      }
      ro?.disconnect();
    };
  }, [open, checkOverflow, clearSettleChecks, scheduleSettleChecks]);

  const checkedCount = CHECKS.filter((k) => checked[k]).length;
  const allChecked = checkedCount === CHECKS.length;
  const progress = (checkedCount / CHECKS.length) * 100;

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleProceed = () => {
    trackBookingGateCompleted({
      booking_url: bookingUrl,
      ...parseUrlParams(bookingUrl),
    });
    setOpen(false);
    setChecked({});
    router.push(`/${locale}${bookingUrl}`);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) {
          trackBookingGateOpened({
            source,
            booking_url: bookingUrl,
            ...parseUrlParams(bookingUrl),
          });
        }
        if (!v) {
          setChecked({});
          setShowScrollHint(false);
          isAtBottomRef.current = false;
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden p-0 sm:max-w-lg">
        {/* Sticky header */}
        <div className="shrink-0 border-b border-border px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg tracking-tight sm:text-xl">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              {t("subtitle")}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable checkboxes */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 custom-scrollbar"
        >
          <div className="space-y-2.5 sm:space-y-3">
            {CHECKS.map((key) => (
              <label
                key={key}
                className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:bg-muted/50 sm:gap-3 sm:p-3"
              >
                <Checkbox
                  id={key === "check4" ? "booking-gate-check4" : undefined}
                  checked={!!checked[key]}
                  onCheckedChange={() => toggle(key)}
                  className="mt-0.5"
                />
                <span className="text-xs leading-relaxed text-foreground sm:text-sm">
                  {key === "check4"
                    ? t.rich("check4", {
                        faqLink: (chunks) => (
                          <Link
                            href="/faq#insurance-faq"
                            className="font-medium text-secondary underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpen(false);
                            }}
                          >
                            {chunks}
                          </Link>
                        ),
                      })
                    : t(key)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden px-4 transition-[max-height,opacity,padding] duration-300 ease-out sm:px-6 ${showScrollHint ? "max-h-10 py-1 opacity-100" : "pointer-events-none max-h-0 py-0 opacity-0"}`}
        >
          <button
            type="button"
            onClick={handleScrollHintClick}
            disabled={!showScrollHint}
            aria-label="Scroll to end of checklist"
            className={`flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 transition-opacity duration-300 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default ${showScrollHint ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronsDown className="size-3.5 text-secondary" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Scroll
            </span>
          </button>
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 border-t border-border px-4 pt-3 pb-4 sm:px-6 sm:pt-4 sm:pb-6">
          <div className="mb-3 flex items-start gap-2 rounded-lg border border-secondary/20 bg-secondary/5 p-2.5 sm:gap-2.5 sm:p-3">
            <Info className="mt-0.5 size-3.5 shrink-0 text-secondary sm:size-4" />
            <p className="text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
              {t("depositNote")}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] sm:text-xs">
              <span
                className={
                  allChecked
                    ? "font-medium text-green-600"
                    : "text-muted-foreground"
                }
              >
                {t("progress", { count: checkedCount, total: CHECKS.length })}
              </span>
              {allChecked && (
                <span className="font-medium text-green-600">&#10003;</span>
              )}
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-300 ease-out ${allChecked ? "bg-green-600" : "bg-secondary"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Button
            className="w-full font-semibold uppercase cursor-pointer"
            size="lg"
            disabled={!allChecked}
            onClick={handleProceed}
            type="button"
          >
            {t("proceed")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
