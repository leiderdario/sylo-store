"use client";

import { motion } from "motion/react";

const VALUES = [
  { title: "Consistency", body: "El mismo proceso, en cada envío." },
  {
    title: "Visibility",
    body: "Siempre sabes en qué punto está tu inventario.",
  },
  {
    title: "Flexibility",
    body: "Un envío puntual o volumen continuo, ambos funcionan igual.",
  },
];

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function PrepGlobal() {
  return (
    <section data-nav-theme="dark" className="relative bg-navy-800 py-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,93,44,0.08),transparent_70%)]" />
      <div className="wrap relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-[560px] text-[clamp(30px,3.6vw,46px)]"
        >
          Sell from anywhere.
          <br />
          Prep from here.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-4 max-w-[480px] text-[16px] text-powder-200"
        >
          Sin importar dónde esté tu negocio, tu inventario recorre el
          mismo proceso cuidadoso antes de llegar a Amazon.
        </motion.p>

        <div className="mx-auto mt-16 grid max-w-[760px] gap-10 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            >
              <h4 className="font-serif text-[19px] text-bronze-300">{v.title}</h4>
              <p className="mt-2 text-[14px] text-stone-400">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
