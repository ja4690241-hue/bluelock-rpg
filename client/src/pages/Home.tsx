// Blue Lock RPG - Home Page
// Design: Manga Dynamic - Hero with stadium bg, speed lines, bold typography
// Sections: Hero, Features, Classes preview, Quick Start

import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Users, BookOpen, Sword, Target } from "lucide-react";
import { motion } from "framer-motion";
import { classes } from "@/lib/data";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/TM67r3e5wntYjNGfa2CDm3/sandbox/DFzQZlCd0T8bJOUKrKBBDw-img-1_1771848972000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVE02N3IzZTV3bnRZak5HZmEyQ0RtMy9zYW5kYm94L0RGelFabENkMFQ4YkpPVUtyS0JCRHctaW1nLTFfMTc3MTg0ODk3MjAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vgD4WPsYz3W9Sy8MyyJPRo1Vbsd6gHgQL9hg2bff03ervc7W6XA44A8oRvW3e7aFpZ~baEqvhGA3-uDZ~-cLzGetQU54DbyBaF1SbQdVNpMwsmF37-46wW4vyEnTYtwIaGb5ZHTgabbLS0vcmU7kTDVFZuE5ey37boEOXa0~4jMd6eQ2U9qnwPQ8JinmGuSNSfM~XuObKfgmRi3Uujmogue0pNY-OW9U9NKHaxC~NilbGqC0dquwA7qDaorHFzTuHxfMBeOPdvAVAc9fXCzxobY-JJp15WAIRZ6nN-iYp4PbKYssOelztyJgMvvNZSaC-9tbzciEcL-ay1H7O-uMyw__";

const CLASSES_BG = "https://private-us-east-1.manuscdn.com/sessionFile/TM67r3e5wntYjNGfa2CDm3/sandbox/DFzQZlCd0T8bJOUKrKBBDw-img-2_1771848968000_na1fn_Y2xhc3Nlcy1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVE02N3IzZTV3bnRZak5HZmEyQ0RtMy9zYW5kYm94L0RGelFabENkMFQ4YkpPVUtyS0JCRHctaW1nLTJfMTc3MTg0ODk2ODAwMF9uYTFmbl9ZMnhoYzNObGN5MWlady5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=s2TcLt~mWttjpoEYQSi9ZqdYlq6kgwpvpJ7Yg2ARs60TJjw~NZszweZ1HMLZyNpARf6171KHHXuu46liGiX8fG1CsvyOpRmWTeBOmvD3C1aInMVg15SQ0-sVLK9ut~HT88jHHByGsWDy4Bb136F8xaQQRM1M2IMLNM9YH5Ioe0Sn3jzL-iFmQzZNyeW39qUQSW8qI7iw-B5qs3egRMf~V9MS6wCDxMiWoDF0ixXssR9V6RsV5ciybV7Vvo75OKZ7ECFIAPeTJyLGI9nZQ45xpDVBaVXP0qAQcXSEV-~wEYQur1yWGVVEsgeloG6diSVnzKaLiMAuyjFQQc9hHUpyww__";

const features = [
  {
    icon: <Sword className="w-6 h-6" />,
    title: "20 Classes Únicas",
    description: "De Playmaker a Imperador, cada classe oferece um estilo de jogo completamente diferente com habilidades exclusivas."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Sistema de Atributos",
    description: "Potência, Técnica, Velocidade, Agilidade e Ego definem seu atleta. Cada atributo limita e potencializa suas perícias."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fôlego como Recurso",
    description: "Habilidades custam pontos de fôlego, criando decisões táticas sobre quando e como usar suas técnicas especiais."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Mecânicas Táticas",
    description: "Flanqueio, furtividade, passes, chutes e dribles com regras detalhadas para simular o futebol de alto nível."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Trabalho em Equipe",
    description: "Sincronizações, combos e habilidades de suporte permitem que times bem coordenados superem adversários mais fortes."
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Criação de Ficha",
    description: "Ferramenta interativa para criar e personalizar seu atleta, escolhendo atributos, perícias, classe e habilidade inicial."
  }
];

const featuredClasses = classes.slice(0, 6);

