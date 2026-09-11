import type { PrepStageKey } from "@/lib/media";

export interface ProcessStage {
  key: PrepStageKey;
  index: string;
  title: string;
  description: string;
  tag: string;
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    key: "receive",
    index: "01",
    title: "Receive",
    description:
      "Tu envío llega y se verifica contra la lista de empaque antes de tocar el piso del almacén.",
    tag: "INBOUND VERIFIED",
  },
  {
    key: "inspect",
    index: "02",
    title: "Inspect",
    description:
      "Cada unidad se cuenta e inspecciona — daños, defectos y discrepancias se detectan acá, no en Amazon.",
    tag: "UNIT BY UNIT",
  },
  {
    key: "prep",
    index: "03",
    title: "Prep",
    description:
      "Etiquetas FNSKU, poly bags y cualquier prep que Amazon exija, hecho a la especificación exacta.",
    tag: "FBA READY",
  },
  {
    key: "store",
    index: "04",
    title: "Store",
    description:
      "Se guarda con seguridad y trazabilidad hasta que tu envío esté listo para moverse.",
    tag: "TRACKED",
  },
  {
    key: "ship",
    index: "05",
    title: "Ship",
    description:
      "El inventario preparado sale de Sylo y se dirige a un centro de cumplimiento de Amazon.",
    tag: "OUTBOUND",
  },
];
