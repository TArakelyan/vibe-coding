(function () {
  function renderAmbassadors() {
    var grid = document.querySelector('.ambassadors-grid');
    if (!grid || typeof LEON_AMBASSADORS === 'undefined') return;
    grid.textContent = '';
    LEON_AMBASSADORS.forEach(function (amb) {
      var card = document.createElement('div');
      card.className = 'ambassador-card';
      if (amb.url) card.setAttribute('data-url', amb.url);

      var photo = document.createElement('div');
      photo.className = 'ambassador-photo';
      var img = document.createElement('img');
      img.src = amb.image;
      img.alt = amb.name;
      img.loading = 'eager';
      photo.appendChild(img);

      var info = document.createElement('div');
      info.className = 'ambassador-info';
      var h3 = document.createElement('h3');
      h3.className = 'ambassador-name';
      h3.textContent = amb.name;
      var p = document.createElement('p');
      p.className = 'ambassador-role';
      p.textContent = amb.role;
      info.appendChild(h3);
      info.appendChild(p);

      card.appendChild(photo);
      card.appendChild(info);
      grid.appendChild(card);
    });
  }

  function bindCardLinks() {
    document.querySelectorAll('.ambassador-card[data-url]').forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        var url = card.getAttribute('data-url');
        if (url) window.open('https://www.sports.ru' + url, '_blank');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAmbassadors();
    bindCardLinks();
  });
})();
