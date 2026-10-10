(function () {
  const INK = "#2b2d31";
  const GREY = "#8f9297";
  const LIGHT = "#d3d4d6";
  const FAINT = "#e4e5e6";
  const BG = "#f1f1f0";
  const ACCENT = "#d62728";
  const SIZE = 200;
  const PAD = 18;
  const MONO = "Martian Mono, monospace";
  const SANS = "Archivo, sans-serif";
  let patternSeq = 0;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function f(n) { return Number(n).toFixed(2); }

  function text(x, y, value, opts) {
    const o = opts || {};
    return '<text x="' + f(x) + '" y="' + f(y) + '"' +
      (o.anchor ? ' text-anchor="' + o.anchor + '"' : "") +
      ' font-family="' + (o.sans ? SANS : MONO) + '" font-size="' + (o.size || 6.2) + '"' +
      (o.weight ? ' font-weight="' + o.weight + '"' : "") +
      ' fill="' + (o.fill || GREY) + '">' + esc(value) + "</text>";
  }

  function frame(body, caption, defs) {
    return '<svg viewBox="0 0 ' + SIZE + " " + SIZE + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      (defs ? "<defs>" + defs + "</defs>" : "") +
      '<rect width="' + SIZE + '" height="' + SIZE + '" fill="' + BG + '"/>' +
      (caption ? text(PAD, 16, caption) : "") + body + "</svg>";
  }

  function scale(v, d0, d1, r0, r1) {
    return r0 + ((v - d0) * (r1 - r0)) / (d1 - d0);
  }

  function compare(spec) {
    const rows = spec.rows || [];
    const max = spec.max || Math.max.apply(null, rows.map(function (r) { return r.value; }));
    const x0 = PAD, x1 = SIZE - PAD;
    const top = 36;
    const rowH = Math.min(34, (SIZE - top - 16) / Math.max(1, rows.length));
    let body = "";
    rows.forEach(function (r, i) {
      const y = top + i * rowH;
      const w = ((x1 - x0) * r.value) / max;
      body += text(x0, y + 7, r.label, { sans: true, size: 7.6, weight: r.highlight ? 700 : 400, fill: r.highlight ? INK : GREY });
      body += text(x1, y + 7, r.display || r.value, { anchor: "end", size: 6.6, fill: r.highlight ? INK : GREY });
      body += '<rect x="' + x0 + '" y="' + f(y + 11) + '" width="' + (x1 - x0) + '" height="7" fill="' + FAINT + '"/>';
      body += '<rect x="' + x0 + '" y="' + f(y + 11) + '" width="' + f(Math.max(1, w)) + '" height="7" fill="' + (r.highlight ? ACCENT : INK) + '" opacity="' + (r.highlight ? 1 : 0.55) + '"/>';
    });
    return frame(body, spec.caption);
  }

  function matrix(spec) {
    const cells = spec.cells || [[1]];
    const n = cells.length;
    const m = cells[0].length;
    const x0 = spec.labels ? 46 : PAD;
    const y0 = 30;
    const size = Math.min((SIZE - x0 - PAD) / m, (SIZE - y0 - 26) / n);
    let hi = -Infinity, lo = Infinity;
    cells.forEach(function (row) { row.forEach(function (v) { if (v > hi) hi = v; if (v < lo) lo = v; }); });
    let body = "";
    cells.forEach(function (row, i) {
      row.forEach(function (v, j) {
        const diag = i === j;
        const t = hi === lo ? 1 : (v - lo) / (hi - lo);
        const shade = Math.round(234 - Math.sqrt(t) * 190);
        const fill = diag ? ACCENT : "rgb(" + shade + "," + shade + "," + (shade + 2) + ")";
        body += '<rect x="' + f(x0 + j * size) + '" y="' + f(y0 + i * size) + '" width="' + f(size - 1.4) + '" height="' + f(size - 1.4) + '" fill="' + fill + '" opacity="' + (diag ? f(0.55 + 0.45 * t) : 1) + '"/>';
        body += text(x0 + j * size + size / 2 - 0.7, y0 + i * size + size / 2 + 2.2, v, { anchor: "middle", size: 6.2, fill: diag || t > 0.5 ? "#fff" : INK });
      });
      if (spec.labels) body += text(x0 - 4, y0 + i * size + size / 2 + 2.2, spec.labels[i], { anchor: "end", sans: true, size: 6.8 });
    });
    if (spec.footer) body += text(SIZE - PAD, SIZE - 8, spec.footer, { anchor: "end" });
    return frame(body, spec.caption);
  }

  function registry(spec) {
    const total = spec.active + spec.available + spec.soon;
    const cols = 9;
    const x0 = PAD, y0 = 30;
    const cell = (SIZE - PAD * 2) / cols;
    const hatchId = "hatch-" + (++patternSeq);
    const defs = '<pattern id="' + hatchId + '" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="' + BG + '"/><line x1="0" y1="0" x2="0" y2="4" stroke="' + INK + '" stroke-width="1.4"/></pattern>';
    let body = "";
    for (let i = 0; i < total; i++) {
      const x = x0 + (i % cols) * cell;
      const y = y0 + Math.floor(i / cols) * cell;
      const kind = i < spec.active ? "active" : i < spec.active + spec.available ? "available" : "soon";
      const hot = spec.accent === i;
      const fill = kind === "active" ? (hot ? ACCENT : INK) : kind === "available" ? "url(#" + hatchId + ")" : "none";
      body += '<rect x="' + f(x + 1) + '" y="' + f(y + 1) + '" width="' + f(cell - 3) + '" height="' + f(cell - 3) + '" fill="' + fill + '" stroke="' + (kind === "soon" ? GREY : "none") + '" stroke-width="0.9" opacity="' + (kind === "active" && !hot ? 0.82 : 1) + '"/>';
    }
    const rows = Math.ceil(total / cols);
    let y = y0 + rows * cell + 12;
    body += text(x0, y, spec.legend || "");
    if (spec.bar) {
      y += 24;
      const w = SIZE - PAD * 2;
      body += text(x0, y, spec.bar.label, { sans: true, size: 7.4, fill: INK, weight: 600 });
      const segments = spec.bar.segments || [];
      let cursor = x0;
      segments.forEach(function (s) {
        const sw = (w * s.value) / spec.bar.total;
        body += '<rect x="' + f(cursor) + '" y="' + f(y + 6) + '" width="' + f(Math.max(0, sw - 1)) + '" height="10" fill="' + (s.hot ? ACCENT : s.muted ? LIGHT : INK) + '" opacity="' + (s.hot || s.muted ? 1 : 0.6) + '"/>';
        cursor += sw;
      });
      y += 28;
      body += text(x0, y, spec.bar.note || "");
    }
    return frame(body, spec.caption, defs);
  }

  function slope(spec) {
    const rows = spec.rows || [];
    const lo = spec.min == null ? 0 : spec.min;
    const hi = spec.max == null ? 1 : spec.max;
    const xl = 62, xr = 138, y0 = 40, y1 = SIZE - 28;
    let body = "";
    body += '<line x1="' + xl + '" y1="' + y0 + '" x2="' + xl + '" y2="' + y1 + '" stroke="' + LIGHT + '"/>';
    body += '<line x1="' + xr + '" y1="' + y0 + '" x2="' + xr + '" y2="' + y1 + '" stroke="' + LIGHT + '"/>';
    body += text(xl, 30, spec.leftTitle || "", { anchor: "middle" });
    body += text(xr, 30, spec.rightTitle || "", { anchor: "middle" });
    if (spec.baseline != null) {
      const by = scale(spec.baseline, lo, hi, y1, y0);
      body += '<line x1="' + (xr - 6) + '" y1="' + f(by) + '" x2="' + (SIZE - PAD) + '" y2="' + f(by) + '" stroke="' + GREY + '" stroke-dasharray="2 2" stroke-width="0.8"/>';
    }
    rows.forEach(function (r) {
      const ly = scale(r.left, lo, hi, y1, y0);
      const color = r.hot ? ACCENT : INK;
      body += text(xl - 6, ly + 2.2 + (r.leftDy || 0), r.leftText || r.left, { anchor: "end", size: 6, fill: INK });
      body += '<circle cx="' + xl + '" cy="' + f(ly) + '" r="2.6" fill="' + GREY + '"/>';
      let ry;
      if (r.right == null) {
        ry = scale(r.flagAt == null ? hi : r.flagAt, lo, hi, y1, y0);
        body += '<line x1="' + xl + '" y1="' + f(ly) + '" x2="' + xr + '" y2="' + f(ry) + '" stroke="' + GREY + '" stroke-width="1" stroke-dasharray="3 2"/>';
        body += '<path d="M' + f(xr - 3.5) + " " + f(ry - 3.5) + "L" + f(xr + 3.5) + " " + f(ry + 3.5) + "M" + f(xr + 3.5) + " " + f(ry - 3.5) + "L" + f(xr - 3.5) + " " + f(ry + 3.5) + '" stroke="' + ACCENT + '" stroke-width="1.6"/>';
        body += text(xr + 7, ry + 2.2, r.rightText || "", { size: 6, fill: ACCENT });
      } else {
        ry = scale(r.right, lo, hi, y1, y0);
        body += '<line x1="' + xl + '" y1="' + f(ly) + '" x2="' + xr + '" y2="' + f(ry) + '" stroke="' + color + '" stroke-width="1.5"/>';
        body += '<circle cx="' + xr + '" cy="' + f(ry) + '" r="2.8" fill="' + color + '"/>';
        const nearBase = spec.baseline != null && Math.abs(ry - scale(spec.baseline, lo, hi, y1, y0)) < 6;
        body += text(xr + 7, ry + 2.2 - (nearBase ? 5 : 0), r.rightText || r.right, { size: 6, fill: color });
        if (r.label) body += text(xr + 7, ry + 10 - (nearBase ? 5 : 0), r.label, { size: 5.8 });
        return;
      }
      if (r.label) body += text(xr + 7, ry + 10, r.label, { size: 5.8 });
    });
    if (spec.footer) body += text(SIZE / 2, SIZE - 10, spec.footer, { anchor: "middle" });
    return frame(body, spec.caption);
  }

  function ladder(spec) {
    const rows = spec.rows || [];
    const lo = spec.min, hi = spec.max;
    const xa = 66, xb = SIZE - PAD - 4;
    const top = 38;
    const rowH = (SIZE - top - 30) / Math.max(1, rows.length);
    let body = "";
    const zx = scale(0, lo, hi, xa, xb);
    body += '<line x1="' + f(zx) + '" y1="' + (top - 8) + '" x2="' + f(zx) + '" y2="' + f(top + rows.length * rowH - 6) + '" stroke="' + LIGHT + '"/>';
    if (spec.reference != null) {
      const rx = scale(spec.reference, lo, hi, xa, xb);
      body += '<line x1="' + f(rx) + '" y1="' + (top - 8) + '" x2="' + f(rx) + '" y2="' + f(top + rows.length * rowH - 6) + '" stroke="' + GREY + '" stroke-dasharray="2 2" stroke-width="0.8"/>';
      body += text(rx, top - 11, spec.referenceLabel || "", { anchor: "middle", size: 5.6 });
    }
    rows.forEach(function (r, i) {
      const y = top + i * rowH + rowH / 2 - 3;
      body += text(xa - 8, y + 2.2, r.label, { anchor: "end", sans: true, size: 7, fill: r.hot ? INK : GREY, weight: r.hot ? 700 : 400 });
      body += '<line x1="' + xa + '" y1="' + f(y) + '" x2="' + xb + '" y2="' + f(y) + '" stroke="' + FAINT + '" stroke-width="0.6"/>';
      if (r.values.length === 1) {
        const x = scale(r.values[0], lo, hi, xa, xb);
        body += '<rect x="' + f(x - 2.6) + '" y="' + f(y - 2.6) + '" width="5.2" height="5.2" fill="' + GREY + '"/>';
      } else {
        const xA = scale(r.values[0], lo, hi, xa, xb);
        const xB = scale(r.values[1], lo, hi, xa, xb);
        const color = r.hot ? ACCENT : INK;
        body += '<line x1="' + f(xA) + '" y1="' + f(y) + '" x2="' + f(xB) + '" y2="' + f(y) + '" stroke="' + color + '" stroke-width="1.4"/>';
        body += '<circle cx="' + f(xA) + '" cy="' + f(y) + '" r="2.6" fill="' + BG + '" stroke="' + color + '" stroke-width="1.2"/>';
        body += '<circle cx="' + f(xB) + '" cy="' + f(y) + '" r="2.8" fill="' + color + '"/>';
      }
    });
    const axisY = top + rows.length * rowH + 4;
    (spec.ticks || []).forEach(function (tk) {
      body += text(scale(tk, lo, hi, xa, xb), axisY + 6, tk, { anchor: "middle", size: 5.6 });
    });
    if (spec.footer) body += text(SIZE - PAD, SIZE - 8, spec.footer, { anchor: "end", size: 5.8 });
    return frame(body, spec.caption);
  }

  function glyphs(spec) {
    const items = spec.items || [];
    const colW = (SIZE - PAD * 2) / Math.max(1, items.length);
    const y0 = 52, y1 = SIZE - 44;
    let body = "";
    items.forEach(function (it, i) {
      const cx = PAD + colW * i + colW / 2;
      const lo = Math.min(it.before, it.after);
      const hi = Math.max(it.before, it.after);
      const pad = (hi - lo || hi || 1) * 0.6;
      const d0 = lo - pad, d1 = hi + pad;
      const by = scale(it.before, d0, d1, y1, y0);
      const ay = scale(it.after, d0, d1, y1, y0);
      const improved = it.lowerBetter ? it.after < it.before : it.after > it.before;
      const color = improved ? ACCENT : GREY;
      const xa = cx - colW * 0.22, xb = cx + colW * 0.22;
      body += text(cx, 32, it.label, { anchor: "middle", sans: true, size: 6.8, fill: INK, weight: 700 });
      body += text(cx, 41, it.metric, { anchor: "middle", size: 5.8 });
      body += '<line x1="' + f(cx) + '" y1="' + y0 + '" x2="' + f(cx) + '" y2="' + y1 + '" stroke="' + FAINT + '"/>';
      body += '<line x1="' + f(xa) + '" y1="' + f(by) + '" x2="' + f(xb) + '" y2="' + f(ay) + '" stroke="' + color + '" stroke-width="1.6"/>';
      body += '<circle cx="' + f(xa) + '" cy="' + f(by) + '" r="2.6" fill="' + BG + '" stroke="' + INK + '" stroke-width="1.1"/>';
      body += '<circle cx="' + f(xb) + '" cy="' + f(ay) + '" r="3" fill="' + color + '"/>';
      body += text(cx, y1 + 13, it.beforeText, { anchor: "middle", size: 5.6 });
      body += text(cx, y1 + 22, it.afterText, { anchor: "middle", size: 6, fill: improved ? ACCENT : INK, weight: 600 });
      body += text(cx, y1 + 31, it.lowerBetter ? (spec.lowerLabel || "") : (spec.higherLabel || ""), { anchor: "middle", size: 5.8 });
    });
    return frame(body, spec.caption);
  }

  function pairs(spec) {
    const groups = spec.groups || [];
    const x0 = PAD + 10, x1 = SIZE - PAD, y0 = 40, y1 = SIZE - 40;
    const gw = (x1 - x0) / Math.max(1, groups.length);
    const bw = gw * 0.28;
    let body = "";
    [0, 50, 100].forEach(function (tk) {
      const y = scale(tk, 0, 100, y1, y0);
      body += '<line x1="' + x0 + '" y1="' + f(y) + '" x2="' + x1 + '" y2="' + f(y) + '" stroke="' + FAINT + '" stroke-width="0.6"/>';
      body += text(x0 - 4, y + 2, tk, { anchor: "end", size: 5.8 });
    });
    groups.forEach(function (g, i) {
      const gx = x0 + gw * i + gw / 2;
      const ya = scale(g.a, 0, 100, y1, y0);
      const yb = scale(g.b, 0, 100, y1, y0);
      body += '<rect x="' + f(gx - bw - 1) + '" y="' + f(ya) + '" width="' + f(bw) + '" height="' + f(y1 - ya) + '" fill="' + INK + '" opacity="0.75"/>';
      body += '<rect x="' + f(gx + 1) + '" y="' + f(yb) + '" width="' + f(bw) + '" height="' + f(y1 - yb) + '" fill="' + BG + '" stroke="' + INK + '" stroke-width="1"/>';
      body += text(gx + 1 + bw / 2, yb - 3, g.b, { anchor: "middle", size: 5.8, fill: INK });
      body += text(gx, y1 + 9, g.label, { anchor: "middle", sans: true, size: 6.2 });
    });
    if (spec.reference != null) {
      const ry = scale(spec.reference, 0, 100, y1, y0);
      body += '<line x1="' + x0 + '" y1="' + f(ry) + '" x2="' + x1 + '" y2="' + f(ry) + '" stroke="' + ACCENT + '" stroke-width="1.2" stroke-dasharray="3 2"/>';
      body += text(x0 + 2, ry - 4, spec.referenceLabel || "", { size: 5.6, fill: ACCENT });
    }
    if (spec.legend) {
      body += '<rect x="' + x0 + '" y="' + (SIZE - 18) + '" width="7" height="7" fill="' + INK + '" opacity="0.75"/>';
      body += text(x0 + 10, SIZE - 12, spec.legend[0], { size: 5.6 });
      body += '<rect x="' + (x0 + 84) + '" y="' + (SIZE - 18) + '" width="7" height="7" fill="' + BG + '" stroke="' + INK + '"/>';
      body += text(x0 + 94, SIZE - 12, spec.legend[1], { size: 5.6 });
    }
    return frame(body, spec.caption);
  }

  function dumbbell(spec) {
    const rows = spec.rows || [];
    const x0 = PAD, x1 = SIZE - PAD;
    const top = 34;
    const rowH = (SIZE - top - 26) / Math.max(1, rows.length);
    let body = "";
    rows.forEach(function (r, i) {
      const y = top + i * rowH;
      const xb = scale(r.baseline, 0, 100, x0, x1);
      const xm = scale(r.module, 0, 100, x0, x1);
      const better = r.module > r.baseline;
      const color = better ? ACCENT : GREY;
      body += text(x0, y + 7, r.label, { sans: true, size: 6.8, fill: INK });
      body += '<line x1="' + x0 + '" y1="' + f(y + 17) + '" x2="' + x1 + '" y2="' + f(y + 17) + '" stroke="' + FAINT + '"/>';
      body += '<line x1="' + f(xb) + '" y1="' + f(y + 17) + '" x2="' + f(xm) + '" y2="' + f(y + 17) + '" stroke="' + color + '" stroke-width="2"/>';
      body += '<circle cx="' + f(xb) + '" cy="' + f(y + 17) + '" r="3" fill="' + BG + '" stroke="' + INK + '" stroke-width="1.1"/>';
      body += '<circle cx="' + f(xm) + '" cy="' + f(y + 17) + '" r="3.2" fill="' + color + '"/>';
      body += text(x1, y + 7, r.baseline + " → " + r.module, { anchor: "end", size: 5.8, fill: better ? INK : GREY });
    });
    if (spec.legend) body += text(x0, SIZE - 10, spec.legend, { size: 5.6 });
    return frame(body, spec.caption);
  }

  function tree(spec) {
    const items = spec.items || [];
    const rootX = PAD + 4, rootY = 36;
    const branchX = 58;
    const rowH = Math.min(12.5, (SIZE - rootY - 14) / Math.max(1, items.length));
    let body = '<rect x="' + rootX + '" y="' + (rootY - 7) + '" width="30" height="14" fill="' + INK + '"/>';
    body += text(rootX + 15, rootY + 2.2, spec.root || "/", { anchor: "middle", size: 6, fill: "#fff" });
    const trunkX = rootX + 15;
    const lastY = rootY + 14 + (items.length - 1) * rowH;
    body += '<line x1="' + trunkX + '" y1="' + (rootY + 7) + '" x2="' + trunkX + '" y2="' + f(lastY) + '" stroke="' + GREY + '" stroke-width="0.8"/>';
    items.forEach(function (label, i) {
      const y = rootY + 14 + i * rowH;
      const hot = spec.highlight === i;
      body += '<line x1="' + trunkX + '" y1="' + f(y) + '" x2="' + (branchX - 4) + '" y2="' + f(y) + '" stroke="' + GREY + '" stroke-width="0.8"/>';
      body += '<circle cx="' + (branchX - 2) + '" cy="' + f(y) + '" r="1.8" fill="' + (hot ? ACCENT : INK) + '"/>';
      body += text(branchX + 3, y + 2.2, label, { size: 6.2, fill: hot ? ACCENT : INK });
    });
    if (spec.footer) body += text(SIZE - PAD, SIZE - 10, spec.footer, { anchor: "end" });
    return frame(body, spec.caption);
  }

  function flow(spec) {
    const steps = spec.steps || [];
    const x0 = PAD + 6, x1 = SIZE - PAD - 6;
    const top = 30;
    const gap = 10;
    const h = Math.min(30, (SIZE - top - 12 - gap * (steps.length - 1)) / Math.max(1, steps.length));
    let body = "";
    steps.forEach(function (st, i) {
      const y = top + i * (h + gap);
      const hot = st.hot;
      body += '<rect x="' + x0 + '" y="' + f(y) + '" width="' + (x1 - x0) + '" height="' + f(h) + '" fill="' + (hot ? ACCENT : "#fff") + '" stroke="' + (hot ? ACCENT : LIGHT) + '"/>';
      body += text(x0 + 8, y + h / 2 - 1, st.label, { size: 7, fill: hot ? "#fff" : INK, weight: 600 });
      if (st.sub) body += text(x0 + 8, y + h / 2 + 8, st.sub, { size: 5.8, fill: hot ? "#fff" : GREY });
      if (i < steps.length - 1) {
        const ay = y + h;
        body += '<path d="M' + (SIZE / 2) + " " + f(ay + 1) + "V" + f(ay + gap - 2) + "M" + (SIZE / 2 - 3) + " " + f(ay + gap - 5) + "L" + (SIZE / 2) + " " + f(ay + gap - 2) + "L" + (SIZE / 2 + 3) + " " + f(ay + gap - 5) + '" fill="none" stroke="' + GREY + '" stroke-width="1"/>';
      }
    });
    return frame(body, spec.caption);
  }

  const renderers = {
    compare: compare,
    matrix: matrix,
    registry: registry,
    slope: slope,
    ladder: ladder,
    glyphs: glyphs,
    pairs: pairs,
    dumbbell: dumbbell,
    tree: tree,
    flow: flow
  };

  window.Viz = {
    render: function (spec) {
      const fn = spec && renderers[spec.type];
      if (!fn) return frame("", spec && spec.caption);
      try {
        return fn(spec);
      } catch (err) {
        return frame("", spec.caption);
      }
    }
  };
})();
