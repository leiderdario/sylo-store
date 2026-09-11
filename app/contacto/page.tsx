"use client";

import { ContactForm } from "@/components/contact-form";
import { useLanguage } from "@/lib/language-context";
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  MessageCircle,
  Sparkles,
  Truck,
  ArrowUpRight,
} from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <section
      data-nav-theme="dark"
      className="relative min-h-screen overflow-hidden bg-navy-950 pt-[calc(var(--nav-h)+48px)] pb-28 text-ivory-100"
    >
      {/* Luces ambientales / Glow tecnológico en fondo */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-bronze-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-60 h-[450px] w-[450px] rounded-full bg-gold-400/15 blur-[150px]" />

      <div className="wrap relative z-10 max-w-[1240px]">
        {/* Encabezado editorial de alto impacto */}
        <div className="mb-14 max-w-[760px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-gold-300">
            <Sparkles size={13} />
            <span>{t("contact.badge")}</span>
          </div>
          <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] tracking-tight">
            {t("contact.title")}
          </h1>
          <p className="mt-5 text-[17px] text-powder-200/90 max-w-[620px] leading-relaxed">
            {t("contact.lead")}
          </p>
        </div>

        {/* Layout en 2 columnas: Formulario inteligente + Operations Hub Card */}
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] items-start">
          {/* Columna Izquierda: Formulario con microinteracciones */}
          <div className="rounded-3xl border border-white/10 bg-navy-900/40 p-7 sm:p-10 shadow-2xl backdrop-blur-xl">
            <ContactForm />
          </div>

          {/* Columna Derecha: Panel de Operaciones en Vivo & Garantías */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            {/* Tarjeta 1: Estado en vivo del almacén */}
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-navy-900/90 to-navy-900/50 p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[13px] font-bold uppercase tracking-wider text-emerald-300">
                    {t("contact.hub_status")}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  EST Timezone
                </span>
              </div>

              <div className="mt-5 space-y-4 text-[13.5px]">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gold-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ivory-100">{t("contact.location_title")}</strong>
                    <span className="text-stone-400 text-[13px]">
                      {t("contact.location_desc")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-gold-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ivory-100">{t("contact.response_title")}</strong>
                    <span className="text-stone-400 text-[13px]">
                      {t("contact.response_desc")}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck size={18} className="text-gold-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ivory-100">{t("contact.turnaround_title")}</strong>
                    <span className="text-stone-400 text-[13px]">
                      {t("contact.turnaround_desc")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón WhatsApp directo */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <a
                  href="https://wa.me/10000000000"
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center justify-between rounded-xl bg-emerald-600/20 border border-emerald-500/30 p-3.5 text-[13.5px] font-bold text-emerald-300 transition-all hover:bg-emerald-600/30 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-900/40"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle size={18} />
                    <span>{t("contact.whatsapp_btn")}</span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Tarjeta 2: Qué incluye cada cotización */}
            <div className="rounded-2xl border border-white/10 bg-navy-900/40 p-6 backdrop-blur-md">
              <h4 className="font-serif text-[18px] text-ivory-100 mb-3 flex items-center gap-2">
                <ShieldCheck size={19} className="text-gold-300" />
                <span>{t("contact.guarantee_title")}</span>
              </h4>
              <ul className="space-y-2.5 text-[13px] text-powder-200/90">
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-gold-400 shrink-0" />
                  <span>Inspección visual y conteo pieza por pieza.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-gold-400 shrink-0" />
                  <span>Reporte fotográfico de discrepancias antes de etiquetar.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-gold-400 shrink-0" />
                  <span>Cumplimiento estricto de lineamientos Amazon FBA.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-gold-400 shrink-0" />
                  <span>Tarifas claras por unidad sin cargos ocultos.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
