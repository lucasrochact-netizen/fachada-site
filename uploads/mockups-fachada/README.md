# Mockups Fachada — entrega 2026-05-11

8 mockups standalone gerados pelo projeto `fachada-cardapios` (em `~/fachada-cardapios/`). Cada `.html` é **self-contained** — CSS + JS inline, sem assets locais. Imagens vêm de URLs públicas (Google Photos do GMB) e fontes do Google Fonts CDN. Funciona offline depois do primeiro load se browser cacheou as imagens.

## Tamanho
- Cada HTML: 55-67 KB
- Total: 488 KB
- WhatsApp aceita anexo HTML até 100 MB → sem problema

## Os 8 mockups

| Slug | Categoria | Estrutura |
|---|---|---|
| `giardino-pizzaria-uberlandia.html` | pizzaria | food/casual |
| `padaria-le-crocant-uberlandia.html` | padaria | food/friendly |
| `churrascaria-tropeiro-uberlandia.html` | churrascaria | food/casual |
| `leju-uberlandia.html` | restaurante | food/premium |
| `d-buenas-barbearia-...uberlandia.html` | barbearia | service/warm |
| `neo-salon-uberlandia.html` | salão de beleza | service/warm |
| `primer-odontocenter-uberlandia.html` | clínica odonto | service/professional |
| `mecanico-24-horas-...uberlandia.html` | oficina mecânica | service/solid |

## Features que cada mockup carrega

- Live Open Pill (recalcula a cada minuto via setInterval com working_hours inferido pelo LLM)
- Heritage card com ano + pivot do fundador (1957, 1992, 2005, etc.)
- Honestidade radical (`<details>` "O que a gente NÃO faz")
- Reviews scroll-snap horizontal (vazio se RapidAPI 429)
- Galeria com `::scroll-marker` em mobile (Chrome 135+) com fallback gracioso
- Footer combo: Web Share API + Sou cliente fixo + Reivindicar
- Popover nativo + anchor-name (Chrome 133+) explicando "Como funciona?"
- WhatsApp injetado em runtime com PROTOCOLO determinístico (FA + base36 hash do slug + deviceId)
- food: mini-quiz "tá com fome de quê?" + favoritos com localStorage + enviar lista pelo Zap
- service: slot picker bottom sheet + ICS download (gera .ics client-side)
- LUT condicional (warm pra food, cool pra service) + filtros CSS reforçados
- Anti-AI: voz da dona/dono, depoimento estruturado, equipe inferida, banlist

## Como o Lucas pretende distribuir

**Opção A — link permanente** (Named Tunnel Cloudflare → Vultr):
`https://mockup.afachada.com.br/m/<slug>/`

**Opção B — anexar HTML no WhatsApp** (perde preview com foto + perde tracking)

Cada mockup já tem **10 OG tags completas** (og:title, og:description, og:image 1200×630, og:url, og:locale, twitter:card etc.) — quando o link é colado no WA, gera card grande com foto da fachada + nome + frase do dono. URL é estável; preview cacheado pelo WA continua válido pra sempre.

## Pro Claude da praca-site

Esses 8 HTMLs servem de **referência visual** do que o Fachada gera. Se for incorporar exemplos do "mockup que entregamos" na landing da Praça, pode embedar 1-2 desses como `<iframe>` ou linkar direto. Cada um é self-contained.
