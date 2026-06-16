# Configuração do Banco de Dados

## 🗄️ Visão Geral

O Blue Lock RPG agora suporta persistência de dados em um banco de dados PostgreSQL remoto. Isso permite que os dados dos NPCs e estados de jogo sejam compartilhados entre todos os usuários em tempo real.

## 📋 Pré-requisitos

- Conta no Neon.tech (gratuito)
- Acesso ao painel da Vercel

## 🚀 Passo 1: Criar Banco de Dados no Neon

1. Acesse [neon.tech](https://neon.tech)
2. Clique em **"Sign up"** (ou faça login se já tiver conta)
3. Complete o cadastro
4. No painel, clique em **"New Project"**
5. Escolha um nome para o projeto (ex: "bluelock-rpg")
6. Selecione a região mais próxima
7. Clique em **"Create Project"**

## 🔑 Passo 2: Obter a Connection String

1. No painel do Neon, você verá a connection string em destaque
2. Ela terá este formato:
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```
3. **Copie esta string** (você precisará dela no próximo passo)

## ⚙️ Passo 3: Configurar na Vercel

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique no seu projeto "bluelock-rpg"
3. Vá para **Settings** (Configurações)
4. Clique em **Environment Variables** (Variáveis de Ambiente)
5. Clique em **"Add New"**
6. Preencha assim:
   - **Name**: `DATABASE_URL`
   - **Value**: Cole a connection string do Neon (do Passo 2)
7. Clique em **"Save"**

## 🔄 Passo 4: Fazer Deploy

1. Volte para o painel principal
2. Clique em **"Deployments"**
3. Clique no último deploy (ou faça um novo push no GitHub)
4. Aguarde o deploy completar

## ✅ Passo 5: Verificar Funcionamento

1. Acesse sua aplicação no Vercel
2. Abra o console do navegador (F12)
3. Procure por mensagens como:
   - ✅ "Banco de dados conectado com sucesso!" (se tudo funcionar)
   - ⚠️ "DATABASE_URL não configurada" (se a variável não foi adicionada)

## 📝 Notas Importantes

- **Dados Persistentes**: Todos os NPCs e estados de jogo agora são salvos no banco de dados
- **Compartilhamento em Tempo Real**: Múltiplos usuários verão as mesmas mudanças
- **Fallback Local**: Se o banco de dados não estiver disponível, o sistema usa localStorage como fallback
- **Gratuito**: O plano gratuito do Neon é suficiente para este projeto

## 🆘 Troubleshooting

### Erro: "DATABASE_URL não configurada"
- Verifique se você adicionou a variável de ambiente na Vercel
- Faça um novo deploy após adicionar a variável

### Erro: "Erro ao conectar ao banco de dados"
- Verifique se a connection string está correta
- Certifique-se de que o Neon está online
- Tente copiar a connection string novamente do painel do Neon

### Dados não estão sendo salvos
- Verifique o console do navegador para mensagens de erro
- Confirme que o banco de dados está conectado
- Tente fazer um novo deploy

## 🔐 Segurança

- Nunca compartilhe sua connection string publicamente
- A Vercel mantém as variáveis de ambiente seguras
- Você pode rotacionar a senha do banco de dados no Neon quando necessário

## 📚 Recursos Adicionais

- [Documentação do Neon](https://neon.tech/docs)
- [Documentação da Vercel](https://vercel.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
