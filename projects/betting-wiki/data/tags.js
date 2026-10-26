/**
 * Привязка разделов «Спортивной вики» к тегам sports.ru.
 *
 * Как устроено на стороне CMS:
 * - MAIN — корневой тег вики (один на весь проект)
 * - CATEGORY — вид спорта (Футбол, Баскетбол, …)
 * - SUBCATEGORY — тип материала (Факты, Чемпионы, События)
 *
 * Статья попадает в раздел, если редактор повесил на неё нужные теги.
 * Тип материала не важен: новость, лонгрид, материал из /betting/ — любой пост с тегом.
 * Новая статья появится в блоке автоматически после публикации, без деплоя на dumpster.
 *
 * ID тегов: node scripts/fetch-tag-ids.mjs
 */
const WIKI_TAGS = {
  mainId: '161150421',

  sports: {
    futbol: { tagId: null, title: 'Футбол' },
    basketbol: { tagId: null, title: 'Баскетбол' },
    hokkej: { tagId: null, title: 'Хоккей' },
    tennis: { tagId: null, title: 'Теннис' },
    avtosport: { tagId: null, title: 'Автоспорт' },
    'boks-mma': { tagId: null, title: 'Бокс/ММА' },
    kiber: { tagId: null, title: 'Кибер' },
    figurka: { tagId: null, title: 'Фигурка' },
    lyzhi: { tagId: null, title: 'Лыжи' },
    plavanie: { tagId: null, title: 'Плавание' },
    'legkaya-atletika': { tagId: null, title: 'Легкая атлетика' },
    gandbol: { tagId: null, title: 'Гандбол' },
    volejbol: { tagId: null, title: 'Волейбол' },
    shahmaty: { tagId: null, title: 'Шахматы' },
    darts: { tagId: null, title: 'Дартс' },
  },

  sections: {
    fakty: { tagId: null, title: 'Факты' },
    chempiony: { tagId: null, title: 'Чемпионы' },
    sobytiya: { tagId: null, title: 'События' },
  },
};

const WIKI_PREVIEW_AMOUNT = 5;
const WIKI_SECTION_AMOUNT = 16;

const WIKI_GQL = {
  endpoint: 'https://www.sports.ru/gql/graphql/',
  appName: 'frontend-betting-wiki',
  appVersion: 'v0.0.1',
};
