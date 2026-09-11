"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsappButton() {
  return (
    <motion.a
      href="https://wa.me/00000000000"
      target="_blank"
      rel="noopener"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-[26px] right-[26px] z-[400] flex h-14 w-14 items-center justify-center rounded-full bg-ivory-100 text-navy-950 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:bottom-[26px] sm:right-[26px]"
      style={{ bottom: "18px", right: "18px" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
