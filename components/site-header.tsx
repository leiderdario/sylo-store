"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { LanguageSelector } from "@/components/language-selector";


const LINKS = [
  { href: "/", label: "Home", match: "home" },
  { href: "/#services", label: "Prep Center", match: "prep" },
  { href: "/#shop", label: "Shop", match: "shop" },
  { href: "/contacto", label: "Contact", match: "contact" },
];

/**
 * El header lee `data-nav-theme` de la sección que cruza la línea justo
 * debajo de la barra (78px) para decidir si se pinta claro u oscuro —
 * el mismo patrón de la maqueta original, portado a IntersectionObserver
 * + estado de React en vez de manipular clases a mano.
 */
function useNavTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = entry.target.getAttribute("data-nav-theme");
            if (t === "light" || t === "dark") setTheme(t);
          }
        });
      },
      { rootMargin: "-78px 0px -85% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => setAtTop(window.scrollY < 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { theme, atTop };
}

export function SiteHeader() {
  const { theme, atTop } = useNavTheme();
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: t("nav.home"), match: "home" },
    { href: "/#services", label: t("nav.prep"), match: "prep" },
    { href: "/#shop", label: t("nav.shop"), match: "shop" },
    { href: "/contacto", label: t("nav.contact"), match: "contact" },
  ];

  const onLight = theme === "light" && !atTop;
  const currentMatch = pathname === "/contacto" ? "contact" : null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[500] h-[var(--nav-h)] transition-colors duration-300",
          atTop
            ? "bg-transparent border-b border-transparent"
            : onLight
              ? "bg-[rgba(244,241,232,0.92)] backdrop-blur-md border-b border-[var(--line-on-light)] text-ink-900"
              : "bg-[rgba(10,24,48,0.72)] backdrop-blur-md border-b border-[var(--line-on-dark)] text-ivory-100"
        )}
        style={{ color: atTop ? "var(--color-ivory-100)" : undefined }}
      >
        <div className="wrap flex h-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-[34px] w-[34px] rounded-[6px] bg-gold-400" />
            <span className="font-serif text-[19px] tracking-[0.03em]">
              Sylo
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (link.match === "shop" || link.match === "prep") {
                    window.dispatchEvent(
                      new CustomEvent("sylo-switch-tab", {
                        detail: link.match === "shop" ? "shop" : "prep",
                      })
                    );
                  }
                }}
                className="group relative py-1 text-[14px] tracking-[0.03em]"
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full",
                    currentMatch === link.match && "w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3.5">
            {/* Selector de idioma hermoso en la esquina superior derecha */}
            <LanguageSelector />

            <Link
              href="/contacto"
              className="hidden text-[13px] font-bold uppercase tracking-[0.06em] md:inline-flex md:items-center md:gap-2 md:rounded-full md:bg-ivory-100 md:px-5 md:py-2.5 md:text-navy-950 md:transition-all md:hover:bg-gold-400 md:hover:shadow-md"
            >
              {t("nav.quote")}
            </Link>
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-[38px] w-[38px] items-center justify-center md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-[499] flex flex-col items-center justify-center gap-8 bg-navy-950 pt-[var(--nav-h)] text-ivory-100 md:hidden"
          >
            <div className="mb-2">
              <LanguageSelector />
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-[22px]"
                onClick={() => {
                  setOpen(false);
                  if (link.match === "shop" || link.match === "prep") {
                    window.dispatchEvent(
                      new CustomEvent("sylo-switch-tab", {
                        detail: link.match === "shop" ? "shop" : "prep",
                      })
                    );
                  }
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-gold-400 px-7 py-3 font-serif text-[15px] font-bold text-navy-950"
            >
              {t("nav.quote")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

