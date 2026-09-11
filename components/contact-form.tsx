"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import {
  Boxes,
  ShoppingBag,
  Handshake,
  HelpCircle,
  CheckCircle2,
  Send,
  Loader2,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const EASE = [0.22, 0.61, 0.36, 1] as const;


interface TopicOption {
  id: "Prep Center — Request a Quote" | "Shop / Product Question" | "Wholesale / Collaboration" | "Other";
  title: string;
  desc: string;
  icon: typeof Boxes;
  badge?: string;
}

const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: "Prep Center — Request a Quote",
    title: "Prep Center Quote",
    desc: "Recepción, FBA prep e inspección",
    icon: Boxes,
    badge: "Prioritario",
  },
  {
    id: "Shop / Product Question",
    title: "Shop & Amazon Catalog",
    desc: "Dudas sobre piezas y pedidos",
    icon: ShoppingBag,
  },
  {
    id: "Wholesale / Collaboration",
    title: "Wholesale & Collabs",
    desc: "Marcas y alianzas B2B",
    icon: Handshake,
  },
  {
    id: "Other",
    title: "Consulta General",
    desc: "Cualquier otra inquietud",
    icon: HelpCircle,
  },
];


const VOLUME_TIERS = [
  { label: "< 500 uds/mes", desc: "Arranque o lotes de prueba" },
  { label: "500 - 2,000 uds/mes", desc: "Crecimiento continuo" },
  { label: "2,000 - 10,000 uds/mes", desc: "Volumen comercial alto" },
  { label: "10,000+ uds/mes", desc: "Escala enterprise dedicada" },
];

const PREP_SERVICES = [
  "Inspección de calidad & fotos",
  "Etiquetado FNSKU / Códigos de barra",
  "Polybagging & embolsado sellado",
  "Kitting / Bundles multipack",
  "Almacenamiento temporal",
];

