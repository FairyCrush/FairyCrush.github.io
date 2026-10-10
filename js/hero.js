(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const probe = document.getElementById("hero-probe");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SEED = 17;

  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const random = mulberry32(SEED);
  const perm = new Uint8Array(512);
  const grad = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    grad[i] = random() * 2 - 1;
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const tmp = perm[i];
    perm[i] = perm[j];
    perm[j] = tmp;
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }

  function valueNoise(x, y) {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const a = grad[perm[(xi & 255) + perm[yi & 255]]];
    const b = grad[perm[((xi + 1) & 255) + perm[yi & 255]]];
    const c = grad[perm[(xi & 255) + perm[(yi + 1) & 255]]];
    const d = grad[perm[((xi + 1) & 255) + perm[(yi + 1) & 255]]];
    const u = fade(xf);
    const v = fade(yf);
    return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
  }

  function fbm(x, y, octaves) {
    let sum = 0;
    let amp = 0.5;
    let freq = 1;
    for (let o = 0; o < octaves; o++) {
      sum += amp * valueNoise(x * freq, y * freq);
      freq *= 2.03;
      amp *= 0.5;
    }
    return sum;
  }

  const COLS = 214;
  const ROWS = 88;
  const X_MIN = -1.75;
  const X_MAX = 1.75;
  const Z_MIN = -0.72;
  const Z_MAX = 0.72;
  const DX = (X_MAX - X_MIN) / (COLS - 1);
  const DZ = (Z_MAX - Z_MIN) / (ROWS - 1);
  const heights = new Float32Array(COLS * ROWS);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = X_MIN + c * DX;
      const z = Z_MIN + r * DZ;
      const nx = (x - 0.08) / 1.42;
      const nz = z / 0.6;
      let mask = 1 - (nx * nx + nz * nz);
      mask += fbm(x * 1.6 + 11.3, z * 1.6 - 4.1, 3) * 0.9;
      if (mask <= 0) continue;
      const lean = 1.05 - 0.38 * ((x - X_MIN) / (X_MAX - X_MIN));
      const ridge = 1 - Math.abs(valueNoise(x * 4.2 + 3.7, z * 4.2 + 1.9));
      const crag = fbm(x * 3.1 - 7.7, z * 3.1 + 2.2, 4);
      let h = Math.pow(mask, 0.42) * (0.62 + 0.4 * (crag + 0.5)) * 0.5 * lean;
      h += ridge * ridge * 0.035 * Math.min(1, mask * 3);
      const bump = Math.exp(-(((x + 0.55) * (x + 0.55)) / 0.18 + (z * z) / 0.08));
      h += bump * 0.16;
      heights[r * COLS + c] = Math.max(0, h);
    }
  }

  const light = (function () {
    const lx = -0.55, ly = 0.8, lz = -0.35;
    const len = Math.hypot(lx, ly, lz);
    return [lx / len, ly / len, lz / len];
  })();

  const rock = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const h = heights[r * COLS + c];
      if (h <= 0.004) continue;
      const hl = heights[r * COLS + Math.max(0, c - 1)];
      const hr = heights[r * COLS + Math.min(COLS - 1, c + 1)];
      const hu = heights[Math.max(0, r - 1) * COLS + c];
      const hd = heights[Math.min(ROWS - 1, r + 1) * COLS + c];
      const gx = (hr - hl) / (2 * DX);
      const gz = (hd - hu) / (2 * DZ);
      const nlen = Math.hypot(gx, 1, gz);
      const nx = -gx / nlen, ny = 1 / nlen, nz = -gz / nlen;
      const diffuse = Math.max(0, nx * light[0] + ny * light[1] + nz * light[2]);
      const pores = 0.82 + 0.36 * valueNoise(c * 0.9, r * 0.9);
      const shade = Math.min(1, (0.14 + diffuse * 0.9) * pores);
      const g = Math.round(16 + shade * 118);
      const rg = Math.round(g * 0.55 + 30);
      rock.push({
        x: X_MIN + c * DX,
        z: Z_MIN + r * DZ,
        h: h,
        fill: "rgb(" + g + "," + g + "," + (g + 3) + ")",
        reflectFill: "rgb(" + rg + "," + rg + "," + (rg + 2) + ")"
      });
    }
  }
  rock.sort(function (a, b) { return b.z - a.z; });

  const WATER_ROWS = 46;
  const WATER_COLS = 150;
  const water = [];
  for (let r = 0; r < WATER_ROWS; r++) {
    const t = r / (WATER_ROWS - 1);
    const z = -1.05 + Math.pow(t, 1.8) * 9.5;
    const xs = new Float32Array(WATER_COLS);
    const phases = new Float32Array(WATER_COLS);
    for (let c = 0; c < WATER_COLS; c++) {
      xs[c] = (c / (WATER_COLS - 1) - 0.5) * (5 + z * 2.4);
      phases[c] = random() * Math.PI * 2;
    }
    water.push({ z: z, xs: xs, phases: phases });
  }

  const count = rock.length;
  const projected = new Float32Array(count * 2);
  const YAW = -0.04;
  const FRAME_MS = 1000 / 30;
  let width = 0, height = 0, dpr = 1;
  let focal = 1, horizonY = 0, centerX = 0;
  const camY = 0.55, dist = 3.2;
  let pointer = null;
  let running = false;
  let visible = true;
  let frameId = 0;
  let lastFrame = 0;
  const startTime = performance.now();
  let snapshotTaken = false;

  function layer() {
    const c = document.createElement("canvas");
    return { canvas: c, ctx: c.getContext("2d") };
  }
  const sky = layer();
  const waterA = layer();
  const waterB = layer();
  const stone = layer();
  const reflection = layer();

  function sizeLayer(l) {
    l.canvas.width = canvas.width;
    l.canvas.height = canvas.height;
    l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    l.ctx.clearRect(0, 0, width, height);
  }

  function project(x, y, z) {
    const cos = Math.cos(YAW), sin = Math.sin(YAW);
    const xr = x * cos - z * sin;
    const zr = x * sin + z * cos;
    const scale = focal / (dist + zr);
    return { sx: centerX + xr * scale, sy: horizonY + (camY - y) * scale, ry: horizonY + (camY + y) * scale, scale: scale };
  }

  function paintSky(c) {
    const g = c.createLinearGradient(0, 0, 0, height);
    const hz = Math.max(0.05, Math.min(0.9, horizonY / height));
    g.addColorStop(0, "#5d6064");
    g.addColorStop(hz * 0.55, "#83868a");
    g.addColorStop(hz, "#b4b6b8");
    g.addColorStop(Math.min(0.98, hz + 0.08), "#a6a8aa");
    g.addColorStop(1, "#7b7e81");
    c.fillStyle = g;
    c.fillRect(0, 0, width, height);
    const haze = c.createLinearGradient(0, horizonY - 30, 0, horizonY + 30);
    haze.addColorStop(0, "rgba(205,207,209,0)");
    haze.addColorStop(0.5, "rgba(205,207,209,0.55)");
    haze.addColorStop(1, "rgba(205,207,209,0)");
    c.fillStyle = haze;
    c.fillRect(0, horizonY - 30, width, 60);
  }

  function paintWater(c, phaseShift) {
    for (let r = 0; r < water.length; r++) {
      const row = water[r];
      const depth = dist + row.z;
      if (depth <= 0.2) continue;
      const scale = focal / depth;
      const sy = horizonY + camY * scale;
      if (sy > height + 4) continue;
      const fadeFar = Math.min(1, (scale - focal / 12.5) / (focal / 6));
      const a = Math.max(0, 0.05 + 0.2 * fadeFar);
      const s = Math.max(0.6, scale * 0.0075);
      c.fillStyle = "rgba(236,237,238," + a.toFixed(3) + ")";
      for (let i = 0; i < row.xs.length; i++) {
        const sx = centerX + (row.xs[i] + Math.sin(row.phases[i] + phaseShift) * 0.012) * scale;
        if (sx < -4 || sx > width + 4) continue;
        c.fillRect(sx, sy, s * 1.8, s * 0.55);
      }
    }
  }

  function paintStone() {
    const rw = Math.max(1, Math.round(width / 3));
    const rh = Math.max(1, Math.round(height / 3));
    reflection.canvas.width = rw;
    reflection.canvas.height = rh;
    const k = rw / width;
    reflection.ctx.setTransform(k, 0, 0, k, 0, 0);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const p = rock[i];
      const pr = project(p.x, p.h, p.z);
      projected[i * 2] = pr.sx;
      projected[i * 2 + 1] = pr.sy;
      sizes[i] = Math.max(1, pr.scale * DX * 0.56);
      const rs = Math.max(1.2, pr.scale * DX * 0.9);
      reflection.ctx.fillStyle = p.reflectFill;
      reflection.ctx.fillRect(pr.sx - rs / 2, pr.ry, rs * 1.4, rs * 1.6);
    }
    const c = stone.ctx;
    c.save();
    c.globalAlpha = 0.38;
    c.imageSmoothingEnabled = true;
    c.drawImage(reflection.canvas, 0, 0, rw, rh, 0, 0, width, height);
    c.restore();
    for (let i = 0; i < count; i++) {
      const s = sizes[i];
      c.fillStyle = rock[i].fill;
      c.fillRect(projected[i * 2] - s / 2, projected[i * 2 + 1] - s / 2, s, s);
    }
  }

  let built = false;
  function build() {
    const rect = canvas.getBoundingClientRect();
    built = rect.width >= 1 && rect.height >= 1;
    if (!built) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    focal = width < 720 ? Math.min(1.05 * width, 1.5 * height) : Math.min(0.95 * width, 2.1 * height);
    horizonY = height * 0.67 - (camY * focal) / dist;
    centerX = width < 720 ? width * 0.5 : width * 0.57;
    [sky, waterA, waterB, stone].forEach(sizeLayer);
    paintSky(sky.ctx);
    paintWater(waterA.ctx, 0);
    paintWater(waterB.ctx, Math.PI);
    paintStone();
  }

  function paintProbe() {
    if (!pointer) {
      if (probe) probe.textContent = "";
      return;
    }
    let best = -1;
    let bestD = 22 * 22;
    for (let i = 0; i < count; i++) {
      const dx = projected[i * 2] - pointer.x;
      const dy = projected[i * 2 + 1] - pointer.y;
      const d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best < 0) {
      if (probe) probe.textContent = "";
      return;
    }
    const px = projected[best * 2];
    const py = projected[best * 2 + 1];
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px + 0.5, 0);
    ctx.lineTo(px + 0.5, height);
    ctx.moveTo(0, py + 0.5);
    ctx.lineTo(width, py + 0.5);
    ctx.stroke();
    ctx.strokeStyle = "#ff3b3c";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(px - 5, py - 5, 10, 10);
    ctx.restore();
    const p = rock[best];
    if (probe) probe.textContent = "x " + p.x.toFixed(3) + "   z " + p.z.toFixed(3) + "   h " + p.h.toFixed(3);
  }

  function draw(now) {
    if (!built) return;
    const blend = reduceMotion ? 0 : 0.5 + 0.5 * Math.sin((now - startTime) * 0.0009);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(sky.canvas, 0, 0);
    ctx.globalAlpha = 1 - blend;
    ctx.drawImage(waterA.canvas, 0, 0);
    ctx.globalAlpha = blend;
    ctx.drawImage(waterB.canvas, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(stone.canvas, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!snapshotTaken) {
      snapshotTaken = true;
      try {
        const small = document.createElement("canvas");
        small.width = 80;
        small.height = Math.max(8, Math.round((80 * height) / width));
        const sctx = small.getContext("2d");
        sctx.filter = "blur(1.5px)";
        sctx.drawImage(canvas, 0, 0, small.width, small.height);
        document.documentElement.style.setProperty("--notebook-image", "url(" + small.toDataURL("image/png") + ")");
      } catch (err) {
        snapshotTaken = true;
      }
    }
    paintProbe();
  }

  function loop(now) {
    if (!running) return;
    if (now - lastFrame >= FRAME_MS) {
      lastFrame = now;
      draw(now);
    }
    frameId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true;
    frameId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frameId);
  }

  let queued = false;
  function redrawOnce() {
    if (running || queued) return;
    queued = true;
    requestAnimationFrame(function (now) {
      queued = false;
      draw(now);
    });
  }

  canvas.addEventListener("pointermove", function (e) {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    redrawOnce();
  });
  canvas.addEventListener("pointerleave", function () {
    pointer = null;
    redrawOnce();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  let resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const rect = canvas.getBoundingClientRect();
      if (built && Math.abs(rect.width - width) < 1 && Math.abs(rect.height - height) < 1) return;
      build();
      redrawOnce();
    }, 150);
  });

  window.HeroScene = { points: count, seed: SEED };

  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      if (!built) {
        build();
        redrawOnce();
      }
    }).observe(canvas);
  }

  build();
  draw(performance.now());
  start();
})();
