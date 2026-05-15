# Praça — site institucional da Fachada

Este workspace é **só** do site `afachada.com.br`. Bot WhatsApp e esteira de leads ficam em outro workspace (`/home/claude-agent/fachada-ops/`).

## Stack

- **Astro 6** (modo estático, sem SSR/adapter — purposeful, deploy estático no Pages)
- **Tailwind v4** via `@tailwindcss/vite`
- **Hospedagem**: Cloudflare Pages (projeto `fachada-site` na conta lucas.rocha.ct@gmail.com)
- **Build**: `npm run build` → `dist/`
- **Node**: 22+ (declarado em `package.json` engines; Pages usa `NODE_VERSION=22` env var)
- **Domínio**: `afachada.com.br` + `www.afachada.com.br`, DNS na Cloudflare

## Comandos

```bash
npm run dev          # localhost:4321
npm run build        # produz dist/
npm run preview      # serve dist/ pra teste local
```

## Deploy

Push em `main` → Cloudflare Pages re-builda automaticamente em ~1-2min. URL de preview: `fachada-site.pages.dev`. Produção: `afachada.com.br`.

## Cuidado: auto-config da Cloudflare

A Cloudflare tende a abrir PR `cloudflare/workers-autoconfig` propondo converter o site pra Worker SSR com `@astrojs/cloudflare`. **NÃO MERGEAR** esse PR — quebra o deploy estático e gera 404. Se aparecer no GitHub, fechar sem mergear. Se o repo já estiver em estado convertido, `git revert -m 1 <merge-sha>` resolve.

## Número de WhatsApp dos CTAs

Configurado em `src/lib/whatsapp.ts` (fallback `5511916200459`) e env `PUBLIC_WHATSAPP_NUMBER`. Trocar aqui se mudar o número do bot.

## O que NÃO está aqui

- Bot WhatsApp (`fachada-bot-wa`), worker Python (`fachada-esteira`), VPS Vultr, systemd services, prompt do bot — workspace `/home/claude-agent/fachada-ops/`
