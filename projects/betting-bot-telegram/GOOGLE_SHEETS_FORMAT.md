# Пример структуры Google Sheets таблицы

## Формат таблицы

Ниже представлен пример структуры данных для Google Sheets. Скопируйте заголовки и заполните данными.

## Заголовки колонок (первая строка)

```
bonus_id | title | end_date | post_url | image_url | category | bookmaker | amount | is_active
```

## Примеры данных

### Пример 1: Стандартный бонус
```
bonus_id: fonbet_001
title: Фрибет 1000₽ на первую ставку
end_date: 2026-03-15
post_url: https://www.sports.ru/betting/bonuses/fonbet-1000/
image_url: https://dumpster.cdn.sports.ru/images/fonbet-promo.jpg
category: promo
bookmaker: Fonbet
amount: 1000₽
is_active: TRUE
```

### Пример 2: Бонус для еврокубков
```
bonus_id: winline_euro_001
title: Повышенный коэф на Лигу Чемпионов
end_date: 2026-04-20
post_url: https://www.sports.ru/betting/bonuses/winline-ucl/
image_url: https://dumpster.cdn.sports.ru/images/winline-ucl.jpg
category: eurocups
bookmaker: Winline
amount: до 10000₽
is_active: TRUE
```

### Пример 3: Эксклюзивный промокод
```
bonus_id: betcity_exclusive_001
title: Эксклюзивный промокод SPORTS500
end_date: 2026-03-31
post_url: https://www.sports.ru/betting/bonuses/betcity-exclusive/
image_url: https://dumpster.cdn.sports.ru/images/betcity-exclusive.jpg
category: exclusive
bookmaker: Betcity
amount: 500₽
is_active: TRUE
```

### Пример 4: Новый оффер
```
bonus_id: olimp_new_001
title: Кешбэк 15% каждую неделю
end_date: 2026-12-31
post_url: https://www.sports.ru/betting/bonuses/olimp-cashback/
image_url: https://dumpster.cdn.sports.ru/images/olimp-cashback.jpg
category: new
bookmaker: OlimpBet
amount: до 5000₽
is_active: TRUE
```

### Пример 5: Неактивный бонус
```
bonus_id: pari_old_001
title: Устаревший бонус (не публикуется)
end_date: 2026-01-15
post_url: https://www.sports.ru/betting/bonuses/pari-old/
image_url: https://dumpster.cdn.sports.ru/images/pari-old.jpg
category: promo
bookmaker: PARI
amount: 3000₽
is_active: FALSE
```

## Описание полей

### Обязательные поля

| Поле | Тип | Описание | Пример |
|------|-----|----------|--------|
| `bonus_id` | Текст | Уникальный идентификатор (без пробелов) | `fonbet_001` |
| `title` | Текст | Название бонуса для поста | `Фрибет 1000₽ на первую ставку` |
| `post_url` | URL | Ссылка на страницу с описанием | `https://www.sports.ru/...` |

### Опциональные поля

| Поле | Тип | Описание | Пример | По умолчанию |
|------|-----|----------|--------|--------------|
| `end_date` | Дата | Дата окончания акции | `2026-03-15` | Нет даты |
| `image_url` | URL | Ссылка на картинку (Dumpster) | `https://dumpster...` | Нет картинки |
| `category` | Текст | Категория бонуса | `eurocups` | `promo` |
| `bookmaker` | Текст | Название букмекера | `Fonbet` | Пусто |
| `amount` | Текст | Сумма бонуса | `1000₽` | Пусто |
| `is_active` | TRUE/FALSE | Активность бонуса | `TRUE` | `TRUE` |

## Категории (category)

- `eurocups` - Бонусы под еврокубки (публикуются Сб/Вс)
- `promo` - Обычные промо-акции
- `exclusive` - Эксклюзивные промокоды от Спортс.ru
- `new` - Новые офферы (публикуются моментально)
- `bundle` - Для подборок

## Формат даты

Используйте один из форматов:
- `2026-03-15` (рекомендуется)
- `15.03.2026`
- `15/03/2026`

## Правила is_active

- `TRUE` - бонус будет использоваться ботом
- `FALSE` - бонус игнорируется при публикации
- Используйте `FALSE` для:
  - Устаревших бонусов
  - Временно неактуальных предложений
  - Тестовых записей

## Советы по заполнению

### ✅ Хорошие примеры

**bonus_id:**
```
✅ fonbet_freebet_1000
✅ winline_ucl_2026
✅ betcity_cashback_15
```

**title:**
```
✅ Фрибет 1000₽ на первую ставку
✅ Повышенный коэффициент на матчи ЛЧ
✅ Кешбэк 15% каждую неделю
```

### ❌ Плохие примеры

**bonus_id:**
```
❌ Fonbet Freebet 1000 (пробелы)
❌ бонус#1 (кириллица и спецсимволы)
❌ 001 (только цифры, не уникально)
```

**title:**
```
❌ Бонус (слишком короткое)
❌ ПОЛУЧИ ФРИБЕТ!!! (капс и лишние знаки)
❌ Очень длинное название которое не поместится в пост и будет выглядеть некрасиво
```

## Массовое заполнение

Для быстрого добавления бонусов:

1. Скопируйте строку примера
2. Измените `bonus_id` (обязательно уникальный!)
3. Заполните `title` и `post_url`
4. Остальные поля опциональны
5. Убедитесь, что `is_active = TRUE`

## Шаблон для копирования

```csv
bonus_id,title,end_date,post_url,image_url,category,bookmaker,amount,is_active
fonbet_001,"Фрибет 1000₽",2026-03-15,https://sports.ru/...,https://dumpster.../fonbet.jpg,promo,Fonbet,1000₽,TRUE
winline_002,"Бонус на депозит",2026-04-01,https://sports.ru/...,https://dumpster.../winline.jpg,promo,Winline,5000₽,TRUE
```

## Проверка данных

После заполнения таблицы проверьте:

1. ✅ Все `bonus_id` уникальны
2. ✅ Все обязательные поля заполнены
3. ✅ Ссылки корректные (начинаются с https://)
4. ✅ Даты в правильном формате
5. ✅ `is_active` = TRUE для активных бонусов

## Синхронизация с ботом

После добавления/изменения данных:

```
1. Сохраните таблицу
2. В боте выполните: /sync_sheets
3. Проверьте: /new_offers
4. Публикуйте: /publish_single bonus_id
```
