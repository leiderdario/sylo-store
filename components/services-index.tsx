"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PackageSearch, Tags, Boxes, Layers } from "lucide-react";

const SERVICES = [
  {
    icon: PackageSearch,
    title: "Receiving & Inspection",
  },
  {
    icon: Tags,
    title: "FBA Labeling & Prep",
  },
  {
    icon: Boxes,
    title: "Storage",
  },
  {
    icon: Layers,
    title: "Kitting & Bundling",
  },
];

export function ServicesIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-ivory-100 py-28 text-ink-900"
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
    >
      <div className="wrap">
        <div className="mb-16 max-w-[640px]">
          <h2 className="text-[clamp(30px,3.6vw,46px)]">
            Four services, one team
          </h2>
          <p className="mt-4 text-[17px]">
            Todo pasa por las mismas manos, desde que tu envío llega hasta
            que sale rumbo a Amazon.
          </p>
        </div>

        <ul className="divide-y divide-[var(--line-on-light)] border-y border-[var(--line-on-light)]">
          {SERVICES.map((svc, i) => (
            <li
              key={svc.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group flex cursor-none items-center gap-6 py-7"
            >
              <span className="font-mono text-[13px] text-stone-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[22px] transition-transform duration-300 group-hover:translate-x-2 md:text-[30px]">
                {svc.title}
              </h3>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel flotante: solo visible con mouse fino, se ignora en touch */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ left: pos.x, top: pos.y }}
            className="pointer-events-none fixed z-[60] hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950 text-ivory-100 [@media(hover:hover)]:flex"
          >
            {(() => {
              const Icon = SERVICES[hovered].icon;
              return <Icon size={30} />;
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
