# TASK: Construir Site / Portfólio "Praça"
## Site one-page de altíssima qualidade — vitrine que fecha venda

**Operador:** Claude Code rodando como `claude-agent` na sessão tmux `praca-site`
**Contexto:** Esse site é a vitrine que será enviada por WhatsApp pros leads da Esteira PME-MG. Não é site público que recebe tráfego de Google. É o "mockup vivo" que o lead abre depois de receber a mensagem fria.
**Objetivo do site:** o lead abre, fica impressionado em <10 segundos, e clica no botão de WhatsApp pra fechar a venda de R$ 247 (cardápio QR) ou R$ 397-497 (site one-page).

---

## 0. Contexto e regras invioláveis

Você (Claude Code) está rodando autonomamente. Leia este arquivo inteiro antes de qualquer ação. Execute as fases em ordem.

### Regras invioláveis
1. **Diretório de trabalho:** `/home/claude-agent/praca-site/`. Não saia daí.
2. **Nunca** modifique `/opt/fidc-server`, `/opt/singulare-portal` ou `/home/claude-agent/esteira-pme/`. Esses são outros projetos.
3. **Stack obrigatória:** Astro 5+ + Tailwind v4 + Motion One. NÃO use Next.js, NÃO use React (Astro tem componentes próprios), NÃO use Framer Motion.
4. **Performance é não-negociável:** Lighthouse 95+ em mobile. Tudo estático. Sem JS bloqueante. Imagens em WebP/AVIF, lazy-loading sempre.
5. **Português brasileiro em TODO copy.** Não use estrangeirismos desnecessários.
6. **Não use Inter como fonte principal.** Inter é over-used. Use as fontes especificadas na seção 3.
7. **Não use as cores `#4F6AFF` (azul Fram) nem dark mode "Obsidian".** Esse projeto tem identidade própria.
8. **Mobile-first sempre.** A maioria dos leads vai abrir pelo celular.

### Critério de "pronto"
- ✅ Site rodando localmente em `npm run dev` na porta 4321
- ✅ Build estático em `npm run build` sem erros, gerando `dist/` < 500kb total
- ✅ Lighthouse mobile: Performance 95+, Accessibility 95+, Best Practices 100, SEO 100
- ✅ Todos os 5 botões de CTA abrem WhatsApp com mensagem pré-preenchida correta
- ✅ Visualmente distintivo — nada de "site genérico de agência"
- ✅ Funciona em iPhone Safari, Chrome Android, e desktop Firefox/Chrome

---

## 1. A marca: Praça

**Nome:** Praça
**Posicionamento:** "A gente cuida da sua presença digital — do jeito que cidade pequena merece."
**Tom:** confiante, regional, direto, sem jargão. Como conversa de balcão de padaria que sabe o que tá fazendo.
**Personalidade:** discreto + premium. Não é "agência cool de São Paulo". É "consultoria boa que entrega".
**Anti-personalidade:** NÃO é startup tech, NÃO é agência maximalista, NÃO é "vibes" genérico.

### Logo
Crie um logotipo simples em SVG inline (sem usar serviço externo):
- Wordmark em fonte display (especificada na seção 3)
- Uma marca opcional ao lado: um pin de mapa estilizado OU um quadrado simples representando a praça central da cidade
- Variantes: dark sobre fundo claro, claro sobre fundo escuro

---

## 2. Paleta de cores

Identidade visual: **terracota + creme + tinta**. Inspirado em terra de Minas, parede de fazenda colonial, e tinta nanquim.

```css
/* Cores principais */
--clay: #B5563A;              /* Terracota — cor de destaque/CTA */
--clay-deep: #8B3E29;         /* Hover/pressed */
--clay-light: #D9A89A;        /* Subtle backgrounds */

--ink: #1A1614;               /* Texto principal — quase preto, com warmth */
--ink-soft: #4A4340;          /* Texto secundário */

--cream: #F4EFE6;             /* Fundo principal — off-white com warmth */
--cream-deep: #E8E0D2;        /* Cards, divisores */
--paper: #FBF8F2;             /* Hero background */

--moss: #5A6B4F;              /* Acento secundário (verde-musgo, raro) */
--gold: #C9A961;              /* Acento de premium (raríssimo, só em selos) */

/* Stroke */
--line: rgba(26, 22, 20, 0.08);
--line-strong: rgba(26, 22, 20, 0.15);
```

