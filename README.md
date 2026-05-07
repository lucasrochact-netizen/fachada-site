# Praça — site

> Vitrine one-page que será mandada por WhatsApp pros leads da Esteira PME-MG.
> Não é site de tráfego orgânico — é o "mockup vivo" que o lead abre depois da mensagem fria.

**Posicionamento:** "A gente cuida da sua presença digital — do jeito que cidade pequena merece."

**Stack:** Astro 6 · Tailwind v4 · TypeScript strict · sem framework de animação (Web Animations API + IntersectionObserver puros).

---

## Comandos

```sh
npm install            # instalar dependências (precisa Node 22.12+)
npm run dev            # dev server em http://localhost:4321
npm run build          # build estático em ./dist/
npm run preview        # serve o build pra teste local
```

## Estrutura

```
src/
├── components/
│   ├── Hero.astro             # seção 1 — headline + CTA WhatsApp
│   ├── Analise.astro          # seção 2 — antes/depois Google profile
│   ├── Produtos.astro         # seção 3 — 2 cards de produto
│   ├── Galeria.astro          # seção 4 — 6 mockups com modal
│   ├── ComoFunciona.astro     # seção 5 — 3 passos
│   ├── CTAFinal.astro         # seção 6 — fundo --ink, 2 botões + footer
│   ├── WhatsAppFlutuante.astro # botões fixos canto inferior
│   ├── Logo.astro             # wordmark Praça com pin
│   ├── NoiseTexture.astro     # textura SVG sutil
│   ├── MockupCardapio.astro   # SVG inline mockup celular
│   └── MockupSite.astro       # SVG inline mockup laptop
├── layouts/Base.astro         # head, OG, fontes preloadadas
├── lib/
│   ├── motion.ts              # animação reveal, count-up, spring (zero deps)
│   └── whatsapp.ts            # gera URLs com mensagem pré-preenchida
├── pages/index.astro          # composição da home
└── styles/global.css          # tokens (cores, tipografia, easing) + utilities
public/
└── fonts/                     # subset latin de Fraunces, Manrope, IBM Plex Mono
```

---

## Configuração de WhatsApp

O número usado nos CTAs vem da variável `PUBLIC_WHATSAPP_NUMBER`.

Crie um `.env` (cópia de `.env.example`):

```
PUBLIC_WHATSAPP_NUMBER=553499999999
```

**Formato:** 55 + DDD + número, sem `+`, sem espaços, sem traços. Sem essa env, usa o placeholder `5534999999999` (do spec).

Cada CTA do site usa uma mensagem pré-preenchida diferente (definidas em `src/lib/whatsapp.ts`). Por exemplo, o botão "Quero o cardápio" abre WhatsApp já com `"Oi! Quero o cardápio QR de R$ 247. Meu negócio é [_____] em [_____]."`.

---

## Deploy no Vercel

O site é estático puro — qualquer host serve. Recomendado: **Vercel** (gratuito, autodetecta Astro, deploy automático em cada push).

1. **Suba pro GitHub**
   ```sh
   gh repo create praca-site --public --source=. --push
   # ou: git remote add origin git@github.com:<user>/praca-site.git && git push -u origin main
   ```

2. **Conecte no Vercel**
   - Acesse [vercel.com/new](https://vercel.com/new)
   - Importe o repositório do GitHub
   - Vercel detecta Astro automaticamente (build command `astro build`, output `dist/`)

3. **Configure a env var**
   - Em *Settings → Environment Variables*, adicione:
     `PUBLIC_WHATSAPP_NUMBER=553499999999` (com seu número real)
   - Marque pra **Production**, **Preview** e **Development**

4. **Deploy**
   - O primeiro deploy roda automático. Cada push em `main` redeploya.
   - Conecte um domínio em *Settings → Domains* (opcional).

---

## Performance

Lighthouse mobile (build de prod): **Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100**.
Desktop: **100 · 100 · 100 · 100**.

`dist/` total: ~288 KB (orçamento spec: <500 KB).
Primeira pintura over the wire (HTML+CSS gzipped + 2 fontes preloadadas): ~80 KB.

### O que foi cortado pra chegar lá
- **Subset latin** das 3 famílias tipográficas — em vez do bundle multilingue (cirílico, vietnamita, etc.) do `@fontsource`.
- **Sem biblioteca de animação** — Web Animations API nativa + IntersectionObserver economizam ~63 KB que o Motion One ocuparia. Usado em hero stagger, count-up dos dias úteis, spring entry dos floaters e reveal-on-scroll.
- **Inline SVG** pros mockups da galeria — sem requisições extras, paletas variadas (clay/moss/ink) controladas via props.

---

## Princípios de design

Identidade visual: **terracota + creme + tinta**. Inspirado em terra de Minas, parede de fazenda colonial e tinta nanquim. **Não é** startup tech, **não é** agência maximalista.

- Tokens definidos em `@theme` no Tailwind v4 (`src/styles/global.css`).
- Tipografia: Fraunces (display, serifa moderna com optical sizing real `opsz`), Manrope (corpo), IBM Plex Mono (preços, prazos, selos).
- Easing custom global: `cubic-bezier(0.22, 1, 0.36, 1)` (out-quint).
- Mobile-first sempre — a maioria dos leads abre pelo celular.
