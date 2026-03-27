# Kalshi Odds Trajectory

## Описание
Анимированный виджет с графиком коэффициентов по датам: логотипы команд перемещаются слева направо и по вертикали отражают значение коэффициента. Внизу — названия месяцев, слева — ось коэффициентов (меньше сверху, больше снизу).

## Возможности
- Шрифты Plus Jakarta Sans и DM Sans, крупные подписи осей без растягивания (`preserveAspectRatio: meet`).
- График на всю ширину контейнера, полотно viewBox 1100×520.
- Светлый классический стиль без затемнений и градиентов.
- Данные команд и коэффициенты — в локальном `data/odds-data.js`.
- Пошаговая анимация по месяцам с паузой и значениями в формате `9.00`.

## Сборка и деплой

### Полный проект (Netlify, GitHub Pages с папкой)
В `index.html` подключаются:
- локальные данные: `./data/odds-data.js`
- CDN стили: `https://dumpster.cdn.sports.ru/d/67/346a912e7926dfeaaf94d3769efbd.css`
- CDN логика графика: `https://dumpster.cdn.sports.ru/4/ca/13ccb74e67c91208104b8164d7525.js`
- CDN resize: `https://dumpster.cdn.sports.ru/0/ef/91b6261db6ea380b01813176e4f0b.js`

### Один только HTML на dumpster (важно)
Если залить на [dumpster](https://dumpster.cdn.sports.ru) **только** `index.html`, относительные пути вроде `./data/odds-data.js` превращаются в несуществующие URL (рядом с файлом нет папки `data/`), поэтому **ничего не отображается**.

Используйте **`dumpster-standalone.html`**: в нём данные **встроены** в страницу, стили и скрипты подключены **абсолютными** URL на CDN:
- `https://dumpster.cdn.sports.ru/d/67/346a912e7926dfeaaf94d3769efbd.css`
- `https://dumpster.cdn.sports.ru/4/ca/13ccb74e67c91208104b8164d7525.js`
- `https://dumpster.cdn.sports.ru/0/ef/91b6261db6ea380b01813176e4f0b.js`
- при необходимости код в посте: `https://dumpster.cdn.sports.ru/8/ac/d3bed6c4f0230c22fba0be8162929.md`

После правок в `data/odds-data.js` нужно обновить встроенный блок данных в `dumpster-standalone.html` (или снова выложить `odds-data.js` на CDN и подключить его одной абсолютной ссылкой).

Старый вариант скрипта (другая разметка): `https://dumpster.cdn.sports.ru/4/e6/119695c8af83f51c78a9f9fce0943.js`.
