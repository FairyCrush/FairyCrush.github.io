(function () {
  const svg = document.getElementById("map-svg");
  if (!svg) return;

  const LON_MIN = 94.6;
  const LON_MAX = 141.4;
  const LAT_MIN = -11.2;
  const LAT_MAX = 7.2;
  const STEP = 0.42;
  const HOME = { lon: 106.85, lat: -6.2 };

  const LAND = [
    [[95.3, 5.6], [97.5, 5.2], [98.7, 3.8], [100.4, 2.3], [101.4, 1.7], [103.0, 0.9], [103.8, 0.0], [104.5, -1.0], [105.9, -2.5], [106.0, -3.2], [105.8, -5.8], [104.6, -5.9], [103.4, -4.8], [102.3, -3.9], [101.0, -2.5], [100.3, -1.0], [99.3, 0.4], [98.6, 1.7], [97.6, 2.6], [96.4, 3.7], [95.3, 4.9]],
    [[105.2, -6.8], [106.0, -5.9], [107.0, -6.0], [108.3, -6.2], [110.4, -6.9], [111.6, -6.6], [112.7, -6.85], [114.1, -6.9], [114.4, -7.7], [114.4, -8.6], [112.5, -8.4], [110.5, -8.1], [108.6, -7.8], [106.4, -7.4], [105.4, -6.9]],
    [[114.45, -8.1], [115.7, -8.35], [115.5, -8.8], [114.6, -8.4]],
    [[115.85, -8.3], [116.7, -8.3], [116.6, -8.9], [115.9, -8.8]],
    [[116.8, -8.3], [119.0, -8.2], [119.1, -8.7], [117.9, -9.0], [116.8, -8.9]],
    [[119.8, -8.4], [122.9, -8.1], [123.0, -8.5], [120.8, -8.9], [119.8, -8.8]],
    [[119.0, -9.4], [120.8, -9.6], [120.6, -10.3], [119.2, -9.8]],
    [[123.5, -10.3], [124.5, -9.3], [127.3, -8.4], [126.8, -8.9], [125.0, -9.6], [124.0, -10.4]],
    [[109.0, 1.6], [109.6, 2.1], [111.0, 1.7], [111.8, 2.8], [113.2, 3.2], [114.2, 4.6], [115.4, 5.0], [116.1, 6.1], [117.3, 6.8], [118.0, 5.9], [119.2, 5.3], [118.4, 4.6], [117.8, 3.5], [117.6, 1.5], [118.9, 1.0], [117.8, 0.4], [117.5, -0.5], [116.6, -1.5], [116.5, -2.6], [116.0, -3.6], [114.6, -4.0], [113.0, -3.3], [111.8, -3.4], [111.0, -3.0], [110.2, -2.9], [110.0, -1.7], [109.0, -0.6], [108.9, 0.6]],
    [[118.8, -2.6], [119.4, -0.9], [119.8, 0.0], [120.1, 0.7], [120.9, 1.3], [122.4, 1.0], [123.9, 0.9], [124.6, 1.4], [125.2, 1.6], [124.9, 0.9], [124.0, 0.4], [122.9, 0.5], [121.2, 0.5], [120.6, 0.1], [120.4, -0.9], [121.0, -1.4], [122.0, -0.9], [123.4, -0.8], [122.8, -1.4], [121.7, -1.9], [122.3, -3.0], [123.0, -4.0], [122.6, -4.7], [121.6, -4.6], [121.0, -3.5], [120.8, -2.7], [120.4, -3.3], [120.4, -5.5], [119.6, -5.6], [119.4, -4.6], [119.6, -3.6], [119.0, -3.4]],
    [[127.6, 2.0], [128.1, 1.5], [127.9, 0.8], [128.7, 1.2], [128.4, 0.5], [127.9, 0.2], [128.5, -0.6], [127.9, -0.4], [127.6, 0.6], [127.4, 1.2]],
    [[127.9, -2.9], [130.8, -3.1], [130.6, -3.6], [128.3, -3.5]],
    [[125.9, -3.1], [127.2, -3.2], [127.1, -3.8], [126.0, -3.7]],
    [[131.0, -1.3], [132.3, -0.4], [134.1, -0.9], [135.0, -3.3], [137.8, -1.5], [140.9, -2.6], [144.0, -3.8], [145.8, -5.4], [147.6, -6.1], [147.2, -7.4], [148.1, -8.1], [150.0, -10.3], [147.0, -10.1], [146.0, -8.2], [143.4, -8.5], [142.6, -9.3], [141.0, -9.1], [140.1, -8.1], [138.9, -8.3], [137.6, -8.4], [138.0, -7.3], [138.6, -6.8], [137.9, -5.4], [135.2, -4.4], [133.6, -3.9], [132.9, -4.1], [132.0, -2.8], [133.7, -2.5], [133.0, -2.3], [131.9, -1.5]],
    [[100.2, 6.4], [101.1, 6.2], [102.1, 6.2], [103.4, 4.6], [103.5, 2.8], [104.3, 1.4], [103.5, 1.3], [102.0, 2.3], [101.3, 2.8], [100.7, 3.9], [100.3, 5.2]],
    [[105.1, -1.6], [106.0, -1.9], [106.8, -3.0], [106.0, -3.0], [105.6, -2.4]],
    [[107.6, -2.6], [108.3, -2.6], [108.2, -3.2], [107.6, -3.1]]
  ];

  function inside(lon, lat, poly) {
    let hit = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  }

  const W = (LON_MAX - LON_MIN) / STEP;
  const H = (LAT_MAX - LAT_MIN) / STEP;
  const NS = "http://www.w3.org/2000/svg";
  svg.setAttribute("viewBox", "0 0 " + W.toFixed(2) + " " + H.toFixed(2));

  function toXY(lon, lat) {
    return [(lon - LON_MIN) / STEP, (LAT_MAX - lat) / STEP];
  }

  const home = toXY(HOME.lon, HOME.lat);
  const group = document.createElementNS(NS, "g");
  for (let lat = LAT_MAX - STEP / 2; lat > LAT_MIN; lat -= STEP) {
    for (let lon = LON_MIN + STEP / 2; lon < LON_MAX; lon += STEP) {
      let land = false;
      for (let p = 0; p < LAND.length && !land; p++) land = inside(lon, lat, LAND[p]);
      if (!land) continue;
      const xy = toXY(lon, lat);
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", xy[0].toFixed(2));
      dot.setAttribute("cy", xy[1].toFixed(2));
      dot.setAttribute("r", "0.34");
      const distance = Math.hypot(xy[0] - home[0], xy[1] - home[1]);
      dot.setAttribute("class", distance < 7 ? "land near" : "land");
      dot.style.setProperty("--d", distance.toFixed(1));
      group.appendChild(dot);
    }
  }
  svg.appendChild(group);

  const dot = document.createElementNS(NS, "circle");
  dot.setAttribute("cx", home[0].toFixed(2));
  dot.setAttribute("cy", home[1].toFixed(2));
  dot.setAttribute("r", "0.62");
  dot.setAttribute("class", "home");
  svg.appendChild(dot);

  const ping = document.createElement("span");
  ping.className = "map-ping";
  ping.setAttribute("aria-hidden", "true");
  ping.style.left = ((home[0] / W) * 100).toFixed(3) + "%";
  ping.style.top = ((home[1] / H) * 100).toFixed(3) + "%";
  const stage = document.createElement("div");
  stage.className = "map-stage";
  svg.parentNode.insertBefore(stage, svg);
  stage.appendChild(svg);
  stage.appendChild(ping);

  const mapBox = stage.parentNode;
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    mapBox.classList.add("can-wave");
    const io = new IntersectionObserver(function (records) {
      if (records[0].isIntersecting) {
        mapBox.classList.add("is-in");
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(mapBox);
  }
})();
