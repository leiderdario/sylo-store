"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PROCESS_STAGES } from "@/data/process-stages";
import { PREP_MEDIA, PREP_MEDIA_ALT } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import {
  ArrowDown,
  ArrowUp,
  Boxes,
  RotateCw,
  Sparkles,
  Zap,
  Activity,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function PrepProcess() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const visualCardRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up" | "idle">("idle");
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    const visual = visualCardRef.current;
    if (!track || !fill) return;

    let idleTimeout: NodeJS.Timeout;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: reduceMotion ? false : 0.4,
      onUpdate: (self) => {
        const progress = self.progress;
        const velocity = self.getVelocity();
        const dir = self.direction === 1 ? "down" : "up";

        setScrollProgress(progress);
        setScrollVelocity(velocity);
        setScrollDirection(dir);
        setIsScrolling(true);

        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
          setIsScrolling(false);
          setScrollDirection("idle");
          if (visual && !reduceMotion) {
            gsap.to(visual, {
              rotateX: 0,
              rotateY: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        }, 220);

        const idx = Math.min(
          PROCESS_STAGES.length - 1,
          Math.floor(progress * PROCESS_STAGES.length)
        );
        setActive(idx);

        gsap.set(fill, { scaleY: progress });

        // Macro-animación 3D en la tarjeta visual según la velocidad e inercia del scroll
        if (visual && !reduceMotion) {
          // Limitar la inclinación para mantener elegancia pero que sea muy notoria
          const maxTilt = 14;
          const tiltX = Math.max(
            -maxTilt,
            Math.min(maxTilt, (velocity / 200) * (dir === "down" ? 1 : -1))
          );
          const shiftY = Math.max(-25, Math.min(25, velocity * 0.025));

          gsap.to(visual, {
            rotateX: -tiltX * 0.85,
            rotateZ: (progress - 0.5) * 4,
            y: shiftY * 0.4,
            scale: 1 + Math.min(0.04, Math.abs(velocity) * 0.00004),
            duration: 0.35,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      },
    });

    return () => {
      clearTimeout(idleTimeout);
      trigger.kill();
    };
  }, []);

  const stage = PROCESS_STAGES[active];
  const percentage = Math.round(scrollProgress * 100);

  return (
    <section id="services" data-nav-theme="dark" className="relative bg-navy-950">
      {/* Encabezado editorial */}
      <div className="wrap pt-28 pb-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-powder-300/20 bg-powder-300/10 px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-powder-300">
              <Boxes size={14} />
              <span>{t("process.badge")}</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-4 max-w-[680px] text-[clamp(32px,4vw,54px)] font-medium leading-[1.08] tracking-tight"
            >
              {t("process.title")}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="max-w-[420px] text-[16px] text-powder-200/90 leading-relaxed"
          >
            {t("process.lead")}
          </motion.p>
        </div>
      </div>

      {/* Track alto: provee 500vh de scroll interactivo mientras el panel permanece sticky */}
      <div ref={trackRef} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Fondo sutil con líneas de velocidad al scrollear */}
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(#d8e7f5_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="wrap grid w-full items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] relative z-10">
            {/* Columna izquierda: etapas numeradas + línea de progreso + velocímetro HUD */}
            <div className="flex flex-col justify-center">
              {/* Telemetría HUD de Almacén (Macro-indicador de Scroll interactivo) */}
              <div className="mb-8 flex items-center justify-between rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 shadow-lg backdrop-blur-md max-w-[420px]">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300",
                      isScrolling
                        ? scrollDirection === "down"
                          ? "bg-gold-400 text-navy-950 shadow-md shadow-gold-400/20"
                          : "bg-powder-300 text-navy-950"
                        : "bg-white/10 text-stone-400"
                    )}
                  >
                    {isScrolling ? (
                      scrollDirection === "down" ? (
                        <ArrowDown size={18} className="animate-bounce" />
                      ) : (
                        <ArrowUp size={18} className="animate-bounce" />
                      )
                    ) : (
                      <Activity size={18} />
                    )}
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono uppercase tracking-[0.14em] text-stone-400">
                      {t("process.status")}
                    </span>
                    <span className="text-[13px] font-bold text-ivory-100 flex items-center gap-1.5">
                      {isScrolling
                        ? scrollDirection === "down"
                          ? t("process.moving_down")
                          : t("process.moving_up")
                        : t("process.locked")}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-mono uppercase tracking-[0.14em] text-stone-400">
                    {t("process.progress")}
                  </span>
                  <span className="font-mono text-[16px] font-bold text-gold-300">
                    {String(percentage).padStart(2, "0")}%
                  </span>
                </div>
              </div>


              {/* Lista interactiva con progreso lineal sincronizado */}
              <div className="flex gap-6">
                <div className="relative w-1 shrink-0 self-stretch rounded-full bg-white/10 overflow-hidden">
                  <div
                    ref={fillRef}
                    className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-powder-300 via-gold-400 to-gold-300 shadow-[0_0_12px_rgba(201,168,118,0.6)]"
                    style={{ transform: "scaleY(0)" }}
                  />
                </div>

                <ol className="flex flex-col gap-6 py-2">
                  {PROCESS_STAGES.map((s, i) => {
                    const isActive = i === active;
                    const stageTitle = t(`stage.${s.index}.title`);
                    const stageDesc = t(`stage.${s.index}.desc`);
                    return (
                      <li
                        key={s.key}
                        data-cursor="explore"
                        className={cn(
                          "transition-all duration-500",
                          isActive
                            ? "opacity-100 translate-x-1"
                            : "opacity-35 hover:opacity-60"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "font-mono text-[13px] font-bold transition-colors duration-300",
                              isActive ? "text-gold-300" : "text-stone-400"
                            )}
                          >
                            {s.index}
                          </span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                          )}
                        </div>

                        <h3
                          className={cn(
                            "font-serif transition-all duration-300",
                            isActive
                              ? "text-[28px] md:text-[34px] text-ivory-100 font-normal"
                              : "text-[20px] text-stone-400"
                          )}
                        >
                          {stageTitle}
                        </h3>

                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="mt-2 max-w-[360px] text-[15px] text-powder-200/90 leading-relaxed"
                          >
                            {stageDesc}
                          </motion.p>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* Columna derecha: Escena visual 3D rotativa en perspectiva (Macro-interacción) */}
            <div className="relative [perspective:1400px]">
              {/* Tarjeta 3D con rotación cinemática vinculada al scroll */}
              <div
                ref={visualCardRef}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-navy-900 shadow-[0_25px_60px_rgba(0,0,0,0.6)] md:aspect-[16/10] [transform-style:preserve-3d]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.key}
                    initial={{
                      opacity: 0,
                      scale: 1.08,
                      rotateY: scrollDirection === "up" ? -6 : 6,
                    }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                      rotateY: scrollDirection === "up" ? 6 : -6,
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={PREP_MEDIA[stage.key]}
                      alt={PREP_MEDIA_ALT[stage.key]}
                      fill
                      priority
                      sizes="(min-width: 768px) 55vw, 90vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Badge de fase y título activo */}
                <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/85 px-4 py-2 text-[12px] font-bold text-ivory-100 shadow-xl backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                  <span>
                    Fase {stage.index} &mdash; {t(`stage.${stage.index}.title`)}
                  </span>
                </div>

                {/* Holograma esquemático / Caja 3D con rotación en tiempo real según el scroll */}
                <div className="absolute right-6 top-6 z-20 hidden sm:flex items-center gap-2.5 rounded-full border border-gold-400/30 bg-navy-950/90 px-4 py-2 text-[11px] font-mono text-gold-300 shadow-xl backdrop-blur-md">
                  <RotateCw
                    size={14}
                    style={{
                      transform: `rotate(${scrollProgress * 360}deg)`,
                      transition: "transform 0.1s linear",
                    }}
                  />
                  <span>{t("process.rotation")}: {Math.round(scrollProgress * 360)}°</span>
                </div>

                {/* Tag de la etapa */}
                <div className="absolute bottom-6 left-6 z-20 max-w-[70%]">
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-gold-300">
                    {t("process.sop")}
                  </span>
                  <p className="mt-1 text-[16px] font-serif text-ivory-100 line-clamp-1">
                    {t(`stage.${stage.index}.desc`)}
                  </p>
                </div>


                <div className="absolute bottom-6 right-6 z-20 font-mono text-[11.5px] uppercase tracking-[0.14em] text-powder-300 bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-sm">
                  {stage.tag}
                </div>

                {/* Línea de escaneo láser tecnológica sobre la imagen cuando hay scroll activo */}
                {isScrolling && (
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.4,
                      ease: "linear",
                    }}
                    className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent shadow-[0_0_15px_rgba(201,168,118,0.8)] z-10"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
