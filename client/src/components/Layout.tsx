// Blue Lock RPG - Layout Component
// Design: Manga Dynamic - Dark anime aesthetic with electric blue accents
// Navbar: Horizontal top nav with Blue Lock branding and organized section links
// Mobile: Optimized collapsible menu with categories and icons

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap, Home, BookOpen, Cog, Users, ChevronDown } from "lucide-react";
import CommandPalette from "./CommandPalette";

const CONTACT_EMAIL = "ja4690241@gmail.com";
const DEVELOPER_NAME = "oja/sado";

const navCategories = [
  {
    label: "INÍCIO",
    icon: Home,
    links: [
      { href: "/", label: "Página Inicial" },
      { href: "/ficha", label: "Criar Ficha" },
      { href: "/calculadora", label: "Calculadora" }
    ]
  },
  {
    label: "REGRAS",
    icon: BookOpen,
    links: [
      { href: "/regras", label: "Todas as Regras" },
      { href: "/atributos", label: "Atributos" },
      { href: "/pericias", label: "Perícias" },
      { href: "/classes", label: "Classes" },
      { href: "/mecanicas", label: "Mecânicas" }
    ]
  },
  {
    label: "SISTEMA",
    icon: Cog,
    links: [
      { href: "/acoes", label: "Ações & Economia" },
      { href: "/fluxo", label: "Fluxo de Turno" },
      { href: "/itens", label: "Itens" },
      { href: "/treinamentos", label: "Treinamentos" },
      { href: "/ego", label: "Ego" }
    ]
  },
  {
    label: "MESTRES",
    icon: Users,
    links: [
      { href: "/mestres", label: "Guia do Mestre" },
      { href: "/exemplo", label: "Exemplo de Partida" }
    ]
  }
];

const navLinks = navCategories.flatMap(cat => cat.links);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (label: string) => {
    setExpandedCategory(expandedCategory === label ? null : label);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md" style={{ background: 'oklch(0.08 0.01 260 / 0.95)' }}>
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-9 h-9 rounded-sm flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-110" style={{ background: 'oklch(0.52 0.22 260)' }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-lg tracking-widest text-white leading-none">BLUE LOCK</span>
                <span className="block font-heading text-xs tracking-[0.3em] uppercase" style={{ color: 'oklch(0.75 0.15 230)' }}>RPG</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.label} className="group relative">
                    <button className="flex items-center gap-2 text-sm font-heading tracking-wider uppercase text-muted-foreground hover:text-white transition-colors py-2 px-3 rounded-sm hover:bg-white/5">
                      <Icon className="w-4 h-4" />
                      {category.label}
                    </button>
                    <div className="absolute left-0 mt-0 w-56 bg-black/95 border border-border/50 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50 shadow-lg">
                      {category.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-4 py-2.5 text-sm font-heading tracking-wider uppercase transition-colors ${
                            location === link.href
                              ? 'text-white bg-primary/30 border-l-2 border-primary'
                              : 'text-muted-foreground hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Search & CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <CommandPalette />
              <Link href="/ficha" className="bl-btn-primary text-xs px-4 py-2 flex-shrink-0">
                Criar Ficha
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-sm transition-colors"
              style={{ color: 'oklch(0.75 0.15 230)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/50 bg-gradient-to-b from-black/50 to-black/20" style={{ background: 'oklch(0.08 0.01 260)' }}>
            <div className="container py-4 max-h-[calc(100vh-64px)] overflow-y-auto">
              {navCategories.map((category) => {
                const Icon = category.icon;
                const isExpanded = expandedCategory === category.label;
                
                return (
                  <div key={category.label} className="mb-2">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-sm font-heading text-sm tracking-wider uppercase text-primary/90 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{category.label}</span>
                      </div>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Category Links */}
                    {isExpanded && (
                      <div className="bg-white/5 rounded-sm mt-1 overflow-hidden border border-border/30">
                        {category.links.map((link, index) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`block px-6 py-3 font-heading text-sm tracking-wider uppercase transition-colors ${
                              location === link.href
                                ? 'text-white bg-primary/25 border-l-2 border-primary'
                                : 'text-muted-foreground hover:text-white hover:bg-white/10'
                            } ${index !== category.links.length - 1 ? 'border-b border-border/20' : ''}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile CTA Button */}
              <Link
                href="/ficha"
                className="bl-btn-primary text-xs mt-6 justify-center w-full py-3 font-heading tracking-wider uppercase"
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.52 0.22 260)' }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display text-base tracking-widest text-white">BLUE LOCK RPG</span>
              </div>
            </div>

            {/* Credits Section */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-heading tracking-wider">
                Escrito por <span style={{ color: 'oklch(0.75 0.15 230)' }}>Manjiro_O`Zeno</span> · Design por <span style={{ color: 'oklch(0.75 0.15 230)' }}>Antonio P. Grandin</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Sistema de RPG baseado no universo de Blue Lock · Livro de Regras v4.0
              </p>
              <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                Site desenvolvido por <span style={{ color: 'oklch(0.75 0.15 230)' }}>oja/sado</span> · Contato: <a href="mailto:ja4690241@gmail.com" className="hover:text-white transition-colors" style={{ color: 'oklch(0.75 0.15 230)' }}>ja4690241@gmail.com</a>
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {navCategories[0].links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-white transition-colors font-heading tracking-wider uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
