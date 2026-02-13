"use client";

import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  Smartphone,
  Phone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const EMAIL = "info@rent4ring.de";
const PHONE = "+49 160 1740386";
const LANDLINE = "+49 2691 935735";
const PHONE_TEL = "tel:+491601740386";
const LANDLINE_TEL = "tel:+492691935735";

/** X (formerly Twitter) logo - Lucide has no X icon */
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

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      className={cn(
        "w-full border-t border-border bg-background text-foreground",
        "py-8 md:py-10",
      )}
      role="contentinfo"
    >
      <Container>
        {/* Top row: Logo | Nav links | Social (like footer-component-01) */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="shrink-0 opacity-90 hover:opacity-100">
            <Image
              src="/logo_home.svg"
              alt="Rent4Ring"
              width={140}
              height={49}
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <nav
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
            aria-label="Footer navigation"
          >
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="/imprint"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("legalImprint")}
            </Link>
          </nav>

          <ul className="flex items-center gap-4">
            {SOCIAL.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={name}
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact: email, phone, landline (compact row) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 border-t border-border pt-6 text-sm text-muted-foreground">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {EMAIL}
          </a>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Smartphone className="size-4 shrink-0" aria-hidden />
            {PHONE}
          </a>
          <a
            href={LANDLINE_TEL}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {LANDLINE}
          </a>
        </div>

        {/* Bottom: centered copyright only */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          ©{new Date().getFullYear()} Rent4Ring. {t("copyright")}
        </p>
      </Container>
    </footer>
  );
}
