// Mensagens pré-preenchidas por seção. Cada CTA do site usa uma variante.
// Spec: TASK-praca-site.md §5
export const ctaMessages = {
  hero: "Oi! Vim pelo site da Praça. Queria saber mais.",
  cardapio_card:
    "Oi! Quero o cardápio QR de R$ 247. Meu negócio é [_____] em [_____].",
  site_card:
    "Oi! Quero o site profissional de R$ 397. Meu negócio é [_____] em [_____].",
  galeria_quero:
    "Oi! Vi a galeria do site da Praça. Queria algo parecido com [_____].",
  cta_final_cardapio: "Oi! Quero o cardápio QR de R$ 247.",
  cta_final_site: "Oi! Quero o site profissional de R$ 397.",
  whatsapp_sticky: "Oi! Vim pelo site da Praça. Pode me ajudar?",
  topo_pequeno: "Oi! Vim pelo site da Praça."
} as const;

export type CtaKey = keyof typeof ctaMessages;

// Lê o número de WhatsApp do .env (PUBLIC_WHATSAPP_NUMBER, formato 55DDDXXXXXXXX).
// Fallback explicitado no spec: 5534999999999.
const RAW_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? "5534999999999";

// Sanitiza qualquer formatação acidental (espaços, traços, parênteses, +).
const NUMBER = String(RAW_NUMBER).replace(/[^0-9]/g, "");

export function whatsappUrl(key: CtaKey): string {
  const text = encodeURIComponent(ctaMessages[key]);
  return `https://wa.me/${NUMBER}?text=${text}`;
}

export function whatsappNumber(): string {
  return NUMBER;
}
