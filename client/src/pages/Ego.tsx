// Blue Lock RPG - Ego Page
// Design: Manga Dynamic - Ego system with dramatic visuals

import { motion } from "framer-motion";
import { classes } from "@/lib/data";

const EGO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/TM67r3e5wntYjNGfa2CDm3/sandbox/DFzQZlCd0T8bJOUKrKBBDw-img-3_1771848968000_na1fn_ZWdvLWJhbm5lcg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVE02N3IzZTV3bnRZak5HZmEyQ0RtMy9zYW5kYm94L0RGelFabENkMFQ4YkpPVUtyS0JCRHctaW1nLTNfMTc3MTg0ODk2ODAwMF9uYTFmbl9aV2R2TFdKaGJtNWxjZy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eU~6btEe~CN4HkdEsXwBRs-TEKvbTObwPqxx8rAVU5rPEW6tbtng6b~I8LimN66vMgy~9r0SA9B7KiSiV0QCW-gCiO9VtaKhWnGuTATEnkXLSUeNmTCGnQgEI5PyPV6THEi7u5~G0jnNwjDnsX0NQM-gvnail~ocVoxXPflyTr0MMojWhSCRPdGqaWjEOtyQbaY9GPzJF9i2zGEt8OQbIcWQQljFTrK4YZrswCHjDEofk3EKHuBc6eBCdUIvth7tJZ2WwgGtOixt-P1~znOhGfziJluh4fXmHt0x-18vt5rjpZama3iLqldZIMkxDWgc8aK0TWA3oESdIrGmnipCSA__";

