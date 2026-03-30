let selectedNetworkId = 'telegram';

document.addEventListener('DOMContentLoaded', function () {
  renderNetworkTabs();
  renderBookmakersList();
});

function renderNetworkTabs() {
  const wrap = document.getElementById('networkTabs');
  if (!wrap || typeof SOCIAL_NETWORKS === 'undefined') return;

  wrap.innerHTML = SOCIAL_NETWORKS.map(function (net) {
    const active = net.id === selectedNetworkId ? ' network-tab--active' : '';
    return (
      '<button type="button" class="network-tab' + active + '" data-network="' +
      net.id +
      '" role="tab" aria-selected="' +
      (net.id === selectedNetworkId ? 'true' : 'false') +
      '" title="' +
      escapeHtml(net.label) +
      '">' +
      '<img src="' +
      escapeHtml(net.logo) +
      '" alt="" class="network-tab__icon" width="28" height="28" loading="lazy">' +
      '<span class="visually-hidden">' +
      escapeHtml(net.label) +
      '</span>' +
      '</button>'
    );
  }).join('');

  wrap.querySelectorAll('.network-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectedNetworkId = btn.getAttribute('data-network');
      wrap.querySelectorAll('.network-tab').forEach(function (b) {
        b.classList.toggle('network-tab--active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      renderBookmakersList();
    });
  });
}

function renderBookmakersList() {
  const list = document.getElementById('bookmakersList');
  if (!list || typeof SOCIAL_BOOKMAKERS === 'undefined') return;

  const rows = SOCIAL_BOOKMAKERS.map(function (bk, index) {
    return { bk: bk, index: index, value: bk.followers[selectedNetworkId] };
  });

  rows.sort(function (a, b) {
    const av = a.value;
    const bv = b.value;
    if (av == null && bv == null) return a.index - b.index;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (bv !== av) return bv - av;
    return a.bk.name.localeCompare(b.bk.name, 'ru');
  });

  list.innerHTML = rows
    .map(function (row) {
      return createBookmakerRow(row.bk, row.value);
    })
    .join('');
}

function createBookmakerRow(bk, value) {
  const valueStr = formatFollowers(value);
  const logoHtml = bk.logo
    ? '<img src="' +
      escapeHtml(bk.logo) +
      '" alt="" class="bookmaker-row__logo" width="48" height="48" loading="lazy">'
    : '<span class="bookmaker-row__logo bookmaker-row__logo--placeholder" aria-hidden="true"></span>';

  return (
    '<li class="bookmaker-row">' +
    logoHtml +
    '<span class="bookmaker-row__name">' +
    escapeHtml(bk.name) +
    '</span>' +
    '<span class="bookmaker-row__value">' +
    valueStr +
    '</span>' +
    '</li>'
  );
}

function formatFollowers(n) {
  if (n == null || Number.isNaN(n)) return '—';
  if (typeof n !== 'number') return '—';
  var hasFraction = Math.abs(n % 1) > 1e-9;
  if (hasFraction) {
    return n.toLocaleString('ru-RU', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  }
  return n.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
