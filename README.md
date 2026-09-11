# Sylo — Next.js 16 + stack premium

Migración de la maqueta HTML/CSS/JS a:

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui (primitivas
propias sobre Radix) · Motion (ex-Framer Motion) · GSAP + ScrollTrigger ·
Lenis (smooth scroll) · React Three Fiber / Drei (three.js, listo para usar)
· Lucide React · React Hook Form + Zod · next/image · Vercel.

## Cómo correrlo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # build de producción
npm run typecheck   # tsc --noEmit
```

Ya se corrió `npm install`, `tsc --noEmit` y `next build` en este entorno y
los tres pasan limpios. El único bloqueo que vas a ver si compilas *acá
mismo* es que este sandbox no tiene salida a `fonts.googleapis.com`; en tu
máquina o en Vercel `next/font/google` (Fraunces + Manrope) descarga normal.

## Dónde está cada cosa

- `app/page.tsx` — home: Hero → Prep Center (la pieza central) → Servicios →
  Global → CTA → Shop → Instagram.
- `app/contacto/page.tsx` — página de contacto.
- `components/prep-process.tsx` — **la experiencia central** que pide el
  brief: recorrido scroll-driven de 5 etapas (Receive → Inspect → Prep →
  Store → Ship) con panel visual `sticky` + GSAP ScrollTrigger leyendo el
  progreso del scroll (nunca lo controla — cero scroll-jacking).
- `components/hero-section.tsx` — hero con parallax por puntero (Motion) y
  fade/scale ligado al scroll.
- `components/shop-grid.tsx` — catálogo con filtros animados y quick-view
  en un Dialog (Radix).
- `components/contact-form.tsx` — formulario con validación Zod + RHF,
  conectado a `app/api/contact/route.ts` (validación server-side espejo,
  rate-limit básico por IP, listo para enchufar Resend con
  `RESEND_API_KEY` — ver `.env.local.example`).
- `components/custom-cursor.tsx` — cursor a medida con estados
  `view / cart / link / explore` vía `data-cursor="..."` en cualquier
  elemento; se desactiva solo en touch y con `prefers-reduced-motion`.
- `components/hero-scene.tsx` — capa ambiental en Three.js/R3F (una nube
  de puntos a la deriva) montada de forma diferida (`next/dynamic`,
  `ssr:false`) detrás del hero, y que ni siquiera se monta si el
  visitante pidió movimiento reducido.
- `lib/media.ts` — **PREP_MEDIA**: toda imagen del Prep Center vive acá.
  Cambiá las URLs (o pasá a rutas locales en `/public`) sin tocar ningún
  componente.
- `data/products.ts` / `data/process-stages.ts` — contenido portado 1:1
  desde la maqueta original.

## Qué falta / próximos pasos honestos

El brief (`prompt.md`) pide 60+ puntos de detalle. Esta pasada ya cubre:
arquitectura completa, el Prep Center como experiencia central (scroll-story
con GSAP ScrollTrigger), cursor personalizado, capa Three.js en el hero, y
el endpoint real de contacto con rate-limit — todo verificado con
`tsc --noEmit` y `next build` reales, no solo revisado a ojo.

Queda para la próxima iteración:

1. Reemplazar las imágenes de `lib/media.ts` (hoy son placeholders de
   Unsplash) por fotos reales del almacén.
2. Dar de alta un proveedor de email real (Resend u otro) con
   `RESEND_API_KEY` en `.env.local` — el código ya tiene el punto de
   conexión comentado en `app/api/contact/route.ts`.
3. Mapa de rutas globales animado (sección "Sell from anywhere") con más
   detalle que el actual, y tilt 3D del panel visual del proceso.
4. QA visual real en los breakpoints que pide la sección 56–57 del brief
   (1440/1280/1024 y 390/375/360) — este entorno no tiene navegador para
   capturar pantallas; conviene correr `npm run dev` y revisar a ojo, o
   pedir Playwright/Chrome DevTools MCP si lo tenés disponible.
