(function () {
  const html = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.getElementById("top");
  const heroInner = hero ? hero.querySelector(".hero-inner") : null;
  let lenis = null;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function setupLenis() {
    if (reduceMotion || !window.Lenis) return;
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    document.addEventListener("click", function (e) {
      const link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link || link.classList.contains("skip-link")) return;
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.2, easing: easeOutExpo });
    });
    const dialog = document.getElementById("project-dialog");
    if (dialog && "MutationObserver" in window) {
      new MutationObserver(function () {
        if (dialog.open) lenis.stop(); else lenis.start();
      }).observe(dialog, { attributes: true, attributeFilter: ["open"] });
    }
  }

  function setupHeroScroll() {
    if (!hero) return;
    let ticking = false;
    function update() {
      ticking = false;
      const h = hero.offsetHeight || 1;
      const progress = Math.max(0, Math.min(1, window.scrollY / h));
      if (window.HeroScene && window.HeroScene.setScroll) window.HeroScene.setScroll(progress);
      if (heroInner && !reduceMotion) heroInner.style.setProperty("--hero-p", progress.toFixed(4));
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  let revealObserver = null;
  function observeReveal() {
    const nodes = document.querySelectorAll("[data-reveal]:not(.is-in)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    html.classList.add("can-reveal");
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (records) {
        records.forEach(function (r) {
          if (r.isIntersecting) {
            r.target.classList.add("is-in");
            revealObserver.unobserve(r.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
    }
    nodes.forEach(function (n) { revealObserver.observe(n); });
  }

  setupLenis();
  setupHeroScroll();
  observeReveal();
  document.addEventListener("portfolio:rendered", observeReveal);
})();
