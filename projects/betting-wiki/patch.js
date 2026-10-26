(function () {
  function categoryHref(slug) {
    const inPages = /\/pages\//.test(window.location.pathname);
    const prefix = inPages ? './' : './pages/';
    return `${prefix}${slug}.html`;
  }

  function getSlugByTitle(title) {
    if (typeof WIKI_CATEGORIES === 'undefined') return null;
    const cat = WIKI_CATEGORIES.find((c) => c.title === title);
    return cat ? cat.slug : null;
  }

  function initSliders() {
    document.querySelectorAll('.cards-with-slider, .bookmaker-bonus-block__slider-wrapper').forEach((wrapper) => {
      const track = wrapper.querySelector('.glider') || wrapper.querySelector('.bookmaker-bonus-block__slider');
      const prev = wrapper.querySelector('[class*="slider-button--prev"]');
      const next = wrapper.querySelector('[class*="slider-button--next"]');
      if (!track || !prev || !next) return;

      const step = 304;

      function update() {
        const atStart = track.scrollLeft <= 2;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        prev.classList.toggle('disabled', atStart);
        prev.setAttribute('aria-disabled', atStart ? 'true' : 'false');
        next.classList.toggle('disabled', atEnd);
        next.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
      }

      prev.addEventListener('click', () => {
        if (track.scrollTo) track.scrollTo({ left: track.scrollLeft - step, behavior: 'smooth' });
        else track.scrollLeft -= step;
      });

      next.addEventListener('click', () => {
        if (track.scrollTo) track.scrollTo({ left: track.scrollLeft + step, behavior: 'smooth' });
        else track.scrollLeft += step;
      });

      track.addEventListener('scroll', update);
      update();
    });
  }

  function scrollTabIntoView(tab) {
    const list = tab.closest('.tabs__list');
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const tabLeft = tab.offsetLeft;
    const tabRight = tabLeft + tab.offsetWidth;
    const padding = 8;
    if (tabLeft < list.scrollLeft + padding) {
      list.scrollTo({ left: tabLeft - padding, behavior: 'smooth' });
    } else if (tabRight > list.scrollLeft + list.clientWidth - padding) {
      list.scrollTo({ left: tabRight - list.clientWidth + padding, behavior: 'smooth' });
    }
  }

  function initTabs() {
    document.querySelectorAll('.columns:not(.category-page) .tabs__item[role="tab"]').forEach((tab) => {
      const text = tab.querySelector('.tabs__item-text')?.textContent?.trim().replace(/\s+/g, ' ');
      if (!text || text === 'Все' || text.startsWith('Еще')) return;

      const slug = getSlugByTitle(text);
      if (slug) {
        tab.addEventListener('click', () => {
          window.location.href = categoryHref(slug);
        });
      }
    });

    initMoreTabs();
  }

  function initMoreTabs() {
    const moreBtn = document.querySelector('.columns:not(.category-page) .tabs__item--last');
    if (!moreBtn || typeof WIKI_CATEGORIES_MORE === 'undefined' || !WIKI_CATEGORIES_MORE.length) return;
    if (moreBtn.dataset.wikiMoreInit) return;
    moreBtn.dataset.wikiMoreInit = '1';

    const tabsRoot = moreBtn.closest('.tabs');
    if (!tabsRoot) return;

    moreBtn.setAttribute('role', 'button');
    moreBtn.setAttribute('tabindex', '0');
    moreBtn.setAttribute('aria-haspopup', 'true');
    moreBtn.setAttribute('aria-expanded', 'false');

    const dropdown = document.createElement('div');
    dropdown.className = 'wiki-tabs-more-dropdown';
    dropdown.setAttribute('data-v-acc1c27c', '');

    const list = document.createElement('ul');
    list.className = 'wiki-tabs-more-dropdown__list';

    WIKI_CATEGORIES_MORE.forEach((cat) => {
      const item = document.createElement('li');
      item.className = 'wiki-tabs-more-dropdown__item';
      item.textContent = cat.title;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = categoryHref(cat.slug);
      });
      list.appendChild(item);
    });

    dropdown.appendChild(list);
    tabsRoot.appendChild(dropdown);

    function setOpen(isOpen) {
      moreBtn.classList.toggle('tabs__item--focus', isOpen);
      dropdown.classList.toggle('wiki-tabs-more-dropdown--open', isOpen);
      tabsRoot.classList.toggle('wiki-tabs--more-open', isOpen);
      moreBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function toggleOpen() {
      setOpen(!moreBtn.classList.contains('tabs__item--focus'));
    }

    moreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleOpen();
    });

    moreBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleOpen();
      }
      if (e.key === 'Escape') setOpen(false);
    });

    dropdown.addEventListener('click', (e) => e.stopPropagation());

    document.addEventListener('click', () => setOpen(false));
    window.addEventListener('resize', () => setOpen(false));
  }

  function initCategorySectionTabs() {
    const categoryPage = document.querySelector('.columns.category-page');
    if (!categoryPage) return;

    const tabs = categoryPage.querySelectorAll('.wiki-section-tab');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const sectionId = tab.getAttribute('data-section');
        categoryPage.querySelectorAll('.wiki-section-tab').forEach((t) => {
          t.classList.remove('tabs__item--active');
        });
        tab.classList.add('tabs__item--active');
        scrollTabIntoView(tab);

        if (sectionId === 'all') {
          const top = categoryPage.querySelector('.navigation-betting');
          if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initSectionLinks() {
    document.querySelectorAll('.seo-links a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initShowMore() {
    document.querySelectorAll('.cards-by-rows__action-button--more').forEach((btn) => {
      const block = btn.closest('.cards-by-rows');
      if (!block) return;

      btn.addEventListener('click', () => {
        if (!block.classList.contains('cards-by-rows--initial-page-visible')) {
          block.classList.add('cards-by-rows--initial-page-visible');
          return;
        }
        block.classList.add('cards-by-rows--show-hidden');
        btn.style.display = 'none';
      });
    });
  }

  function fixCategoryLinks() {
    document.querySelectorAll('a.all-articles-button').forEach((a) => {
      a.removeAttribute('target');
    });
  }

  function boot() {
    initSliders();
    initTabs();
    initCategorySectionTabs();
    initSectionLinks();
    initShowMore();
    fixCategoryLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
