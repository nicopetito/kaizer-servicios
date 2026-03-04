import type { Metadata } from "next";
import ArticuloForm from "@/components/admin/ArticuloForm";

export const metadata: Metadata = { title: "Nuevo artículo" };

export default function NuevoArticuloPage() {
  return <ArticuloForm />;
}