**Regra de uso:**
- Fundo do site: `--cream` (não branco puro, nunca)
- Hero: `--paper` (mais quente que cream)
- Títulos: `--ink`
- Corpo: `--ink-soft`
- CTAs primários: `--clay` com texto `--paper`
- CTAs secundários: borda `--ink` + texto `--ink`, hover preenche
- Ouro só pra "Garantia 7 dias" e selos pequenos

---

## 3. Tipografia

**Display (títulos):** Fraunces — uma serifa moderna com personalidade
- Importar via Fontsource ou Google Fonts
- Pesos: 400 (regular), 600 (semibold), 700 (bold)
- Use opsz axis pra tamanhos grandes (Fraunces tem optical sizing)

**Corpo (texto longo):** Manrope ou IBM Plex Sans
- Escolha **Manrope** (mais quente, mais brasileira na sensação)
- Pesos: 400, 500, 600, 700

**Mono (preços, números, detalhes):** JetBrains Mono ou IBM Plex Mono
- Escolha **IBM Plex Mono** (combina melhor com o resto)
- Use só pra preços ("R$ 247"), prazos ("5 dias"), e selos pequenos

**Tamanhos (mobile-first):**
```css
--text-xs: 0.75rem;       /* selos, labels */
--text-sm: 0.875rem;      /* legendas */
--text-base: 1rem;        /* corpo */
--text-lg: 1.125rem;      /* corpo destacado */
--text-xl: 1.5rem;        /* subtítulo */
--text-2xl: 2rem;         /* títulos seção (mobile) */
--text-3xl: 2.75rem;      /* h1 mobile */
--text-4xl: 4rem;         /* h1 desktop (md:) */
--text-5xl: 5.5rem;       /* hero massivo desktop (lg:) */
```

**Tracking & leading:**
- Display em hero: `letter-spacing: -0.03em` (apertado, premium)
- Corpo: `letter-spacing: 0`, `line-height: 1.65`
- Mono: `letter-spacing: -0.01em`, `line-height: 1`

---

## 4. As 6 seções do site (in order)

### Seção 1 — Hero

**Estrutura:**
```
[Logo Praça no canto esquerdo]                    [Botão WhatsApp pequeno]

(grande espaço vertical)

CARDÁPIO EM PDF.
SITE DE 2018.
SEU VIZINHO JÁ RESOLVEU.

A gente arruma sua presença digital em 5 dias.
Cardápio QR por R$ 247. Site profissional por R$ 397.

[Botão CTA primário: "Falar no WhatsApp →"]
[Link sutil: "ou ver alguns trabalhos"]

(no canto inferior, sutil:)
Atendemos cidades pequenas em Minas Gerais.
```

**Visual:**
- H1 em Fraunces 600, tamanho enorme no desktop (5.5rem), apertado (-0.03em)
- Quebras de linha intencionais com `<br />` controlado por breakpoint
- O ponto final em "JÁ RESOLVEU." é em `--clay` (vira destaque)
- Subtítulo em Manrope 400, `--ink-soft`
- Preços ("R$ 247", "R$ 397") em IBM Plex Mono, peso 500
- Animação de entrada: cada linha do H1 com fade + translate-y, stagger de 80ms (Motion One)
- Background: `--paper` com noise texture sutil (SVG noise inline, opacity 0.04)

### Seção 2 — A análise feita pra você

Nessa seção o lead se sente analisado. É o "vi seu Google" do material que você mandou, em forma de site.

