(function () {
  const cfg = BONUS_CONFIG;

  const els = {
    field: null,
    slider: null,
    flow: document.getElementById('cards-flow'),
  };

  const icons = {
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="11" rx="1"/><path d="M12 10v11"/><path d="M3 14h18"/><path d="M12 10c-2-3-5-3-5-1s2 2 5 1 5-3 5-1-3 2-5 1z"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>',
  };

  const footerEmoji = {
    gift: '🎁',
    target: '📊',
  };

  function formatMoney(value) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
  }

  function calculate(deposit) {
    const amount = Math.max(0, Number(deposit) || 0);

    if (amount < cfg.minDeposit) {
      return { deposit: amount, bonus: 0, turnover: 0, capped: false, belowMin: amount > 0 };
    }

    const bonus = Math.min(amount, cfg.maxBonus);
    return {
      deposit: amount,
      bonus,
      turnover: bonus * cfg.turnoverMultiplier,
      capped: amount > cfg.maxBonus,
      belowMin: false,
    };
  }

  function amountValue(cardIndex, result) {
    if (cardIndex === 1) return formatMoney(result.bonus);
    return formatMoney(result.turnover);
  }

  function buildInputCard(card) {
    return (
      '<article class="card card--input" data-step="' + card.step + '">' +
        '<div class="card__top">' +
          '<span class="card__step">' + card.step + '</span>' +
        '</div>' +
        '<div class="card__body">' +
          '<h3 class="card__title">' + card.title + '</h3>' +
          '<div class="card__controls">' +
            '<div class="card__field-wrap">' +
              '<input class="card__field" id="deposit-input" type="number" inputmode="numeric" min="0" step="100" autocomplete="off" aria-label="Сумма депозита" />' +
              '<span class="card__currency" aria-hidden="true">₽</span>' +
            '</div>' +
            '<input class="card__slider" id="deposit-slider" type="range" aria-label="Сумма депозита" />' +
          '</div>' +
        '</div>' +
        '<div class="card__footer">' +
          '<span>' + card.footerText + '</span>' +
        '</div>' +
      '</article>'
    );
  }

  function buildResultCard(card, index) {
    const hasFooter = Boolean(card.footerText);
    const footerHtml = hasFooter
      ? '<div class="card__footer">' +
          (card.footerIcon ? '<span class="card__footer-icon">' + (footerEmoji[card.footerIcon] || '') + '</span>' : '') +
          '<span>' + card.footerText + '</span>' +
        '</div>'
      : '';

    return (
      '<article class="card" data-step="' + card.step + '">' +
        '<div class="card__top">' +
          '<span class="card__step">' + card.step + '</span>' +
        '</div>' +
        '<div class="card__body">' +
          '<div class="card__icon">' + (icons[card.footerIcon] || '') + '</div>' +
          '<p class="card__amount" data-amount data-card-index="' + index + '">' + formatMoney(0) + '</p>' +
          '<h3 class="card__title">' + card.title + '</h3>' +
        '</div>' +
        footerHtml +
      '</article>'
    );
  }

  function buildCards() {
    els.flow.innerHTML = '';

    cfg.cards.forEach(function (card, index) {
      if (index > 0) {
        const arrow = document.createElement('div');
        arrow.className = 'flow__arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        els.flow.appendChild(arrow);
      }

      const wrapper = document.createElement('div');
      wrapper.innerHTML = card.type === 'input' ? buildInputCard(card) : buildResultCard(card, index);
      els.flow.appendChild(wrapper.firstElementChild);
    });

    els.field = document.getElementById('deposit-input');
    els.slider = document.getElementById('deposit-slider');
  }

  function updateSliderProgress(value) {
    const max = cfg.sliderMax;
    const progress = Math.min(100, (value / max) * 100);
    els.slider.style.setProperty('--slider-progress', progress + '%');
  }

  function updateCards(result) {
    els.flow.querySelectorAll('[data-amount]').forEach(function (amount) {
      const index = Number(amount.dataset.cardIndex);
      amount.textContent = amountValue(index, result);

      const isZero = result.bonus === 0;
      amount.classList.toggle('is-zero', isZero);
    });
  }

  function render(deposit) {
    const clamped = Math.min(cfg.sliderMax, Math.max(0, deposit));
    const result = calculate(clamped);

    els.field.value = clamped === 0 ? '' : clamped;
    els.slider.value = clamped;
    updateSliderProgress(clamped);
    updateCards(result);
  }

  function initSlider() {
    els.slider.min = 0;
    els.slider.max = cfg.sliderMax;
    els.slider.step = cfg.sliderStep;
  }

  function bindEvents() {
    els.field.addEventListener('input', function () {
      const raw = els.field.value.replace(/\s/g, '').replace(',', '.');
      const value = raw === '' ? 0 : parseFloat(raw);
      render(Number.isFinite(value) ? value : 0);
    });

    els.slider.addEventListener('input', function () {
      render(Number(els.slider.value));
    });
  }

  buildCards();
  initSlider();
  bindEvents();
  render(cfg.defaultDeposit);
})();
