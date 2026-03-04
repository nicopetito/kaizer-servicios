"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  visible,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50"
          role="alert"
          aria-live="polite"
        >
          <div className={[
            "flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-white",
            "border shadow-[0_4px_24px_rgba(10,15,30,0.10),0_1px_4px_rgba(10,15,30,0.06)]",
            "max-w-[320px] min-w-[240px]",
            isSuccess ? "border-[#E4EBF5] border-l-[3px] border-l-[#00C0DE]" : "border-[#E4EBF5] border-l-[3px] border-l-red-400",
          ].join(" ")}>

            {/* Icon */}
            <div className={[
              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
              isSuccess ? "bg-[#E6F9FD] text-[#00C0DE]" : "bg-red-50 text-red-500",
            ].join(" ")}>
              {isSuccess ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              )}
            </div>

            {/* Message */}
            <p className="text-sm text-[#3D5068] leading-snug flex-1">{message}</p>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="flex-shrink-0 text-[#7A95B0] hover:text-[#0A0F1E] transition-colors duration-150 mt-0.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