export default function Ego() {
  // Filtrar classes com bônus alto em Ego (>= 2)
  const highEgoClasses = classes
    .filter(cls => {
      const egoBonus = cls.attributeBonus.find(b => b.attr === "Ego");
      return egoBonus && egoBonus.value >= 2;
    })
    .map(cls => ({
      name: cls.name,
      ego: `+${cls.attributeBonus.find(b => b.attr === "Ego")?.value}`,
      desc: cls.subtitle
    }))
    .slice(0, 4);
  return (
    <div className="py-16">
      <div className="container">
        {/* Header with dramatic background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="bl-tag mb-4">Atributo Especial</div>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider mb-4 bl-glow">
            EGO
          </h1>
          <div className="w-24 h-0.5 mb-6" style={{ background: 'oklch(0.75 0.18 60)' }} />
        </motion.div>

        {/* Hero Banner */}
        <div className="relative rounded-sm overflow-hidden mb-16 h-64 md:h-80">
          <img src={EGO_BG} alt="Ego" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, oklch(0.08 0.01 260 / 0.95) 0%, oklch(0.08 0.01 260 / 0.5) 60%, transparent 100%)' }} />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <blockquote className="max-w-lg">
                <p className="font-display text-3xl md:text-4xl text-white leading-tight bl-glow">
                  "EGO É AQUILO QUE MEDE O ESPÍRITO DO SEU PERSONAGEM"
                </p>
                <footer className="mt-4 font-heading text-sm tracking-widest uppercase" style={{ color: 'oklch(0.75 0.18 60)' }}>
                  — Blue Lock RPG, Livro de Regras v4.0
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Ego Description */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-4xl text-white tracking-wider mb-6">O QUE É EGO?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ego é aquilo que mede o espírito do seu personagem e sua capacidade de impor ele dentro da partida. Personagens com valores altos em ego tendem a ser bem excêntricos e se destacarem mesmo com poucas palavras ou atitudes.
                </p>
                <p>
                  Jogadores com bons modificadores neste atributo são capazes de impor sua vontade em cima de membros tanto da sua própria equipe quanto até nos adversários, dependendo da situação.
                </p>
                <p>
                  No Blue Lock, o ego não é apenas uma característica pessoal — é uma arma. A capacidade de intimidar, persuadir e dominar psicologicamente seus adversários pode ser tão decisiva quanto um chute perfeito.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bl-card p-5">
                <h3 className="font-heading text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <span style={{ color: 'oklch(0.75 0.18 60)' }}>👑</span>
                  Perícias do Ego
                </h3>
                <div className="space-y-3">
                  {[
                    { skill: "Intimidação", desc: "Impor medo e sentimento de ameaça" },
                    { skill: "Presença", desc: "Resiliência mental e resistência psicológica" },
                    { skill: "Diplomacia", desc: "Persuasão e libertação de condições negativas" },
                    { skill: "Enganação", desc: "Ilusão verbal e dentro do campo" }
                  ].map((item) => (
                    <div key={item.skill} className="flex items-start gap-3 p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'oklch(0.75 0.18 60)' }} />
                      <div>
                        <span className="font-heading text-sm font-semibold text-white">{item.skill}</span>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ego Skills Detail */}
        <section className="mb-16">
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">PERÍCIAS DETALHADAS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bl-card p-6">
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span style={{ color: 'oklch(0.75 0.18 25)' }}>⚡</span>
                Intimidação
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Intimidar é a capacidade de um jogador impor medo ou um sentimento de que ele é perigoso/uma ameaça para um alvo. Um jogador pode rolar intimidação contra um teste de Presença do alvo.
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                  <p className="text-xs font-heading font-semibold text-white mb-1">Sucesso por 3 de diferença:</p>
                  <p className="text-xs text-muted-foreground">-2 durante 2 rodadas em testes contra esse jogador</p>
                </div>
                <div className="p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                  <p className="text-xs font-heading font-semibold text-white mb-1">Sucesso por 6 de diferença:</p>
                  <p className="text-xs text-muted-foreground">-3 durante 3 rodadas em testes contra esse jogador</p>
                </div>
                <div className="p-3 rounded-sm" style={{ background: 'oklch(0.58 0.22 25 / 0.1)', border: '1px solid oklch(0.58 0.22 25 / 0.3)' }}>
                  <p className="text-xs font-heading font-semibold mb-1" style={{ color: 'oklch(0.75 0.18 25)' }}>20 Natural:</p>
                  <p className="text-xs text-muted-foreground">Alvo trava por 1d2+1 rodadas em estado de choque</p>
                </div>
              </div>
            </div>

            <div className="bl-card p-6">
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span style={{ color: 'oklch(0.65 0.18 145)' }}>🛡️</span>
                Presença
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Presença pode se resumir em: resiliência mental. Muitas vezes em uma partida não é perceptível o quanto de estresse psicológico os jogadores são colocados — pela pressão da torcida, afrontes do time adversário ou críticas do próprio time.
              </p>
              <div className="p-4 rounded-sm" style={{ background: 'oklch(0.65 0.18 145 / 0.1)', border: '1px solid oklch(0.65 0.18 145 / 0.3)' }}>
                <p className="text-xs font-heading font-semibold mb-2" style={{ color: 'oklch(0.65 0.18 145)' }}>Uso principal:</p>
                <p className="text-xs text-muted-foreground">Resistir a testes de Intimidação. Quanto maior o valor de Presença, mais difícil é intimidar o jogador.</p>
              </div>
            </div>

            <div className="bl-card p-6">
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span style={{ color: 'oklch(0.75 0.15 230)' }}>🤝</span>
                Diplomacia
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Uma perícia talvez subestimada. Pode ser usada por jogadores que foram intimidados — caso o jogador que rolar Diplomacia obtenha um resultado igual ou superior ao teste de intimidação sofrido, a vítima se livrará da penalidade.
              </p>
              <div className="p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                <p className="text-xs font-heading font-semibold text-white mb-1">Para liberar alguém em choque:</p>
                <p className="text-xs text-muted-foreground">O teste de Diplomacia deve ter valor final superior a 20.</p>
              </div>
            </div>

            <div className="bl-card p-6">
              <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span style={{ color: 'oklch(0.75 0.18 280)' }}>🎭</span>
                Enganação
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Usado em diversas situações — não sendo apenas uma enganação verbal. Serve também como enganação dentro do jogo: fingir ir para um lado e ir para o outro, por exemplo. Tem utilizações bem versáteis variando de acordo com seu modo de uso.
              </p>
              <div className="p-3 rounded-sm" style={{ background: 'oklch(0.12 0.015 260)' }}>
                <p className="text-xs font-heading font-semibold text-white mb-1">Exemplo de uso em campo:</p>
                <p className="text-xs text-muted-foreground">Enganar um oponente que está tentando bloquear seu caminho, criando espaço para um drible ou finalização.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Classes with high Ego */}
        <section>
          <h2 className="font-display text-4xl text-white tracking-wider mb-8">CLASSES COM ALTO EGO</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highEgoClasses.map((cls) => (
              <div
                key={cls.name}
                className="p-4 rounded-sm text-center"
                style={{ background: 'oklch(0.75 0.18 60 / 0.08)', border: '1px solid oklch(0.75 0.18 60 / 0.25)' }}
              >
                <div className="font-display text-3xl mb-1" style={{ color: 'oklch(0.75 0.18 60)' }}>{cls.ego}</div>
                <p className="font-heading text-xs font-semibold text-white mb-1">{cls.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{cls.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
