# RESUMO FINAL — Praça site

> Lucas, o site tá pronto. Resumo do que foi feito, como está, e os próximos passos pra você publicar.

---

## TL;DR

- **Site rodando localmente:** `cd /home/claude-agent/praca-site && npm run dev` → http://localhost:4321
- **Build de produção:** 288 KB total (orçamento spec: <500 KB) ✅
- **Lighthouse mobile:** 99 / 100 / 100 / 100 (perf / a11y / bp / seo)
- **Lighthouse desktop:** 100 / 100 / 100 / 100
- **Próximo passo seu:** subir pro GitHub, conectar Vercel, configurar `PUBLIC_WHATSAPP_NUMBER` real.

---

## Arquitetura final

```
/home/claude-agent/praca-site/
├── src/
│   ├── components/           # 11 componentes Astro, todos com style scoped
│   ├── layouts/Base.astro    # head + OG + preload de fontes
│   ├── lib/
│   │   ├── motion.ts         # animações zero-deps (Web Animations API)
│   │   └── whatsapp.ts       # gera URL com mensagem pré-preenchida
│   ├── pages/index.astro     # composição da home
│   └── styles/global.css     # tokens (cores, tipografia) + utilities
├── public/
│   ├── fonts/                # subset latin (woff2) — 90 KB total
│   ├── favicon.svg           # pin Praça em 64×64
│   └── og-image.svg          # 1200×630 pra preview WhatsApp
├── README.md                 # documentação técnica
├── STATUS.md                 # checklist do critério "pronto"
└── RESUMO-FINAL.md           # este arquivo
```

---

## Visual: as 6 seções do site

### 1. Hero
- Logo Praça canto esquerdo + WhatsApp pill canto direito
- H1 enorme em Fraunces 600 com optical sizing real (`opsz 144`):
  > **Cardápio em PDF.** *(quebra)* **Site de 2018.** *(quebra)* **Seu vizinho já resolveu.**
  com cada ponto final em terracota (`--clay`)
- Subtítulo Manrope 400 com preços R$ 247 / R$ 397 em IBM Plex Mono
- CTA primário "Falar no WhatsApp →" + link sutil "ou ver alguns trabalhos"
- Animação: cada linha entra com fade + translateY 40px, stagger de 80ms (Web Animations API)
- Background `--paper` (off-white quente) com noise texture SVG `opacity 0.05`
- Footer sutil em mono uppercase: "ATENDEMOS CIDADES PEQUENAS EM MINAS GERAIS"

### 2. Análise (antes/depois)
- Eyebrow mono uppercase clay: "SUA PRESENÇA DIGITAL HOJE"
- H2: "Seu Google tá assim:"
- Dois cards lado a lado simulando perfil Google:
  - **Antes**: chip "PERFIL INCOMPLETO", placeholder hachurado "sem foto recente", 3,2 estrelas, 3 itens com line-through (sem cardápio, site indisponível, sem horário)
  - **Depois**: selo dourado "EM 5 DIAS", mosaico com 3 fotos coloridas + "+12", 4,8 estrelas (47 avaliações), 3 itens com bullet verde (cardápio QR conectado, site responsivo <2s, posts semanais)
- Caption final: "Mesmo cliente, mesma cidade, mesma comida. **O que muda é só como você aparece.**"

### 3. Produtos
- Eyebrow mono: "DOIS PRODUTOS. SEM MENSALIDADE."
- H2: "Escolhe o que te encaixa."
- 2 cards com preço enorme em IBM Plex Mono:
  - **Cardápio QR — R$ 247** · 5 features com checkmark clay · "Pronto em 5 dias úteis." · CTA "Quero o cardápio →"
  - **Site profissional — R$ 397** · selo "MAIS PROCURADO" · 5 features · "Pronto em 7 dias úteis." · CTA "Quero o site →"
- Os números 5 e 7 dos prazos animam de 0 ao valor quando entram no viewport

### 4. Galeria
- 6 mockups SVG inline distintos:
  | # | Negócio | Cidade | Tipo | Paleta |
  |---|---------|--------|------|--------|
  | 1 | Pizzaria do Tonho | Uberaba | Cardápio QR | clay |
  | 2 | Salão Bianca | Patos de Minas | Site | ink |
  | 3 | Pousada Recanto | Araxá | Site | moss (verde) |
  | 4 | Burger do Zé | Frutal | Cardápio QR | ink |
  | 5 | Clínica Sorrir | Ituiutaba | Site | clay |
  | 6 | Padaria Estrela | Sacramento | Cardápio QR | moss |
