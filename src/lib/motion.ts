// Helpers Motion One — animações sob demanda, lazy.
// Carregamos motion como ES module no client para manter <head> leve.
import { animate, stagger, inView } from "motion";

export const easePraca: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Reveal-on-scroll baseado em IntersectionObserver puro (CSS faz a transição).
 * Procura por .reveal e adiciona .is-visible quando entram no viewport.
 */
export function initReveal(root: ParentNode = document) {
  const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
  if (els.length === 0) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );
  els.forEach((el) => io.observe(el));
}

/**
 * Stagger animado de linhas do hero usando Motion One.
 * Cada elemento começa com opacity 0 e translateY(40px).
 */
export function animateHeroLines(selector = "[data-hero-line]") {
  const els = document.querySelectorAll<HTMLElement>(selector);
  if (els.length === 0) return;
  // Estado inicial via JS (evita FOUC se JS desativado a CSS leva)
  els.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
  });
  animate(
    els,
    { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0px)"] },
    { duration: 0.95, delay: stagger(0.08), ease: easePraca }
  );
}

/**
 * Conta um número de 0 até `to` quando o elemento entra no viewport.
 */
export function countUpInView(selector: string, to: number, duration = 1.2) {
  const els = document.querySelectorAll<HTMLElement>(selector);
  els.forEach((el) => {
    inView(el, () => {
      const start = { value: 0 };
      animate(start, { value: to }, {
        duration,
        ease: easePraca,
        onUpdate: (latest) => {
          const v = typeof latest === "number" ? latest : start.value;
          el.textContent = Math.round(v).toString();
        }
      });
      return () => {};
    });
  });
}

/**
 * Spring entry para o WhatsApp flutuante (scale 0 -> 1).
 */
export function springIn(el: HTMLElement) {
  animate(
    el,
    { transform: ["scale(0)", "scale(1)"], opacity: [0, 1] },
    { type: "spring", stiffness: 220, damping: 18 }
  );
}
