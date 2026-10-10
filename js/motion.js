(function () {
  const html = document.documentElement;
  const DATA = window.PORTFOLIO;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const hasGsap = !!gsap && !reduceMotion;
  const hasScroll = hasGsap && !!ScrollTrigger;
  let lenis = null;

  if (hasScroll) gsap.registerPlugin(ScrollTrigger);

  function ui(key, vars) {
    if (!DATA) return key;
    const lang = html.lang === "id" ? "id" : "en";
    let text = (DATA.ui[lang] && DATA.ui[lang][key]) || DATA.ui.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) { text = text.split("{" + k + "}").join(vars[k]); });
    }
    return text;
  }

  function localNumber(value, decimals) {
    const text = value.toFixed(decimals);
    return html.lang === "id" ? text.replace(".", ",") : text;
  }

  function markSeen() {
    try { window.sessionStorage.setItem("bl-intro-seen", "1"); } catch (err) { html.classList.remove("is-loading"); }
  }

  function splitStatement() {
    const statement = document.querySelector(".hero-statement");
    if (!statement) return [];
    const units = [];
    Array.prototype.slice.call(statement.children).forEach(function (child) {
      if (child.classList.contains("nowrap")) {
        child.classList.add("word");
        units.push(child);
        return;
      }
      const words = child.textContent.trim().split(/\s+/);
      child.textContent = "";
      words.forEach(function (word, i) {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        child.appendChild(span);
        if (i < words.length - 1) child.appendChild(document.createTextNode(" "));
        units.push(span);
      });
    });
    return units;
  }

  function prepareHero() {
    const words = splitStatement();
    gsap.set(".topnav", { xPercent: -50, y: -28, opacity: 0 });
    gsap.set(words, { yPercent: 60, opacity: 0, filter: "blur(10px)" });
    gsap.set(".hero-status > *, .hero-fit", { y: 18, opacity: 0 });
    gsap.set(".hero-band-inner > *", { y: 34, opacity: 0 });
    return words;
  }

  function heroIn(words) {
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .to(".topnav", { y: 0, opacity: 1, duration: 1 }, 0)
      .to(words, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, stagger: 0.055 }, 0.05)
      .to(".hero-status > *, .hero-fit", { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, 0.45)
      .to(".hero-band-inner > *", { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 }, 0.55)
      .add(function () { gsap.set(words, { clearProps: "filter" }); });
  }

  function runLoader() {
    const loader = document.getElementById("loader");
    if (!html.classList.contains("is-loading")) {
      if (loader) loader.remove();
      return;
    }
    if (!hasGsap || !loader) {
      html.classList.remove("is-loading");
      if (loader) loader.remove();
      markSeen();
      document.dispatchEvent(new CustomEvent("intro:go"));
      return;
    }
    const num = document.getElementById("loader-num");
    const bar = document.getElementById("loader-bar");
    const label = document.getElementById("loader-label");
    const points = window.HeroScene ? window.HeroScene.points : 0;
    if (label) label.textContent = ui("loader.label", { n: points.toLocaleString(html.lang === "id" ? "id-ID" : "en-US") });
    const words = prepareHero();
    if (lenis) lenis.stop();
    const counter = { v: 0 };
    gsap.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: function () {
        num.textContent = String(Math.round(counter.v)).padStart(3, "0");
        bar.style.transform = "scaleX(" + (counter.v / 100).toFixed(3) + ")";
      }
    });
    const fonts = document.fonts && document.fonts.ready
      ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 2500); })])
      : Promise.resolve();
    Promise.all([fonts, new Promise(function (r) { setTimeout(r, 1700); })]).then(function () {
      gsap.timeline({
        onComplete: function () {
          html.classList.remove("is-loading");
          loader.remove();
          markSeen();
          if (lenis) lenis.start();
          if (hasScroll) ScrollTrigger.refresh();
        }
      })
        .to(".loader-inner", { yPercent: -60, opacity: 0, duration: 0.6, ease: "power3.in" })
        .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.05, ease: "expo.inOut" }, "-=0.2")
        .add(function () {
          document.dispatchEvent(new CustomEvent("intro:go"));
          heroIn(words);
        }, "-=0.6");
    });
  }

  function setupLenis() {
    if (reduceMotion || !window.Lenis) return;
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    if (hasScroll) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = function (time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
    document.addEventListener("click", function (e) {
      const link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link || link.classList.contains("skip-link")) return;
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.4, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    });
    const dialog = document.getElementById("project-dialog");
    if (dialog && "MutationObserver" in window) {
      new MutationObserver(function () {
        if (dialog.open) lenis.stop(); else lenis.start();
      }).observe(dialog, { attributes: true, attributeFilter: ["open"] });
    }
  }

  function setupScrollScenes() {
    if (!hasScroll) return;
    ScrollTrigger.create({
      trigger: "#top",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: function (self) {
        if (window.HeroScene && window.HeroScene.setScroll) window.HeroScene.setScroll(self.progress);
      }
    });
    gsap.to(".hero-copy", {
      yPercent: -45,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: "#top", start: "top top", end: "65% top", scrub: true }
    });

    const stat = document.getElementById("stat-number");
    if (stat) {
      stat.dataset.counting = "pending";
      stat.textContent = localNumber(0, 3);
      ScrollTrigger.create({
        trigger: ".stat",
        start: "top 78%",
        once: true,
        onEnter: function () {
          const counter = { v: 0 };
          stat.dataset.counting = "1";
          gsap.to(counter, {
            v: 0.948,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: function () { stat.textContent = localNumber(counter.v, 3); },
            onComplete: function () {
              delete stat.dataset.counting;
              stat.textContent = localNumber(0.948, 3);
            }
          });
        }
      });
    }

    gsap.fromTo(".timeline-progress", { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: "#timeline", start: "top 65%", end: "bottom 65%", scrub: true }
    });

    gsap.fromTo(".footer-mark span", { yPercent: 105 }, {
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true }
    });
  }

  let revealObserver = null;
  function observeCards() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    html.classList.add("can-stagger");
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
    document.querySelectorAll(".feature:not(.is-in), .skill:not(.is-in)").forEach(function (node) {
      revealObserver.observe(node);
    });
  }

  function setupMarqueeVelocity() {
    const marquee = document.getElementById("work-marquee");
    if (!marquee || !lenis || reduceMotion) return;
    let velocity = 0;
    let skew = 0;
    let rate = 1;
    lenis.on("scroll", function (e) { velocity = e.velocity || 0; });
    const tick = function () {
      velocity *= 0.9;
      const target = Math.max(-6, Math.min(6, velocity * 0.22));
      skew += (target - skew) * 0.14;
      if (!marquee.classList.contains("is-offscreen")) {
        marquee.style.setProperty("--skew", skew.toFixed(3) + "deg");
        const nextRate = 1 + Math.min(Math.abs(velocity) * 0.06, 3);
        if (Math.abs(nextRate - rate) > 0.02) {
          rate = nextRate;
          marquee.querySelectorAll(".marquee-track").forEach(function (track) {
            track.getAnimations().forEach(function (a) { a.playbackRate = rate; });
          });
        }
      }
    };
    if (hasGsap) gsap.ticker.add(tick);
    else {
      const loop = function () {
        tick();
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  function setupCursor() {
    if (!hasGsap || !finePointer) return;
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    cursor.setAttribute("aria-hidden", "true");
    const ring = document.createElement("span");
    ring.className = "cursor-ring";
    const label = document.createElement("span");
    label.className = "cursor-label";
    ring.appendChild(label);
    cursor.appendChild(ring);
    document.body.appendChild(cursor);
    html.classList.add("has-cursor");
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    let shown = false;
    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      if (!shown) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
      cursor.classList.add("is-visible");
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", function () { cursor.classList.remove("is-visible"); });
    document.addEventListener("pointerover", function (e) {
      const target = e.target;
      if (!target || !target.closest) return;
      const hidden = target.closest(".hero-canvas, input, textarea, dialog");
      const open = target.closest("[data-cursor]");
      const interactive = target.closest("a, button, summary, label");
      let next = "";
      if (hidden) next = "hidden";
      else if (open) next = "open";
      else if (interactive) next = "link";
      cursor.dataset.state = next;
      label.textContent = next === "open" ? ui("cursor.open") : "";
    });
    window.addEventListener("pointerdown", function () { cursor.classList.add("is-down"); });
    window.addEventListener("pointerup", function () { cursor.classList.remove("is-down"); });
  }

  function setupMagnetic() {
    if (!hasGsap || !finePointer) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (node) {
      const xTo = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3" });
      node.addEventListener("pointermove", function (e) {
        const rect = node.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
      });
      node.addEventListener("pointerleave", function () {
        gsap.to(node, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.45)" });
      });
    });
  }

  setupLenis();
  runLoader();
  setupScrollScenes();
  observeCards();
  setupMarqueeVelocity();
  setupCursor();
  setupMagnetic();

  if (hasScroll) {
    const refresh = function () { ScrollTrigger.refresh(); };
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  }

  document.addEventListener("portfolio:rendered", function () {
    observeCards();
    if (hasScroll) requestAnimationFrame(function () { ScrollTrigger.refresh(); });
  });
})();
