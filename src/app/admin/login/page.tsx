"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-[var(--radius-lg)] bg-kaizer-cyan text-white mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-kaizer-white">Panel Admin</h1>
          <p className="text-kaizer-muted text-sm mt-1">Kaizer Servicios</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[var(--radius-xl)] border border-kaizer-border shadow-sm p-8">
          <h2 className="text-lg font-semibold text-kaizer-white mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-kaizer-light mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ejemplo.com"
                required
                className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border border-kaizer-border bg-bg-secondary text-kaizer-white placeholder:text-kaizer-muted/60 focus:outline-none focus:ring-2 focus:ring-kaizer-cyan/30 focus:border-kaizer-cyan text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-kaizer-light mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] border border-kaizer-border bg-bg-secondary text-kaizer-white placeholder:text-kaizer-muted/60 focus:outline-none focus:ring-2 focus:ring-kaizer-cyan/30 focus:border-kaizer-cyan text-sm transition-colors"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-rose-50 border border-rose-200 text-rose-600 text-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-[var(--radius-md)] bg-kaizer-cyan text-white font-semibold text-sm hover:bg-kaizer-cyan-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-kaizer-muted mt-6">
          Kaizer Servicios © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