**Estrutura:**
```
                    SEU GOOGLE TÁ ASSIM:

[Card com mockup de "perfil incompleto" do Google]
- Sem foto recente
- Sem cardápio
- 3 reviews
- Site quebrado

                    DEPOIS DE 5 DIAS:

[Card com mockup de "perfil otimizado"]
- 15 fotos atualizadas
- Cardápio QR conectado
- Posts semanais
- Site responsivo
```

**Visual:**
- Dois cards lado a lado em desktop, empilhados em mobile
- Slider antes/depois interativo: arrastar pra ver a transformação
- Cards com border `--line-strong`, sombra discreta, padding generoso
- O "DEPOIS" tem um pequeno selo dourado: "Em 5 dias úteis"
- Animação: cards entram com scale 0.96 → 1, fade, ao entrar no viewport (Motion One + IntersectionObserver)

### Seção 3 — Os 2 produtos

Apenas 2 cards. Sem confusão.

**Card 1 — Cardápio QR**
```
CARDÁPIO QR
R$ 247 fechado, sem mensalidade

Pra restaurantes, lanchonetes, bares, pizzarias.
Cliente escaneia o QR, abre no celular dele,
escolhe o que quer. Sem app, sem cadastro.

✓ QR code impresso pronto pra mesa
✓ Atualização ilimitada por 30 dias
✓ Suas fotos, sua marca, sua identidade
✓ Funciona offline depois de carregado
✓ Garantia de 7 dias

Pronto em 5 dias úteis.

[Quero o cardápio →]   (abre WhatsApp)
```

**Card 2 — Site one-page**
```
SITE PROFISSIONAL
R$ 397 fechado, sem mensalidade

Pra qualquer negócio que precisa aparecer
no Google e converter quem visita.

✓ 1 página, mas feita com cuidado
✓ Carrega em menos de 2 segundos
✓ Botão direto pro seu WhatsApp
✓ Otimizado pro Google encontrar
✓ Garantia de 7 dias

Pronto em 7 dias úteis.

[Quero o site →]   (abre WhatsApp)
```

**Visual:**
- 2 cards lado a lado em desktop, empilhados em mobile
- Border `--line-strong`, fundo `--paper`, padding 3rem
- Preço em destaque grande, IBM Plex Mono, 3rem
- Lista com checkmarks customizados (SVG inline em `--clay`)
- CTA: botão `--clay` largo (full-width no card)
- Hover do card: leve lift (translate-y -4px) + sombra mais forte
- Animação: cards entram em sequência com 120ms delay

### Seção 4 — Galeria de trabalhos

**Estrutura:**
```
ALGUNS TRABALHOS

[Grid 3x2 em desktop, 1 col em mobile, com 6 mockups]
```

**Mockups (FICTÍCIOS na v1, depois substitui por reais):**
1. Pizzaria do Tonho — Uberaba (cardápio QR)
2. Salão Bianca — Patos de Minas (site)
3. Pousada Recanto — Araxá (site)
4. Burger do Zé — Frutal (cardápio QR)
5. Clínica Sorrir — Ituiutaba (site)
6. Padaria Estrela — Sacramento (cardápio QR)

Pra cada mockup, gere um SVG ou imagem placeholder com:
- Nome do negócio em destaque
- Cidade pequena visível
- Mock do produto (cardápio com itens fictícios coerentes / site one-page com seções)
- Estilo visual que combina com a estética do site

**Visual:**
- Cards com aspect-ratio 4:5 em mobile, 3:4 em desktop
- Hover desktop: scale 1.02 + reveal de texto sobreposto ("Cardápio QR · R$ 247")
- Click/tap: abre modal/lightbox com versão maior do mockup + botão "Quero algo assim"
- Border ao redor de cada mockup, padding 8px (estilo "moldura")
- Animação: stagger de entrada quando entra no viewport

### Seção 5 — Como funciona em 3 dias

