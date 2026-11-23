// Loader d'entrée (5 secondes) + petites animations
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");

  // Afficher l'animation uniquement lors de la toute première visite
  if (loader) {
    let hasVisited = false;

    try {
      hasVisited =
        typeof window !== "undefined" &&
        "localStorage" in window &&
        window.localStorage.getItem("portfolioHasVisited") === "true";
    } catch (e) {
      hasVisited = false;
    }

    if (hasVisited) {
      // Déjà venu : on masque immédiatement le loader
      loader.classList.add("is-hidden");
    } else {
      // Première visite : on joue l'animation puis on ne la rejouera plus
      setTimeout(() => {
        loader.classList.add("is-hidden");
        try {
          window.localStorage.setItem("portfolioHasVisited", "true");
        } catch (e) {
          // Ignore si localStorage n'est pas disponible
        }
      }, 5000);
    }
  }

  // Révélation douce des sections au scroll
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback : tout visible
    revealEls.forEach((el) => el.classList.add("reveal-visible"));
  }
});

