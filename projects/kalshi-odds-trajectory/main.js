(() => {
  const data = window.oddsTrajectoryData;
  if (!data || !Array.isArray(data.dates) || !Array.isArray(data.teams)) {
    // eslint-disable-next-line no-console
    console.error("Не найдены oddsTrajectoryData.dates/teams");
    return;
  }

  const svg = document.getElementById("chartSvg");
  const wrap = document.getElementById("chartWrap");
  const tooltip = document.getElementById("tooltip");
  const legendEl = document.getElementById("legend");
  const currentDateChip = document.getElementById("currentDateChip");
  const currentValueHint = document.getElementById("currentValueHint");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const logToggle = document.getElementById("logToggle");

  const W = 900;
  const H = 420;
  const margin = { left: 92, right: 20, top: 34, bottom: 62 };
  const chartW = W - margin.left - margin.right;
  const chartH = H - margin.top - margin.bottom;
  const segCount = data.dates.length - 1;

  const state = {
    playing: true,
    scrubbing: false,
    reducedMotion: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    progress: 0, // 0..1
    lastTs: null,
    startOffsetMs: 0,
    cycleMs: 7200,
    logScale: true
  };

  if (state.reducedMotion) {
    state.playing = false;
  }

  const xForIndex = (iFloat) => margin.left + (iFloat / segCount) * chartW;

  const getDomain = () => {
    let min = Infinity;
    let max = -Infinity;
    for (const t of data.teams) {
      for (const v of t.odds) {
        const n = Number(v);
        if (!Number.isFinite(n) || n <= 0) continue;
        min = Math.min(min, n);
        max = Math.max(max, n);
      }
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      min = 1;
      max = 10;
    }
    // Небольшое расширение диапазона для визуального комфорта
    const pad = (max - min) * 0.04;
    return { min: Math.max(0.001, min - pad), max: max + pad };
  };

  const formatOdds = (v) => {
    if (v >= 10) return `${Math.round(v)}`;
    return `${Math.round(v * 100) / 100}`.replace(/\.0$/, "");
  };

  const domain = getDomain();
  const yTicksCount = 5;

  const mapY = (value) => {
    if (value <= 0) return margin.top + chartH;
    if (state.logScale) {
      const logMin = Math.log10(domain.min);
      const logMax = Math.log10(domain.max);
      const logV = Math.log10(value);
      const denom = logMax - logMin || 1;
      const t = (logMax - logV) / denom;
      return margin.top + t * chartH;
    }
    const denom = domain.max - domain.min || 1;
    const t = (domain.max - value) / denom;
    return margin.top + t * chartH;
  };

  const buildTicks = () => {
    const ticks = [];
    if (state.logScale) {
      const logMin = Math.log10(domain.min);
      const logMax = Math.log10(domain.max);
      for (let i = 0; i < yTicksCount; i++) {
        const p = i / (yTicksCount - 1);
        const exp = logMin + (logMax - logMin) * p;
        const val = Math.pow(10, exp);
        ticks.push(val);
      }
    } else {
      for (let i = 0; i < yTicksCount; i++) {
        const p = i / (yTicksCount - 1);
        ticks.push(domain.min + (domain.max - domain.min) * p);
      }
    }
    return ticks;
  };

  const paletteBgGrid = "rgba(15, 23, 42, 0.08)";
  const paletteGrid = "rgba(15, 23, 42, 0.08)";
  const paletteText = "rgba(15, 23, 42, 0.68)";
  const paletteLineGlow = "rgba(37, 99, 235, 0.12)";

  const elSvg = (tag, attrs = {}) => {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    return n;
  };

  const createLegend = () => {
    legendEl.innerHTML = "";
    for (const t of data.teams) {
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `
        <span class="legend-dot" style="background:${t.color}"></span>
        <div>
          <b>${t.name}</b>
          <small>${formatOdds(t.odds[t.odds.length - 1])} на 1 мар.</small>
        </div>
      `;
      legendEl.appendChild(item);
    }
  };

  const buildStaticSvg = () => {
    svg.innerHTML = "";

    const gridGroup = elSvg("g", { "data-layer": "grid" });
    const axisGroup = elSvg("g", { "data-layer": "axes" });
    const linesGroup = elSvg("g", { "data-layer": "lines" });
    const logosGroup = elSvg("g", { "data-layer": "logos" });
    const cursorGroup = elSvg("g", { "data-layer": "cursor" });

    const defs = elSvg("defs", {});
    svg.appendChild(defs);

    const ticks = buildTicks();
    const yTickEls = [];

    // Горизонтальные сетки + подписи слева
    for (const v of ticks) {
      const y = mapY(v);
      const line = elSvg("line", {
        x1: margin.left,
        y1: y,
        x2: margin.left + chartW,
        y2: y,
        stroke: paletteGrid,
        "stroke-width": "1"
      });
      gridGroup.appendChild(line);

      const label = elSvg("text", {
        x: margin.left - 12,
        y: y + 4,
        "text-anchor": "end",
        "font-size": "12",
        fill: "rgba(15, 23, 42, 0.68)"
      });
      label.textContent = state.logScale ? formatOdds(v) : formatOdds(v);
      axisGroup.appendChild(label);
      yTickEls.push({ v, y });
    }

    // Оси
    axisGroup.appendChild(
      elSvg("line", {
        x1: margin.left,
        y1: margin.top,
        x2: margin.left,
        y2: margin.top + chartH,
        stroke: "rgba(15, 23, 42, 0.20)",
        "stroke-width": "1.2"
      })
    );
    axisGroup.appendChild(
      elSvg("line", {
        x1: margin.left,
        y1: margin.top + chartH,
        x2: margin.left + chartW,
        y2: margin.top + chartH,
        stroke: "rgba(15, 23, 42, 0.20)",
        "stroke-width": "1.2"
      })
    );

    // Вертикальные риски по датам + подписи
    data.dates.forEach((d, i) => {
      const x = margin.left + (i / (data.dates.length - 1)) * chartW;
      axisGroup.appendChild(
        elSvg("line", {
          x1: x,
          y1: margin.top + chartH,
          x2: x,
          y2: margin.top + chartH + 7,
          stroke: "rgba(15, 23, 42, 0.25)",
          "stroke-width": "1"
        })
      );
      const label = elSvg("text", {
        x,
        y: margin.top + chartH + 34,
        "text-anchor": "middle",
        "font-size": "12",
        fill: "rgba(15, 23, 42, 0.68)"
      });
      label.textContent = d;
      axisGroup.appendChild(label);
    });

    // Линии и маркеры: точки по датам фиксированные по x, y зависит от масштаба
    const teamElems = {};
    const timePointsByTeam = {};

    for (const team of data.teams) {
      const points = data.dates.map((_, i) => {
        const x = margin.left + (i / (data.dates.length - 1)) * chartW;
        const y = mapY(team.odds[i]);
        return { x, y };
      });
      timePointsByTeam[team.id] = points;

      // Тонкая "обводка-свечение"
      const shadowPath = elSvg("path", {
        d: pointsToPathD(points),
        stroke: paletteLineGlow,
        "stroke-width": "5",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: "0.55"
      });
      linesGroup.appendChild(shadowPath);

      const linePath = elSvg("path", {
        d: pointsToPathD(points),
        stroke: team.color,
        "stroke-width": "3",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: "0.96"
      });
      linesGroup.appendChild(linePath);

      // ClipPath, чтобы логотипы были круглыми
      const clipId = `clip-${team.id}`;
      const clipPath = elSvg("clipPath", { id: clipId, clipPathUnits: "objectBoundingBox" });
      clipPath.appendChild(elSvg("circle", { cx: "0.5", cy: "0.5", r: "0.5" }));
      defs.appendChild(clipPath);

      // Логотип по текущему времени
      const imageSize = 32;
      const logo = elSvg("image", {
        href: team.logo,
        x: points[0].x - imageSize / 2,
        y: points[0].y - imageSize / 2,
        width: imageSize,
        height: imageSize,
        "clip-path": `url(#${clipId})`,
        style: "filter: drop-shadow(0 10px 18px rgba(0,0,0,.20));"
      });
      logosGroup.appendChild(logo);

      const dot = elSvg("circle", {
        cx: points[0].x,
        cy: points[0].y,
        r: "5.3",
        fill: team.color,
        stroke: "rgba(255,255,255,0.95)",
        "stroke-width": "2",
        opacity: "0.95"
      });
      logosGroup.appendChild(dot);

      teamElems[team.id] = { team, logo, dot, points };
    }

    // Вертикальная курсор-линия
    const cursorLine = elSvg("line", {
      x1: margin.left,
      y1: margin.top,
      x2: margin.left,
      y2: margin.top + chartH,
      stroke: "rgba(37, 99, 235, 0.35)",
      "stroke-width": "1.5",
      "stroke-dasharray": "6 6"
    });
    cursorGroup.appendChild(cursorLine);
    const cursorGlow = elSvg("circle", {
      cx: margin.left,
      cy: margin.top + chartH,
      r: "10",
      fill: "rgba(37, 99, 235, 0.12)"
    });
    cursorGlow.style.opacity = "0";
    cursorGroup.appendChild(cursorGlow);

    svg.appendChild(gridGroup);
    svg.appendChild(linesGroup);
    svg.appendChild(logosGroup);
    svg.appendChild(axisGroup);
    svg.appendChild(cursorGroup);

    return { teamElems, cursorLine, timePointsByTeam, yTickEls };
  };

  const pointsToPathD = (points) => {
    if (!points.length) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  let svgState = buildStaticSvg();
  createLegend();

  const setPlayState = () => {
    playPauseBtn.textContent = state.playing ? "Пауза" : "Старт";
  };

  const updateCursorAndLogos = (progress01) => {
    state.progress = Math.max(0, Math.min(1, progress01));

    const floatIndex = state.progress * segCount; // 0..segCount
    const seg = Math.min(segCount - 1, Math.floor(floatIndex));
    const local = floatIndex - seg; // 0..1

    const x = xForIndex(seg + local);
    const yForValue = (v) => mapY(v);

    // Курсор
    svgState.cursorLine.setAttribute("x1", x);
    svgState.cursorLine.setAttribute("x2", x);

    // Текущая дата и подсказка
    const dateIndex = local >= 0.5 ? seg + 1 : seg;
    const safeDateIndex = Math.max(0, Math.min(data.dates.length - 1, dateIndex));
    currentDateChip.textContent = data.dates[safeDateIndex];

    // Координаты логотипов по каждой команде
    const imageSize = 32;
    for (const team of data.teams) {
      const pts = svgState.teamElems[team.id].points;
      const v0 = team.odds[seg];
      const v1 = team.odds[seg + 1];
      const v = v0 + (v1 - v0) * local;
      const y = yForValue(v);

      const logo = svgState.teamElems[team.id].logo;
      const dot = svgState.teamElems[team.id].dot;

      logo.setAttribute("x", x - imageSize / 2);
      logo.setAttribute("y", y - imageSize / 2);
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
    }

    // Обновим hint: покажем среднее значение в данный момент
    let sum = 0;
    let count = 0;
    for (const team of data.teams) {
      const v0 = team.odds[seg];
      const v1 = team.odds[seg + 1];
      const v = v0 + (v1 - v0) * local;
      if (Number.isFinite(v)) {
        sum += v;
        count++;
      }
    }
    const avg = count ? sum / count : 0;
    currentValueHint.textContent = `Текущее значение: ~${formatOdds(avg)}`;
  };

  const step = (ts) => {
    if (!state.playing || state.scrubbing) return;
    if (state.lastTs == null) state.lastTs = ts;

    const dt = ts - state.lastTs;
    state.lastTs = ts;
    state.startOffsetMs += dt;

    const p = (state.startOffsetMs % state.cycleMs) / state.cycleMs;
    updateCursorAndLogos(p);
    requestAnimationFrame(step);
  };

  const start = () => {
    state.lastTs = null;
    state.startOffsetMs = state.startOffsetMs || 0;
    state.playing = true;
    setPlayState();
    requestAnimationFrame(step);
  };

  const pause = () => {
    state.playing = false;
    setPlayState();
  };

  playPauseBtn.addEventListener("click", () => {
    if (state.playing) pause();
    else start();
  });

  logToggle.addEventListener("change", () => {
    state.logScale = !!logToggle.checked;
    svgState = buildStaticSvg();
    updateCursorAndLogos(state.progress);
  });

  // Scrub / drag по графику
  let wasPlayingBeforeScrub = false;
  const toProgressFromEvent = (clientX) => {
    const rect = wrap.getBoundingClientRect();
    const x = clientX - rect.left;
    // Внутри svg ширина = 100%, ориентируемся на viewBox: используем x относительно реального пикселя
    const pSvgX = Math.max(0, Math.min(1, x / rect.width));
    // Переводим в 0..1 шкалы прогресса
    return pSvgX;
  };

  const onPointerDown = (e) => {
    // Поддержим только левую кнопку/обычное касание
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();

    wasPlayingBeforeScrub = state.playing;
    pause();
    state.scrubbing = true;
    wrap.setPointerCapture(e.pointerId);

    updateCursorAndLogos(toProgressFromEvent(e.clientX));
  };

  const onPointerMove = (e) => {
    // Tooltip показываем даже без scrubbing, но логотипы двигаются только при анимации
    if (!state.scrubbing) {
      const rect = wrap.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Переводим мышь в координаты viewBox
      const xNorm = mouseX / rect.width;
      const yNorm = mouseY / rect.height;

      const xBox = xNorm * W;
      const yBox = yNorm * H;

      let best = null;
      const floatIndex = state.progress * segCount;
      const seg = Math.min(segCount - 1, Math.floor(floatIndex));
      const local = floatIndex - seg;
      const x = xForIndex(seg + local);

      for (const team of data.teams) {
        const v0 = team.odds[seg];
        const v1 = team.odds[seg + 1];
        const v = v0 + (v1 - v0) * local;
        const y = mapY(v);
        const dx = x - xBox;
        const dy = y - yBox;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (!best || dist < best.dist) best = { team, y, x, dist, v };
      }

      if (best && best.dist < 42) {
        tooltip.innerHTML = `
          <div class="t-team"><i style="background:${best.team.color}"></i> ${best.team.name}</div>
          <div class="t-row">
            <span>${currentDateChip.textContent}</span>
            <span style="color:#fff;font-weight:900">${formatOdds(best.v)}</span>
          </div>
        `;
        const left = mouseX;
        const top = mouseY;
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.classList.add("visible");
        tooltip.setAttribute("aria-hidden", "false");
      } else {
        tooltip.classList.remove("visible");
        tooltip.setAttribute("aria-hidden", "true");
      }
    } else {
      updateCursorAndLogos(toProgressFromEvent(e.clientX));
    }
  };

  const onPointerUpOrCancel = (e) => {
    if (!state.scrubbing) return;
    state.scrubbing = false;
    try {
      wrap.releasePointerCapture(e.pointerId);
    } catch (_) {}
    if (wasPlayingBeforeScrub) start();
  };

  wrap.addEventListener("pointerdown", onPointerDown);
  wrap.addEventListener("pointermove", onPointerMove);
  wrap.addEventListener("pointerup", onPointerUpOrCancel);
  wrap.addEventListener("pointercancel", onPointerUpOrCancel);

  // К первому рендеру
  updateCursorAndLogos(0);
  setPlayState();
  if (state.playing) requestAnimationFrame(step);
})();

