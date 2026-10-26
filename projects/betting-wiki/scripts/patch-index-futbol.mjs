import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const indexPath = path.join(projectRoot, 'index.html');
const wikiBodyPath = path.join(projectRoot, 'wiki-body.html');
const futbolPath = path.join(projectRoot, 'pages/futbol.html');

const GQL = 'https://www.sports.ru/gql/graphql/';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-appname': 'frontend-betting-wiki',
  'x-appversion': 'v0.0.1',
};

const SLIDE_CLASSES = [
  'glider-slide active left-1 visible',
  'glider-slide center visible',
  'glider-slide right-1 visible',
  'glider-slide right-2',
  'glider-slide right-3',
  'glider-slide',
  'glider-slide',
  'glider-slide',
];

function getPreviewIds() {
  const futbolHtml = fs.readFileSync(futbolPath, 'utf8');
  const faktyEnd = futbolHtml.indexOf('id="chempiony"');
  const chempEnd = futbolHtml.indexOf('id="sobytiya"');
  const curated = futbolHtml.slice(0, chempEnd);
  const ids = [...curated.matchAll(/football\/blogs\/(\d+)\.html/g)].map((m) => m[1]);
  return [...new Set(ids)];
}

async function fetchPost(id) {
  const query = `query Post($id: ID!) {
    postQueries {
      byID(ID: $id) {
        id title commentsCount hot
        published { date rfc3339 }
        rating { total }
        topPicture(input: { resize: WIDTH_640 }) { url }
        pageInfo { desktopURL }
      }
    }
  }`;
  const res = await fetch(GQL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query, variables: { id } }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data?.postQueries?.byID;
}

function formatRating(total) {
  if (total > 0) return `+${total}`;
  if (total < 0) return String(total);
  return '0';
}

function formatDate(published) {
  if (!published) return '';
  if (published.date && /^\d{2}\.\d{2}\.\d{4}$/.test(published.date)) return published.date;
  const iso = published.rfc3339 || published.date;
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return published.date || '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function renderSlide(post, index) {
  const rating = formatRating(post.rating?.total || 0);
  const ratingClass = post.rating?.total > 0 ? 'article-card__rating--positive' : '';
  const img = post.topPicture?.url || '';
  const url = post.pageInfo?.desktopURL || '#';
  const date = formatDate(post.published);
  const slideClass = SLIDE_CLASSES[index] || 'glider-slide';

  return `<a data-v-9aee77ba="" data-v-6017b323="" href="${url}" class="article-card ${slideClass}" id="${post.id}" data-gslide="${index}" style="height: auto; width: 288px;">` +
    `<div data-v-9aee77ba="" class="article-card__image-wrapper">` +
    (img ? `<img data-v-9aee77ba="" class="article-card__image" loading="lazy" src="${img}">` : '') +
    `</div><div data-v-9aee77ba="" class="article-card__content">` +
    `<div data-v-9aee77ba="" class="article-card__title">${post.title}</div>` +
    `<div data-v-9aee77ba="" class="article-card__bottom">` +
    `<div data-v-9aee77ba="" class="article-card__statistics">` +
    `<span data-v-9aee77ba="" class="article-card__rating ${ratingClass}">${rating}</span>` +
    `<span data-v-9aee77ba="" class="article-card__comments">` +
    `<svg data-v-9aee77ba="" viewBox="0 0 16 16" class="article-card__comments-icon">` +
    `<path fill-rule="evenodd" clip-rule="evenodd" d="M6.34032 1C6.34032 1 6.50553 2.90377 4.90852 4.80753C3.47672 6.54812 1.93478 7.90795 2.70575 10.682C3.47672 13.4561 5.89977 13.9456 5.89977 13.9456C5.89977 13.9456 5.23894 11.4435 7.22143 9.48536C7.22143 9.48536 7.2765 13.1841 10.2502 14C10.2502 14 13.5544 12.5314 13.4993 9.37657C13.4443 6.22176 11.7371 4.58996 11.7371 4.58996C11.7371 4.58996 11.1864 6.27615 9.20392 7.20084C9.20392 7.20084 9.75461 5.841 9.20392 3.88285C8.7083 1.92469 6.34032 1 6.34032 1Z" fill="currentColor"></path>` +
    `</svg> ${post.commentsCount || 0}</span></div>` +
    `<div data-v-9aee77ba="" class="article-card__date">${date}</div>` +
    `</div></div></a>`;
}

const previewIds = getPreviewIds();
console.log('preview ids from futbol fakty+chempiony:', previewIds);

const futbolHtml = fs.readFileSync(futbolPath, 'utf8');
const totalCount = [...new Set([...futbolHtml.matchAll(/\bid="(\d{6,})"/g)].map((m) => m[1]))].length;

const posts = [];
for (const id of previewIds) {
  posts.push(await fetchPost(id));
}

const slidesHtml = posts.map(renderSlide).join('');
const trackWidth = posts.length * 288;

function patchFile(filePath, slidesHtml, trackWidth, totalCount) {
  let html = fs.readFileSync(filePath, 'utf8');

  const blockStart = html.indexOf('class="categories-block__title">Футбол');
  if (blockStart < 0) {
    console.warn('Футбол block not found in', filePath);
    return false;
  }

  const trackStart = html.indexOf('<div class="glider-track"', blockStart);
  const trackOpenEnd = html.indexOf('>', trackStart) + 1;
  const trackEnd = html.indexOf('</div></div><button', trackStart);

  const before = html.slice(0, trackOpenEnd);
  const after = html.slice(trackEnd);

  html = before + slidesHtml + after;

  html = html.replace(
    /(<div class="glider-track" style="width: )\d+(px;">)/,
    `$1${trackWidth}$2`
  );

  html = html.replace(
    /(class="categories-block__title">Футбол <span[^>]*class="categories-block__amount"[^>]*>)\d+/,
    `$1${totalCount}`
  );

  fs.writeFileSync(filePath, html);
  return true;
}

for (const file of [indexPath, wikiBodyPath]) {
  if (patchFile(file, slidesHtml, trackWidth, totalCount)) {
    console.log('patched', path.basename(file));
  }
}

const verify = fs.readFileSync(indexPath, 'utf8');
const vStart = verify.indexOf('class="categories-block__title">Футбол');
const vEnd = verify.indexOf('</div></div><button', verify.indexOf('glider-track', vStart));
const block = verify.slice(vStart, vEnd);
console.log('amount', block.match(/categories-block__amount[^>]*>(\d+)/)?.[1]);
console.log('urls', [...block.matchAll(/football\/blogs\/\d+/g)].map((m) => m[0]));
console.log('old betting urls', [...block.matchAll(/stavochnaya-wiki/g)].length);
