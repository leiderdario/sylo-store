"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ShoppingBag,
  Boxes,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
} from "lucide-react";
import { ServicesIndex } from "@/components/services-index";
import { PrepGlobal } from "@/components/prep-global";
import { PrepCta } from "@/components/prep-cta";
import { ShopGrid } from "@/components/shop-grid";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function SplitExperience() {
  const { t } = useLanguage();
  const [activePanel, setActivePanel] = useState<"prep" | "shop">("prep");
  const [showRightFloatingBtn, setShowRightFloatingBtn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);


  // Escuchar eventos de cambio de tab desde enlaces del header o hash de la URL
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash;
      if (hash === "#shop") {
        setActivePanel("shop");
      } else if (hash === "#services" || hash === "#prep") {
        setActivePanel("prep");
      }
    }

    function handleCustomSwitch(e: Event) {
      const customEvent = e as CustomEvent<"prep" | "shop">;
      if (customEvent.detail) {
        switchPanel(customEvent.detail);
      }
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("sylo-switch-tab", handleCustomSwitch as EventListener);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("sylo-switch-tab", handleCustomSwitch as EventListener);
    };
  }, []);

  // Controlar visibilidad del botón flotante persistente a la derecha
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // El botón aparece cuando el usuario está en o cerca de la sección del split
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 120;
      setShowRightFloatingBtn(inView);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchPanel(panel: "prep" | "shop") {
    setActivePanel(panel);
    if (typeof window !== "undefined") {
      history.replaceState(
        null,
        "",
        panel === "shop" ? "#shop" : "#services"
      );
    }
    // Scroll suave hacia el inicio del split para asegurar contexto
    if (containerRef.current) {
      const yOffset = -70;
      const element = containerRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <div
      ref={containerRef}
      id="experience-split"
      className="relative w-full overflow-hidden bg-navy-950 transition-colors duration-500"
    >
      {/* Barra de control superior / Tabs Switcher */}
      <div className="sticky top-[var(--nav-h)] z-40 border-y border-white/10 bg-navy-950/90 px-4 py-3 backdrop-blur-md">
        <div className="wrap flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-bronze-400 shadow-[0_0_8px_rgba(219,110,57,0.8)] animate-pulse" />
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-bronze-300">
              Interactive Division
            </span>
          </div>

          {/* Toggle pill interactivo */}
          <div className="relative inline-flex items-center rounded-full bg-navy-900/90 p-1 border border-white/15 shadow-inner">
            <button
              onClick={() => switchPanel("prep")}
              className={cn(
                "relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-[13.5px] font-medium tracking-wide transition-colors duration-200",
                activePanel === "prep"
                  ? "text-navy-950 font-bold"
                  : "text-powder-200 hover:text-white"
              )}
            >
              <Boxes size={15} />
              <span>{t("split.pill_prep")}</span>
              {activePanel === "prep" && (
                <motion.div
                  layoutId="active-pill-bg"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-bronze-400 to-bronze-300 shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => switchPanel("shop")}
              className={cn(
                "relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-[13.5px] font-medium tracking-wide transition-colors duration-200",
                activePanel === "shop"
                  ? "text-navy-950 font-bold"
                  : "text-powder-200 hover:text-white"
              )}
            >
              <ShoppingBag size={15} />
              <span>{t("split.pill_shop")}</span>
              {activePanel === "shop" && (
                <motion.div
                  layoutId="active-pill-bg"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold-400 to-gold-300 shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Contenedor Split con paneles interactivos */}
      <div className="flex w-full items-stretch overflow-hidden">
        {/* ================= PANEL IZQUIERDO: PREP CENTER ================= */}
        <div
          id="services"
          data-panel="prep"
          className={cn(
            "relative transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
            activePanel === "prep"
              ? "w-full md:w-[87%] opacity-100"
              : "hidden md:flex md:w-[13%] md:cursor-pointer overflow-hidden opacity-85 hover:opacity-100 bg-navy-900 border-r border-white/10"
          )}
          onClick={() => {
            if (activePanel !== "prep") switchPanel("prep");
          }}
        >
          {activePanel === "prep" ? (
            <div className="w-full">
              {/* Sección 1: Four services, one team */}
              <ServicesIndex />

              {/* Sección 2: Sell from anywhere, prep from here */}
              <PrepGlobal />

              {/* Sección 3: Your inventory is ready / Request quote */}
              <PrepCta />
            </div>
          ) : (
            /* Título vertical pegajoso cuando el Prep Center está colapsado */
            <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-4 bg-navy-900/95 py-8 transition-colors hover:bg-navy-800">
              <Boxes size={22} className="text-gold-400" />
              <span className="whitespace-nowrap font-serif text-[clamp(18px,1.6vw,24px)] tracking-[0.05em] text-ivory-100 [writing-mode:vertical-rl] rotate-180">
                Prep Center
              </span>
              <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-powder-300 transition-transform group-hover:scale-110">
                <ArrowLeft size={16} />
              </div>
            </div>
          )}
        </div>

        {/* ================= PANEL DERECHO: CATÁLOGO AMAZON ================= */}
        <div
          id="shop"
          data-panel="shop"
          className={cn(
            "relative transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
            activePanel === "shop"
              ? "w-full md:w-[87%] opacity-100"
              : "hidden md:flex md:w-[13%] md:cursor-pointer overflow-hidden opacity-85 hover:opacity-100 bg-navy-900 border-l border-white/10"
          )}
          onClick={() => {
            if (activePanel !== "shop") switchPanel("shop");
          }}
        >
          {activePanel === "shop" ? (
            <div className="w-full">
              <ShopGrid />
            </div>
          ) : (
            /* Título vertical pegajoso cuando el Catálogo está colapsado a la derecha */
            <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center gap-4 bg-navy-900/95 py-8 transition-colors hover:bg-navy-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/20 text-gold-300">
                <ShoppingBag size={20} />
              </div>
              <span className="whitespace-nowrap font-serif text-[clamp(18px,1.6vw,24px)] tracking-[0.05em] text-ivory-100 [writing-mode:vertical-rl] rotate-180">
                Catálogo Amazon & Shop
              </span>
              <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-navy-950 shadow-lg transition-transform hover:scale-110">
                <ArrowRight size={16} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= BOTÓN FLOTANTE PERSISTENTE A LA DERECHA ================= */}
      {/* Siempre visible durante el scroll para abrir el catálogo en cualquier momento */}
      <AnimatePresence>
        {showRightFloatingBtn && activePanel === "prep" && (
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.85 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-10 right-6 z-[450] md:bottom-1/2 md:translate-y-1/2"
          >
            <button
              onClick={() => switchPanel("shop")}
              data-cursor="link"
              className="group relative flex items-center gap-3.5 overflow-hidden rounded-full border border-gold-400/40 bg-navy-900/95 p-2 pr-5 text-ivory-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:border-gold-300 hover:bg-navy-800 hover:shadow-[0_12px_45px_rgba(212,154,85,0.28)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-gold-400 to-gold-300 text-navy-950 font-bold shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
                <ShoppingBag size={20} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold tracking-wide text-ivory-100">
                    {t("split.open_shop")}
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-gold-300 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
                <p className="text-[11px] font-medium text-gold-300/80">
                  {t("split.view_amazon")}
                </p>
              </div>

              {/* Efecto de brillo / shimmer animado */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante para regresar a Prep Center si se está en Catálogo */}
      <AnimatePresence>
        {showRightFloatingBtn && activePanel === "shop" && (
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.85 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed bottom-10 left-6 z-[450] md:bottom-1/2 md:translate-y-1/2"
          >
            <button
              onClick={() => switchPanel("prep")}
              data-cursor="link"
              className="group relative flex items-center gap-3.5 overflow-hidden rounded-full border border-bronze-400/40 bg-navy-900/95 p-2 pl-5 text-ivory-100 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-300 hover:border-bronze-300 hover:bg-navy-800 hover:shadow-[0_12px_45px_rgba(199,93,44,0.3)]"
            >
              <div className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <ArrowLeft
                    size={14}
                    className="text-bronze-300 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  <span className="text-[13px] font-bold tracking-wide text-ivory-100">
                    {t("split.back_prep")}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-bronze-300/80">
                  {t("split.back_prep_desc")}
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-bronze-500 to-bronze-300 text-navy-950 font-bold shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6">
                <Boxes size={20} />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
