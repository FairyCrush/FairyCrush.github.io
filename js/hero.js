(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const glCanvas = document.getElementById("hero-gl");
  const hero = document.getElementById("top");
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
      const g = Math.round(18 + shade * 150);
      const rg = Math.round(150 + g * 0.35);
      rock.push({
        x: X_MIN + c * DX,
        z: Z_MIN + r * DZ,
        h: h,
        g: g / 255,
        fill: "rgb(" + g + "," + g + "," + (g + 3) + ")",
        reflectFill: "rgb(" + rg + "," + rg + "," + (rg + 2) + ")"
      });
    }
  }
  rock.sort(function (a, b) { return b.z - a.z; });

  const count = rock.length;
  const dustRandom = mulberry32(SEED * 31);
  const dustPos = new Float32Array(count * 3);
  const delays = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const p = rock[i];
    const theta = dustRandom() * Math.PI * 2;
    const radius = 0.08 + dustRandom() * 0.32;
    dustPos[i * 3] = p.x + Math.cos(theta) * radius * 1.4;
    dustPos[i * 3 + 1] = p.h + 0.05 + dustRandom() * 0.28;
    dustPos[i * 3 + 2] = p.z + Math.sin(theta) * radius;
    delays[i] = dustRandom();
  }

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

  const camY = 0.55, dist = 3.2;
  let width = 0, height = 0, dpr = 1;
  let focal = 1, horizonY = 0, centerX = 0;
  let built = false;
  let running = false;
  let visible = true;
  let frameId = 0;
  let lastFrame = 0;
  const startTime = performance.now();
  let scroll = 0;
  let scrollChanged = 0;
  let pausedAt = 0;
  let lastMove = 0;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0, target: 0 };

  function layer() {
    const c = document.createElement("canvas");
    return { canvas: c, ctx: c.getContext("2d") };
  }
  const sky = layer();
  const waterA = layer();
  const waterB = layer();
  const stone = layer();
  const reflection = layer();

  let gl = null;
  let program = null;
  const uniforms = {};
  try {
    if (glCanvas && !reduceMotion) {
      gl = glCanvas.getContext("webgl", { alpha: true, antialias: false, depth: false, premultipliedAlpha: true });
    }
  } catch (err) {
    gl = null;
  }

  const VERT = [
    "attribute vec3 aBase;",
    "attribute vec3 aDust;",
    "attribute float aShade;",
    "attribute float aDelay;",
    "uniform vec2 uRes;",
    "uniform float uMix;",
    "uniform float uFocal;",
    "uniform float uHorizon;",
    "uniform float uCenterX;",
    "uniform float uCamY;",
    "uniform float uDist;",
    "uniform float uYaw;",
    "uniform float uPointScale;",
    "uniform float uDpr;",
    "uniform float uReflect;",
    "uniform vec3 uMouse;",
    "uniform float uDrift;",
    "varying float vShade;",
    "varying float vReflect;",
    "varying float vSettle;",
    "void main() {",
    "  float m = min(uMix, 1.0 - uDrift * 0.3);",
    "  float t = clamp((m - aDelay * 0.4) / 0.6, 0.0, 1.0);",
    "  t = 1.0 - pow(1.0 - t, 4.0);",
    "  vec3 p = mix(aDust, aBase, t);",
    "  float c = cos(uYaw);",
    "  float s = sin(uYaw);",
    "  float xr = p.x * c - p.z * s;",
    "  float zr = p.x * s + p.z * c;",
    "  float sc = uFocal / (uDist + zr);",
    "  float y = mix(uCamY - p.y, uCamY + p.y, uReflect);",
    "  vec2 screen = vec2(uCenterX + xr * sc, uHorizon + y * sc);",
    "  vec2 d = screen - uMouse.xy;",
    "  float len = length(d) + 0.0001;",
    "  float f = max(0.0, 1.0 - len / 110.0);",
    "  screen += (d / len) * f * f * 16.0 * uMouse.z * (1.0 - uReflect * 0.6);",
    "  vec2 clip = screen / uRes * 2.0 - 1.0;",
    "  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);",
    "  gl_PointSize = max(1.0, sc * uPointScale * mix(1.0, 1.8, uReflect)) * uDpr;",
    "  vShade = aShade;",
    "  vReflect = uReflect;",
    "  vSettle = t;",
    "}"
  ].join("\n");

  const FRAG = [
    "precision mediump float;",
    "varying float vShade;",
    "varying float vReflect;",
    "varying float vSettle;",
    "void main() {",
    "  if (vReflect > 0.5) {",
    "    vec2 q = gl_PointCoord - 0.5;",
    "    float a = (1.0 - smoothstep(0.05, 0.5, length(q))) * 0.22 * vSettle;",
    "    float g = vShade * 0.45 + 0.3;",
    "    gl_FragColor = vec4(vec3(g, g, g + 0.01) * a, a);",
    "  } else {",
    "    float a = mix(0.35, 1.0, vSettle);",
    "    gl_FragColor = vec4(vec3(vShade, vShade, vShade + 0.012) * a, a);",
    "  }",
    "}"
  ].join("\n");

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }

  function setupGL() {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    const data = new Float32Array(count * 8);
    for (let i = 0; i < count; i++) {
      const p = rock[i];
      const o = i * 8;
      data[o] = p.x;
      data[o + 1] = p.h;
      data[o + 2] = p.z;
      data[o + 3] = dustPos[i * 3];
      data[o + 4] = dustPos[i * 3 + 1];
      data[o + 5] = dustPos[i * 3 + 2];
      data[o + 6] = p.g;
      data[o + 7] = delays[i];
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    [["aBase", 3, 0], ["aDust", 3, 12], ["aShade", 1, 24], ["aDelay", 1, 28]].forEach(function (a) {
      const loc = gl.getAttribLocation(program, a[0]);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, a[1], gl.FLOAT, false, 32, a[2]);
    });
    ["uRes", "uMix", "uFocal", "uHorizon", "uCenterX", "uCamY", "uDist", "uYaw", "uPointScale", "uDpr", "uReflect", "uMouse", "uDrift"].forEach(function (name) {
      uniforms[name] = gl.getUniformLocation(program, name);
    });
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
  }

  if (gl) {
    try {
      setupGL();
    } catch (err) {
      gl = null;
    }
  }

  let settle = gl ? 0 : 1;
  let timeline = null;

  if (gl) {
    glCanvas.addEventListener("webglcontextlost", function (e) {
      e.preventDefault();
      gl = null;
      if (window.HeroScene) window.HeroScene.webgl = false;
      settle = 1;
      timeline = null;
      build();
      redrawOnce();
    });
  }

  function play(segments) {
    timeline = { segments: segments, start: -1 };
    start();
  }

  function advanceTimeline(now) {
    if (!timeline) return;
    if (timeline.start < 0) timeline.start = now;
    let elapsed = now - timeline.start;
    for (let i = 0; i < timeline.segments.length; i++) {
      const s = timeline.segments[i];
      if (elapsed <= s.dur) {
        const k = s.dur > 0 ? elapsed / s.dur : 1;
        settle = s.from + (s.to - s.from) * k;
        return;
      }
      elapsed -= s.dur;
    }
    settle = timeline.segments[timeline.segments.length - 1].to;
    timeline = null;
  }

  function sizeLayer(l) {
    l.canvas.width = canvas.width;
    l.canvas.height = canvas.height;
    l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    l.ctx.clearRect(0, 0, width, height);
  }

  function currentYaw(now) {
    return reduceMotion ? -0.04 : -0.04 + Math.sin((now - startTime) * 0.00008) * 0.05;
  }

  function paintSky(c) {
    const g = c.createLinearGradient(0, 0, 0, height);
    const hz = Math.max(0.05, Math.min(0.9, horizonY / height));
    g.addColorStop(0, "#d9dcde");
    g.addColorStop(hz * 0.6, "#e6e8e9");
    g.addColorStop(hz, "#f4f5f5");
    g.addColorStop(Math.min(0.98, hz + 0.06), "#e7e9ea");
    g.addColorStop(1, "#dcdfe1");
    c.fillStyle = g;
    c.fillRect(0, 0, width, height);
    const haze = c.createLinearGradient(0, horizonY - 34, 0, horizonY + 34);
    haze.addColorStop(0, "rgba(250,250,250,0)");
    haze.addColorStop(0.5, "rgba(250,250,250,0.75)");
    haze.addColorStop(1, "rgba(250,250,250,0)");
    c.fillStyle = haze;
    c.fillRect(0, horizonY - 34, width, 68);
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
      const a = Math.max(0, 0.03 + 0.11 * fadeFar);
      const s = Math.max(0.6, scale * 0.0075);
      c.fillStyle = "rgba(38,40,44," + a.toFixed(3) + ")";
      for (let i = 0; i < row.xs.length; i++) {
        const sx = centerX + (row.xs[i] + Math.sin(row.phases[i] + phaseShift) * 0.012) * scale;
        if (sx < -4 || sx > width + 4) continue;
        c.fillRect(sx, sy, s * 1.8, s * 0.5);
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
    const yaw = -0.04;
    const cos = Math.cos(yaw), sin = Math.sin(yaw);
    const sizes = new Float32Array(count);
    const projected = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      const p = rock[i];
      const xr = p.x * cos - p.z * sin;
      const zr = p.x * sin + p.z * cos;
      const scale = focal / (dist + zr);
      const sx = centerX + xr * scale;
      projected[i * 2] = sx;
      projected[i * 2 + 1] = horizonY + (camY - p.h) * scale;
      sizes[i] = Math.max(1, scale * DX * 0.56);
      const rs = Math.max(1.2, scale * DX * 0.9);
      reflection.ctx.fillStyle = p.reflectFill;
      reflection.ctx.fillRect(sx - rs / 2, horizonY + (camY + p.h) * scale, rs * 1.4, rs * 1.6);
    }
    const c = stone.ctx;
    c.save();
    c.globalAlpha = 0.3;
    c.imageSmoothingEnabled = true;
    c.drawImage(reflection.canvas, 0, 0, rw, rh, 0, 0, width, height);
    c.restore();
    for (let i = 0; i < count; i++) {
      const s = sizes[i];
      c.fillStyle = rock[i].fill;
      c.fillRect(projected[i * 2] - s / 2, projected[i * 2 + 1] - s / 2, s, s);
    }
  }

  function build() {
    const rect = canvas.getBoundingClientRect();
    built = rect.width >= 1 && rect.height >= 1;
    if (!built) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const narrow = width < 720;
    focal = narrow ? Math.min(1.25 * width, 0.9 * height) : Math.min(0.62 * width, 1.05 * height);
    horizonY = height * (narrow ? 0.7 : 0.76) - (camY * focal) / dist;
    centerX = narrow ? width * 0.5 : width * 0.64;
    [sky, waterA, waterB].forEach(sizeLayer);
    paintSky(sky.ctx);
    paintWater(waterA.ctx, 0);
    paintWater(waterB.ctx, Math.PI);
    if (gl) {
      glCanvas.width = canvas.width;
      glCanvas.height = canvas.height;
      gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      stone.canvas.width = 1;
      stone.canvas.height = 1;
    } else {
      sizeLayer(stone);
      paintStone();
    }
  }

  function drawGL(now) {
    const yaw = currentYaw(now) + scroll * 0.35;
    const zoom = 1 + scroll * 0.18;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uniforms.uRes, width, height);
    gl.uniform1f(uniforms.uMix, settle);
    gl.uniform1f(uniforms.uFocal, focal * zoom);
    gl.uniform1f(uniforms.uHorizon, horizonY - scroll * height * 0.08);
    gl.uniform1f(uniforms.uCenterX, centerX);
    gl.uniform1f(uniforms.uCamY, camY);
    gl.uniform1f(uniforms.uDist, dist);
    gl.uniform1f(uniforms.uYaw, yaw);
    gl.uniform1f(uniforms.uPointScale, DX * 0.56);
    gl.uniform1f(uniforms.uDpr, dpr);
    gl.uniform3f(uniforms.uMouse, mouse.x, mouse.y, mouse.strength);
    gl.uniform1f(uniforms.uDrift, scroll);
    gl.uniform1f(uniforms.uReflect, 1);
    gl.drawArrays(gl.POINTS, 0, count);
    gl.uniform1f(uniforms.uReflect, 0);
    gl.drawArrays(gl.POINTS, 0, count);
  }

  function draw(now) {
    if (!built) return;
    advanceTimeline(now);
    mouse.strength += (mouse.target - mouse.strength) * 0.08;
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;
    const blend = reduceMotion ? 0 : 0.5 + 0.5 * Math.sin((now - startTime) * 0.0007);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(sky.canvas, 0, 0);
    ctx.globalAlpha = 1 - blend;
    ctx.drawImage(waterA.canvas, 0, 0);
    ctx.globalAlpha = blend;
    ctx.drawImage(waterB.canvas, 0, 0);
    ctx.globalAlpha = 1;
    if (!gl) ctx.drawImage(stone.canvas, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (gl) drawGL(now);
  }

  function busy() {
    const now = performance.now();
    return !!timeline || now - lastMove < 400 || Math.abs(mouse.tx - mouse.x) + Math.abs(mouse.ty - mouse.y) > 0.5 || Math.abs(mouse.target - mouse.strength) > 0.01 || now - scrollChanged < 400;
  }

  function loop(now) {
    if (!running) return;
    const interval = busy() ? 0 : 1000 / 24;
    if (now - lastFrame >= interval) {
      lastFrame = now;
      draw(now);
    }
    frameId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || !visible || document.hidden || !built) return;
    if (reduceMotion && !timeline) return;
    if (timeline && timeline.start >= 0 && pausedAt) timeline.start += performance.now() - pausedAt;
    pausedAt = 0;
    running = true;
    frameId = requestAnimationFrame(loop);
  }

  function stop() {
    if (running) pausedAt = performance.now();
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

  const pointerTarget = hero || canvas;
  pointerTarget.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" || reduceMotion || !gl) return;
    const rect = canvas.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
    if (mouse.x < -999) {
      mouse.x = mouse.tx;
      mouse.y = mouse.ty;
    }
    mouse.target = 1;
    lastMove = performance.now();
  });
  pointerTarget.addEventListener("pointerleave", function () {
    mouse.target = 0;
  });

  function setScroll(progress) {
    const next = Math.max(0, Math.min(1, progress || 0));
    if (Math.abs(next - scroll) < 0.0005) return;
    scroll = next;
    scrollChanged = performance.now();
    if (!running) redrawOnce();
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[entries.length - 1].isIntersecting;
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

  window.HeroScene = { points: count, seed: SEED, setScroll: setScroll, webgl: !!gl };

  let introPlayed = false;
  function intro() {
    if (introPlayed || !built) return;
    introPlayed = true;
    if (gl) {
      play([
        { from: 0, to: 0, dur: 180 },
        { from: 0, to: 1, dur: 2400 }
      ]);
    }
  }

  if ("ResizeObserver" in window) {
    new ResizeObserver(function () {
      if (!built) {
        build();
        intro();
        redrawOnce();
      }
    }).observe(canvas);
  }

  build();
  draw(performance.now());
  intro();
  start();
})();
