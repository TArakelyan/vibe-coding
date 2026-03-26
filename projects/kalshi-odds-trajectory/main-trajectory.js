(() => {
  const data = window.oddsTrajectoryData;
  if (!data || !Array.isArray(data.dates) || !Array.isArray(data.teams)) return;

  const svg = document.getElementById("chartSvg");
  if (!svg) return;

  const W = 900;
  const H = 420;

  // Поле графика (с полями под подписи)
  const margin = { left: 84, right: 20, top: 26, bottom: 58 };
  const chartW = W - margin.left - margin.right;
  const chartH = H - margin.top - margin.bottom;

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

  // Ось "наоборот" как на скрине: маленькие значения сверху, большие снизу
  const mapY = (value) => {
    const t = (value - niceMin) / (niceMax - niceMin || 1);
    const tt = Math.max(0, Math.min(1, t));
    return margin.top + tt * chartH;
  };

  const xAtIndex = (i) => margin.left + (i / segCount) * chartW;

  const pointsByTeam = {};
  const logoSize = 34;
  const valueTextOffsetX = 16;
  const valueTextOffsetY = 4;

  const background = elSvg("rect", {
    x: 0,
    y: 0,
    width: W,
    height: H,
    fill: "rgba(251, 252, 255, 1)"
  });
  svg.appendChild(background);

  const defs = elSvg("defs", {});
  svg.appendChild(defs);

  // Сетка по Y + подписи
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
    const gridLine = elSvg("line", {
      x1: margin.left,
      y1: y,
      x2: margin.left + chartW,
      y2: y,
      stroke: "rgba(15, 23, 42, 0.10)",
      "stroke-width": "1"
    });
    gridGroup.appendChild(gridLine);

    const label = elSvg("text", {
      x: margin.left - 14,
      y: y + 4,
      "text-anchor": "end",
      "font-size": "12",
      fill: "rgba(15, 23, 42, 0.62)",
      "font-weight": "700"
    });
    label.textContent = `${Math.round(v)}`;
    axisGroup.appendChild(label);
  }

  // Вертикальная сетка и подписи дат
  for (let i = 0; i < dates.length; i++) {
    const x = xAtIndex(i);

    const gridV = elSvg("line", {
      x1: x,
      y1: margin.top,
      x2: x,
      y2: margin.top + chartH,
      stroke: "rgba(15, 23, 42, 0.06)",
      "stroke-width": "1"
    });
    gridGroup.appendChild(gridV);

    const labelX = elSvg("text", {
      x,
      y: margin.top + chartH + 30,
      "text-anchor": "middle",
      "font-size": "12",
      fill: "rgba(15, 23, 42, 0.60)",
      "font-weight": "700"
    });
    labelX.textContent = dates[i];
    axisGroup.appendChild(labelX);
  }

  // Ось X
  axisGroup.appendChild(
    elSvg("line", {
      x1: margin.left,
      y1: margin.top + chartH,
      x2: margin.left + chartW,
      y2: margin.top + chartH,
      stroke: "rgba(15, 23, 42, 0.22)",
      "stroke-width": "1.2"
    })
  );

  const pointsToPathD = (points) => {
    if (!points.length) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
    return d;
  };

  const markersByTeamId = {};

  for (const team of teams) {
    const points = dates.map((_, i) => {
      const x = xAtIndex(i);
      const v = Number(team.odds[i]);
      return { x, y: mapY(v) };
    });
    pointsByTeam[team.id] = points;

    // Линия
    linesGroup.appendChild(
      elSvg("path", {
        d: pointsToPathD(points),
        stroke: team.color,
        "stroke-width": "3",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: "0.95"
      })
    );

    // Обтравка под круг
    const clipId = `clip-${team.id}`;
    const clipPath = elSvg("clipPath", { id: clipId, clipPathUnits: "objectBoundingBox" });
    clipPath.appendChild(elSvg("circle", { cx: "0.5", cy: "0.5", r: "0.5" }));
    defs.appendChild(clipPath);

    // Логотип (позиция будет меняться анимацией)
    const logoImg = elSvg("image", {
      href: team.logo,
      x: points[0].x - logoSize / 2,
      y: points[0].y - logoSize / 2,
      width: logoSize,
      height: logoSize,
      "clip-path": `url(#${clipId})`,
      preserveAspectRatio: "xMidYMid slice",
      style: "filter: drop-shadow(0 10px 18px rgba(0,0,0,.20));",
      opacity: "1"
    });
    logosGroup.appendChild(logoImg);

    // Точка (на случай, если картинка прозрачная)
    const dot = elSvg("circle", {
        cx: points[0].x,
        cy: points[0].y,
        r: "5.4",
        fill: team.color,
        stroke: "rgba(255,255,255,0.95)",
        "stroke-width": "2",
        opacity: "0.9"
    });
    logosGroup.appendChild(dot);

    // Текст значения (показывается только при остановке)
    const valueText = elSvg("text", {
      x: points[0].x + valueTextOffsetX,
      y: points[0].y + valueTextOffsetY,
      fill: "rgba(15, 23, 42, 0.90)",
      "font-size": "14",
      "font-weight": "800",
      opacity: "0"
    });
    valueText.textContent = Number(team.odds[0]).toFixed(2);
    logosGroup.appendChild(valueText);

    markersByTeamId[team.id] = { team, points, logoImg, valueText };
    markersByTeamId[team.id].dot = dot;
  }

  const setAtIndex = (idx) => {
    for (const team of teams) {
      const m = markersByTeamId[team.id];
      const p = m.points[idx];
      if (!p) continue;

      const v = Number(team.odds[idx]);
      m.logoImg.setAttribute("x", p.x - logoSize / 2);
      m.logoImg.setAttribute("y", p.y - logoSize / 2);
      if (m.dot) {
        m.dot.setAttribute("cx", p.x);
        m.dot.setAttribute("cy", p.y);
      }
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

    const travelMs = 2880; // в 2 раза медленнее относительно базового (segCount=5, cycle=7.2s)

    const start = performance.now();
    await new Promise((resolve) => {
      const frame = (now) => {
        const t = Math.max(0, Math.min(1, (now - start) / travelMs));
        const e = easeInOutCubic(t);

        for (const team of teams) {
          const m = markersByTeamId[team.id];
          const v0 = Number(team.odds[fromIdx]);
          const v1 = Number(team.odds[toIdx]);
          const v = v0 + (v1 - v0) * e;

          const x = fromX + (toX - fromX) * e;
          const y = mapY(v);

          m.logoImg.setAttribute("x", x - logoSize / 2);
          m.logoImg.setAttribute("y", y - logoSize / 2);
          if (m.dot) {
            m.dot.setAttribute("cx", x);
            m.dot.setAttribute("cy", y);
          }
        }

        if (t >= 1) resolve();
        else requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  };

  // Анимация с остановками
  const startIdx = 0;
  if (reducedMotion) {
    setAtIndex(startIdx);
    return;
  }

  (async () => {
    let idx = startIdx;
    const dwellMs = 2400; // "хотя бы пару секунд"

    // Первый кадр: точно на первой дате
    setAtIndex(idx);

    // Бесконечный цикл слева направо
    while (true) {
      await sleep(dwellMs);
      if (idx >= dates.length - 1) {
        // Перезапуск без движения обратно (только слева направо)
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

