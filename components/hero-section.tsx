"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { PREP_MEDIA, PREP_MEDIA_ALT } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";

const EASE = [0.22, 0.61, 0.36, 1] as const;

// El Canvas de three.js solo debe existir en el cliente, y solo cuando
// el visitante no pidió movimiento reducido.
const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [showScene, setShowScene] = useState(false);


  useEffect(() => {
    setShowScene(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });

  const imgX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const imgY = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const overlayX = useTransform(springX, [-0.5, 0.5], [10, -10]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      data-nav-theme="dark"
      onPointerMove={onPointerMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-[var(--nav-h)]"
    >
      <motion.div
        style={{ x: imgX, y: imgY, scale: imgScale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={PREP_MEDIA.hero}
          alt={PREP_MEDIA_ALT.hero}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(199,93,44,0.14),transparent_65%)]" />
        {showScene && <HeroScene />}
      </motion.div>

      <div className="wrap relative z-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-[560px]"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4 inline-flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-bronze-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-bronze-400 shadow-[0_0_8px_rgba(219,110,57,0.8)]" />
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
            className="text-[clamp(40px,6.4vw,76px)]"
          >
            {t("hero.headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
            className="mb-9 mt-6 max-w-[480px] text-[clamp(17px,1.6vw,20px)] text-powder-200"
          >
            {t("hero.lead")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="flex flex-wrap items-center gap-8"
          >
            <Button asChild>
              <Link href="/contacto" data-cursor="link">
                {t("hero.cta_quote")}
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/#services" data-cursor="link">
                {t("hero.cta_process")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>


        {/* Overlay técnico — refuerza la narrativa sin volverse un dashboard */}
        <motion.div
          style={{ x: overlayX }}
          className="hidden self-end justify-self-end pb-10 md:block"
        >
          <div className="flex flex-col items-end gap-1 border-r border-white/20 pr-4 text-right font-mono text-[11px] uppercase tracking-[0.12em] text-powder-200/80">
            <span>01 / RECEIVING</span>
            <span>INBOUND · VERIFIED</span>
            <span className="font-bold text-bronze-400">FBA READY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