```
COMO FUNCIONA

01.  Você manda WhatsApp
     Diz qual produto quer e o nome do seu negócio.

02.  A gente entrega em 5-7 dias
     Você recebe o link, testa, dá feedback.
     Ajustes ilimitados nos primeiros 30 dias.

03.  Não gostou? Devolvo o dinheiro
     Garantia de 7 dias após a entrega.
     Sem letra miúda, sem burocracia.
```

**Visual:**
- 3 colunas em desktop, empilhadas em mobile
- Números grandes em Fraunces 700, `--clay-light` (cor sutil mas presente)
- Linha horizontal `--line` separando passos em mobile
- Animação: linha de progressão entre os 3 passos preenche conforme scroll (desktop only)

### Seção 6 — CTA Final

```
                    PRONTO PRA RESOLVER?

Manda WhatsApp dizendo qual produto te interessa.
A gente responde em até 30 minutos durante horário comercial.

[Quero o cardápio (R$ 247) →]
[Quero o site (R$ 397) →]

(footer mínimo:)
Praça · presença digital pra cidade pequena
WhatsApp: [seu número] · [seu @]
© 2026
```

**Visual:**
- Background `--ink` (escuro, último contraste forte)
- Texto `--paper`
- 2 botões grandes lado a lado, `--clay` e `--paper outlined`
- Logo Praça em versão clara
- Padding vertical massivo (8rem em desktop)

---

## 5. Componentes globais

