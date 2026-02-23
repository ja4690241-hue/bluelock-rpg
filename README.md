# Blue Lock RPG — Sistema de Regras Interativo

Um site completo e interativo para o sistema de RPG baseado no universo de **Blue Lock**. Crie personagens, distribua atributos, escolha classes e veja seu **Overall Rating** em tempo real!

## 🎮 Recursos Principais

- **Criação de Ficha Interativa**: Sistema passo a passo para criar seu atleta
- **20 Classes Diferentes**: Cada uma com habilidades e bônus únicos
- **Sistema de Atributos**: Potência, Técnica, Velocidade, Agilidade, Ego e Fôlego
- **Overall Rating**: Cálculo automático de Rank (S, A, B, C, D, E, F, G) com pontuação 0-100
- **Gráfico de Radar**: Visualização dos atributos do personagem
- **Perícias Avançadas**: 19 perícias diferentes com modificadores
- **Guia Completo**: Mecânicas, fluxo de jogo, itens, condições e muito mais

## 🚀 Hospedagem Permanente

Este projeto pode ser hospedado gratuitamente em várias plataformas:

### Opção 1: Vercel (Recomendado)

1. **Criar conta no Vercel**: https://vercel.com/signup
2. **Conectar repositório GitHub**:
   ```bash
   git remote add origin https://github.com/seu-usuario/bluelock-rpg.git
   git push -u origin master
   ```
3. **Importar no Vercel**: Acesse https://vercel.com/new e selecione seu repositório
4. **Configurar variáveis de ambiente** (se necessário)
5. **Deploy automático**: Vercel fará deploy automaticamente a cada push

**Resultado**: Seu site estará disponível em `seu-projeto.vercel.app`

### Opção 2: Netlify

1. **Criar conta no Netlify**: https://app.netlify.com/signup
2. **Conectar repositório GitHub**
3. **Configurar build**:
   - Build command: `pnpm build`
   - Publish directory: `dist/public`
4. **Deploy**: Netlify fará deploy automaticamente

**Resultado**: Seu site estará disponível em `seu-projeto.netlify.app`

### Opção 3: GitHub Pages

1. **Fazer push para GitHub**
2. **Configurar GitHub Pages** nas configurações do repositório
3. **Usar Actions para deploy automático**

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 22+
- pnpm 10+

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/bluelock-rpg.git
cd bluelock-rpg

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O site estará disponível em `http://localhost:5173`

### Build para Produção

```bash
pnpm build
pnpm start
```

## 📁 Estrutura do Projeto

```
bluelock-rpg/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas principais
│   │   ├── components/    # Componentes React
│   │   ├── lib/
│   │   │   ├── data.ts    # Dados do jogo (classes, atributos, etc)
│   │   │   └── overall.ts # Lógica de cálculo do Overall
│   │   └── styles/
│   └── index.html
├── server/                 # Backend Express
│   └── index.ts
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎯 Sistema de Overall

O Overall é calculado automaticamente com base em:

- **Atributos**: Soma dos 6 atributos (máx 60 pontos)
- **Perícias**: Soma das 3 perícias mais altas (máx 60 pontos)
- **Pontuação Final**: (Atributos + Perícias) / 120 × 100

### Ranks

| Rank | Pontuação | Descrição |
|------|-----------|-----------|
| **S** | 90-100 | Excepcional - Jogador de Elite |
| **A** | 80-89 | Excelente - Jogador de Classe Mundial |
| **B** | 70-79 | Muito Bom - Jogador Profissional |
| **C** | 60-69 | Bom - Jogador Competente |
| **D** | 50-59 | Mediano - Jogador em Desenvolvimento |
| **E** | 40-49 | Abaixo da Média - Iniciante |
| **F** | 30-39 | Fraco - Muito Iniciante |
| **G** | 0-29 | Muito Fraco - Novato |

## 🔧 Tecnologias

- **Frontend**: React 19 + TypeScript + Vite
- **UI Components**: Radix UI + TailwindCSS
- **Charts**: Recharts (Radar Chart)
- **Backend**: Express.js
- **Styling**: TailwindCSS 4 + OKLch Colors

## 📝 Licença

MIT

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através das issues do repositório.

---

**Desenvolvido com ❤️ para a comunidade Blue Lock RPG**
