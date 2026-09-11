"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type CursorState = "default" | "view" | "cart" | "link" | "explore";

const RING_SIZE: Record<CursorState, number> = {
  default: 38,
  view: 68,
  cart: 56,
  link: 52,
  explore: 60,
};

const RING_LABEL: Record<CursorState, string> = {
  default: "",
  view: "View",
  cart: "Buy",
  link: "",
  explore: "",
};

const RING_STYLE: Record<CursorState, string> = {
  default: "bg-transparent border-powder-300",
  view: "bg-ivory-100 border-ivory-100 text-navy-950",
  cart: "bg-gold-400 border-gold-400 text-navy-950",
  link: "bg-white/12 border-powder-300",
  explore: "bg-powder-300 border-powder-300 text-navy-950",
};

/**
 * Cursor global a medida. Cualquier elemento interactivo puede anunciar su
 * propio estado con `data-cursor="view|cart|link|explore"` (mismo patrón
 * que la maqueta original) y este componente lo recoge por delegación de
 * eventos, así no hay que instrumentar cada botón a mano.
 *
 * Se desactiva por completo en touch/pointer coarse y con
 * prefers-reduced-motion, devolviendo el cursor nativo del sistema.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setState((target?.getAttribute("data-cursor") as CursorState) || "default");
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = RING_SIZE[state];

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
        className={cn(
          "flex items-center justify-center rounded-full border text-[11px] font-semibold uppercase tracking-[0.06em]",
          RING_STYLE[state]
        )}
      >
        {RING_LABEL[state]}
      </motion.div>
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory-100" />
    </motion.div>
  );
}
