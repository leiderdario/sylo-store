"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "es" | "en" | "pt" | "zh";

export interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const LANGUAGES: { code: Locale; name: string; nativeName: string; flag: string }[] = [
  { code: "es", name: "Español", nativeName: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", nativeName: "Português", flag: "🇧🇷" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
];

export const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.prep": "Prep Center",
    "nav.shop": "Catálogo",
    "nav.contact": "Contacto",
    "nav.quote": "Cotizar Ahora",
    // Hero
    "hero.eyebrow": "Prep Center & Logística FBA",
    "hero.headline": "Todo lo que pasa entre tu proveedor y Amazon.",
    "hero.lead": "Recepción, inspección, etiquetado FBA, almacenamiento y kitting — gestionado por un solo equipo bajo el mismo techo en Miami.",
    "hero.cta_quote": "Solicitar Cotización",
    "hero.cta_process": "Explorar el Proceso",
    // Process
    "process.badge": "Experiencia Interactiva de Pipeline",
    "process.title": "Tu inventario, paso a paso.",
    "process.lead": "Del proveedor a Amazon, sin que tu inventario pase por más de un par de manos. Desplaza la página para recorrer la operación en tiempo real.",
    "process.status": "Estado del Conveyor",
    "process.moving_down": "Avanzando (Down)",
    "process.moving_up": "Retrocediendo (Up)",
    "process.locked": "Estación Bloqueada — Inactivo",
    "process.progress": "Progreso",
    "process.sop": "Procedimiento Operativo Estándar",
    "process.rotation": "Rotación 3D",
    // Stages
    "stage.1.title": "Recepción",
    "stage.1.desc": "Tu cargamento llega a Miami y es verificado contra la orden de compra y lista de empaque.",
    "stage.2.title": "Inspección",
    "stage.2.desc": "Cada unidad es contada, verificada y fotografiada ante cualquier discrepancia antes de continuar.",
    "stage.3.title": "Preparación & FNSKU",
    "stage.3.desc": "Etiquetas FNSKU, polybags transparentes, sellos de advertencia y cualquier requerimiento de Amazon.",
    "stage.4.title": "Almacenamiento",
    "stage.4.desc": "Custodia segura y monitoreada en nuestro almacén hasta que tu lote deba enviarse a Amazon.",
    "stage.5.title": "Despacho a Amazon",
    "stage.5.desc": "Paletizado o cajas rotuladas con guías oficiales de Amazon Logistics, listas para envío FBA.",
    // Split
    "split.pill_prep": "Prep Center",
    "split.pill_shop": "Catálogo Amazon",
    "split.open_shop": "Abrir Catálogo",
    "split.view_amazon": "Ver productos en Amazon",
    "split.back_prep": "Prep Center",
    "split.back_prep_desc": "Volver a servicios & cotización",
    // Four services
    "services.title": "Cuatro servicios, un solo equipo",
    "services.lead": "Todo pasa por las mismas manos, desde que tu envío llega hasta que sale rumbo a Amazon.",
    "services.1": "Recepción e Inspección",
    "services.2": "Etiquetado FBA & Prep",
    "services.3": "Almacenamiento Seguro",
    "services.4": "Kitting & Bundling",
    // Global
    "global.title": "Vende desde cualquier lugar. Prepara desde aquí.",
    "global.lead": "Sin importar dónde esté tu negocio, tu inventario recorre el mismo proceso riguroso antes de llegar a Amazon.",
    "global.consistency": "Consistencia",
    "global.consistency_desc": "El mismo estándar estricto en cada envío.",
    "global.visibility": "Visibilidad",
    "global.visibility_desc": "Siempre sabes en qué punto exacto está tu inventario.",
    "global.flexibility": "Flexibilidad",
    "global.flexibility_desc": "Un envío puntual o volumen continuo mensual.",
    // Prep CTA
    "cta.title": "Tu inventario está listo. Llevémoslo a Amazon.",
    "cta.btn": "Pedir Cotización",
    // Shop
    "shop.title": "También en Amazon",
    "shop.lead": "Una selección viva de lo que estamos moviendo ahora — cada pieza se compra y se envía a través de Amazon.",
    "shop.quick_view": "Vista Rápida",
    "shop.buy_amazon": "Comprar en Amazon",
    // Contact
    "contact.badge": "Mesa Directa de Operaciones — Cotización Rápida",
    "contact.title": "Hablemos de tu inventario.",
    "contact.lead": "Pídenos una cotización personalizada para el Prep Center, resuelve dudas sobre productos de Amazon o coordina un plan de almacenamiento continuo con nuestro equipo en Miami.",
    "contact.q1": "1. ¿Sobre qué trata tu consulta?",
    "contact.opt_prep": "Cotización Prep Center",
    "contact.opt_prep_desc": "Recepción, FBA prep e inspección",
    "contact.opt_shop": "Tienda & Catálogo",
    "contact.opt_shop_desc": "Dudas sobre piezas y pedidos",
    "contact.opt_collab": "Alianzas & Wholesale",
    "contact.opt_collab_desc": "Marcas y distribución B2B",
    "contact.opt_other": "Consulta General",
    "contact.opt_other_desc": "Cualquier otra inquietud",
    "contact.volume_label": "Volumen estimado de unidades al mes:",
    "contact.services_label": "Servicios de preparación que requieres:",
    "contact.turnaround": "Tiempo estimado de procesamiento: 24 a 48 horas",
    "contact.name_label": "Tu Nombre Completo *",
    "contact.name_ph": "Ej. Juan Pérez",
    "contact.email_label": "Correo Electrónico *",
    "contact.phone_label": "Teléfono o WhatsApp (Opcional)",
    "contact.message_label": "Detalles de tu consulta o requerimientos especiales *",
    "contact.message_ph": "Cuéntanos sobre tu producto, proveedor actual, requerimientos de FBA, empaquetado o cualquier duda específica...",
    "contact.submit": "Enviar Solicitud",
    "contact.submitting": "Enviando información...",
    "contact.hub_status": "Miami Hub: Recepción Activa",
    "contact.location_title": "Ubicación Estratégica",
    "contact.location_desc": "Miami, Florida — Cercanía inmediata con los principales puertos y centros logísticos FBA.",
    "contact.response_title": "Tiempo de Respuesta Rápido",
    "contact.response_desc": "Cotizaciones respondidas en menos de 2 a 4 horas en días laborables.",
    "contact.turnaround_title": "Turnaround FBA",
    "contact.turnaround_desc": "24 a 48h desde recepción física hasta despacho a Amazon.",
    "contact.whatsapp_btn": "¿Necesitas respuesta inmediata? WhatsApp",
    "contact.guarantee_title": "Nuestra Garantía Sylo",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.prep": "Prep Center",
    "nav.shop": "Shop",
    "nav.contact": "Contact",
    "nav.quote": "Request a Quote",
    // Hero
    "hero.eyebrow": "Prep Center & FBA Logistics",
    "hero.headline": "Everything between your supplier and Amazon.",
    "hero.lead": "Receiving, inspection, FBA labeling, storage, and kitting — handled by one dedicated team under one roof in Miami.",
    "hero.cta_quote": "Request a Prep Quote",
    "hero.cta_process": "Explore the Process",
    // Process
    "process.badge": "Interactive Pipeline Experience",
    "process.title": "Your inventory, step by step.",
    "process.lead": "From supplier to Amazon, without your inventory passing through more than one set of hands. Scroll to trace operations in real-time.",
    "process.status": "Conveyor Status",
    "process.moving_down": "Moving Forward (Down)",
    "process.moving_up": "Reversing Track (Up)",
    "process.locked": "Station Locked — Idle",
    "process.progress": "Progress",
    "process.sop": "Standard Operating Procedure",
    "process.rotation": "3D Rotation",
    // Stages
    "stage.1.title": "Receive",
    "stage.1.desc": "Your shipment lands in Miami and is rigorously checked in against your packing list and purchase order.",
    "stage.2.title": "Inspect",
    "stage.2.desc": "Every single unit is counted, inspected, and photographed for any discrepancies before proceeding.",
    "stage.3.title": "Prep & Label",
    "stage.3.desc": "FNSKU barcodes, clear poly bags, warning labels, and any prep Amazon FBA strictly demands.",
    "stage.4.title": "Store",
    "stage.4.desc": "Held safely in our climate-controlled warehouse until your replenishment plan is ready to deploy.",
    "stage.5.title": "Ship to Amazon",
    "stage.5.desc": "Prepared boxes and pallets labeled with official Amazon Logistics shipping labels, ready for delivery.",
    // Split
    "split.pill_prep": "Prep Center",
    "split.pill_shop": "Amazon Shop Catalog",
    "split.open_shop": "Open Catalog",
    "split.view_amazon": "Browse Amazon Deals",
    "split.back_prep": "Prep Center",
    "split.back_prep_desc": "Return to services & quote",
    // Four services
    "services.title": "Four services, one team",
    "services.lead": "Everything runs through the same hands, from the moment your shipment lands to the moment it leaves for Amazon.",
    "services.1": "Receiving & Inspection",
    "services.2": "FBA Labeling & Prep",
    "services.3": "Secure Storage",
    "services.4": "Kitting & Bundling",
    // Global
    "global.title": "Sell from anywhere. Prep from here.",
    "global.lead": "Wherever your business is based, your inventory routes through the same careful process before reaching Amazon.",
    "global.consistency": "Consistency",
    "global.consistency_desc": "The exact same rigorous standard on every single shipment.",
    "global.visibility": "Visibility",
    "global.visibility_desc": "You always know precisely where your inventory stands.",
    "global.flexibility": "Flexibility",
    "global.flexibility_desc": "A one-off test run or high ongoing monthly volume.",
    // Prep CTA
    "cta.title": "Your inventory is ready. Let's get it to Amazon.",
    "cta.btn": "Request a Quote",
    // Shop
    "shop.title": "Also on Amazon",
    "shop.lead": "A running edit of what we're moving right now — every piece ships and sells directly through Amazon.",
    "shop.quick_view": "Quick View",
    "shop.buy_amazon": "Buy on Amazon",
    // Contact
    "contact.badge": "Direct Operations Desk — Fast Quote",
    "contact.title": "Let's talk about your inventory.",
    "contact.lead": "Request a custom Prep Center quote, ask questions about our Amazon shop curation, or set up ongoing warehouse logistics with our Miami team.",
    "contact.q1": "1. What is this inquiry regarding?",
    "contact.opt_prep": "Prep Center Quote",
    "contact.opt_prep_desc": "Receiving, FBA prep & inspection",
    "contact.opt_shop": "Shop & Catalog",
    "contact.opt_shop_desc": "Inquiries on products & drops",
    "contact.opt_collab": "Wholesale & Collabs",
    "contact.opt_collab_desc": "Brand partnerships & B2B",
    "contact.opt_other": "General Inquiry",
    "contact.opt_other_desc": "Any other questions",
    "contact.volume_label": "Estimated monthly unit volume:",
    "contact.services_label": "Prep services required:",
    "contact.turnaround": "Estimated turnaround time: 24 to 48 hours",
    "contact.name_label": "Full Name *",
    "contact.name_ph": "e.g. John Doe",
    "contact.email_label": "Email Address *",
    "contact.phone_label": "Phone or WhatsApp (Optional)",
    "contact.message_label": "Message or special requirements *",
    "contact.message_ph": "Tell us about your product, supplier, FBA requirements, packaging or questions...",
    "contact.submit": "Submit Request",
    "contact.submitting": "Sending details...",
    "contact.hub_status": "Miami Hub: Receiving Active",
    "contact.location_title": "Strategic Location",
    "contact.location_desc": "Miami, Florida — Immediate proximity to international ports and Amazon fulfillment centers.",
    "contact.response_title": "Rapid Response Time",
    "contact.response_desc": "Quotes returned within 2 to 4 business hours.",
    "contact.turnaround_title": "FBA Turnaround",
    "contact.turnaround_desc": "24 to 48 hours from physical intake to Amazon dispatch.",
    "contact.whatsapp_btn": "Need immediate answers? Chat on WhatsApp",
    "contact.guarantee_title": "Our Sylo Guarantee",
  },
  pt: {
    // Nav
    "nav.home": "Início",
    "nav.prep": "Prep Center",
    "nav.shop": "Catálogo",
    "nav.contact": "Contato",
    "nav.quote": "Pedir Cotação",
    // Hero
    "hero.eyebrow": "Prep Center & Logística FBA",
    "hero.headline": "Tudo o que acontece entre seu fornecedor e a Amazon.",
    "hero.lead": "Recebimento, inspeção, etiquetagem FBA, armazenamento e kitting — gerenciado por uma única equipe sob o mesmo teto em Miami.",
    "hero.cta_quote": "Solicitar Cotação Prep",
    "hero.cta_process": "Explorar o Processo",
    // Process
    "process.badge": "Experiência de Pipeline Interativo",
    "process.title": "Seu inventário, passo a passo.",
    "process.lead": "Do fornecedor à Amazon, sem que seus produtos passem por mais de uma equipe. Role a página para acompanhar as operações em tempo real.",
    "process.status": "Status da Esteira",
    "process.moving_down": "Avançando (Down)",
    "process.moving_up": "Recuando (Up)",
    "process.locked": "Estação Travada — Ociosa",
    "process.progress": "Progresso",
    "process.sop": "Procedimento Operacional Padrão",
    "process.rotation": "Rotação 3D",
    // Stages
    "stage.1.title": "Recebimento",
    "stage.1.desc": "Sua remessa chega a Miami e é rigorosamente conferida contra a nota e romaneio.",
    "stage.2.title": "Inspeção",
    "stage.2.desc": "Cada unidade é contada, inspecionada e fotografada em caso de discrepâncias.",
    "stage.3.title": "Prep & FNSKU",
    "stage.3.desc": "Etiquetas FNSKU, sacos polybag, avisos de sufocamento e conformidade total FBA.",
    "stage.4.title": "Armazenagem",
    "stage.4.desc": "Armazenamento seguro e monitorado até que seu lote seja enviado à Amazon.",
    "stage.5.title": "Envio para a Amazon",
    "stage.5.desc": "Caixas ou paletes preparados com etiquetas oficiais da Amazon Logistics.",
    // Split
    "split.pill_prep": "Prep Center",
    "split.pill_shop": "Catálogo Amazon",
    "split.open_shop": "Abrir Catálogo",
    "split.view_amazon": "Ver produtos na Amazon",
    "split.back_prep": "Prep Center",
    "split.back_prep_desc": "Voltar para serviços & cotação",
    // Four services
    "services.title": "Quatro serviços, uma única equipe",
    "services.lead": "Tudo passa pelas mesmas mãos, desde a chegada da carga até o despacho para a Amazon.",
    "services.1": "Recebimento e Inspeção",
    "services.2": "Etiquetagem FBA & Prep",
    "services.3": "Armazenamento Seguro",
    "services.4": "Kitting & Bundling",
    // Global
    "global.title": "Venda de qualquer lugar. Prepare a partir daqui.",
    "global.lead": "Onde quer que esteja sua empresa, seu estoque segue o mesmo processo cuidadoso antes de chegar à Amazon.",
    "global.consistency": "Consistência",
    "global.consistency_desc": "O mesmo padrão rigoroso em cada remessa.",
    "global.visibility": "Visibilidade",
    "global.visibility_desc": "Você sempre sabe exatamente onde seu estoque está.",
    "global.flexibility": "Flexibilidade",
    "global.flexibility_desc": "Uma remessa pontual ou grande volume mensal.",
    // Prep CTA
    "cta.title": "Seu estoque está pronto. Vamos enviá-lo à Amazon.",
    "cta.btn": "Pedir Cotação",
    // Shop
    "shop.title": "Também na Amazon",
    "shop.lead": "Uma curadoria viva do que estamos movimentando agora — cada item é vendido e enviado pela Amazon.",
    "shop.quick_view": "Espiar Produto",
    "shop.buy_amazon": "Comprar na Amazon",
    // Contact
    "contact.badge": "Mesa Direta de Operações — Cotação Rápida",
    "contact.title": "Vamos falar sobre seu estoque.",
    "contact.lead": "Peça uma cotação personalizada para o Prep Center, tire dúvidas sobre o catálogo ou organize logística contínua com nossa equipe em Miami.",
    "contact.q1": "1. Qual é o assunto do seu contato?",
    "contact.opt_prep": "Cotação Prep Center",
    "contact.opt_prep_desc": "Recebimento, prep FBA e inspeção",
    "contact.opt_shop": "Loja & Catálogo",
    "contact.opt_shop_desc": "Dúvidas sobre produtos e pedidos",
    "contact.opt_collab": "Parcerias & Wholesale",
    "contact.opt_collab_desc": "Marcas e distribuição B2B",
    "contact.opt_other": "Consulta Geral",
    "contact.opt_other_desc": "Qualquer outra dúvida",
    "contact.volume_label": "Volume estimado de unidades por mês:",
    "contact.services_label": "Serviços de preparação necessários:",
    "contact.turnaround": "Prazo estimado de processamento: 24 a 48 horas",
    "contact.name_label": "Nome Completo *",
    "contact.name_ph": "Ex. Carlos Silva",
    "contact.email_label": "E-mail *",
    "contact.phone_label": "Telefone ou WhatsApp (Opcional)",
    "contact.message_label": "Detalhes da consulta ou requerimentos *",
    "contact.message_ph": "Conte-nos sobre seu produto, fornecedor, exigências FBA ou embalagens...",
    "contact.submit": "Enviar Solicitação",
    "contact.submitting": "Enviando informações...",
    "contact.hub_status": "Miami Hub: Recebimento Ativo",
    "contact.location_title": "Localização Estratégica",
    "contact.location_desc": "Miami, Flórida — Próximo aos principais portos e centros de distribuição da Amazon.",
    "contact.response_title": "Tempo de Resposta Rápido",
    "contact.response_desc": "Cotações respondidas em menos de 2 a 4 horas em dias úteis.",
    "contact.turnaround_title": "Turnaround FBA",
    "contact.turnaround_desc": "24 a 48 horas do recebimento físico até o envio à Amazon.",
    "contact.whatsapp_btn": "Precisa de resposta rápida? Fale no WhatsApp",
    "contact.guarantee_title": "Nossa Garantia Sylo",
  },
  zh: {
    // Nav
    "nav.home": "首页",
    "nav.prep": "预处理中心",
    "nav.shop": "选品商城",
    "nav.contact": "联系我们",
    "nav.quote": "获取报价",
    // Hero
    "hero.eyebrow": "亚马逊预处理中心 & FBA 物流",
    "hero.headline": "连接您的供货商与亚马逊之间的一切。",
    "hero.lead": "收货验货、FBA 贴标、质检分拣、仓储管理与定制组合包 — 迈阿密专业团队一站式高效完成。",
    "hero.cta_quote": "获取处理报价",
    "hero.cta_process": "了解操作流程",
    // Process
    "process.badge": "交互式全流程可视化",
    "process.title": "您的库存，步步安心。",
    "process.lead": "从供货商直达亚马逊，全程专业把控。滑动页面实时追踪仓库标准化作业流水线。",
    "process.status": "传送线状态",
    "process.moving_down": "正向传输 (向下滚动)",
    "process.moving_up": "反向调取 (向上滚动)",
    "process.locked": "工位已锁定 — 待命",
    "process.progress": "流程进度",
    "process.sop": "标准操作规程 (SOP)",
    "process.rotation": "3D 视角旋转",
    // Stages
    "stage.1.title": "入库验收",
    "stage.1.desc": "货物抵达迈阿密仓库，严格对照装箱清单与采购单进行核收查验。",
    "stage.2.title": "开箱质检",
    "stage.2.desc": "逐件清点、细致质检，发现异常立即高清拍照留证反馈。",
    "stage.3.title": "FBA 预处理与贴标",
    "stage.3.desc": "精密张贴 FNSKU 条形码、套防窒息警示塑料袋、防撕标签，全面合规。",
    "stage.4.title": "安全仓储",
    "stage.4.desc": "恒温恒湿监控仓库安全保管，随时待命响应亚马逊发货补仓计划。",
    "stage.5.title": "发往亚马逊 FBA",
    "stage.5.desc": "按亚马逊官方标准打托并贴附外箱集运标，火速交运物流中心。",
    // Split
    "split.pill_prep": "预处理服务 (Prep)",
    "split.pill_shop": "亚马逊优选目录",
    "split.open_shop": "浏览商城产品",
    "split.view_amazon": "查看亚马逊在售商品",
    "split.back_prep": "返回预处理中心",
    "split.back_prep_desc": "查看专业服务与报价",
    // Four services
    "services.title": "四大核心服务，同一支专业团队",
    "services.lead": "从入仓到发往亚马逊，每个环节均由专属团队严谨把控。",
    "services.1": "收货验收与照片核验",
    "services.2": "FBA 贴标与合规预处理",
    "services.3": "安全温控仓储",
    "services.4": "组合打包 (Kitting & Bundling)",
    // Global
    "global.title": "全球随心运营，迈阿密为您驻守后方。",
    "global.lead": "无论您的企业位于哪个国家，您的库存均在迈阿密经过严格标准处理，顺畅入仓亚马逊。",
    "global.consistency": "高度一致",
    "global.consistency_desc": "每个批次均执行最严苛的标准。",
    "global.visibility": "全程透明",
    "global.visibility_desc": "随时掌握库存与处理状态。",
    "global.flexibility": "灵活弹性",
    "global.flexibility_desc": "单次测试或高频大批量稳定出货均可支持。",
    // Prep CTA
    "cta.title": "库存整装待发，即刻启运亚马逊。",
    "cta.btn": "立即咨询报价",
    // Shop
    "shop.title": "亚马逊在售精选",
    "shop.lead": "实时选品精选目录 — 每件商品均通过亚马逊官方仓储与发货。",
    "shop.quick_view": "快速预览",
    "shop.buy_amazon": "前往亚马逊购买",
    // Contact
    "contact.badge": "迈阿密直通运营台 — 极速报价",
    "contact.title": "与我们探讨您的货物。",
    "contact.lead": "获取定制的预处理中心报价，咨询亚马逊在售选品，或与迈阿密团队建立长期海外仓合作。",
    "contact.q1": "1. 您的咨询类型：",
    "contact.opt_prep": "预处理中心报价",
    "contact.opt_prep_desc": "收货、FBA 贴标及检验",
    "contact.opt_shop": "商城与产品咨询",
    "contact.opt_shop_desc": "关于选品和订单疑问",
    "contact.opt_collab": "大宗批发与商务合作",
    "contact.opt_collab_desc": "品牌合作与 B2B 渠道",
    "contact.opt_other": "一般性咨询",
    "contact.opt_other_desc": "其他各类疑问",
    "contact.volume_label": "预估月处理件数：",
    "contact.services_label": "所需的具体预处理项目：",
    "contact.turnaround": "预计处理时效：24 至 48 小时",
    "contact.name_label": "您的姓名 *",
    "contact.name_ph": "例如：张先生 / 李女士",
    "contact.email_label": "电子邮箱 *",
    "contact.phone_label": "联系电话或微信/WhatsApp (选填)",
    "contact.message_label": "咨询详情或特殊要求 *",
    "contact.message_ph": "请描述您的产品类别、现有供应商、FBA 包装规格要求或任何特别注意事项...",
    "contact.submit": "提交咨询申请",
    "contact.submitting": "正在提交中...",
    "contact.hub_status": "迈阿密仓储中心：收货处理中",
    "contact.location_title": "战略枢纽位置",
    "contact.location_desc": "美国佛罗里达州迈阿密 — 紧邻主要国际港口和亚马逊主要集运枢纽。",
    "contact.response_title": "极速响应承诺",
    "contact.response_desc": "工作日 2 至 4 小时内快速答复报价。",
    "contact.turnaround_title": "FBA 入仓时效",
    "contact.turnaround_desc": "自物理收货起 24 至 48 小时内完成出仓交运。",
    "contact.whatsapp_btn": "需要即时沟通？通过 WhatsApp 在线交谈",
    "contact.guarantee_title": "Sylo 仓储品质保证",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem("sylo_lang") as Locale | null;
    if (saved && (saved === "es" || saved === "en" || saved === "pt" || saved === "zh")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("sylo_lang", newLocale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale;
    }
  };

  const t = (key: string): string => {
    return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS["es"]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
