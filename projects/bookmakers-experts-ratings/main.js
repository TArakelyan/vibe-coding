(function () {
  'use strict';

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function splitFullName(fullName) {
    const parts = String(fullName).trim().split(/\s+/);
    if (parts.length <= 1) {
      return { line1: parts[0] || '', line2: '' };
    }
    const last = parts.pop();
    return { line1: parts.join(' '), line2: last };
  }

  function companyLogoHtml(logoUrl) {
    if (!logoUrl) {
      return '<span class="cell cell--company-logo" aria-hidden="true"></span>';
    }
    return (
      '<span class="cell cell--company-logo">' +
      '<span class="company-logo-wrap">' +
      '<img class="company-logo" src="' +
      escapeHtml(logoUrl) +
      '" alt="" loading="lazy" />' +
      '</span></span>'
    );
  }

  function render() {
    const container = document.getElementById('rowsContainer');

    if (typeof EXPERTS === 'undefined' || !EXPERTS.length) {
      container.innerHTML = '<div class="empty-state">Не загружены данные.</div>';
      return;
    }

    container.innerHTML = EXPERTS.map(function (row) {
      const names = splitFullName(row.fullName);
      const nameLinesClass = 'name-lines' + (names.line2 ? '' : ' name-lines--single');

      return (
        '<a class="expert-row" href="' +
        escapeHtml(row.sportsUrl) +
        '" target="_blank" rel="noopener noreferrer">' +
        companyLogoHtml(row.companyLogo) +
        '<span class="cell cell--person">' +
        '<img class="expert-photo" src="' +
        escapeHtml(row.photoUrl) +
        '" alt="" width="44" height="44" loading="lazy" />' +
        '<span class="' +
        nameLinesClass +
        '">' +
        '<span class="name-line name-line--given">' +
        escapeHtml(names.line1) +
        '</span>' +
        (names.line2
          ? '<span class="name-line name-line--family">' + escapeHtml(names.line2) + '</span>'
          : '') +
        '</span></span>' +
        '<span class="cell cell--description">' +
        escapeHtml(row.description) +
        '</span>' +
        '</a>'
      );
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', render);
})();
