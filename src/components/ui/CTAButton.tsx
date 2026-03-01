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
    "bg-kaizer-blue text-white border border-kaizer-blue hover:bg-kaizer-blue-dark hover:border-kaizer-blue-dark active:scale-[0.97]",
  outline:
    "bg-transparent text-kaizer-blue border border-kaizer-blue hover:bg-kaizer-blue hover:text-white active:scale-[0.97]",
  ghost:
    "bg-transparent text-kaizer-light border border-transparent hover:text-white hover:border-kaizer-border active:scale-[0.97]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-sm font-semibold",
  lg: "px-8 py-3 text-base font-semibold",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer tracking-wide select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kaizer-blue disabled:opacity-50 disabled:pointer-events-none";

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
