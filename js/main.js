(function () {
  const DATA = window.PORTFOLIO;
  if (!DATA) return;

  const STORAGE_KEY = "portfolio-lang";
  const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = {
    lang: pickLanguage(),
    year: null,
    openIndex: -1,
    lastFocus: null,
    greeting: "",
    settled: false,
    mailTimer: 0
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

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function formatDate(iso) {
    const parts = iso.split("-").map(Number);
    const month = MONTHS[state.lang][parts[1] - 1];
    return parts[2] ? parts[2] + " " + month + " " + parts[0] : month + " " + parts[0];
  }

  const ICONS = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7 3 12l5 5"/><path d="m16 7 5 5-5 5"/><path d="m13.5 4-3 16"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="9" width="3.4" height="11"/><circle cx="5.7" cy="5.4" r="1.9"/><path d="M10 9h3.2v1.6c.6-1 1.8-1.9 3.6-1.9 3 0 3.9 1.9 3.9 4.8V20h-3.4v-5.8c0-1.4-.3-2.6-1.8-2.6s-2.1 1.1-2.1 2.6V20H10z"/></svg>',
    kaggle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 3v18"/><path d="M17 4 9.5 12 17.5 20"/></svg>',
    cv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor"/></svg>'
  };

  const SKILL_ICONS = {
    data: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="11" rx="14" ry="5"/><path d="M10 11v26c0 2.8 6.3 5 14 5s14-2.2 14-5V11"/><path d="M10 20c0 2.8 6.3 5 14 5s14-2.2 14-5"/><path class="accent" d="M10 29c0 2.8 6.3 5 14 5s14-2.2 14-5"/></svg>',
    model: '<svg viewBox="0 0 48 48"><path d="M6 42h36M6 42V6"/><circle class="dot" cx="13" cy="33" r="1.8"/><circle class="dot" cx="18" cy="30" r="1.8"/><circle class="dot" cx="21" cy="25" r="1.8"/><circle class="dot" cx="27" cy="23" r="1.8"/><circle class="dot" cx="31" cy="17" r="1.8"/><circle class="dot" cx="36" cy="14" r="1.8"/><circle class="dot accent" cx="30" cy="33" r="2.2"/><path class="accent" d="M9 37 40 10"/></svg>',
    deep: '<svg viewBox="0 0 48 48"><circle cx="8" cy="14" r="3"/><circle cx="8" cy="34" r="3"/><circle cx="24" cy="9" r="3"/><circle cx="24" cy="24" r="3"/><circle cx="24" cy="39" r="3"/><circle class="accent" cx="40" cy="24" r="3"/><path d="M11 14l10-5M11 14l10 10M11 14l10 25M11 34l10-25M11 34l10-10M11 34l10 5"/><path class="accent" d="M27 9l10 13M27 24h10M27 39l10-13"/></svg>',
    cloud: '<svg viewBox="0 0 48 48"><path d="M14 34h21a8 8 0 0 0 0-16 11 11 0 0 0-21-2 8 8 0 0 0 0 18z"/><path class="accent" d="M24 42V24"/><path class="accent" d="m18 30 6-6 6 6"/></svg>'
  };

  function applyStaticText() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = ui(node.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (node) {
      node.setAttribute("placeholder", ui(node.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
      node.setAttribute("aria-label", ui(node.getAttribute("data-i18n-aria")));
    });
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === state.lang));
    });
    document.title = DATA.person.name + " · " + t(DATA.person.titleTag);
  }

  function renderHero() {
    document.getElementById("person-name").textContent = DATA.person.name;
    document.getElementById("person-role").textContent = t(DATA.person.role);
    const caption = document.getElementById("hero-caption");
    if (caption) {
      const points = window.HeroScene ? window.HeroScene.points.toLocaleString(state.lang === "id" ? "id-ID" : "en-US") : "";
      caption.textContent = ui("hero.caption", { n: points });
    }
    const avatar = document.getElementById("avatar");
    if (avatar && !avatar.dataset.ready) {
      avatar.dataset.ready = "1";
      if (DATA.person.avatar) {
        avatar.appendChild(el("img", { src: DATA.person.avatar, alt: "" }));
      } else {
        avatar.style.backgroundImage = "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1.2px)";
        avatar.style.backgroundSize = "7px 7px";
        avatar.appendChild(el("span", { class: "avatar-mark", text: DATA.person.initials }));
      }
    }
  }

  function renderAbout() {
    const wrap = document.getElementById("about-text");
    wrap.innerHTML = "";
    (DATA.about[state.lang] || DATA.about.en).forEach(function (p) {
      wrap.appendChild(el("p", { html: p }));
    });
    const socials = document.getElementById("socials");
    socials.innerHTML = "";
    DATA.person.links.forEach(function (link) {
      if (!link.url) return;
      const external = link.url.indexOf("http") === 0 || /\.pdf$/i.test(link.url);
      socials.appendChild(el("li", null, [
        el("a", {
          href: link.url,
          target: external ? "_blank" : null,
          rel: external ? "noopener noreferrer" : null
        }, [
          el("span", { html: ICONS[link.icon] || "", "aria-hidden": "true", style: "display:contents" }),
          el("span", { text: t(link.label) })
        ])
      ]));
    });
  }

  function renderQuote() {
    document.getElementById("quote-text").textContent = "“" + t(DATA.quote.text) + "”";
    const by = document.getElementById("quote-by");
    by.innerHTML = escapeHtml(DATA.quote.first) + " <b>" + escapeHtml(DATA.quote.last) + "</b>";
  }

  function renderSkills() {
    const list = document.getElementById("skill-list");
    list.innerHTML = "";
    DATA.skills.forEach(function (skill) {
      list.appendChild(el("li", { class: "skill" }, [
        el("div", { class: "skill-icon", html: SKILL_ICONS[skill.icon] || SKILL_ICONS.model, "aria-hidden": "true" }),
        el("h3", { text: t(skill.title) }),
        el("p", { text: skill.tools }),
        skill.proof ? el("span", { class: "skill-proof mono", text: t(skill.proof) }) : null
      ]));
    });

    const langs = document.getElementById("lang-list");
    langs.innerHTML = "";
    (DATA.languages || []).forEach(function (name) {
      langs.appendChild(el("li", { class: "lang-chip mono", text: name }));
    });

    const creds = document.getElementById("credentials");
    creds.innerHTML = "";
    (DATA.credentials || []).forEach(function (c) {
      const card = el("article", { class: "credential" }, [
        el("img", { class: "credential-badge", src: c.image, alt: t(c.alt), width: "96", height: "96", loading: "lazy", decoding: "async" }),
        el("div", { class: "credential-body" }, [
          el("p", { class: "credential-issuer mono", text: c.issuer + " · " + formatDate(c.date) }),
          el("h4", { class: "credential-title", text: c.title }),
          el("p", { class: "credential-level", text: c.level }),
          c.note ? el("p", { class: "credential-note", text: t(c.note) }) : null,
          el("ul", { class: "credential-skills" }, (c.skills || []).map(function (s) {
            return el("li", { class: "mono", text: t(s) });
          })),
          c.url ? el("a", { class: "credential-link", href: c.url, target: "_blank", rel: "noopener noreferrer", text: ui("credential.verify") }) : null
        ])
      ]);
      creds.appendChild(card);
    });
  }

  function headlineMetric(project) {
    const m = project.metrics && project.metrics[project.headline || 0];
    return m || null;
  }

  function buildTile(project, index, isClone) {
    const metric = headlineMetric(project);
    const button = el("button", {
      type: "button",
      class: "tile-button",
      tabindex: isClone ? "-1" : null,
      "data-index": String(index)
    }, [
      el("span", { class: "tile-viz", html: drawViz(project), "aria-hidden": "true" }),
      el("span", { class: "tile-meta" }, [
        el("span", { class: "tile-title", text: t(project.title) }),
        metric ? el("span", { class: "tile-metric" }, [
          el("b", { text: numberText(metric.value) }),
          el("span", { class: "mono", text: t(metric.label) })
        ]) : null
      ])
    ]);
    button.addEventListener("click", function () { openProject(index, button); });
    button.addEventListener("pointermove", function (e) {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      button.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
    return el("li", {
      class: "tile" + (isClone ? " is-clone" : ""),
      "aria-hidden": isClone ? "true" : null,
      inert: isClone ? true : null
    }, [button]);
  }

  function renderWork() {
    const tracks = document.querySelectorAll("#work-marquee .marquee-track");
    const half = Math.ceil(DATA.projects.length / tracks.length);
    tracks.forEach(function (track, row) {
      const start = row * half;
      const items = DATA.projects.slice(start, start + half);
      track.innerHTML = "";
      [false, true].forEach(function (isClone) {
        items.forEach(function (project, i) {
          track.appendChild(buildTile(project, start + i, isClone));
        });
      });
      track.style.setProperty("--marquee-duration", Math.max(24, items.length * 7) + "s");
    });
  }

  function setupMarquee() {
    const marquee = document.getElementById("work-marquee");
    if (!marquee || !("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (records) {
      marquee.classList.toggle("is-offscreen", !records[0].isIntersecting);
    }).observe(marquee);
  }

  function openProject(index, trigger) {
    const dialog = document.getElementById("project-dialog");
    if (!dialog || typeof dialog.showModal !== "function") return;
    if (trigger) state.lastFocus = trigger;
    state.openIndex = index;
    fillDialog();
    if (!dialog.open) dialog.showModal();
    document.getElementById("dialog-title").focus({ preventScroll: true });
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
      links.appendChild(el("li", null, [el("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", text: t(l.label) })]));
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
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    dialog.addEventListener("close", function () {
      state.openIndex = -1;
      if (state.lastFocus && document.body.contains(state.lastFocus)) state.lastFocus.focus();
    });
  }

  function notebookYears() {
    const years = {};
    DATA.notebook.forEach(function (n) { years[n.date.slice(0, 4)] = true; });
    return Object.keys(years).sort().reverse();
  }

  function entryVisual(entry, projectById) {
    if (entry.credential != null && DATA.credentials && DATA.credentials[entry.credential]) {
      const c = DATA.credentials[entry.credential];
      return el("div", { class: "entry-visual entry-visual-badge" }, [
        el("img", { src: c.image, alt: t(c.alt), loading: "lazy", decoding: "async" })
      ]);
    }
    return el("div", { class: "entry-visual", html: drawViz(projectById[entry.project]), "aria-hidden": "true" });
  }

  function renderNotebook(focusYear) {
    const years = notebookYears();
    if (!state.year || years.indexOf(state.year) < 0) state.year = years[0] || String(new Date().getFullYear());
    const entries = DATA.notebook
      .filter(function (n) { return n.date.slice(0, 4) === state.year; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });

    const months = document.getElementById("calendar-months");
    months.innerHTML = "";
    const used = {};
    entries.forEach(function (n) { used[Number(n.date.slice(5, 7))] = true; });
    MONTHS[state.lang].forEach(function (name, i) {
      const has = !!used[i + 1];
      const b = el("button", {
        type: "button",
        class: has ? "has-entries" : "",
        disabled: has ? null : true,
        "aria-label": has ? ui("notebook.jump", { month: name, year: state.year }) : null,
        text: name
      });
      if (has) {
        b.addEventListener("click", function () {
          const target = document.querySelector('.entry[data-month="' + (i + 1) + '"]');
          if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        });
      }
      months.appendChild(b);
    });
    requestAnimationFrame(function () { months.scrollLeft = months.scrollWidth; });

    const calendar = document.getElementById("calendar");
    let current = calendar.querySelector(".calendar-year-current");
    if (!current) {
      current = el("div", { class: "calendar-year-current" });
      calendar.insertBefore(current, document.getElementById("calendar-years"));
    }
    current.textContent = state.year;

    const yearWrap = document.getElementById("calendar-years");
    yearWrap.innerHTML = "";
    yearWrap.hidden = years.length < 2;
    years.filter(function (y) { return y !== state.year; }).forEach(function (y) {
      const b = el("button", { type: "button", "aria-pressed": "false", "data-year": y, text: y });
      b.addEventListener("click", function () {
        state.year = y;
        renderNotebook(true);
      });
      yearWrap.appendChild(b);
    });
    if (focusYear && yearWrap.firstElementChild) yearWrap.firstElementChild.focus({ preventScroll: true });

    const list = document.getElementById("timeline");
    list.innerHTML = "";
    const projectById = {};
    DATA.projects.forEach(function (p) { projectById[p.id] = p; });
    entries.forEach(function (entry, i) {
      const moreId = "entry-more-" + i;
      const toggle = entry.more ? el("button", {
        type: "button",
        class: "entry-toggle",
        "aria-expanded": "false",
        "aria-controls": moreId,
        text: ui("notebook.more")
      }) : null;
      const more = entry.more ? el("div", { class: "entry-more", id: moreId, inert: true }, [el("div", null, [el("p", { text: t(entry.more) })])]) : null;
      const li = el("li", { class: "entry" + (state.settled ? " is-in" : ""), "data-month": String(Number(entry.date.slice(5, 7))) }, [
        el("span", { class: "entry-day" + (entry.date.length < 10 ? " is-month" : ""), "aria-hidden": "true", text: entry.date.length < 10 ? MONTHS[state.lang][Number(entry.date.slice(5, 7)) - 1] : String(Number(entry.date.slice(8, 10))) }),
        el("article", { class: "entry-card" + (toggle ? "" : " no-toggle") }, [
          entryVisual(entry, projectById),
          el("div", { class: "entry-text" }, [
            el("p", { class: "entry-date mono", text: formatDate(entry.date) }),
            el("h3", { text: t(entry.title) }),
            el("p", { text: t(entry.summary) }),
            more,
            toggle
          ])
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
    if (!entries.length) list.appendChild(el("li", { class: "timeline-empty", text: ui("notebook.empty") }));
    observeEntries();
  }

  let entryObserver = null;
  function observeEntries() {
    const items = document.querySelectorAll(".entry:not(.is-in)");
    if (entryObserver) entryObserver.disconnect();
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    entryObserver = new IntersectionObserver(function (records) {
      records.forEach(function (r) {
        if (r.isIntersecting) {
          r.target.classList.add("is-in");
          entryObserver.unobserve(r.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    items.forEach(function (n) { entryObserver.observe(n); });
  }

  function renderContact() {
    const email = DATA.person.email;
    const link = document.getElementById("contact-email");
    link.textContent = email;
    link.href = "mailto:" + email;
    const body = document.getElementById("letter-body");
    const greeting = ui("contact.greeting", { name: DATA.person.firstName });
    if (!body.value.trim() || body.value.trim() === state.greeting) body.value = greeting + "\n";
    state.greeting = greeting;
    body.removeAttribute("aria-invalid");
    const hint = document.getElementById("letter-hint");
    hint.classList.remove("is-error");
    hint.textContent = ui("contact.hint");
    document.getElementById("footer-copy").textContent = ui("footer.copy", { year: String(new Date().getFullYear()), name: DATA.person.name });
  }

  function setupContact() {
    const form = document.getElementById("letter");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const from = document.getElementById("letter-from").value.trim();
      const bodyField = document.getElementById("letter-body");
      const body = bodyField.value.trim();
      const hint = document.getElementById("letter-hint");
      clearTimeout(state.mailTimer);
      if (!body || body === state.greeting) {
        hint.classList.add("is-error");
        hint.textContent = ui("contact.empty");
        bodyField.setAttribute("aria-invalid", "true");
        bodyField.focus();
        return;
      }
      bodyField.removeAttribute("aria-invalid");
      const subject = from ? ui("contact.subjectFrom", { name: from }) : ui("contact.subject");
      const signed = from ? body + "\n\n" + from : body;
      hint.classList.remove("is-error");
      hint.textContent = ui("contact.opening");
      window.location.href = "mailto:" + DATA.person.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(signed);
      state.mailTimer = setTimeout(function () {
        if (document.hasFocus()) hint.textContent = ui("contact.fallback", { email: DATA.person.email });
      }, 1600);
    });
  }

  function setupLanguage() {
    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lang = btn.getAttribute("data-lang");
        if (lang === state.lang) return;
        state.lang = lang;
        try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (err) { state.lang = lang; }
        renderAll();
      });
    });
  }

  function setupRail() {
    const staticNav = document.getElementById("rail-static");
    const floating = document.getElementById("rail-floating");
    const list = staticNav.querySelector("ol");
    const clone = list.cloneNode(true);
    clone.querySelectorAll("a").forEach(function (a) { a.setAttribute("tabindex", "-1"); });
    floating.appendChild(clone);
    const groups = [list, clone].map(function (ol) {
      return Array.prototype.slice.call(ol.querySelectorAll("a"));
    });
    const sections = groups[0].map(function (a) { return document.getElementById(a.getAttribute("data-target")); });
    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight;
      floating.classList.toggle("is-visible", staticNav.getBoundingClientRect().bottom < 0);
      let active = 0;
      sections.forEach(function (s, i) {
        if (s && s.getBoundingClientRect().top < vh * 0.45) active = i;
      });
      groups.forEach(function (links) {
        links.forEach(function (a, i) { a.setAttribute("aria-current", String(i === active)); });
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function setupSignature() {
    const sig = document.getElementById("signature");
    if (!sig) return;
    sig.textContent = DATA.person.name;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      sig.classList.add("is-signed");
      return;
    }
    const io = new IntersectionObserver(function (records) {
      if (records[0].isIntersecting) {
        setTimeout(function () { sig.classList.add("is-signed"); }, 250);
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(sig);
  }

  function renderAll() {
    applyStaticText();
    renderHero();
    renderAbout();
    renderQuote();
    renderSkills();
    renderWork();
    renderNotebook(false);
    renderContact();
    if (state.openIndex >= 0) fillDialog();
  }

  renderAll();
  state.settled = true;
  setupLanguage();
  setupDialog();
  setupContact();
  setupRail();
  setupSignature();
  setupMarquee();
})();
