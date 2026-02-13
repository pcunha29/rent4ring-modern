"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";

const navLinks = [
  { key: "fleet" as const, href: "/#fleet" },
  // { key: "trackdays" as const, href: "/" },
  { key: "aboutUs" as const, href: "/#why-rent4ring" },
  { key: "faq" as const, href: "/faq" },
  // { key: "giftVouchers" as const, href: "/" },
] as const;

export function Navbar() {
  const t = useTranslations("navbar");
  const tLang = useTranslations("languages");
  const locale = useLocale();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const transitionClasses = "transition-all duration-300 ease-out";

  const langSwitcher = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "min-w-0 gap-1.5 font-medium text-foreground/90 border-none",
            transitionClasses,
            "hover:bg-muted/50 hover:text-white active:scale-[0.98]",
          )}
          aria-label="Language"
        >
          {locale.toUpperCase()}

          <ChevronDown className="size-4 shrink-0 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 p-2">
        {routing.locales.map((loc) => (
          <DropdownMenuItem key={loc} asChild>
            <Link
              href={pathname}
              locale={loc}
              className="cursor-pointer"
              onClick={() => setSheetOpen(false)}
            >
              {tLang(loc)}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const bookNowButton = (
    <Button
      variant="secondary"
      size="default"
      className="transition-all duration-300 ease-out hover:opacity-90 active:scale-[0.98]"
      asChild
    >
      <Link href="/book" onClick={() => setSheetOpen(false)}>
        {t("bookNow")}
      </Link>
    </Button>
  );

  return (
    <header
      className={cn(
        "w-full bg-background border-b border-border text-foreground fixed top-0 left-0 right-0 z-50",
        transitionClasses,
      )}
    >
      <Container
        className={cn(
          "flex items-end justify-between py-5 md:items-center md:py-6",
          transitionClasses,
        )}
      >
        <div className="flex shrink-0 items-end">
          <Link
            href="/"
            className={cn(
              "block opacity-100 hover:opacity-90",
              transitionClasses,
            )}
          >
            <Image
              src="/logo_home.svg"
              alt="Rent4Ring"
              width={168}
              height={59}
              priority
              className="w-auto h-8 md:h-10"
            />
          </Link>
        </div>

        {/* Desktop nav: visible from md up */}
        <nav
          className="hidden items-center gap-6 md:flex md:gap-8 lg:gap-10"
          aria-label="Main navigation"
        >
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                "relative text-sm font-semibold text-foreground/90",
                "hover:text-foreground",
                "after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-foreground",
                "after:transition-[width] after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:after:w-full",
                transitionClasses,
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Right block: Book Now always visible; lang on desktop; hamburger on mobile */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {/* Language switcher: desktop only */}
          <div className="hidden md:block">{langSwitcher}</div>

          {/* Book Now: always in navbar */}
          {bookNowButton}

          {/* Mobile menu trigger */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "shrink-0 md:hidden",
                  transitionClasses,
                  "hover:bg-muted/50 active:scale-[0.98]",
                )}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-0 pt-14">
              <nav
                className="flex flex-col gap-1 px-4 pt-2"
                aria-label="Mobile navigation"
              >
                {navLinks.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm font-medium text-foreground/90",
                      "hover:bg-muted hover:text-foreground",
                      transitionClasses,
                    )}
                    onClick={() => setSheetOpen(false)}
                  >
                    {t(key)}
                  </Link>
                ))}
              </nav>
              <div className="mx-4 my-4 border-t border-border" />
              <div className="flex flex-col gap-3 px-4 pb-4">
                {langSwitcher}
                <Button
                  variant="secondary"
                  className={cn(transitionClasses, "active:scale-[0.98]")}
                  asChild
                >
                  <Link href="/book" onClick={() => setSheetOpen(false)}>
                    {t("bookNow")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
