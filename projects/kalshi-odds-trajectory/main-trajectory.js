(() => {
  const data = window.oddsTrajectoryData;
  if (!data || !Array.isArray(data.dates) || !Array.isArray(data.teams)) return;

  const svg = document.getElementById("chartSvg");
  if (!svg) return;

  const W = 1100;
  const H = 520;

  const margin = { left: 108, right: 36, top: 36, bottom: 78 };
  const chartW = W - margin.left - margin.right;
  const chartH = H - margin.top - margin.bottom;
  const plotBottom = margin.top + chartH;

  const dates = data.dates;
  const teams = data.teams;
  const segCount = Math.max(1, dates.length - 1);

  const reducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const elSvg = (tag, attrs = {}) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
    return n;
  };

  const hexToRgb = (hex) => {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  };

  const allValues = [];
  for (const t of teams) for (const v of t.odds) allValues.push(Number(v));
  const domainMinRaw = Math.min(...allValues.filter((v) => Number.isFinite(v)));
  const domainMaxRaw = Math.max(...allValues.filter((v) => Number.isFinite(v)));

  const domainMin = Number.isFinite(domainMinRaw) ? domainMinRaw : 1;
  const domainMax = Number.isFinite(domainMaxRaw) ? domainMaxRaw : 10;

  const getNiceRange = (min, max, desiredTicks = 8) => {
    if (min === max) return { niceMin: min - 1, niceMax: max + 1, step: 1 };

    const range = max - min;
    const roughStep = range / Math.max(1, desiredTicks - 1);
    const exp = Math.floor(Math.log10(roughStep));
    const base = roughStep / Math.pow(10, exp);

    let mult = 1;
    if (base <= 1.5) mult = 1;
    else if (base <= 3) mult = 2;
    else if (base <= 7) mult = 5;
    else mult = 10;

    const step = mult * Math.pow(10, exp);
    const niceMin = Math.floor(min / step) * step;
    const niceMax = Math.ceil(max / step) * step;
    return { niceMin, niceMax, step };
  };

  const { niceMin, niceMax, step } = getNiceRange(domainMin, domainMax, 8);

  const yTicks = [];
  for (let v = niceMin; v <= niceMax + step / 2; v += step) yTicks.push(v);
  if (yTicks.length < 4) yTicks.push(niceMax);

  const mapY = (value) => {
    const t = (value - niceMin) / (niceMax - niceMin || 1);
    const tt = Math.max(0, Math.min(1, t));
    return margin.top + tt * chartH;
  };

  const xAtIndex = (i) => margin.left + (i / segCount) * chartW;

  const logoSize = 42;
  const valueTextOffsetX = 20;
  const valueTextOffsetY = 5;

  const FONT_AXIS = "Plus Jakarta Sans, DM Sans, system-ui, sans-serif";
  const FONT_VALUES = "DM Sans, Plus Jakarta Sans, system-ui, sans-serif";

  const palette = {
    bg: "#ffffff",
    plot: "#ffffff",
    plotStroke: "rgba(15, 23, 42, 0.08)",
    axisText: "rgba(15, 23, 42, 0.62)",
    valueText: "rgba(15, 23, 42, 0.92)",
    gridH: "rgba(15, 23, 42, 0.07)",
    gridV: "rgba(15, 23, 42, 0.045)",
    axisLine: "rgba(15, 23, 42, 0.2)"
  };

  svg.innerHTML = "";

  const defs = elSvg("defs", {});

  svg.appendChild(defs);

  const background = elSvg("rect", {
    x: 0,
    y: 0,
    width: W,
    height: H,
    fill: palette.bg,
    rx: "18",
    ry: "18"
  });
  svg.appendChild(background);

  const plotPanel = elSvg("rect", {
    x: margin.left - 12,
    y: margin.top - 10,
    width: chartW + 24,
    height: chartH + 20,
    fill: palette.plot,
    stroke: palette.plotStroke,
    "stroke-width": "1",
    rx: "14",
    ry: "14"
  });
  svg.appendChild(plotPanel);

  const gridGroup = elSvg("g", { "data-layer": "grid" });
  const axisGroup = elSvg("g", { "data-layer": "axes" });
  const linesGroup = elSvg("g", { "data-layer": "lines" });
  const logosGroup = elSvg("g", { "data-layer": "logos" });
  svg.appendChild(gridGroup);
  svg.appendChild(linesGroup);
  svg.appendChild(logosGroup);
  svg.appendChild(axisGroup);

  for (const v of yTicks) {
    const y = mapY(v);
    gridGroup.appendChild(
      elSvg("line", {
        x1: margin.left,
        y1: y,
        x2: margin.left + chartW,
        y2: y,
        stroke: palette.gridH,
        "stroke-width": "1",
        "stroke-dasharray": "4 7"
      })
    );

    const label = elSvg("text", {
      x: margin.left - 18,
      y: y + 5,
      "text-anchor": "end",
      "font-size": "16",
      "font-weight": "700",
      fill: palette.axisText,
      "font-family": FONT_AXIS
    });
    label.textContent = `${Math.round(v)}`;
    axisGroup.appendChild(label);
  }

  for (let i = 0; i < dates.length; i++) {
    const x = xAtIndex(i);
    gridGroup.appendChild(
      elSvg("line", {
        x1: x,
        y1: margin.top,
        x2: x,
        y2: plotBottom,
        stroke: palette.gridV,
        "stroke-width": "1"
      })
    );

    const labelX = elSvg("text", {
      x,
      y: plotBottom + 38,
      "text-anchor": "middle",
      "font-size": "15",
      "font-weight": "700",
      fill: palette.axisText,
      "font-family": FONT_AXIS
    });
    labelX.textContent = dates[i];
    axisGroup.appendChild(labelX);
  }

  axisGroup.appendChild(
    elSvg("line", {
      x1: margin.left,
      y1: plotBottom,
      x2: margin.left + chartW,
      y2: plotBottom,
      stroke: palette.axisLine,
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    })
  );

  const pointsToPathD = (points) => {
    if (!points.length) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
    return d;
  };

  const markersByTeamId = {};

  teams.forEach((team) => {
    const points = dates.map((_, i) => {
      const x = xAtIndex(i);
      const v = Number(team.odds[i]);
      return { x, y: mapY(v) };
    });

    const { r, g, b } = hexToRgb(team.color);

    linesGroup.appendChild(
      elSvg("path", {
        d: pointsToPathD(points),
        stroke: team.color,
        "stroke-width": "4",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: "0.98"
      })
    );

    const clipId = `clip-${team.id}`;
    const clipPath = elSvg("clipPath", { id: clipId, clipPathUnits: "objectBoundingBox" });
    clipPath.appendChild(elSvg("circle", { cx: "0.5", cy: "0.5", r: "0.5" }));
    defs.appendChild(clipPath);

    const logoImg = elSvg("image", {
      href: team.logo,
      x: points[0].x - logoSize / 2,
      y: points[0].y - logoSize / 2,
      width: logoSize,
      height: logoSize,
      "clip-path": `url(#${clipId})`,
      preserveAspectRatio: "xMidYMid slice",
      style: `filter: drop-shadow(0 6px 14px rgba(${r},${g},${b},0.35));`,
      opacity: "1"
    });
    logosGroup.appendChild(logoImg);

    const valueText = elSvg("text", {
      x: points[0].x + valueTextOffsetX,
      y: points[0].y + valueTextOffsetY,
      fill: palette.valueText,
      "font-size": "17",
      "font-weight": "800",
      "font-family": FONT_VALUES,
      style: "font-variant-numeric: tabular-nums;",
      opacity: "0"
    });
    valueText.textContent = Number(team.odds[0]).toFixed(2);
    logosGroup.appendChild(valueText);

    markersByTeamId[team.id] = { team, points, logoImg, valueText };
  });

  const setAtIndex = (idx) => {
    for (const team of teams) {
      const m = markersByTeamId[team.id];
      const p = m.points[idx];
      if (!p) continue;

      const v = Number(team.odds[idx]);
      m.logoImg.setAttribute("x", p.x - logoSize / 2);
      m.logoImg.setAttribute("y", p.y - logoSize / 2);
      m.valueText.setAttribute("x", p.x + valueTextOffsetX);
      m.valueText.setAttribute("y", p.y + valueTextOffsetY);
      m.valueText.textContent = v.toFixed(2);
      m.valueText.setAttribute("opacity", "1");
    }
  };

  const hideValues = () => {
    for (const team of teams) markersByTeamId[team.id].valueText.setAttribute("opacity", "0");
  };

  const moveBetween = async (fromIdx, toIdx) => {
    hideValues();
    const fromX = xAtIndex(fromIdx);
    const toX = xAtIndex(toIdx);
    const travelMs = 2880;

    const start = performance.now();
    await new Promise((resolve) => {
      const frame = (now) => {
        const t = Math.max(0, Math.min(1, (now - start) / travelMs));
        const e = easeInOutCubic(t);

        for (const team of teams) {
          const m = markersByTeamId[team.id];
          const v0 = Number(team.odds[fromIdx]);
          const v1 = Number(team.odds[toIdx]);
          const vv = v0 + (v1 - v0) * e;
          const x = fromX + (toX - fromX) * e;
          const y = mapY(vv);

          m.logoImg.setAttribute("x", x - logoSize / 2);
          m.logoImg.setAttribute("y", y - logoSize / 2);
        }

        if (t >= 1) resolve();
        else requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  };

  const startIdx = 0;
  if (reducedMotion) {
    setAtIndex(startIdx);
    return;
  }

  (async () => {
    let idx = startIdx;
    const dwellMs = 2400;

    setAtIndex(idx);

    while (true) {
      await sleep(dwellMs);
      if (idx >= dates.length - 1) {
        idx = 0;
        setAtIndex(idx);
        continue;
      }

      await moveBetween(idx, idx + 1);
      idx += 1;
      setAtIndex(idx);
    }
  })();
})();
