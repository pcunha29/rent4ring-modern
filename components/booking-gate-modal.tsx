"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Info } from "lucide-react";
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

const CHECKS = ["check1", "check2", "check3", "check4", "check5", "check6"] as const;

export function BookingGateModal({
  bookingUrl = "/book",
  trigger,
}: {
  bookingUrl?: string;
  trigger: React.ReactNode;
}) {
  const t = useTranslations("bookingGate");
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = CHECKS.every((k) => checked[k]);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleProceed = () => {
    setOpen(false);
    setChecked({});
    router.push(`/${locale}${bookingUrl}`);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setChecked({});
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl tracking-tight">
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("subtitle")}</DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {CHECKS.map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
            >
              <Checkbox
                checked={!!checked[key]}
                onCheckedChange={() => toggle(key)}
                className="mt-0.5"
              />
              <span className="text-sm leading-relaxed text-foreground">
                {t(key)}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-2 flex items-start gap-2.5 rounded-lg border border-secondary/20 bg-secondary/5 p-3">
          <Info className="mt-0.5 size-4 shrink-0 text-secondary" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t("depositNote")}
          </p>
        </div>

        <Button
          className="mt-4 w-full font-semibold uppercase cursor-pointer"
          size="lg"
          disabled={!allChecked}
          onClick={handleProceed}
          type="button"
        >
          {t("proceed")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