### WhatsApp flutuante (sticky)
- Botão fixo no canto inferior direito
- Aparece após scroll de 600px
- Verde clássico WhatsApp (#25D366), 56px de diâmetro
- Ícone WhatsApp em SVG
- Anima entrada com scale spring
- Click: abre `https://wa.me/SEU_NUMERO?text=Oi%20Pra%C3%A7a%2C%20vim%20pelo%20site`

### Sistema de CTAs com mensagens pré-preenchidas
Cada botão de WhatsApp tem mensagem específica baseada na seção:

```js
const ctaMessages = {
  hero: "Oi! Vim pelo site da Praça. Queria saber mais.",
  cardapio_card: "Oi! Quero o cardápio QR de R$ 247. Meu negócio é [_____] em [_____].",
  site_card: "Oi! Quero o site profissional de R$ 397. Meu negócio é [_____] em [_____].",
  galeria_quero: "Oi! Vi a galeria do site da Praça. Queria algo parecido com [_____].",
  cta_final_cardapio: "Oi! Quero o cardápio QR de R$ 247.",
  cta_final_site: "Oi! Quero o site profissional de R$ 397.",
  whatsapp_sticky: "Oi! Vim pelo site da Praça. Pode me ajudar?"
};
```

Use `encodeURIComponent` em cada mensagem.
Telefone configurável em uma variável `.env`: `PUBLIC_WHATSAPP_NUMBER=5534XXXXXXXXX` (sem +, sem espaços).

### Botão "Voltar ao topo"
- Aparece após scroll de 1500px
- No canto inferior direito, abaixo do WhatsApp flutuante
- Estilo neutro, animação suave

---

## 6. Microinterações e detalhes premium

Esses são os detalhes que separam "site bom" de "site memorável":

1. **Cursor custom no desktop** — Em hover sobre CTAs, cursor vira um pequeno círculo `--clay`. Não exagere — mantém o cursor nativo em todo lugar exceto botões importantes.

2. **Texturas de fundo sutis** — Hero e CTA final têm noise texture SVG inline (`<svg>` com `<filter type="turbulence">` + opacity 0.04). Dá warmth analógica.

3. **Underline animado em links** — Links sublinhados crescem da esquerda pra direita no hover (border-bottom + transition).

4. **Números animados na entrega** — Quando "5 dias úteis" entra no viewport, número conta de 0 a 5 (Motion One com `animate({from:0, to:5})`).

5. **Drag-and-flip nos cards de produto** — Em mobile, cards têm leve resistência ao toque (transform-style: preserve-3d, perspective).

6. **Loading states** — Antes de imagens carregarem, mostra placeholder com cor `--cream-deep` + animação pulse muito sutil.

7. **Reveal on scroll** — Cada seção entra com fade + translate-y de 24px, com stagger de 60ms entre elementos. Use `IntersectionObserver` + Motion One. Não anime elementos já visíveis no load inicial.

8. **Optical sizing real** — Fraunces tem `font-variation-settings: 'opsz' 144` — use isso em hero pra letras com personalidade real, não só "fonte grande".

9. **Easing custom** — Não use `ease` ou `ease-in-out` padrão. Use `cubic-bezier(0.22, 1, 0.36, 1)` (out-quint, mais "premium").

---

## 7. O que NÃO fazer (anti-padrões)

❌ Gradientes roxo→rosa, glassmorphism, neon
❌ Carrosséis automáticos rodando sozinhos
❌ Vídeo de fundo no hero
❌ Inter, Roboto, Poppins, Montserrat
❌ Emoji no copy ("Aumente suas vendas 🚀")
❌ Headlines genéricas ("Transforme seu negócio")
❌ "Trusted by 1000+ businesses" (você não tem)
❌ Selos falsos ("As Seen On...")
❌ Pop-up de "Aceite nossos cookies" (não tem GA, não precisa)
❌ Modal de newsletter
❌ Chat IA fake no canto
❌ Logos de empresas-cliente fictícias
❌ Stock photos de gente sorrindo apertando mão
❌ Ilustrações 3D estilo Notion
❌ Botão "Comece grátis" (você não é SaaS)

---

## 8. Fases de implementação

### FASE 1 — Bootstrap
1. Crie `/home/claude-agent/praca-site/`
2. `npm create astro@latest .` — escolha "Empty", TypeScript "Strict"
3. `npx astro add tailwind` (Tailwind v4)
4. `npm install motion @fontsource-variable/fraunces @fontsource-variable/manrope @fontsource/ibm-plex-mono`
5. Configure `astro.config.mjs` com integração Tailwind
6. Crie estrutura:
   ```
   src/
   ├── components/
   │   ├── Hero.astro
   │   ├── Analise.astro
   │   ├── Produtos.astro
   │   ├── Galeria.astro
   │   ├── ComoFunciona.astro
   │   ├── CTAFinal.astro
   │   ├── WhatsAppFlutuante.astro
   │   └── Logo.astro
   ├── layouts/
   │   └── Base.astro
   ├── pages/
   │   └── index.astro
   ├── styles/
   │   └── global.css
   └── lib/
       ├── motion.ts        (helpers Motion One)
       └── whatsapp.ts      (gera URLs com mensagem)
   ```
7. Configure `global.css` com as variáveis CSS de cor da seção 2
8. Configure Tailwind v4 com as tokens (use `@theme` no CSS, não config.js — Tailwind v4)
9. Inicialize git, faça commit "fase 1: bootstrap astro + tailwind"

### FASE 2 — Layout base + Logo
1. Construa `Base.astro` com `<head>` completo (meta tags, Open Graph, fontes)
2. SEO mínimo: `<meta name="description" content="Praça — presença digital pra cidade pequena. Cardápio QR R$ 247, site profissional R$ 397, garantia de 7 dias.">`
3. `Logo.astro` — wordmark "Praça" em Fraunces + pequeno SVG de pin de mapa
4. Configure dark/light SVG variants
5. Commit: "fase 2: layout base + logo"

### FASE 3 — Hero
1. Construa Hero seguindo a estrutura da seção 4.1
2. Implemente animação de entrada com Motion One (stagger nas linhas do H1)
3. Implemente noise texture inline com SVG filter
4. CTA do hero abre WhatsApp com mensagem `ctaMessages.hero`
5. Teste mobile e desktop
6. Commit: "fase 3: hero"

### FASE 4 — Análise (antes/depois)
1. Construa Analise.astro com 2 cards
2. Mockups dos 2 estados (antes/depois) em SVG inline ou usando Tailwind puro pra simular tela do Google
3. Implemente reveal on scroll
4. Commit: "fase 4: secao analise"

### FASE 5 — Produtos
1. Construa Produtos.astro com 2 cards
2. Cada card com lista de checkmarks (SVG custom em `--clay`)
3. CTAs abrem WhatsApp com mensagens corretas
4. Hover: lift + sombra
5. Commit: "fase 5: produtos"

### FASE 6 — Galeria
1. Construa Galeria.astro com grid 3x2 desktop / 1col mobile
2. Gere os 6 mockups fictícios em SVG inline (cada um com nome de negócio + cidade + visual coerente)
3. Modal de detalhe ao clicar (use `<dialog>` nativo HTML)
4. Cada modal tem CTA "Quero algo assim" que abre WhatsApp
5. Commit: "fase 6: galeria"

### FASE 7 — Como Funciona + CTA Final
1. Construa ComoFunciona.astro (3 colunas desktop)
2. Construa CTAFinal.astro com background `--ink`
3. Footer mínimo dentro do CTAFinal
4. Commit: "fase 7: como funciona + cta final"

### FASE 8 — WhatsApp flutuante + Voltar ao topo
1. Construa WhatsAppFlutuante.astro com sticky positioning
2. Aparece após scroll de 600px (use IntersectionObserver ou scroll listener)
3. Animação de entrada com scale spring
4. Botão "Voltar ao topo" aparece após 1500px de scroll
5. Commit: "fase 8: stickies"

### FASE 9 — Refinamentos visuais
1. Implemente cursor custom em CTAs
2. Implemente underline animado em links
3. Easing custom global
4. Optical sizing em Fraunces no hero
5. Texturas de fundo sutis em hero e CTA final
6. Commit: "fase 9: microinteracoes"

### FASE 10 — Performance + Build
1. Otimize imagens (use `astro:assets` se tiver imagens reais, senão SVGs ficam leves)
2. Rode `npm run build` e confirme `dist/` < 500kb
3. Rode Lighthouse local em mobile (use Chrome DevTools)
4. Ajuste o que ficar abaixo de 95
5. Commit: "fase 10: build otimizado"

### FASE 11 — Deploy
1. Crie README.md com:
   - O que é o projeto
   - Como rodar local (`npm run dev`)
   - Como buildar (`npm run build`)
   - Como deployar
2. Para deploy, **gere instruções pra Vercel** (mas não tente deployar você — o Lucas vai conectar o GitHub manualmente):
   ```
   1. Suba o repositório pro GitHub (instruções em README)
   2. Conecte no vercel.com (gratuito)
   3. Vercel detecta Astro automaticamente
   4. Adicione PUBLIC_WHATSAPP_NUMBER nas env vars
   5. Deploy automático em cada push
   ```
3. Crie `STATUS.md` com tudo que foi feito + screenshots/descrição visual
4. Commit final: "fase 11: deploy ready"

---

## 9. Configuração de WhatsApp

Antes de buildar, **pare e crie** um arquivo `PRECISO-DO-WHATSAPP.md` com:

```
Lucas, antes de finalizar o site preciso do número de WhatsApp que aparecerá nos CTAs.

Cole no .env do projeto:
PUBLIC_WHATSAPP_NUMBER=5534XXXXXXXXX

(formato: 55 + DDD + número, sem +, sem espaços, sem traços)

Exemplo Uberaba: 553499999999

Por enquanto vou usar 5534999999999 como placeholder.
```

---

## 10. Quando terminar

1. Crie `RESUMO-FINAL.md` com:
   - Estrutura final de arquivos
   - Lighthouse scores reais (mobile)
   - Screenshots/descrições de cada seção
   - URL local pra preview (`http://216.238.105.67:4321` se rodando em dev mode)
   - Instruções claras pro Lucas pra deploy no Vercel

2. **Não tente fazer deploy automaticamente.** O Lucas vai fazer isso manualmente conectando o GitHub na Vercel.

3. Imprima resumo final na sessão tmux.

4. Critério de "pronto" da seção 0 deve estar 100% satisfeito.

---

**Boa sorte. Pode começar pela Fase 1.**
