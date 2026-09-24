// Click-to-open notes
document.querySelectorAll(".note").forEach((note) => {
  note.addEventListener("click", () => {
    note.classList.toggle("is-open");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Subtle parallax on photos
  const photos = document.querySelectorAll('.photo');
  window.addEventListener('scroll', () => {
    const vh = window.innerHeight;
    photos.forEach(photo => {
      const rect = photo.parentElement.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      photo.style.setProperty('--parallax', `${progress * -18}px`);
    });
  }, { passive: true });

// Gentle parallax on the story photos as you scroll.
// Skipped entirely if the visitor prefers reduced motion.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// A few soft petals drifting down the page, for atmosphere.
// EDIT: set exactly how many of each flower you want falling.
const SUNFLOWER_COUNT = 16;   // number of sunflowers
const BLOSSOM_COUNT = 14;     // number of blossoms

if (!prefersReducedMotion) {
  const field = document.getElementById("petal-field");

  // Build one flat list: `true` = sunflower, `false` = blossom, then
  // shuffle it so they don't all fall in two separate clumps.
  const petalTypes = [
    ...Array(SUNFLOWER_COUNT).fill(true),
    ...Array(BLOSSOM_COUNT).fill(false),
  ];
  for (let i = petalTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [petalTypes[i], petalTypes[j]] = [petalTypes[j], petalTypes[i]];
  }

  petalTypes.forEach((isSunflower) => {
    const petal = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    petal.classList.add("petal");
    if (isSunflower) petal.classList.add("petal--sunflower");

    petal.setAttribute("viewBox", isSunflower ? "0 0 100 100" : "0 0 64 64");
    petal.innerHTML = isSunflower
      ? '<use href="#flower-sunflower"></use>'
      : '<use href="#flower-blossom"></use>';

    const size = 30 + Math.random() * 14;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    if (!isSunflower) {
      petal.style.color = Math.random() > 0.5 ? "#e8879f" : "#f3b7c6";
    }

    const fallDuration = 14 + Math.random() * 10;
    const swayDuration = 3 + Math.random() * 2;
    const spinDuration = 6 + Math.random() * 6;

    petal.style.animationDuration = isSunflower
      ? `${fallDuration}s, ${swayDuration}s, ${spinDuration}s`
      : `${fallDuration}s, ${swayDuration}s`;
    petal.style.animationDelay = isSunflower
      ? `${Math.random() * -fallDuration}s, ${Math.random() * -swayDuration}s, ${Math.random() * -spinDuration}s`
      : `${Math.random() * -fallDuration}s, ${Math.random() * -swayDuration}s`;

    field.appendChild(petal);
  });
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