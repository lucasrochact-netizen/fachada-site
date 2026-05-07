# STATUS — Praça site

**Estado:** ✅ Pronto pra deploy.
**Build:** `npm run build` gera `dist/` em ~3s, 288 KB total.
**Lighthouse mobile:** Performance **99** · Accessibility **100** · Best Practices **100** · SEO **100**.
**Lighthouse desktop:** **100 · 100 · 100 · 100**.

---

## Fases concluídas

| # | Fase | Status |
|---|------|:-:|
| 1 | Bootstrap Astro + Tailwind v4 + tokens | ✅ |
| 2 | Layout base + Logo | ✅ (junto da fase 1) |
| 3 | Hero | ✅ |
| 4 | Análise (antes/depois Google) | ✅ |
| 5 | Produtos (2 cards) | ✅ |
| 6 | Galeria (6 mockups + modal) | ✅ |
| 7 | Como Funciona + CTA Final | ✅ |
| 8 | WhatsApp flutuante + Voltar ao topo | ✅ |
| 9 | Refinamentos visuais (count-up, easing, opsz) | ✅ |
| 10 | Performance + Build | ✅ |
| 11 | Deploy ready (README + STATUS + RESUMO) | ✅ |

---

## Critério de "pronto" (do TASK §0)

- [x] Site rodando localmente em `npm run dev` na porta 4321
- [x] Build estático em `npm run build` sem erros
- [x] `dist/` total < 500 KB → **288 KB** ✅
- [x] Lighthouse mobile Performance ≥ 95 → **99** ✅
- [x] Lighthouse mobile Accessibility ≥ 95 → **100** ✅
- [x] Lighthouse mobile Best Practices = 100 → **100** ✅
- [x] Lighthouse mobile SEO = 100 → **100** ✅
- [x] Todos os 8 CTAs WhatsApp abrem `wa.me/<número>?text=<mensagem-correta>`
- [x] Visualmente distintivo (terracota + creme + tinta, sem aparência de site genérico)
- [x] Português brasileiro em todo copy
- [x] Mobile-first

---

## CTAs configurados (mensagens pré-preenchidas)

| Onde | Mensagem (URL-encoded em produção) |
|------|--------------------------------------|
| Hero (botão grande) | `Oi! Vim pelo site da Praça. Queria saber mais.` |
| Hero (link nav WhatsApp) | mesma do Hero |
| Card Cardápio R$ 247 | `Oi! Quero o cardápio QR de R$ 247. Meu negócio é [_____] em [_____].` |
| Card Site R$ 397 | `Oi! Quero o site profissional de R$ 397. Meu negócio é [_____] em [_____].` |
| Galeria — modal "Quero algo assim" | `Oi! Vi a galeria do site da Praça. Queria algo parecido com [_____].` |
| CTA Final — Cardápio | `Oi! Quero o cardápio QR de R$ 247.` |
| CTA Final — Site | `Oi! Quero o site profissional de R$ 397.` |
| Botão flutuante verde | `Oi! Vim pelo site da Praça. Pode me ajudar?` |

Todas em `src/lib/whatsapp.ts`. Telefone via `PUBLIC_WHATSAPP_NUMBER` no `.env`. Placeholder atual: `5534999999999`.

---

## Pendências NÃO bloqueadoras (futuro)

- Substituir os mockups SVG fictícios da galeria por screenshots reais quando os primeiros clientes fecharem.
- Adicionar `og-image.png` raster pra previews mais bonitos no WhatsApp (hoje tem `og-image.svg`, alguns clients não renderizam SVG bem).
- Configurar `Astro.site` em `astro.config.mjs` com o domínio definitivo pra `<link rel="canonical">` e Open Graph apontarem certo.
- Considerar incluir métricas reais quando começar a circular (e.g. plausible/umami; o spec pede pra evitar GA + cookie banner).

---

## Stack final

- **Astro 6.2** — SSG, output static
- **Tailwind v4** — via `@tailwindcss/vite`, tokens em `@theme`
- **TypeScript strict**
- **Fontes:** Fraunces variable + Manrope variable + IBM Plex Mono (subset latin only, woff2, self-hosted em `/public/fonts/`)
- **Animação:** Web Animations API + IntersectionObserver (zero deps)
- **Build:** `dist/` 288 KB, 11 chunks JS pequenos (~600B–1.5KB cada), 1 CSS bundle 36 KB

---

## Como rodar local agora

```sh
cd /home/claude-agent/praca-site
npm run dev          # → http://localhost:4321
# ou:
npm run build && npm run preview -- --port 4322
```
