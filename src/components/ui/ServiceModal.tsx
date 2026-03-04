"use client";

import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ServiceData {
  titulo: string;
  descripcion: string;
  etiquetas: string[];
  detalle?: string;
  icono: ReactNode;
}

interface ServiceModalProps {
  service: ServiceData | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  useEffect(() => {
    if (!service) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#0A0F1E]/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md bg-white rounded-[24px] shadow-[0_8px_40px_rgba(10,15,30,0.12),0_2px_8px_rgba(10,15,30,0.06)] border border-[#E4EBF5] overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={service.titulo}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-[#E6F9FD] flex items-center justify-center text-[#00C0DE] flex-shrink-0">
                    {service.icono}
                  </div>
                  <h2 className="font-semibold text-[#0A0F1E] text-lg leading-snug">
                    {service.titulo}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="ml-2 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#7A95B0] hover:bg-[#F6F9FC] hover:text-[#0A0F1E] transition-all duration-150"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#F0F4FA] mx-6" />

              {/* Body */}
              <div className="p-6 flex flex-col gap-4">
                <p className="text-[#3D5068] text-sm leading-relaxed">
                  {service.descripcion}
                </p>

                {service.detalle && (
                  <p className="text-[#7A95B0] text-sm leading-relaxed">
                    {service.detalle}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.etiquetas.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-[#E6F9FD] text-[#00C0DE] font-medium border border-[#00C0DE]/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="/contacto"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#00C0DE] text-white px-6 py-2.5 text-sm font-semibold hover:bg-[#009AB8] hover:scale-[1.01] transition-all duration-200 shadow-[0_2px_12px_rgba(0,192,222,0.2)]"
                >
                  Solicitar este servicio
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
