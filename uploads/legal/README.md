# Pro Claude do praca-site — Termos de Serviço + Política de Privacidade

Lucas subiu estes 2 documentos legais prontos pra publicação no site. Cada um é HTML self-contained com CSS inline (paleta `#FAFAF7` bg, `#5B9DC1` accent, fontes Inter + Playfair Display).

## Arquivos

- **`termos-de-servico.html`** (16KB) — `<title>Termos de Serviço — Fachada</title>`
- **`politica-de-privacidade.html`** (15KB) — `<title>Política de Privacidade — Fachada</title>`

## O que fazer com eles

Provavelmente publicar como rotas do Astro:
- `/termos` → renderiza `termos-de-servico.html`
- `/privacidade` → renderiza `politica-de-privacidade.html`

Como o stack do praca-site é Astro 5 + Tailwind v4, o caminho idiomático é:
1. Mover o conteúdo do `<body>` pra `src/pages/termos.astro` e `src/pages/privacidade.astro`
2. Reaproveitar o layout base do site (header/footer da Praça)
3. Adaptar a paleta dos legal docs (`#FAFAF7`/`#5B9DC1`) pra paleta da Praça se conflitar com identidade visual
4. Linkar os 2 no footer do site

OU mais rápido: servir os HTMLs estáticos via `public/termos.html` e `public/privacidade.html` (perde header/footer da Praça, mas zero refactor).

## Links que deveriam apontar pra eles

- Footer do site (sempre)
- Páginas de checkout/onboarding (se houver)
- Mockups do Fachada (em `mockup.afachada.com.br`) já têm popover "como funciona" no footer — não menciona TOS/privacidade; futuramente pode adicionar link
