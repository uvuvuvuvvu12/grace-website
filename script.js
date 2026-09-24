// Click-to-open notes
document.querySelectorAll(".note").forEach((note) => {
  note.addEventListener("click", () => {
    note.classList.toggle("is-open");
  });
});

// Gentle parallax on the story photos as you scroll.
// Skipped entirely if the visitor prefers reduced motion.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// A few soft petals drifting down the page, for atmosphere.
if (!prefersReducedMotion) {
  const field = document.getElementById("petal-field");
  const PETAL_COUNT = 10;

  for (let i = 0; i < PETAL_COUNT; i++) {
    const petal = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    petal.classList.add("petal");
    petal.setAttribute("viewBox", "0 0 64 64");
    petal.innerHTML = '<use href="#flower-blossom"></use>';

    const size = 10 + Math.random() * 14;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.color = Math.random() > 0.5 ? "#e8879f" : "#f3b7c6";

    const fallDuration = 14 + Math.random() * 10;
    const swayDuration = 3 + Math.random() * 2;
    petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    petal.style.animationDelay = `${Math.random() * -fallDuration}s, ${Math.random() * -swayDuration}s`;

    field.appendChild(petal);
  }
}

if (!prefersReducedMotion) {
  const photos = Array.from(document.querySelectorAll(".photo"));
  let ticking = false;

  function updateParallax() {
    const viewportH = window.innerHeight;

    photos.forEach((photo) => {
      const rect = photo.parentElement.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distanceFromCenter = center - viewportH / 2;
      // Small, capped shift so photos drift slightly rather than jump.
      const shift = Math.max(-24, Math.min(24, distanceFromCenter * -0.04));
      photo.style.transform = `translateY(${shift}px) scale(1.08)`;
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  window.addEventListener("resize", updateParallax);
  updateParallax();
}
