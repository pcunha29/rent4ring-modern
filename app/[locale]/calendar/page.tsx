"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Bike, Clock, MapPin, ArrowRight } from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FLEET_SLUGS, FLEET_DATA } from "@/lib/fleet-data";
import calendarData from "@/lib/calendar_TF.json";

type Session = {
  start: string;
  end: string;
  layout: string;
  motorcycles: boolean;
};

type DayEntry = {
  date: string;
  weekday: string;
  sessions: Session[];
};

function toDateKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const CalendarDataCtx = createContext<Map<string, DayEntry>>(new Map());

function TFDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const dataMap = useContext(CalendarDataCtx);
  const defaultClassNames = getDefaultClassNames();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const key = toDateKey(day.date);
  const entry = dataMap.get(key);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      className={cn(
        "flex h-auto w-full min-h-14 md:min-h-18 flex-col items-center justify-start gap-0.5 rounded-lg p-1 leading-none font-normal",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        "dark:hover:text-accent-foreground",
        entry && !modifiers.selected && "bg-secondary/8",
        defaultClassNames.day,
        className,
      )}
      {...props}
    >
      <span className="text-sm font-medium">{day.date.getDate()}</span>
      {entry && (
        <span
          className={cn(
            "text-[10px] leading-tight tabular-nums",
            modifiers.selected
              ? "text-primary-foreground/80"
              : "text-secondary font-semibold",
          )}
        >
          {entry.sessions[0].start}–{entry.sessions[0].end}
        </span>
      )}
      {entry?.sessions.some((s) => s.motorcycles) && (
        <Bike
          className={cn(
            "size-3",
            modifiers.selected
              ? "text-primary-foreground/70"
              : "text-muted-foreground",
          )}
        />
      )}
    </Button>
  );
}

export default function CalendarPage() {
  const t = useTranslations("calendar");
  const f = useTranslations("fleet");
  const locale = useLocale();
  const [selected, setSelected] = useState<Date | undefined>();

  const dataMap = useMemo(() => {
    const map = new Map<string, DayEntry>();
    for (const entry of calendarData as DayEntry[]) {
      map.set(entry.date, entry);
    }
    return map;
  }, []);

  const tfDates = useMemo(
    () => Array.from(dataMap.keys()).map((d) => new Date(d + "T00:00:00")),
    [dataMap],
  );

  const selectedEntry = selected
    ? dataMap.get(toDateKey(selected))
    : undefined;

  const formatDate = (date: Date) =>
    date.toLocaleDateString(locale === "de" ? "de-DE" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="mt-24 w-full py-12 md:py-16 lg:py-20">
      <Container className="max-w-4xl">
        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
        </header>

        <CalendarDataCtx.Provider value={dataMap}>
        <div className="rounded-xl border border-border bg-card p-3 shadow-sm md:p-6">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            showOutsideDays
            defaultMonth={tfDates[0]}
            className="w-full"
            classNames={{
              root: cn("w-full", defaultClassNames.root),
              months: cn(
                "relative flex flex-col gap-4",
                defaultClassNames.months,
              ),
              month: cn(
                "flex w-full flex-col gap-4",
                defaultClassNames.month,
              ),
              nav: cn(
                "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 z-10",
                defaultClassNames.nav,
              ),
              button_previous: cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground size-9 p-0 select-none aria-disabled:opacity-50",
                defaultClassNames.button_previous,
              ),
              button_next: cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground size-9 p-0 select-none aria-disabled:opacity-50",
                defaultClassNames.button_next,
              ),
              month_caption: cn(
                "flex h-9 w-full items-center justify-center",
                defaultClassNames.month_caption,
              ),
              caption_label: cn(
                "text-sm font-semibold select-none",
                defaultClassNames.caption_label,
              ),
              table: "w-full border-collapse",
              weekdays: cn("flex", defaultClassNames.weekdays),
              weekday: cn(
                "flex-1 rounded-md text-xs font-medium text-muted-foreground select-none py-2",
                defaultClassNames.weekday,
              ),
              week: cn("mt-1 flex w-full gap-px", defaultClassNames.week),
              day: cn(
                "group/day relative flex-1 p-0 text-center select-none",
                defaultClassNames.day,
              ),
              today: cn(
                "rounded-lg ring-2 ring-secondary/40",
                defaultClassNames.today,
              ),
              outside: cn(
                "text-muted-foreground/40 aria-selected:text-muted-foreground",
                defaultClassNames.outside,
              ),
              disabled: cn(
                "text-muted-foreground opacity-50",
                defaultClassNames.disabled,
              ),
              hidden: cn("invisible", defaultClassNames.hidden),
            }}
            components={{
              DayButton: TFDayButton,
            }}
          />
        </div>
        </CalendarDataCtx.Provider>

        <div className="mt-6">
          {!selected && (
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">{t("selectDay")}</p>
            </div>
          )}

          {selected && !selectedEntry && (
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("noSessions")}
              </p>
            </div>
          )}

          {selected && selectedEntry && (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
                {formatDate(selected)}
              </h2>

              <div className="mt-4 space-y-3">
                {selectedEntry.sessions.map((session, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-secondary" />
                      <span className="text-sm font-semibold text-foreground">
                        {session.start} — {session.end}
                      </span>
                    </div>

                    {session.motorcycles && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                        <Bike className="size-3.5" />
                        {t("motorcyclesAllowed")}
                      </span>
                    )}

                    {session.layout !== "nordschleife" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary">
                        <MapPin className="size-3.5" />
                        {session.layout}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Fleet cars */}
              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {t("pickYourWeapon")}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {FLEET_SLUGS.map((slug) => {
                    const car = FLEET_DATA[slug];
                    const brand = f(`cars.${slug}.brand`);
                    const model = f(`cars.${slug}.model`);

                    return (
                      <Link
                        key={slug}
                        href={`/fleet/${slug}`}
                        className="group/car flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-secondary/40 hover:shadow-md"
                      >
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                          <Image
                            src={car.imagePath}
                            alt={`${brand} ${model}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover/car:scale-105"
                            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 200px"
                          />
                        </div>
                        <div className="flex flex-1 items-center justify-between gap-1 px-3 py-2">
                          <div className="min-w-0 text-left">
                            <p className="truncate text-[11px] text-muted-foreground">
                              {brand}
                            </p>
                            <p className="truncate text-xs font-semibold text-foreground">
                              {model}
                            </p>
                          </div>
                          <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/car:translate-x-0.5 group-hover/car:text-secondary" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