const difficultyColor: Record<string, string> = {
  "Fácil": "oklch(0.65 0.18 145)",
  "Médio": "oklch(0.75 0.18 60)",
  "Difícil": "oklch(0.75 0.18 25)",
  "Muito Difícil": "oklch(0.58 0.22 25)"
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, oklch(0.06 0.01 260 / 0.92) 0%, oklch(0.08 0.01 260 / 0.75) 50%, oklch(0.06 0.01 260 / 0.85) 100%)' }} />
        
        {/* Speed lines overlay */}
        <div className="absolute inset-0 bl-speed-lines opacity-30" />

        {/* Content */}
        <div className="container relative z-10 py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bl-tag mb-6">Livro de Regras v4.0</div>
              <h1 className="font-display text-7xl md:text-9xl text-white leading-none tracking-wider mb-2 bl-glow">
                BLUE LOCK
              </h1>
              <h2 className="font-display text-4xl md:text-6xl leading-none tracking-widest mb-6" style={{ color: 'oklch(0.75 0.15 230)' }}>
                RPG
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Crie seu atleta egoísta, escolha sua classe e conquiste o título de melhor centroavante do mundo. Um sistema de RPG de futebol baseado no universo de Blue Lock.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/criacao" className="bl-btn-primary">
                  Criar Personagem
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/classes" className="bl-btn-secondary">
                  Ver Classes
                </Link>
              </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 flex flex-wrap gap-8"
            >
              {[
                { value: "20", label: "Classes" },
                { value: "6", label: "Atributos" },
                { value: "24+", label: "Perícias" },
                { value: "80+", label: "Habilidades" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl text-white bl-glow">{stat.value}</div>
                  <div className="font-heading text-xs tracking-widest uppercase text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, oklch(0.08 0.01 260), transparent)' }} />
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="mb-16">
            <div className="bl-tag mb-4">O Sistema</div>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider">
              MECÂNICAS DO JOGO
            </h2>
            <div className="w-24 h-0.5 mt-4" style={{ background: 'oklch(0.52 0.22 260)' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bl-card p-6 group hover:bl-border-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-colors" style={{ background: 'oklch(0.52 0.22 260 / 0.15)', color: 'oklch(0.75 0.15 230)' }}>
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${CLASSES_BG})` }}
        />
        <div className="absolute inset-0" style={{ background: 'oklch(0.08 0.01 260 / 0.85)' }} />

        <div className="container relative z-10">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="bl-tag mb-4">Escolha seu Estilo</div>
              <h2 className="font-display text-5xl md:text-6xl text-white tracking-wider">
                AS CLASSES
              </h2>
              <div className="w-24 h-0.5 mt-4" style={{ background: 'oklch(0.52 0.22 260)' }} />
            </div>
            <Link href="/classes" className="bl-btn-secondary hidden md:flex">
              Ver Todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredClasses.map((cls, i) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={`/classes#${cls.id}`}>
                  <div className="bl-card p-5 group cursor-pointer hover:bl-border-glow transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="bl-tag mb-2">{cls.role}</div>
                        <h3 className="font-heading text-lg font-bold text-white group-hover:text-primary transition-colors">{cls.name}</h3>
                        <p className="text-xs text-muted-foreground font-heading tracking-wider">{cls.subtitle}</p>
                      </div>
                      <span
                        className="text-xs font-heading tracking-wider px-2 py-1 rounded-sm"
                        style={{
                          color: difficultyColor[cls.difficulty] || 'oklch(0.75 0.15 230)',
                          background: `${difficultyColor[cls.difficulty] || 'oklch(0.52 0.22 260)'}/15`,
                          border: `1px solid ${difficultyColor[cls.difficulty] || 'oklch(0.52 0.22 260)'}/30`
                        }}
                      >
                        {cls.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{cls.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {cls.attributeBonus.slice(0, 3).map((bonus) => (
                        <span key={bonus.attr} className="bl-badge-folego">
                          +{bonus.value} {bonus.attr}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link href="/classes" className="bl-btn-secondary">
              Ver Todas as Classes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start CTA */}
      <section className="py-24">
        <div className="container">
          <div className="bl-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bl-speed-lines opacity-20" />
            <div className="relative z-10">
              <div className="bl-tag mb-6 mx-auto w-fit">Comece Agora</div>
              <h2 className="font-display text-5xl md:text-7xl text-white tracking-wider mb-4 bl-glow">
                PRONTO PARA JOGAR?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                Crie seu atleta, escolha sua classe e comece sua jornada para se tornar o melhor centroavante do mundo. O Blue Lock aguarda.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/ficha" className="bl-btn-primary">
                  Criar Minha Ficha
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/mecanicas" className="bl-btn-secondary">
                  Ler as Regras
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
