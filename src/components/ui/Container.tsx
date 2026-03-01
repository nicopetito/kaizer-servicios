import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Por defecto el padding horizontal es px-4 sm:px-6 lg:px-8 */
  noPadding?: boolean;
}

/**
 * Contenedor central con ancho máximo controlado.
 * Wrap cualquier sección de página con este componente
 * para mantener consistencia de layout.
 */
export default function Container({
  children,
  className = "",
  noPadding = false,
}: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-7xl",
        noPadding ? "" : "px-4 sm:px-6 lg:px-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
