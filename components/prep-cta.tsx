"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";

/** Botón magnético: solo activo con mouse fino, ignorado en touch. */
function MagneticButton() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.5);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Button asChild variant="line">
        <Link href="/contacto">Request a Quote</Link>
      </Button>
    </motion.div>
  );
}

export function PrepCta() {
  return (
    <section data-nav-theme="light" className="bg-ivory-100 py-20 text-ink-900">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-[380px] font-serif text-[22px]">
          Your inventory is ready.
          <br />
          Let&apos;s get it to Amazon.
        </p>
        <MagneticButton />
      </div>
    </section>
  );
}
