/**
 * Подгрузка статей по тегам с sports.ru (GraphQL).
 * Работает с dumpster.cdn.sports.ru — CORS разрешён.
 */
(function () {
  if (typeof WIKI_TAGS === 'undefined' || typeof WIKI_GQL === 'undefined') return;

  const GQL_QUERY = `query WikiArticles($ids: [String!]!, $amount: Int!, $page: Int!) {
    postQueries {
      byTagIDs(IDs: $ids, amount: $amount, page: $page, minRate: 0) {
        totalCount
        hasMore
        posts {
          id
          title
          commentsCount
          hot
          published { date rfc3339 }
          rating { total }
          topPicture(input: { resize: WIDTH_640 }) { url }
          pageInfo { desktopURL mobileURL relativeURL }
        }
      }
    }
  }`;

  function parseTagIds(raw) {
    if (!raw) return [];
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }

  /** Теги блока: явный список, или main + sport + section из data/tags.js */
  function buildTagIds(block, sportSlug, sectionSlug) {
    const explicit = parseTagIds(block.getAttribute('data-wiki-tag-ids'));
    if (explicit.length) return explicit;

    const ids = [];
    if (WIKI_TAGS.mainId) ids.push(WIKI_TAGS.mainId);

    const sport = sportSlug ? WIKI_TAGS.sports[sportSlug] : null;
    if (sport?.tagId) ids.push(sport.tagId);

    const section = sectionSlug ? WIKI_TAGS.sections[sectionSlug] : null;
    if (section?.tagId) ids.push(section.tagId);

    return ids.filter(Boolean);
  }

  function formatRating(total) {
    if (total > 0) return `+${total}`;
    if (total < 0) return String(total);
    return '0';
  }

  function formatDate(published) {
    if (!published) return '';
    const raw = typeof published === 'string' ? published : published.date;
    if (raw && /^\d{2}\.\d{2}\.\d{4}$/.test(raw)) return raw;
    const iso = typeof published === 'string' ? published : (published.rfc3339 || published.date);
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return raw || '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }

  function articleUrl(post) {
    return post.pageInfo?.desktopURL || post.pageInfo?.relativeURL || '#';
  }

  function renderCard(post, extraClass) {
    const rating = formatRating(post.rating?.total || 0);
    const ratingClass = post.rating?.total > 0 ? 'article-card__rating--positive' : '';
    const img = post.topPicture?.url || '';
    const url = articleUrl(post);
    const cls = ['article-card', extraClass].filter(Boolean).join(' ');

    return `<a href="${url}" class="${cls}" id="${post.id}" data-v-9aee77ba>` +
      `<div class="article-card__image-wrapper" data-v-9aee77ba>` +
      (img ? `<img class="article-card__image" loading="lazy" src="${img}" data-v-9aee77ba>` : '') +
      `</div><div class="article-card__content" data-v-9aee77ba>` +
      `<div class="article-card__title" data-v-9aee77ba>${post.title}</div>` +
      `<div class="article-card__bottom" data-v-9aee77ba>` +
      `<div class="article-card__statistics" data-v-9aee77ba>` +
      `<span class="article-card__rating ${ratingClass}" data-v-9aee77ba>${rating}</span>` +
      `<span class="article-card__comments" data-v-9aee77ba>` +
      `<svg viewBox="0 0 16 16" class="article-card__comments-icon" data-v-9aee77ba>` +
      `<path fill-rule="evenodd" clip-rule="evenodd" d="M6.34032 1C6.34032 1 6.50553 2.90377 4.90852 4.80753C3.47672 6.54812 1.93478 7.90795 2.70575 10.682C3.47672 13.4561 5.89977 13.9456 5.89977 13.9456C5.89977 13.9456 5.23894 11.4435 7.22143 9.48536C7.22143 9.48536 7.2765 13.1841 10.2502 14C10.2502 14 13.5544 12.5314 13.4993 9.37657C13.4443 6.22176 11.7371 4.58996 11.7371 4.58996C11.7371 4.58996 11.1864 6.27615 9.20392 7.20084C9.20392 7.20084 9.75461 5.841 9.20392 3.88285C8.7083 1.92469 6.34032 1 6.34032 1Z" fill="currentColor"></path>` +
      `</svg> ${post.commentsCount || 0}</span></div>` +
      `<div class="article-card__date" data-v-9aee77ba>${formatDate(post.published)}</div>` +
      `</div></div></a>`;
  }

  async function fetchArticles(ids, amount, page) {
    if (!ids.length) return null;
    const res = await fetch(WIKI_GQL.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-appname': WIKI_GQL.appName,
        'x-appversion': WIKI_GQL.appVersion,
      },
      body: JSON.stringify({
        query: GQL_QUERY,
        variables: { ids, amount, page },
      }),
    });
    const json = await res.json();
    if (json.errors) {
      console.warn('[wiki] GraphQL:', json.errors);
      return null;
    }
    return json.data?.postQueries?.byTagIDs || null;
  }

  function updateCount(block, total) {
    const amountEl = block.querySelector('.categories-block__amount');
    if (amountEl && typeof total === 'number') amountEl.textContent = String(total);
  }

  async function hydrateBlock(block) {
    const sport = block.getAttribute('data-wiki-sport');
    const section = block.getAttribute('data-wiki-section');
    const amount = Number(block.getAttribute('data-wiki-amount')) ||
      (section ? (typeof WIKI_SECTION_AMOUNT !== 'undefined' ? WIKI_SECTION_AMOUNT : 16) : (typeof WIKI_PREVIEW_AMOUNT !== 'undefined' ? WIKI_PREVIEW_AMOUNT : 5));

    const ids = buildTagIds(block, sport, section);
    if (!ids.length) return; // теги не заданы — остаётся статический HTML

    const data = await fetchArticles(ids, amount, 1);
    if (!data?.posts?.length) return;

    updateCount(block, data.totalCount);

    const slider = block.querySelector('.cards-with-slider__slider, .cards-with-slider .glider');
    const rows = block.querySelector('.cards-by-rows__cards');

    if (slider) {
      const track = slider.querySelector('.glider-track') || slider;
      track.innerHTML = data.posts.map((p, i) =>
        renderCard(p, `glider-slide${i === 0 ? ' active left-1 visible' : ''}`)
      ).join('');
      return;
    }

    if (rows) {
      rows.innerHTML = data.posts.map((p) => renderCard(p, 'cards-by-rows__card')).join('');
    }
  }

  function boot() {
    document.querySelectorAll('[data-wiki-sport], [data-wiki-section]').forEach((el) => {
      const block = el.closest('.categories-block');
      if (block && !block.dataset.wikiHydrated) {
        block.dataset.wikiHydrated = '1';
        hydrateBlock(block).catch((e) => console.warn('[wiki] hydrate error', e));
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