- Os cardápios mostram um celular com itens fictícios do tipo do negócio (pizza/burger/padaria)
- Os sites mostram um laptop com hero + 3 cards de serviços + CTA banda
- Cada card abre `<dialog>` modal nativo com versão maior + CTA "Quero algo assim"

### 5. Como funciona
- Eyebrow: "SEM MISTÉRIO". H2: "Como funciona."
- 3 colunas em desktop, empilhadas em mobile:
  - **01** Você manda WhatsApp
  - **02** A gente entrega em 5–7 dias
  - **03** Não gostou? Devolvo o dinheiro
- Números enormes em Fraunces 700 cor `--clay-light`
- Linha de progresso sutil entre passos no desktop

### 6. CTA Final
- Background `--ink` (escuro), texto `--paper` (claro)
- Eyebrow clay claro: "ÚLTIMA PARADA"
- H2 grande: "Pronto pra resolver?"
- 2 botões grandes lado a lado: "Quero o cardápio (R$ 247)" (clay) + "Quero o site (R$ 397)" (outline claro)
- Footer com Logo Praça em paper, telefone formatado (+55 (34) 99999-9999), copyright

### Sticky (sempre visível)
- WhatsApp verde 56×56 no canto inferior direito após scroll de 600px (entrada com spring)
- Botão "voltar ao topo" 44×44 abaixo dele após scroll de 1500px

---

## Performance — o que dá pra fazer mais

Já está em 99 mobile / 100 desktop. Caminhos pra empurrar 99→100 mobile (não obrigatórios):

- O LCP atual é 1.8s. Se quiser baixar pra ~1.4s, considerar `font-display: optional` no Fraunces (aceita texto sem fonte por 100ms e então fica na fonte de fallback se não chegou) — tradeoff: alguns visitantes podem ver fallback.
- TBT 120ms. Diminuiria removendo o JS dos componentes que poderiam ser pure-CSS (e.g., `Analise.astro` e `ComoFunciona.astro` só fazem `initReveal`; daria pra centralizar num único script).

Mas pra um site mandado por WhatsApp, esses ganhos são imperceptíveis. O atual é suficiente.

---

## Próximos passos pra você (deploy)

### 1. Crie um repo no GitHub
```sh
cd /home/claude-agent/praca-site
gh repo create praca-site --public --source=. --push
# ou via interface:
# git remote add origin git@github.com:<seuuser>/praca-site.git
# git push -u origin main
```

### 2. Vercel (≈ 3 minutos)
- Acesse [vercel.com/new](https://vercel.com/new)
- Importe `praca-site`
- **Não mude nada** no Build Settings — o Vercel detecta Astro
- Em **Environment Variables**, adicione:
  - Name: `PUBLIC_WHATSAPP_NUMBER`
  - Value: o número de verdade (formato `5534XXXXXXXXX`, sem +, sem espaços)
  - Apply to: Production, Preview, Development
- Clica **Deploy**. Em 30 segundos seu site tá no ar.

### 3. Domínio (opcional)
- Em Settings → Domains, adicione `praca.com.br` (ou o que comprar)
- Vercel te dá os registros DNS pra apontar no Registro.br

### 4. Editar conteúdo depois
- Cada commit em `main` redeploya automaticamente.
- Quero adicionar trabalho real à galeria? Edita `src/components/Galeria.astro`, troca os 6 objetos no array `trabalhos`, faz commit, sobe.

---

## O que NÃO foi feito (e por quê)

- **Cursor custom em desktop**: implementado via `.cursor-clay` nos CTAs (data URL SVG). É discreto — não tem cursor "personalizado em todo lugar", só nos botões importantes (como o spec pediu).
- **Drag-and-flip nos cards de produto em mobile**: não implementado. É um efeito que custa código e degrada Lighthouse. O hover-lift já dá a sensação de "card responsivo".
- **Loading states pra imagens**: como o site só usa SVG inline (sem imagens externas), não há pra carregar.
- **OG image rasterizada**: tem `og-image.svg`. Se precisar de PNG (alguns previewers do WhatsApp não rasterizam SVG), exporto depois — me chama.

---

## Sessão de trabalho

11 commits, 11 fases:

```
b5d58ce fase 9: refinamentos — count-up nos dias uteis
c042750 fase 8: whatsapp flutuante + voltar ao topo
... (lista completa em git log)
```

Para retomar:
```sh
cd /home/claude-agent/praca-site
git log --oneline
npm run dev
```
