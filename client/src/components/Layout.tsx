// Blue Lock RPG - Layout Component
// Design: Manga Dynamic - Dark anime aesthetic with electric blue accents
// Navbar: Horizontal top nav with Blue Lock branding and section links

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/criacao", label: "Criação de Ficha" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/atributos", label: "Atributos" },
  { href: "/pericias", label: "Perícias" },
  { href: "/classes", label: "Classes" },
  { href: "/mecanicas", label: "Mecânicas" },
  { href: "/mecanicas-avancadas", label: "Avançadas" },
  { href: "/acoes", label: "Ações" },
  { href: "/fluxo", label: "Fluxo" },
  { href: "/fluxo-detalhado", label: "Fluxo Detalhado" },
  { href: "/itens-condicoes", label: "Itens & Condições" },
  { href: "/guia-narrador", label: "Guia Narrador" },
  { href: "/mestres", label: "Mestres" },
  { href: "/exemplo", label: "Exemplo" },
  { href: "/treinamentos", label: "Treinamentos" },
  { href: "/ego", label: "Ego" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md" style={{ background: 'oklch(0.08 0.01 260 / 0.95)' }}>
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-sm flex items-center justify-center relative overflow-hidden" style={{ background: 'oklch(0.52 0.22 260)' }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl tracking-widest text-white leading-none">BLUE LOCK</span>
                <span className="block font-heading text-xs tracking-[0.3em] uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>RPG</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`bl-nav-link ${location === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/ficha" className="bl-btn-primary text-xs px-4 py-2">
                Criar Ficha
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-sm transition-colors"
              style={{ color: 'oklch(0.75 0.15 230)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/50 py-4" style={{ background: 'oklch(0.08 0.01 260)' }}>
            <div className="container flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2.5 rounded-sm font-heading text-sm tracking-wider uppercase transition-colors ${
                    location === link.href
                      ? 'text-white bg-primary/20'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/ficha"
                className="bl-btn-primary text-xs mt-2 justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Criar Ficha
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16" style={{ background: 'oklch(0.06 0.01 260)' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: 'oklch(0.52 0.22 260)' }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display text-base tracking-widest text-white">BLUE LOCK RPG</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-heading tracking-wider">
                Escrito por <span style={{ color: 'oklch(0.75 0.15 230)' }}>Manjiro_O`Zeno</span> · Design por <span style={{ color: 'oklch(0.75 0.15 230)' }}>Antonio P. Grandin</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Sistema de RPG baseado no universo de Blue Lock · Livro de Regras v4.0
              </p>
              <p className="text-xs mt-2" style={{ color: 'oklch(0.75 0.15 230)' }}>
                Site feito por <span className="font-bold">oja\sado</span>
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-heading tracking-wider uppercase">
              <p>© 2026 Blue Lock RPG</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
