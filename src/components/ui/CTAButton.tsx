import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

interface CTAButtonProps {
  children:  ReactNode;
  href?:     string;          // Si tiene href → renderiza <Link>; si no → <button>
  onClick?:  () => void;
  variant?:  Variant;
  size?:     Size;
  fullWidth?: boolean;
  disabled?:  boolean;
  type?:     "button" | "submit" | "reset";
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-kaizer-cyan text-kaizer-dark border border-kaizer-cyan font-bold " +
    "hover:bg-kaizer-cyan-light hover:border-kaizer-cyan-light " +
    "shadow-[0_0_20px_rgba(0,192,222,0.25)] hover:shadow-[0_0_28px_rgba(0,192,222,0.40)] " +
    "active:scale-[0.97]",
  outline:
    "bg-transparent text-kaizer-cyan border-2 border-kaizer-cyan font-bold " +
    "hover:bg-kaizer-cyan hover:text-kaizer-dark " +
    "active:scale-[0.97]",
  ghost:
    "bg-transparent text-kaizer-white border border-transparent font-semibold " +
    "hover:text-white hover:border-kaizer-border " +
    "active:scale-[0.97]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] " +
  "transition-all duration-200 cursor-pointer tracking-wide select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kaizer-cyan " +
  "disabled:opacity-50 disabled:pointer-events-none";

/**
 * Botón CTA reutilizable.
 * Soporta variantes primary / outline / ghost y tres tamaños.
 * Cuando recibe `href` actúa como <Link> para navegación interna.
 */
export default function CTAButton({
  children,
  href,
  onClick,
  variant  = "primary",
  size     = "md",
  fullWidth = false,
  disabled  = false,
  type     = "button",
  className = "",
}: CTAButtonProps) {
  const classes = [
    base,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
