"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORY_PILLS, PRODUCTS, type Product } from "@/data/products";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}

export function ShopGrid() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section id="shop" data-nav-theme="dark" className="bg-navy-950 py-28">
      <div className="wrap">
        <div className="mb-10 max-w-[640px]">
          <h2 className="text-[clamp(30px,3.6vw,46px)]">Also on Amazon</h2>
          <p className="mt-4 text-[17px] text-powder-200">
            Una selección viva de lo que estamos moviendo ahora — cada
            pieza se compra y se envía a través de Amazon.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-2.5">
          {CATEGORY_PILLS.map((pill) => (
            <button
              key={pill.value}
              onClick={() => setFilter(pill.value)}
              className={cn(
                "rounded-full border px-5 py-2 text-[13px] tracking-[0.02em] transition-all",
                filter === pill.value
                  ? "bg-gradient-to-r from-gold-400 to-gold-300 text-navy-950 font-bold border-gold-400 shadow-md shadow-gold-400/20"
                  : "border-white/14 hover:bg-white/8 hover:border-gold-400/40"
              )}
            >
              {pill.label}
            </button>
          ))}
          <button
            disabled
            className="cursor-not-allowed rounded-full border border-white/14 px-5 py-2 text-[13px] tracking-[0.02em] opacity-35"
          >
            Beauty — coming soon
          </button>
        </div>

        <motion.div layout className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  p.span === "feature" && "col-span-2 row-span-2",
                  p.span === "wide" && "col-span-2"
                )}
              >
                <button
                  onClick={() => setSelected(p)}
                  data-cursor="view"
                  className="group relative block aspect-square w-full overflow-hidden rounded-lg border border-white/10 bg-navy-900"
                >
                  {p.note && (
                    <span className="absolute left-3 top-3 z-10 rounded-sm bg-gradient-to-r from-gold-400 to-gold-300 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-navy-950 shadow-md">
                      {p.note}
                    </span>
                  )}
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-x-3 bottom-3 translate-y-16 rounded-[2px] bg-[rgba(244,241,232,0.96)] py-3 text-center text-[12.5px] font-bold uppercase tracking-[0.05em] text-navy-950 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Quick view
                  </span>
                </button>
                <div className="mt-4 flex justify-between gap-3">
                  <div>
                    <p className="max-w-[75%] text-[15px]">{p.name}</p>
                    <p className="mt-1 text-[12.5px] text-stone-400">
                      {p.catLabel}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right">
                    {p.listPrice && (
                      <span className="mr-1.5 text-[12.5px] text-stone-400 line-through">
                        {formatPrice(p.listPrice)}
                      </span>
                    )}
                    <span className="text-[15px] font-bold text-gold-300">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-7 text-[14.5px] text-stone-400">
          Beauty &amp; personal care se une pronto al shop — catálogo en
          verificación.
        </p>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        {selected && (
          <DialogContent className="grid grid-cols-1 sm:grid-cols-2">
            <div className="relative min-h-[220px] bg-navy-900 sm:min-h-[320px]">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="380px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 p-8 sm:p-10">
              <h3 className="font-serif text-[24px]">{selected.name}</h3>
              {selected.note && (
                <p className="text-stone-600">{selected.note}</p>
              )}
              <p className="text-[22px] font-bold">
                {formatPrice(selected.price)}{" "}
                {selected.listPrice && (
                  <span className="ml-2 text-[14px] font-normal text-stone-600 line-through">
                    {formatPrice(selected.listPrice)}
                  </span>
                )}
              </p>
              <p className="text-[14px] text-stone-600">
                Detalles completos, tallas y colores están en Amazon.
              </p>
              <a
                href={selected.url}
                target="_blank"
                rel="noopener"
                data-cursor="cart"
                className="inline-flex items-center justify-center rounded-[2px] bg-gradient-to-r from-gold-400 to-gold-300 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.06em] text-navy-950 shadow-md transition-all hover:brightness-105"
              >
                Comprar en Amazon
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
