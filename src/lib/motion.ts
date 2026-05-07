// Animações usando IntersectionObserver + CSS transitions + rAF.
// Substitui Motion One pra economizar ~60KB no bundle.

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveal-on-scroll: adiciona .is-visible em .reveal quando entram no viewport.
 * O CSS faz o easing.
 */
export function initReveal(root: ParentNode = document) {
  const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
  if (els.length === 0) return;
  if (REDUCED) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
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
 * Stagger animado de linhas do hero. Cada elemento entra com fade + translate-y.
 * Implementado com Web Animations API (zero deps).
 */
export function animateHeroLines(selector = "[data-hero-line]") {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return;
  if (REDUCED) {
    els.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }
  els.forEach((el, i) => {
    el.animate(
      [
        { opacity: 0, transform: "translateY(40px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 950,
        delay: i * 80,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both"
      }
    );
  });
}

/**
 * Conta um número de 0 até `to` quando o elemento entra no viewport.
 * Usa requestAnimationFrame.
 */
export function countUpInView(selector: string, to: number, durationMs = 1100) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return;
  if (REDUCED) {
    els.forEach((el) => (el.textContent = String(to)));
    return;
  }
  const ease = (t: number) => 1 - Math.pow(1 - t, 5); // out-quint
  const animate = (el: HTMLElement) => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      el.textContent = String(Math.round(to * ease(t)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          animate(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

/**
 * Spring entry para botões flutuantes (scale 0 -> 1 com leve overshoot).
 */
export function springIn(el: HTMLElement) {
  if (REDUCED) {
    el.style.opacity = "1";
    el.style.transform = "scale(1)";
    return;
  }
  el.animate(
    [
      { transform: "scale(0)", opacity: 0 },
      { transform: "scale(1.08)", opacity: 1, offset: 0.7 },
      { transform: "scale(1)", opacity: 1 }
    ],
    {
      duration: 480,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "both"
    }
  );
}
