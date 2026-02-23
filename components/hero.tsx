"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const MD_BREAKPOINT = 768;

const spring = { type: "spring" as const, stiffness: 120, damping: 24 };
const stagger = 0.08;

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring, delay: 0.15 + i * stagger },
  }),
};

export function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MD_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[65vh] md:min-h-[85vh] w-full overflow-hidden bg-muted"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: isMobile ? 0 : imageY, scale: isMobile ? 1 : imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/vehicles/gt3rs-3.jpg"
            alt=""
            fill
            priority
            className="object-cover blur-[1px] md:blur-none"
            sizes="100vw"
          />
        </motion.div>
      </div>
      {/* Overlay: darker on left for text readability */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-b from-background/95 via-background/60 to-transparent",
          "md:from-background/90 md:via-background/50",
        )}
      />
      <Container
        className={cn(
          "relative z-10 flex mt-8 md:mt-0 min-h-[65vh] flex-col items-center justify-center text-center md:min-h-[85vh] md:items-end md:text-right py-20",
        )}
      >
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.2em] text-secondary",
            "mb-4 sm:mb-5",
          )}
        >
          {t("est")}
        </motion.p>
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className={cn(
            "font-serif text-4xl font-bold leading-tight tracking-tight text-primary",
            "sm:text-5xl md:text-5xl lg:text-6xl",
            "mb-6 md:mb-8",
          )}
        >
          <span className="block">{t("headlineLine1")}</span>
          <span className="block">{t("headlineLine2")}</span>
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className={cn(
            "max-w-xl text-base font-medium leading-relaxed text-black",
            "mb-8 md:mb-10 md:text-lg",
          )}
        >
          {t("description")}
        </motion.p>
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-wrap justify-center md:justify-end gap-4"
        >
          <Button variant="default" size="lg" asChild>
            <Link href="/book">{t("bookExperience")}</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/#fleet">{t("exploreFleet")}</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
