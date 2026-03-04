import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size    = "sm" | "md" | "lg";

interface CTAButtonProps {
  children:   ReactNode;
  href?:      string;
  onClick?:   () => void;
  variant?:   Variant;
  size?:      Size;
  fullWidth?:  boolean;
  disabled?:   boolean;
  type?:      "button" | "submit" | "reset";
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#00C0DE] text-white border border-[#00C0DE] font-semibold " +
    "hover:bg-[#009AB8] hover:border-[#009AB8] hover:scale-[1.02] " +
    "shadow-[0_0_0_1px_rgba(0,192,222,0.15),0_2px_12px_rgba(0,192,222,0.18)] " +
    "hover:shadow-[0_0_0_1px_rgba(0,192,222,0.25),0_4px_20px_rgba(0,192,222,0.28)] " +
    "active:scale-[0.98]",
  outline:
    "bg-transparent text-[#00C0DE] border-2 border-[#00C0DE] font-semibold " +
    "hover:bg-[#00C0DE] hover:text-white hover:scale-[1.02] " +
    "active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#3D5068] border border-transparent font-medium " +
    "hover:text-[#0A0F1E] hover:bg-[#F6F9FC] hover:border-[#E4EBF5] " +
    "active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-2.5 text-sm",
  lg: "px-8 py-3 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full " +
  "transition-all duration-200 cursor-pointer tracking-wide select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C0DE] " +
  "disabled:opacity-50 disabled:pointer-events-none";

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
