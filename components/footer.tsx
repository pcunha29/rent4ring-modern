"use client";

import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  Smartphone,
  Phone,
  MapPin,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const EMAIL = "info@rent4ring.de";
const PHONE = "+49 160 96671158";
const LANDLINE = "+49 2691 935735";
const PHONE_TEL = "tel:+4916096671158";
const LANDLINE_TEL = "tel:+492691935735";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/rent4ring",
    icon: Facebook,
  },
  {
    name: "X",
    href: "https://x.com/rent4ring",
    icon: XIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/rent4ringofficial",
    icon: Instagram,
  },
] as const;

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      className={cn(
        "w-full border-t border-border bg-background text-foreground",
        "py-10 md:py-14",
      )}
      role="contentinfo"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[2fr_1fr_1fr_1.4fr_1fr]">
          {/* Brand + tagline + address */}
          <div className="col-span-2 lg:col-span-1">
            <Link prefetch={false} href="/" className="inline-block opacity-90 hover:opacity-100">
              <Image
                src="/logo_home.svg"
                alt="Rent4Ring"
                width={140}
                height={49}
                className="h-8 w-auto md:h-9"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <address className="mt-4 not-italic text-sm text-muted-foreground">
              <span className="inline-flex items-start gap-1.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                {t("address")}
              </span>
            </address>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("explore")}
            </h3>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer explore">
              <Link prefetch={false} href="/#fleet" className={linkClass}>
                {t("fleet")}
              </Link>
              <Link prefetch={false} href="/faq" className={linkClass}>
                {t("faq")}
              </Link>
              <Link prefetch={false} href="/permit-package" className={linkClass}>
                {t("permitPackage")}
              </Link>
              <Link prefetch={false} href="/book" className={linkClass}>
                {t("bookNow")}
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("legal")}
            </h3>
            <nav className="mt-3 flex flex-col gap-2" aria-label="Footer legal">
              <Link prefetch={false} href="/privacy" className={linkClass}>
                {t("privacyPolicy")}
              </Link>
              <Link prefetch={false} href="/imprint" className={linkClass}>
                {t("legalImprint")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("contact")}
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className={cn(linkClass, "inline-flex items-center gap-1.5")}
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                {EMAIL}
              </a>
              <a
                href={PHONE_TEL}
                className={cn(linkClass, "inline-flex items-center gap-1.5")}
              >
                <Smartphone className="size-4 shrink-0" aria-hidden />
                {PHONE}
              </a>
              <a
                href={LANDLINE_TEL}
                className={cn(linkClass, "inline-flex items-center gap-1.5")}
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {LANDLINE}
              </a>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("followUs")}
            </h3>
            <ul className="mt-3 flex items-center gap-4">
              {SOCIAL.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={name}
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy;{new Date().getFullYear()} Rent4Ring GmbH und Co. KG. {t("copyright")}
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground/60">
            made with ❤️ by{" "}
            <a
              href="https://pcunhadev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-muted-foreground/30 underline-offset-2 transition-colors hover:text-muted-foreground hover:decoration-muted-foreground/60"
            >
              pcunhadev
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
