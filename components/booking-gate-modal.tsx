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

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const remaining = Math.ceil(el.scrollHeight - el.scrollTop - el.clientHeight);
    setShowScrollHint(remaining > 2);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t1 = setTimeout(checkOverflow, 100);
    const t2 = setTimeout(checkOverflow, 350);

    const el = scrollRef.current;
    const ro = el ? new ResizeObserver(checkOverflow) : null;
    if (el) ro?.observe(el);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro?.disconnect();
    };
  }, [open, checkOverflow]);

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
        if (!v) setChecked({});
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
          onScroll={checkOverflow}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 custom-scrollbar"
        >
          <div className="space-y-2.5 sm:space-y-3">
            {CHECKS.map((key) => (
              <label
                key={key}
                className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:bg-muted/50 sm:gap-3 sm:p-3"
              >
                <Checkbox
                  checked={!!checked[key]}
                  onCheckedChange={() => toggle(key)}
                  className="mt-0.5"
                />
                <span className="text-xs leading-relaxed text-foreground sm:text-sm">
                  {t(key)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center py-1 transition-all duration-500 ${showScrollHint ? "h-8 opacity-100" : "h-0 overflow-hidden opacity-0"}`}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1">
            <ChevronsDown className="size-3.5  text-secondary" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Scroll
            </span>
          </div>
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
