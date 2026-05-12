/**
 * Иконки Telegram, VK, YouTube, MAX — из виджета social-betting.
 * Instagram, Twitch, TikTok — локальные SVG-заглушки (нет URL в исходных данных).
 */
const SOCIAL_NETWORK_META = {
  telegram: {
    label: 'Telegram',
    kind: 'img',
    src: 'https://dumpster.cdn.sports.ru/5/a2/9ebed84271c8dc1b56c4d82220293.png',
  },
  vk: {
    label: 'ВКонтакте',
    kind: 'img',
    src: 'https://dumpster.cdn.sports.ru/3/67/ae989bf307ff1154fbc2e1073114f.png',
  },
  youtube: {
    label: 'YouTube',
    kind: 'img',
    src: 'https://dumpster.cdn.sports.ru/7/09/1fd0f3eb7c0794dc0a1905b715cf3.png',
  },
  max: {
    label: 'MAX',
    kind: 'img',
    src: 'https://dumpster.cdn.sports.ru/a/05/c6f242b262d05ea8f1492e1f495ec.png',
  },
  instagram: {
    label: 'Instagram',
    kind: 'svg',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A4.5 4.5 0 1112 17a4.5 4.5 0 010-9zm0 2A2.5 2.5 0 1012 14a2.5 2.5 0 000-5zm5.25-3.25a1 1 0 110 2 1 1 0 010-2z"/></svg>',
  },
  twitch: {
    label: 'Twitch',
    kind: 'svg',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 2l-2 4v14h5v3l3-3h3l6-6V2H4zm15 1v10l-4 4h-3l-3 3v-3H6V3h13zM14 6h2v5h-2V6zm-4 0h2v5h-2V6z"/></svg>',
  },
  tiktok: {
    label: 'TikTok',
    kind: 'svg',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M16.6 5.8c1 .7 2.2 1.1 3.4 1.1V9.3a6.4 6.4 0 01-3.4-.9v7.4a5.2 5.2 0 11-5.2-5.2c.1 0 .2 0 .3.01V12a2.7 2.7 0 102.7 2.7V2h3.2z"/></svg>',
  },
};
