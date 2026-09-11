"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGUAGES, useLanguage, type Locale } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // El usuario especificó: "Solamente en el inicio y el contacto"
  const isAllowedPage = pathname === "/" || pathname === "/contacto";

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isAllowedPage) return null;

  const currentLang =
    LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  return (
    <div ref={dropdownRef} className="relative z-[550]">
      {/* Botón Hermoso de Selección */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Seleccionar idioma / Select language"
        className={cn(
          "group relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all duration-300 backdrop-blur-md outline-none",
          isOpen
            ? "border-gold-400 bg-navy-900 text-ivory-100 shadow-[0_0_20px_rgba(212,154,85,0.28)]"
            : "border-white/15 bg-navy-900/60 text-ivory-100 hover:border-gold-400/50 hover:bg-navy-900/90 hover:shadow-lg"
        )}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-gold-300 transition-transform duration-300 group-hover:rotate-45">
          <Globe size={13} />
        </span>

        <span className="text-[13px]">{currentLang.flag}</span>
        <span className="font-mono text-[12px] font-bold tracking-wider uppercase text-ivory-100">
          {currentLang.code}
        </span>

        <ChevronDown
          size={13}
          className={cn(
            "text-stone-400 transition-transform duration-300 group-hover:text-gold-300",
            isOpen && "rotate-180 text-gold-400"
          )}
        />

        {/* Shimmer tenue en hover */}
        <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>

      {/* Menú Desplegable con Glassmorphism de Lujo */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute right-0 mt-2.5 w-56 overflow-hidden rounded-2xl border border-white/15 bg-navy-900/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl ring-1 ring-gold-400/10"
          >
            <div className="px-3 py-2 border-b border-white/10">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.14em] text-gold-300">
                Idioma / Language
              </span>
            </div>

            <div className="mt-1 space-y-1">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLocale(lang.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-all duration-200",
                      isSelected
                        ? "bg-gold-400/15 text-gold-300 font-bold"
                        : "text-ivory-100 hover:bg-white/8 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[18px]">{lang.flag}</span>
                      <div>
                        <span className="block font-medium leading-tight">
                          {lang.nativeName}
                        </span>
                        <span className="text-[11px] text-stone-400 block font-mono">
                          {lang.name}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-navy-950 shadow-sm"
                      >
                        <Check size={12} strokeWidth={3} />
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
