// Blue Lock RPG - Layout Component
// Design: Manga Dynamic - Dark anime aesthetic with electric blue accents
// Navbar: Horizontal top nav with Blue Lock branding and section links

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap, ChevronDown, Flame } from "lucide-react";
import { useFlow } from "@/contexts/FlowContext";
import { CommandPalette } from "./CommandPalette";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Início", category: "principal" },
  { href: "/criacao", label: "Criar Ficha", category: "criacao" },
  { href: "/atributos", label: "Atributos", category: "regras" },
  { href: "/pericias", label: "Perícias", category: "regras" },
  { href: "/classes", label: "Classes", category: "regras" },
  { href: "/mecanicas", label: "Mecânicas", category: "regras" },
  { href: "/mecanicas-avancadas", label: "Mec. Avançadas", category: "regras" },
  { href: "/acoes", label: "Ações", category: "regras" },
  { href: "/fluxo", label: "Fluxo", category: "regras" },
  { href: "/fluxo-detalhado", label: "Fluxo Detalhado", category: "regras" },
  { href: "/itens-condicoes", label: "Itens & Condições", category: "regras" },
  { href: "/calculadora", label: "Calculadora", category: "ferramentas" },
  { href: "/guia-narrador", label: "Guia Narrador", category: "mestre" },
  { href: "/mestres", label: "Mestres", category: "mestre" },
  { href: "/exemplo", label: "Exemplo", category: "mestre" },
  { href: "/treinamentos", label: "Treinamentos", category: "mestre" },
  { href: "/ego", label: "Ego", category: "mestre" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [regrasOpen, setRegrasOpen] = useState(false);
  const [mestreOpen, setMestreOpen] = useState(false);
  const { isFlowActive, toggleFlow } = useFlow();

  const principalLinks = navLinks.filter(l => l.category === 'principal' || l.category === 'criacao');
  const regrasLinks = navLinks.filter(l => l.category === 'regras');
  const ferramentasLinks = navLinks.filter(l => l.category === 'ferramentas');
  const mestreLinks = navLinks.filter(l => l.category === 'mestre');

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${isFlowActive ? 'bl-flow-mode' : ''}`} style={isFlowActive ? { background: 'linear-gradient(135deg, oklch(0.08 0.02 280), oklch(0.06 0.02 320))' } : {}}>
      {/* Scanline overlay */}
      <div className="bl-scanline"></div>
      
      {/* Flow Mode Particles */}
      {isFlowActive && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      )}
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md transition-all duration-300" style={{ background: isFlowActive ? 'oklch(0.08 0.02 280 / 0.97)' : 'oklch(0.08 0.01 260 / 0.97)' }}>
        <div className="bl-nav-container">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className={`w-9 h-9 rounded-sm flex items-center justify-center relative overflow-hidden transition-all group-hover:shadow-lg ${isFlowActive ? 'bg-purple-600' : ''}`} style={{ background: isFlowActive ? 'oklch(0.52 0.22 280)' : 'oklch(0.52 0.22 260)' }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-lg tracking-widest text-white leading-none">BLUE LOCK</span>
                <span className="block font-heading text-xs tracking-[0.3em] uppercase" style={{ color: isFlowActive ? 'oklch(0.75 0.15 280)' : 'oklch(0.75 0.15 230)' }}>RPG</span>
              </div>
            </Link>

            {/* Desktop Nav — visível a partir de 768px */}
            <nav className="hidden md:flex items-center gap-1 flex-1 justify-center flex-wrap">
              {principalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`bl-nav-link text-xs px-3 py-1 whitespace-nowrap transition-all ${location === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Regras Dropdown */}
              <div className="relative group">
                <button className="bl-nav-link text-xs px-3 py-1 whitespace-nowrap flex items-center gap-1 group-hover:text-white transition-all">
                  REGRAS
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
                  <div className="bg-gradient-to-b from-black/98 to-black/90 border border-blue-500/20 rounded-sm py-2 min-w-max shadow-2xl backdrop-blur-sm">
                    {regrasLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 text-xs whitespace-nowrap transition-all ${
                          location === link.href
                            ? 'text-white bg-blue-500/20'
                            : 'text-muted-foreground hover:text-white hover:bg-blue-500/10'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ferramentas */}
              {ferramentasLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`bl-nav-link text-xs px-3 py-1 whitespace-nowrap transition-all ${location === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Guia do Mestre Dropdown */}
              <div className="relative group">
                <button className="bl-nav-link text-xs px-3 py-1 whitespace-nowrap flex items-center gap-1 group-hover:text-white transition-all">
                  MESTRE
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full pt-1 hidden group-hover:block z-50">
                  <div className="bg-gradient-to-b from-black/98 to-black/90 border border-blue-500/20 rounded-sm py-2 min-w-max shadow-2xl backdrop-blur-sm">
                    {mestreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 text-xs whitespace-nowrap transition-all ${
                          location === link.href
                            ? 'text-white bg-blue-500/20'
                            : 'text-muted-foreground hover:text-white hover:bg-blue-500/10'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Command Palette / Search */}
            <CommandPalette />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Flow Toggle Button */}
            <button
              onClick={toggleFlow}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-heading tracking-wider uppercase transition-all duration-300 flex-shrink-0 ${
                isFlowActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-transparent text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
              title="Ativar modo Ego/Flow"
            >
              <Flame className="w-4 h-4" />
              <span className="hidden md:inline">EGO</span>
            </button>

            {/* CTA Button — desktop */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <Link href="/ficha" className="bl-btn-primary text-xs px-4 py-2 transition-all hover:shadow-lg">
                Criar Ficha
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-sm transition-colors flex-shrink-0"
              style={{ color: isFlowActive ? 'oklch(0.75 0.15 280)' : 'oklch(0.75 0.15 230)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 py-4 animate-in fade-in slide-in-from-top-2" style={{ background: isFlowActive ? 'oklch(0.08 0.02 280)' : 'oklch(0.08 0.01 260)' }}>
            <div className="bl-nav-container flex flex-col gap-1">
              {principalLinks.map((link) => (
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

              {/* Mobile Regras */}
              <button
                onClick={() => setRegrasOpen(!regrasOpen)}
                className="px-3 py-2.5 rounded-sm font-heading text-sm tracking-wider uppercase transition-colors text-muted-foreground hover:text-white hover:bg-white/5 flex items-center justify-between"
              >
                Regras
                <ChevronDown className={`w-4 h-4 transition-transform ${regrasOpen ? 'rotate-180' : ''}`} />
              </button>
              {regrasOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {regrasLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-sm font-heading text-xs tracking-wider uppercase transition-colors ${
                        location === link.href
                          ? 'text-white bg-primary/20'
                          : 'text-muted-foreground hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Ferramentas */}
              {ferramentasLinks.map((link) => (
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

              {/* Mobile Mestre */}
              <button
                onClick={() => setMestreOpen(!mestreOpen)}
                className="px-3 py-2.5 rounded-sm font-heading text-sm tracking-wider uppercase transition-colors text-muted-foreground hover:text-white hover:bg-white/5 flex items-center justify-between"
              >
                Mestre
                <ChevronDown className={`w-4 h-4 transition-transform ${mestreOpen ? 'rotate-180' : ''}`} />
              </button>
              {mestreOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {mestreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-sm font-heading text-xs tracking-wider uppercase transition-colors ${
                        location === link.href
                          ? 'text-white bg-primary/20'
                          : 'text-muted-foreground hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Mobile Flow Toggle */}
              <button
                onClick={() => {
                  toggleFlow();
                  setMobileOpen(false);
                }}
                className={`px-3 py-2.5 rounded-sm font-heading text-sm tracking-wider uppercase transition-colors flex items-center justify-between w-full ${
                  isFlowActive
                    ? 'bg-purple-600 text-white'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Modo Ego
                </span>
              </button>

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
      <footer className="border-t border-border/50 py-8 mt-16 transition-colors duration-300" style={{ background: isFlowActive ? 'oklch(0.06 0.02 280)' : 'oklch(0.06 0.01 260)' }}>
        <div className="bl-nav-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-sm flex items-center justify-center transition-colors ${isFlowActive ? 'bg-purple-600' : ''}`} style={{ background: isFlowActive ? 'oklch(0.52 0.22 280)' : 'oklch(0.52 0.22 260)' }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display text-base tracking-widest text-white">BLUE LOCK RPG</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-heading tracking-wider">
                Escrito por <span style={{ color: isFlowActive ? 'oklch(0.75 0.15 280)' : 'oklch(0.75 0.15 230)' }}>Manjiro_O`Zeno</span> · Design por <span style={{ color: isFlowActive ? 'oklch(0.75 0.15 280)' : 'oklch(0.75 0.15 230)' }}>Antonio P. Grandin</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Sistema de RPG baseado no universo de Blue Lock · Livro de Regras v4.0
              </p>
              <p className="text-sm mt-3 font-bold" style={{ color: isFlowActive ? 'oklch(0.75 0.15 280)' : 'oklch(0.75 0.15 230)' }}>
                🚀 Site feito por <span className="text-base" style={{ color: isFlowActive ? 'oklch(0.52 0.22 280)' : 'oklch(0.52 0.22 260)' }}>oja/sado</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Contato: <a href="mailto:ja4690241@gmail.com" className="hover:text-white transition-colors" style={{ color: isFlowActive ? 'oklch(0.75 0.15 280)' : 'oklch(0.75 0.15 230)' }}>ja4690241@gmail.com</a>
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs text-muted-foreground font-heading tracking-wider uppercase">
              <p>© 2026 Blue Lock RPG</p>
              <span className="hidden md:block">·</span>
              <p>Desenvolvido com ❤️</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
