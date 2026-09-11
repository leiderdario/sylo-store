/**
 * Fuente única de verdad para las imágenes del Prep Center.
 *
 * Por qué existe este archivo: el brief de rediseño (prompt.md, sección 6)
 * exige que ninguna URL de imagen quede hardcodeada dentro de la UI, para
 * poder reemplazar el material visual (placeholders -> fotos reales del
 * almacén) sin tocar un solo componente. Cambia los valores acá.
 *
 * Todas las URLs son enlaces directos a archivos de imagen (Unsplash Source
 * / CDN), nunca páginas de resultados de búsqueda. Si una de estas URLs
 * deja de responder, cada componente que las usa cae a un color de fondo
 * sólido (ver `fallbackClass` en cada stage) para que una imagen rota nunca
 * rompa la composición.
 */

export type PrepStageKey =
  | "hero"
  | "receive"
  | "inspect"
  | "prep"
  | "store"
  | "ship";

export const PREP_MEDIA: Record<PrepStageKey, string> = {
  hero: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1600&auto=format&fit=crop",
  receive:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop",
  inspect:
    "https://images.unsplash.com/photo-1601598851547-4137b04ba4f6?q=80&w=1400&auto=format&fit=crop",
  prep: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?q=80&w=1400&auto=format&fit=crop",
  store:
    "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1400&auto=format&fit=crop",
  ship: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?q=80&w=1400&auto=format&fit=crop",
};

export const PREP_MEDIA_ALT: Record<PrepStageKey, string> = {
  hero: "Cajas apiladas listas para salir hacia Amazon",
  receive: "Pallets de inventario recién recibidos en el andén",
  inspect: "Inspección unidad por unidad sobre banda de trabajo",
  prep: "Etiquetado FNSKU y empaque poly-bag",
  store: "Estanterías de almacenamiento organizadas por SKU",
  ship: "Salida de envíos preparados hacia Amazon",
};
