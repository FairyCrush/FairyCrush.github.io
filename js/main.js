(function () {
  const DATA = window.PORTFOLIO;
  if (!DATA) return;

  const STORAGE_KEY = "portfolio-lang";
  const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const html = document.documentElement;

  const state = {
    lang: pickLanguage(),
    openIndex: -1,
    lastFocus: null,
    settled: false,
    workWidth: 0,
    copyTimer: 0
  };

  function pickLanguage() {
    let saved = null;
    try { saved = window.localStorage.getItem(STORAGE_KEY); } catch (err) { saved = null; }
    if (saved === "en" || saved === "id") return saved;
    const nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("id") === 0 || nav.indexOf("in") === 0 ? "id" : "en";
  }

  function t(value) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    return value[state.lang] != null ? value[state.lang] : (value.en != null ? value.en : "");
  }

  function numberText(value) {
    if (value != null && typeof value === "object") return t(value);
    const text = String(value == null ? "" : value);
    if (state.lang !== "id") return text;
    return text
      .replace(/(\d),(\d{3})/g, "$1\u0001$2")
      .replace(/(\d)\.(\d)/g, "$1,$2")
      .replace(/\u0001/g, ".");
  }

  function isLocalized(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const keys = Object.keys(value);
    return keys.length > 0 && keys.every(function (k) { return k === "en" || k === "id"; });
  }

  function localize(value) {
    if (Array.isArray(value)) return value.map(localize);
    if (isLocalized(value)) return t(value);
    if (value && typeof value === "object") {
      const out = {};
      Object.keys(value).forEach(function (k) { out[k] = localize(value[k]); });
      return out;
    }
    return value;
  }

  function drawViz(project) {
    return project && window.Viz ? window.Viz.render(localize(project.viz)) : "";
  }

  function ui(key, vars) {
    const table = DATA.ui[state.lang] || DATA.ui.en;
    let text = table[key] != null ? table[key] : (DATA.ui.en[key] != null ? DATA.ui.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        text = text.split("{" + k + "}").join(vars[k]);
      });
    }
    return text;
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        const v = attrs[key];
        if (v == null || v === false) return;
        if (key === "class") node.className = v;
        else if (key === "text") node.textContent = v;
        else if (key === "html") node.innerHTML = v;
        else node.setAttribute(key, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (child) {
      if (child == null) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function revealAttr() {
    return state.settled ? null : true;
  }

  function formatDate(iso) {
    const parts = iso.split("-").map(Number);
    const month = MONTHS[state.lang][parts[1] - 1];
    return parts[2] ? parts[2] + " " + month + " " + parts[0] : month + " " + parts[0];
  }

  function isExternal(url) {
    return url.indexOf("http") === 0 || /\.pdf$/i.test(url);
  }

  function linkList(target, skipMail) {
    target.innerHTML = "";
    DATA.person.links.forEach(function (link) {
      if (!link.url) return;
      if (skipMail && link.icon === "mail") return;
      const external = isExternal(link.url);
      target.appendChild(el("li", null, [
        el("a", {
          class: external ? "is-external" : null,
          href: link.url,
          target: external ? "_blank" : null,
          rel: external ? "noopener noreferrer" : null
        }, [t(link.label)])
      ]));
    });
  }

  function applyStaticText() {
    html.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = ui(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      node.setAttribute("aria-label", ui(node.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll("button[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === state.lang));
    });
    document.title = DATA.person.name + " · " + t(DATA.person.titleTag);
  }

  function renderHero() {
    const caption = document.getElementById("hero-caption");
    const points = window.HeroScene ? window.HeroScene.points : 0;
    if (caption) {
      caption.textContent = points ? ui("hero.caption", { n: numberText(points.toLocaleString("en-US")) }) : "";
    }
  }

  function renderAbout() {
    document.getElementById("about-lead").textContent = t(DATA.about.lead);
    const wrap = document.getElementById("about-text");
    wrap.innerHTML = "";
    (DATA.about.body[state.lang] || DATA.about.body.en).forEach(function (p) {
      wrap.appendChild(el("p", { text: p }));
    });
    document.getElementById("currently").textContent = t(DATA.now);
    linkList(document.getElementById("links"), false);
    document.getElementById("figure-value").textContent = numberText(DATA.figure.value);
  }

  function renderExpertise() {
    const list = document.getElementById("expertise-list");
    list.innerHTML = "";
    DATA.skills.forEach(function (skill, i) {
      list.appendChild(el("li", { class: "expertise-item", "data-reveal": revealAttr() }, [
        el("button", { class: "expertise-row", type: "button", "data-project": skill.project || null }, [
          el("span", { class: "expertise-index", text: String(i + 1).padStart(2, "0") }),
          el("span", { class: "expertise-name", text: t(skill.title) }),
          el("span", { class: "expertise-tools", text: skill.tools }),
          el("span", { class: "expertise-proof", text: t(skill.proof) })
        ])
      ]));
    });

    document.getElementById("lang-line").textContent = (DATA.languages || []).join("\u00a0· ");

    const creds = document.getElementById("credentials");
    creds.innerHTML = "";
    (DATA.credentials || []).forEach(function (c) {
      creds.appendChild(el("article", { class: "credential" }, [
        el("img", { class: "credential-badge", src: c.image, alt: t(c.alt), width: "64", height: "64", loading: "lazy", decoding: "async" }),
        el("div", { class: "credential-body" }, [
          el("h4", { class: "credential-title", text: c.issuer + " " + c.title }),
          el("p", { class: "credential-meta", text: c.level + " · " + formatDate(c.date) }),
          c.note ? el("p", { class: "credential-note", text: t(c.note) }) : null,
          c.url ? el("a", { class: "text-link is-external", href: c.url, target: "_blank", rel: "noopener noreferrer", text: ui("credential.verify") }) : null
        ])
      ]));
    });
  }

  function plateMetrics(project) {
    const list = project.metrics || [];
    const first = list[project.headline || 0];
    const picked = first ? [first] : [];
    for (let i = 0; i < list.length && picked.length < 2; i++) {
      if (list[i] !== first) picked.push(list[i]);
    }
    return picked;
  }

  function buildPlate(project, index, number) {
    const figure = el("button", {
      class: "plate-figure",
      type: "button",
      "data-index": String(index),
      "aria-label": t(project.title)
    }, [el("span", { class: "plate-viz", html: drawViz(project), "aria-hidden": "true" })]);
    const read = el("button", { class: "text-link", type: "button", "data-index": String(index), text: ui("work.read") });
    [figure, read].forEach(function (b) {
      b.addEventListener("click", function () { openProject(index, b, figure.querySelector(".plate-viz")); });
    });
    const metrics = plateMetrics(project).map(function (m) {
      return el("div", { class: "plate-metric" }, [
        el("dt", { text: t(m.label) }),
        el("dd", { text: numberText(m.value) })
      ]);
    });
    return el("li", { class: "plate", "data-reveal": revealAttr() }, [
      el("figure", { class: "plate-frame" }, [
        figure,
        el("figcaption", { class: "plate-caption" }, [
          el("span", { class: "plate-num", text: ui("work.figure") + " " + number }),
          el("span", { text: (project.stack || []).slice(0, 4).join(" · ") })
        ])
      ]),
      el("div", { class: "plate-text" }, [
        el("p", { class: "plate-context", text: t(project.context) }),
        el("h3", { class: "plate-title", text: t(project.title) }),
        el("p", { class: "plate-lead", text: t(project.lead) }),
        metrics.length ? el("dl", { class: "plate-metrics" }, metrics) : null,
        read
      ])
    ]);
  }

  function buildTile(project, index, isClone) {
    const metric = (project.metrics || [])[project.headline || 0];
    const button = el("button", {
      type: "button",
      class: "tile-button",
      tabindex: isClone ? "-1" : null,
      "data-index": String(index)
    }, [
      el("span", { class: "tile-viz", html: drawViz(project), "aria-hidden": "true" }),
      el("span", { class: "tile-meta" }, [
        el("span", { class: "tile-title", text: t(project.title) }),
        metric ? el("span", { class: "tile-metric", text: numberText(metric.value) + " · " + t(metric.label) }) : null
      ])
    ]);
    button.addEventListener("click", function () { openProject(index, button, button.querySelector(".tile-viz")); });
    return el("li", {
      class: "tile" + (isClone ? " is-clone" : ""),
      "aria-hidden": isClone ? "true" : null,
      inert: isClone ? true : null
    }, [button]);
  }

  function renderWork() {
    const plates = document.getElementById("plates");
    const rest = [];
    let number = 0;
    plates.innerHTML = "";
    DATA.projects.forEach(function (project, index) {
      if (project.featured) {
        number += 1;
        plates.appendChild(buildPlate(project, index, number));
      } else {
        rest.push({ project: project, index: index });
      }
    });
    const tracks = document.querySelectorAll("#work-marquee .marquee-track");
    const per = Math.ceil(rest.length / tracks.length);
    tracks.forEach(function (track, row) {
      const items = rest.slice(row * per, row * per + per);
      track.innerHTML = "";
      items.forEach(function (it) { track.appendChild(buildTile(it.project, it.index, false)); });
      const setWidth = Math.max(1, track.scrollWidth);
      const copies = Math.max(2, Math.ceil((window.innerWidth * 2) / setWidth));
      for (let c = 1; c < copies; c++) {
        items.forEach(function (it) { track.appendChild(buildTile(it.project, it.index, true)); });
      }
      track.style.setProperty("--copies", String(copies));
      track.style.setProperty("--marquee-duration", Math.max(40, Math.round(setWidth / 22)) + "s");
    });
    state.workWidth = window.innerWidth;
  }

  function setupMarquee() {
    const marquee = document.getElementById("work-marquee");
    let resizeTimer = 0;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (Math.abs(window.innerWidth - state.workWidth) > 40) {
          renderWork();
          document.dispatchEvent(new CustomEvent("portfolio:rendered", { detail: { lang: state.lang } }));
        }
      }, 300);
    });
    if (!marquee || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (records) {
      marquee.classList.toggle("is-offscreen", !records[records.length - 1].isIntersecting);
    }).observe(marquee);
  }

  function projectIndex(id) {
    for (let i = 0; i < DATA.projects.length; i++) {
      if (DATA.projects[i].id === id) return i;
    }
    return -1;
  }

  function openProject(index, trigger, source) {
    const dialog = document.getElementById("project-dialog");
    if (!dialog || typeof dialog.showModal !== "function" || index < 0) return;
    if (trigger) state.lastFocus = trigger;
    state.openIndex = index;
    const target = document.getElementById("dialog-viz");
    function show() {
      fillDialog();
      if (!dialog.open) dialog.showModal();
      document.getElementById("dialog-title").focus({ preventScroll: true });
    }
    if (source && !dialog.open && document.startViewTransition && !reduceMotion) {
      target.style.viewTransitionName = "";
      source.style.viewTransitionName = "project-viz";
      const transition = document.startViewTransition(function () {
        source.style.viewTransitionName = "";
        target.style.viewTransitionName = "project-viz";
        show();
      });
      transition.ready.catch(function () { target.style.viewTransitionName = ""; });
      transition.finished.then(function () { target.style.viewTransitionName = ""; }, function () { target.style.viewTransitionName = ""; });
      return;
    }
    show();
  }

  function fillDialog() {
    if (state.openIndex < 0) return;
    const project = DATA.projects[state.openIndex];
    document.getElementById("dialog-viz").innerHTML = drawViz(project);
    document.getElementById("dialog-context").textContent = t(project.context);
    document.getElementById("dialog-title").textContent = t(project.title);
    document.getElementById("dialog-lead").textContent = t(project.lead);
    document.getElementById("dialog-problem").textContent = t(project.problem);
    document.getElementById("dialog-approach").textContent = t(project.approach);
    const tbody = document.querySelector("#dialog-metrics tbody");
    tbody.innerHTML = "";
    (project.metrics || []).forEach(function (m) {
      const label = el("td", null, [t(m.label)]);
      if (m.note) label.appendChild(el("small", { text: t(m.note) }));
      tbody.appendChild(el("tr", null, [label, el("td", { text: numberText(m.value) })]));
    });
    document.getElementById("dialog-metrics").hidden = !(project.metrics && project.metrics.length);
    const stack = document.getElementById("dialog-stack");
    stack.innerHTML = "";
    (project.stack || []).forEach(function (s) { stack.appendChild(el("li", { text: s })); });
    const links = document.getElementById("dialog-links");
    links.innerHTML = "";
    (project.links || []).forEach(function (l) {
      links.appendChild(el("li", null, [el("a", { class: "is-external", href: l.url, target: "_blank", rel: "noopener noreferrer", text: t(l.label) })]));
    });
    links.hidden = !(project.links && project.links.length);
    document.getElementById("dialog-caveat").textContent = t(project.caveat);
    document.querySelector(".dialog-body").scrollTop = 0;
  }

  function setupDialog() {
    const dialog = document.getElementById("project-dialog");
    if (!dialog) return;
    function step(delta) {
      const n = DATA.projects.length;
      state.openIndex = (state.openIndex + delta + n) % n;
      fillDialog();
      document.getElementById("dialog-title").focus({ preventScroll: true });
    }
    document.getElementById("dialog-prev").addEventListener("click", function () { step(-1); });
    document.getElementById("dialog-next").addEventListener("click", function () { step(1); });
    document.getElementById("dialog-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    dialog.addEventListener("close", function () {
      state.openIndex = -1;
      document.getElementById("dialog-viz").style.viewTransitionName = "";
      if (state.lastFocus && document.body.contains(state.lastFocus)) state.lastFocus.focus({ preventScroll: true });
    });
    document.addEventListener("click", function (e) {
      const trigger = e.target.closest ? e.target.closest("[data-project]") : null;
      if (!trigger) return;
      const index = projectIndex(trigger.getAttribute("data-project"));
      if (index < 0) return;
      e.preventDefault();
      openProject(index, trigger, null);
    });
  }

  function renderNotebook() {
    const list = document.getElementById("log");
    list.innerHTML = "";
    const entries = DATA.notebook.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    entries.forEach(function (entry, i) {
      const moreId = "log-more-" + i;
      const toggle = entry.more ? el("button", {
        type: "button",
        class: "log-toggle",
        "aria-expanded": "false",
        "aria-controls": moreId,
        text: ui("notebook.more")
      }) : null;
      const more = entry.more ? el("div", { class: "log-more", id: moreId, inert: true }, [el("div", null, [el("p", { text: t(entry.more) })])]) : null;
      const title = entry.project
        ? el("button", { class: "log-link", type: "button", "data-project": entry.project, text: t(entry.title) })
        : t(entry.title);
      const li = el("li", { class: "log-row", "data-reveal": revealAttr() }, [
        el("time", { class: "log-date", datetime: entry.date, text: formatDate(entry.date) }),
        el("div", { class: "log-body" }, [
          el("h3", { class: "log-title" }, [title]),
          el("p", { class: "log-summary", text: t(entry.summary) }),
          more,
          toggle
        ])
      ]);
      if (toggle) {
        toggle.addEventListener("click", function () {
          const open = li.classList.toggle("is-open");
          toggle.setAttribute("aria-expanded", String(open));
          toggle.textContent = ui(open ? "notebook.less" : "notebook.more");
          if (open) more.removeAttribute("inert"); else more.setAttribute("inert", "");
        });
      }
      list.appendChild(li);
    });
    if (!entries.length) list.appendChild(el("li", { class: "log-empty", text: ui("notebook.empty") }));
  }

  function renderContact() {
    const email = DATA.person.email;
    const link = document.getElementById("contact-email");
    link.textContent = email;
    link.href = "mailto:" + email;
    linkList(document.getElementById("contact-links"), true);
    document.getElementById("copy-status").textContent = "";
    document.getElementById("footer-copy").textContent = ui("footer.copy", { year: String(new Date().getFullYear()), name: DATA.person.name });
  }

  function setupCopy() {
    const button = document.getElementById("copy-email");
    const status = document.getElementById("copy-status");
    if (!button) return;
    if (!navigator.clipboard || !window.isSecureContext) {
      button.hidden = true;
      return;
    }
    button.addEventListener("click", function () {
      navigator.clipboard.writeText(DATA.person.email).then(function () {
        clearTimeout(state.copyTimer);
        status.textContent = ui("contact.copied");
        button.classList.add("is-done");
        state.copyTimer = setTimeout(function () {
          status.textContent = "";
          button.classList.remove("is-done");
        }, 2200);
      }).catch(function () {
        status.textContent = DATA.person.email;
      });
    });
  }

  function setupLanguage() {
    document.querySelectorAll("button[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lang = btn.getAttribute("data-lang");
        if (lang === state.lang) return;
        state.lang = lang;
        try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (err) { state.lang = lang; }
        renderAll();
      });
    });
  }

  function setupMasthead() {
    const links = Array.prototype.slice.call(document.querySelectorAll(".masthead-nav a"));
    const sections = links.map(function (a) { return document.getElementById(a.getAttribute("data-target")); });
    const masthead = document.getElementById("masthead");
    const hero = document.getElementById("top");
    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight;
      let active = -1;
      sections.forEach(function (s, i) {
        if (s && s.getBoundingClientRect().top < vh * 0.4) active = i;
      });
      links.forEach(function (a, i) {
        if (i === active) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
      if (masthead && hero) masthead.classList.toggle("is-solid", hero.getBoundingClientRect().bottom < 64);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function setupClock() {
    const clock = document.getElementById("clock");
    if (!clock || typeof Intl === "undefined") return;
    let formatter;
    try {
      formatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" });
    } catch (err) {
      return;
    }
    function tick() {
      const now = new Date();
      clock.textContent = formatter.format(now);
      clock.setAttribute("datetime", now.toISOString());
    }
    tick();
    setInterval(tick, 15000);
  }

  function renderAll() {
    applyStaticText();
    renderHero();
    renderAbout();
    renderExpertise();
    renderWork();
    renderNotebook();
    renderContact();
    if (state.openIndex >= 0) fillDialog();
    document.dispatchEvent(new CustomEvent("portfolio:rendered", { detail: { lang: state.lang } }));
  }

  renderAll();
  state.settled = true;
  setupLanguage();
  setupDialog();
  setupCopy();
  setupMasthead();
  setupMarquee();
  setupClock();
})();