const schema = z.object({
  name: z.string().min(2, "Por favor indica tu nombre completo."),
  email: z.string().email("Ingresa un correo electrónico válido."),
  phone: z.string().optional(),
  topic: z.enum([
    "Prep Center — Request a Quote",
    "Shop / Product Question",
    "Wholesale / Collaboration",
    "Other",
  ]),
  message: z.string().min(6, "Por favor agrega detalles sobre tu consulta (mín. 6 caracteres)."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const { t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<
    (typeof TOPIC_OPTIONS)[number]["id"]
  >("Prep Center — Request a Quote");
  const [selectedVolume, setSelectedVolume] = useState<string>("500 - 2,000 uds/mes");
  const [activeServices, setActiveServices] = useState<string[]>([
    "Inspección de calidad & fotos",
    "Etiquetado FNSKU / Códigos de barra",
  ]);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");


  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      topic: "Prep Center — Request a Quote",
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function toggleService(service: string) {
    setActiveServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }

  function handleTopicChange(topicId: (typeof TOPIC_OPTIONS)[number]["id"]) {
    setSelectedTopic(topicId);
    setValue("topic", topicId, { shouldValidate: true });
  }

  async function onSubmit(values: FormValues) {
    try {
      const payload = {
        ...values,
        units: selectedTopic === "Prep Center — Request a Quote" ? selectedVolume : undefined,
        servicesNeeded:
          selectedTopic === "Prep Center — Request a Quote" ? activeServices : undefined,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent-state"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-2xl border border-gold-400/30 bg-navy-900/90 p-10 text-center shadow-2xl backdrop-blur-xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/15 text-gold-300 ring-8 ring-gold-400/5">
              <CheckCircle2 size={42} className="animate-bounce" />
            </div>
            <h3 className="font-serif text-[32px] text-ivory-100">
              ¡Mensaje recibido con éxito!
            </h3>
            <p className="mx-auto mt-4 max-w-[440px] text-[16px] text-powder-200">
              Un especialista de operaciones de Sylo revisará los datos de tu inventario y te responderá en menos de 2 a 4 horas laborales.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded-full bg-gold-400 px-8 py-3 text-[14px] font-bold text-navy-950 transition-all hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20"
              >
                Enviar otra consulta
              </button>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {/* 1. Selector interactivo de temática en tarjetas */}
            <div>
              <label className="mb-3 block text-[13px] font-bold uppercase tracking-[0.1em] text-gold-300">
                {t("contact.q1")}
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {TOPIC_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedTopic === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleTopicChange(opt.id)}
                      className={cn(
                        "group relative flex items-start gap-3.5 rounded-xl border p-4 text-left transition-all duration-300",
                        isSelected
                          ? "border-gold-400 bg-navy-800/90 shadow-[0_4px_25px_rgba(201,168,118,0.18)]"
                          : "border-white/10 bg-navy-900/50 hover:border-white/20 hover:bg-navy-900/80"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                          isSelected
                            ? "bg-gold-400 text-navy-950 shadow-md"
                            : "bg-navy-800 text-powder-300 group-hover:bg-navy-700"
                        )}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              "text-[14.5px] font-bold",
                              isSelected ? "text-ivory-100" : "text-powder-200"
                            )}
                          >
                            {opt.title}
                          </span>
                          {opt.badge && (
                            <span className="rounded-full bg-gold-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[12.5px] text-stone-400">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Configurador dinámico de Prep Center (Macro-interacción animada) */}
            <AnimatePresence>
              {selectedTopic === "Prep Center — Request a Quote" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden rounded-2xl border border-white/15 bg-navy-900/70 p-6 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 mb-4 text-gold-300">
                    <Sparkles size={18} />
                    <h4 className="text-[13px] font-bold uppercase tracking-[0.1em]">
                      Estimador de volumen & servicios requeridos
                    </h4>
                  </div>

                  {/* Volumen mensual */}
                  <div className="mb-6">
                    <label className="mb-2 block text-[13px] text-stone-400">
                      {t("contact.volume_label")}
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {VOLUME_TIERS.map((tier) => (
                        <button
                          key={tier.label}
                          type="button"
                          onClick={() => setSelectedVolume(tier.label)}
                          className={cn(
                            "flex flex-col rounded-lg border p-3 text-left transition-all",
                            selectedVolume === tier.label
                              ? "border-powder-300 bg-powder-300/15 text-ivory-100 shadow-sm"
                              : "border-white/10 bg-navy-950/60 text-stone-400 hover:border-white/20"
                          )}
                        >
                          <span className="text-[12.5px] font-bold text-ivory-100">
                            {tier.label}
                          </span>
                          <span className="mt-0.5 text-[11px] text-stone-400 line-clamp-1">
                            {tier.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Servicios requeridos */}
                  <div>
                    <label className="mb-2 block text-[13px] text-stone-400">
                      {t("contact.services_label")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PREP_SERVICES.map((srv) => {
                        const isChecked = activeServices.includes(srv);
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => toggleService(srv)}
                            className={cn(
                              "flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] transition-all",
                              isChecked
                                ? "border-gold-400 bg-gold-400/20 text-gold-300 font-medium"
                                : "border-white/10 bg-navy-950/60 text-stone-400 hover:border-white/20"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-full text-[10px]",
                                isChecked
                                  ? "bg-gold-400 text-navy-950 font-bold"
                                  : "border border-stone-500"
                              )}
                            >
                              {isChecked ? "✓" : ""}
                            </span>
                            <span>{srv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-lg bg-navy-950/80 px-4 py-3 border border-white/5 text-[12px] text-powder-300">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-gold-400" />
                      <span>{t("contact.turnaround")}</span>
                    </div>
                    <span className="text-stone-400 hidden sm:inline">Miami Warehouse</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. Datos de contacto */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="group">
                <label
                  htmlFor="name"
                  className="mb-1.5 flex items-center gap-2 text-[13px] font-medium text-stone-300"
                >
                  <User size={14} className="text-gold-400" />
                  <span>{t("contact.name_label")}</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    {...register("name")}
                    placeholder={t("contact.name_ph")}
                    className={cn(
                      "w-full rounded-xl border bg-navy-900/60 px-4 py-3.5 text-[15px] text-ivory-100 placeholder:text-stone-500 transition-all outline-none",
                      errors.name
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/30"
                        : "border-white/15 focus:border-gold-400 focus:bg-navy-900 focus:ring-2 focus:ring-gold-400/20"
                    )}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-[12px] text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="mb-1.5 flex items-center gap-2 text-[13px] font-medium text-stone-300"
                >
                  <Mail size={14} className="text-gold-400" />
                  <span>{t("contact.email_label")}</span>
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="email@domain.com"
                    className={cn(
                      "w-full rounded-xl border bg-navy-900/60 px-4 py-3.5 text-[15px] text-ivory-100 placeholder:text-stone-500 transition-all outline-none",
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-400/30"
                        : "border-white/15 focus:border-gold-400 focus:bg-navy-900 focus:ring-2 focus:ring-gold-400/20"
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-[12px] text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="group">
                <label
                  htmlFor="phone"
                  className="mb-1.5 flex items-center gap-2 text-[13px] font-medium text-stone-300"
                >
                  <Phone size={14} className="text-gold-400" />
                  <span>{t("contact.phone_label")}</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-white/15 bg-navy-900/60 px-4 py-3.5 text-[15px] text-ivory-100 placeholder:text-stone-500 transition-all outline-none focus:border-gold-400 focus:bg-navy-900 focus:ring-2 focus:ring-gold-400/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-stone-300">
                  {t("contact.guarantee_title")}
                </label>
                <div className="flex h-[52px] items-center gap-3 rounded-xl border border-white/10 bg-navy-900/30 px-4 text-[13px] text-powder-300">
                  <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                  <span>Atención prioritaria y confidencialidad de tus ASINs.</span>
                </div>
              </div>
            </div>

            {/* 4. Mensaje / Detalles */}
            <div className="group">
              <label
                htmlFor="message"
                className="mb-1.5 flex items-center gap-2 text-[13px] font-medium text-stone-300"
              >
                <MessageSquare size={14} className="text-gold-400" />
                <span>{t("contact.message_label")}</span>
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                placeholder={t("contact.message_ph")}
                className={cn(
                  "w-full rounded-xl border bg-navy-900/60 p-4 text-[15px] text-ivory-100 placeholder:text-stone-500 transition-all outline-none",
                  errors.message
                    ? "border-red-400 focus:ring-2 focus:ring-red-400/30"
                    : "border-white/15 focus:border-gold-400 focus:bg-navy-900 focus:ring-2 focus:ring-gold-400/20"
                )}
              />
              {errors.message && (
                <p className="mt-1.5 text-[12px] text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Botón de envío con microanimación */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold-400 to-gold-300 px-9 py-4 font-serif text-[15px] font-bold text-navy-950 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(201,168,118,0.35)] active:scale-[0.98] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>{t("contact.submitting")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("contact.submit")}</span>
                    <Send
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>


              <p className="text-[12.5px] text-stone-400 text-center sm:text-right">
                Sin contratos forzosos. Cotizaciones 100% transparentes.
              </p>
            </div>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-400/30 bg-red-950/40 p-4 text-center text-[13.5px] text-red-300"
              >
                Hubo un inconveniente al enviar tu mensaje. Por favor intenta de nuevo o escríbenos directamente por WhatsApp.
              </motion.div>
            )}
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
