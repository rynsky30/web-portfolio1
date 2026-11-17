// reveal.js — simple IntersectionObserver based reveal animation

/**
 * Initialise reveal behaviour.
 * Elements with the class `.reveal` will receive the modifier
 * `.reveal--visible` when they intersect the viewport, triggering
 * the CSS animation defined in `components.css`.
 */
export function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect prefers-reduced‑motion – keep elements static if user prefers.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('reveal--visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}
