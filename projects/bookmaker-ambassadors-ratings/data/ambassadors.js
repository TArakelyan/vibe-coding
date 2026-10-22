/** Амбассадоры букмекеров. primaryNetwork — крупнейшая соцсеть (эвристика для UI). followers: число подписчиков; null — заполните вручную. */
const AMBASSADORS = [
  {
    "bookmakerId": "fonbet",
    "fullName": "Александр Овечкин",
    "activity": "Хоккей",
    "photoUrl": "https://dumpster.cdn.sports.ru/f/63/524166360fd284b667216a1554be2.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Игорь Акинфеев",
    "activity": "Футбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/f9/fed2614d7820497f02b829f648a53.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Андреа Пирло",
    "activity": "Футбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/0d/d96ffecaa8cfe34ec22132202edba.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Сергей Бурунов",
    "activity": "Актер",
    "photoUrl": "https://dumpster.cdn.sports.ru/d/cd/f85c8199efaa6b1b4a2f4c742633b.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Евгения Медведева",
    "activity": "Фигурное катание",
    "photoUrl": "https://dumpster.cdn.sports.ru/a/c3/a12b6f3b647973c45a23cd03be20f.png",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Сергей Пиняев",
    "activity": "Футбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/fb/b4b7f855b67c2a09dd3574e0b7a33.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "ICEGERGERT",
    "activity": "Артист",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/f2/5fcc3a37140d1ce8ba940bbd9fac0.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Юлия Ефимова",
    "activity": "Плавание",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/df/b43229c5636df0e4ce8712fc88854.png",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "L'One",
    "activity": "Певец",
    "photoUrl": "https://dumpster.cdn.sports.ru/b/1d/9480ca64f2df60eb62e825c174325.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Дмитрий Неделин",
    "activity": "Марафон",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/8a/200b71b9f4f2600d6f5d1cde66cb1.png",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "melbet",
    "fullName": "BITTUEV",
    "activity": "Артист",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/7b/a961f62a1cba6dd3d1e1a84deb6c3.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Антон Понкрашов",
    "activity": "Баскетбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/e/11/8adf0f669539812623bd0ecfcb3fd.png",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Егор Дёмин",
    "activity": "Баскетбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/6/f3/4f8e0d529c3fe265da44a788462ea.png",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Александр Дорский",
    "activity": "Журналист",
    "photoUrl": "https://dumpster.cdn.sports.ru/c/33/065adc693e42eb71fb0d750bfcae1.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Мяч Production",
    "activity": "Блогеры",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/99/30cc9354e55dc999e6cad34875add.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Роман Нагучев",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/ef/11903cd024de5f631cbe8890a3c16.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Александр Кокорин",
    "activity": "Футбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/c2/58a4c75319419024cdf4ee8b25c9a.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Иван Карпов",
    "activity": "Журналист",
    "photoUrl": "https://dumpster.cdn.sports.ru/d/30/5f10931e3a29fa9d1659b47b95b55.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Карен Адамян",
    "activity": "Журналист",
    "photoUrl": "https://dumpster.cdn.sports.ru/a/41/809beb3ab86a0c535a76a68e3e466.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Сева Терлецкий",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/65/d00aea1ca993405013c82264ecb72.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Яна Ромашкина",
    "activity": "Журналист",
    "photoUrl": "https://dumpster.cdn.sports.ru/f/c4/12ee76ca29ab7dd805fd6e5eadec3.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Алексей Попов",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/2/85/f5341d3201b9006ab43ee07bbca2d.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Ирек Ризаев",
    "activity": "BMX",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/85/30898854f9fdd87c9a7d0eb6a5e6d.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Алексей Шевченко",
    "activity": "Журналист",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/14/f8b2051ff8263b8308ff34c4139d4.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Strogo",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/42/7ab843483b5dc9ed6f1ea6cc16770.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "des0ut",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/3/61/44be1235134502d66a424ad793351.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "fonbet",
    "fullName": "Pch3lk1n",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/e/ae/3e6953b31d55601b1ed50e89ee492.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Роналдиньо",
    "activity": "Экс-футболист",
    "photoUrl": "https://dumpster.cdn.sports.ru/6/a1/7511f66461170d705b6221dbae71b.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Константин Генич",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/a/dd/a226b4ee9e2020c327d297ddccb53.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Роман Гутцайт",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/b4/9bac4b24fe0439efde15e097bacab.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Егор Шкред",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/e/60/d8d4106232e497822c2d607b9dfaf.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Денис Казанский",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/a8/3f2249311d5a1674b669c9c5cc3b3.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Нобель Арустамян",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/52/86ae789ac0a3eb308211260fa9f9b.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Баста",
    "activity": "Певец",
    "photoUrl": "https://dumpster.cdn.sports.ru/6/bf/318d1ff8e43aaded970da96971e36.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Бустер",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/b/21/a8b3db2d9365003193446772087c3.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Егор Крид",
    "activity": "Певец",
    "photoUrl": "https://dumpster.cdn.sports.ru/2/49/652a293410a30ef2e2df045a231c7.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Элджей",
    "activity": "Певец",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/2e/37f2a0567f01ef33d5cb9fa3ad7c5.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Sasavot",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/7/9d/13b1ab10c947181f8dc9e9dd57f47.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Азамат Мусагалиев",
    "activity": "Комик",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/32/1dfce388070cd90d8f054504d4f71.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Тимофей Мозгов",
    "activity": "Экс-баскетболист",
    "photoUrl": "https://dumpster.cdn.sports.ru/6/2c/c44717dfe7d07fc686456eb68184d.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Антон Шастун",
    "activity": "Комик",
    "photoUrl": "https://dumpster.cdn.sports.ru/7/80/69c10f353aa81235cb57109b32ad3.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Игорь Джабраилов",
    "activity": "Комик",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/9d/8bc248a4e9fd2698e97c989a50ea4.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "SL4M",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/8/f8/f4e67da17c5aa535471e44579c3c0.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Никита Баженов",
    "activity": "Экс-футболист",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/85/a4a4176af2beabdf566fb58c2cf44.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Андрей Николишин",
    "activity": "Ведущий",
    "photoUrl": "https://dumpster.cdn.sports.ru/2/14/cfcd1f74c2d4ad384452476d31aa1.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Янгер",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/eb/5a884975a04e57f106cbe0c56757c.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Александра Смирнова",
    "activity": "Интервьюер",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/04/197c45b66f766438eac72b5bb80b9.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Дина Саева",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/6/b1/f6480b7488e09e97f1606d7448c68.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Алексей Хрущев",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/25/63189dd6ac838d2f461314c07726b.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Константин Андреев",
    "activity": "BMX",
    "photoUrl": "https://dumpster.cdn.sports.ru/d/38/a0540fc8865039256765aaa445ead.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Арсений Любишкин",
    "activity": "BMX",
    "photoUrl": "https://dumpster.cdn.sports.ru/f/2b/81df6263eea82a1c2c5aea0ce2738.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Ярослав Ленчевский",
    "activity": "Сноуборд",
    "photoUrl": "https://dumpster.cdn.sports.ru/a/62/545f19192e2a076d8735260457576.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Владислав Хадарин",
    "activity": "Сноуборд",
    "photoUrl": "https://dumpster.cdn.sports.ru/e/73/bb3119b5d4124213c5727f46f58ed.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Максим Сенкевич",
    "activity": "Фристайл",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/22/63a3124dfb12a8fa3b4675355e260.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Валерий Карпин",
    "activity": "Тренер",
    "photoUrl": "https://dumpster.cdn.sports.ru/8/91/e12a47af833251a548f5851b6587e.webp",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Федор Смолов",
    "activity": "Футболист",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/76/18d3ca7f43d96dc45232589cf1dea.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Павел Погребняк",
    "activity": "Экс-футболист",
    "photoUrl": "https://dumpster.cdn.sports.ru/b/63/efe012f0e47069d6aeaa268493767.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Nix",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/ad/c3046ee23212a235e4be907e7e6b8.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Shadowkek",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/e/ec/827d1d8e01cee70ca382286d139c3.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Exile",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/7/eb/753b32f2b485eeb6117b114a50ede.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Paradeevich",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/c/78/ba445b6b7d245734051883a088599.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Райзен",
    "activity": "Медиафутбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/f/ff/d547b806dfd65f4ec59c8e43a3dcc.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Дмитрий Егоров",
    "activity": "Медиафутбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/c7/51eff9da1c97ef26a6f2bd7910887.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Никита Ковальчук",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/6/67/0d73731826ebd0f4d62d6558a2984.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Эрик Шоков",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/2/a4/c38adcf47545b2fd89c7268d35306.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Solo",
    "activity": "Киберспорт",
    "photoUrl": "https://dumpster.cdn.sports.ru/8/51/7e3f140901cb4a6f6a3c5320a01d2.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Travoman",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/2/b2/67d1a7763c654f3030ef61141426a.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Zoner",
    "activity": "Киберспорт",
    "photoUrl": "https://dumpster.cdn.sports.ru/3/af/ea997eca3fb4fc0ef2651cfd4f282.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Adekvat",
    "activity": "Киберспорт",
    "photoUrl": "https://dumpster.cdn.sports.ru/4/4e/425a29a73c479e9ecde80df256426.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "RachelR",
    "activity": "Киберспорт",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/c4/d7194bb0895006e0ac2acf9e1bdf5.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Hooch",
    "activity": "Киберспорт",
    "photoUrl": "https://dumpster.cdn.sports.ru/a/9d/eadffaa976243c6a15c5807522f49.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Aunkere",
    "activity": "Киберспорт",
    "photoUrl": "https://dumpster.cdn.sports.ru/6/5e/b145d710d4806d5517ac5db115da4.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Илья Сатир",
    "activity": "Комик",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/4b/2d409b4a049063214ca7152007074.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Кореш",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/4/db/4faf3d48fae7c31381a462d1245db.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Андрей Кокошка",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/e1/2943b0a7ca585cf7224551617d58c.webp",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Дмитрий Коваль",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/b6/7219170227ca1e4e815620b606412.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "betboom",
    "fullName": "Влад Раговский",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/fe/2360d9256861c6b4ddc650574466c.webp",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "olimpbet",
    "fullName": "Павел Занозин",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/38/9584e9fea9eac5097b168ac52a73a.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "olimpbet",
    "fullName": "Света Думич",
    "activity": "Медиафутбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/4/99/8b71ad48dcd7da4ef4f6796ccf7fe.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "olimpbet",
    "fullName": "Маргарита Юргенсон",
    "activity": "Журналист",
    "photoUrl": "https://dumpster.cdn.sports.ru/b/09/7ad4e1d6ca1c5e3cbd0974cd08165.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "pari",
    "fullName": "Luxury Girl",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/2/12/bd224ec53ee8f336642568a0508bd.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betcity",
    "fullName": "Вадим Лукомский",
    "activity": "Журналист",
    "photoUrl": "https://dumpster.cdn.sports.ru/d/59/a0a3aa4be7a94f04e2a022209bf9a.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "betcity",
    "fullName": "Александр Неценко",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/3c/9d57c4abf879b81c978fc1c971820.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "betcity",
    "fullName": "Сергей Игнашевич",
    "activity": "Футбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/9/27/769580dd70247ac5239a94b0e4b41.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "betcity",
    "fullName": "Эльхан Салахов",
    "activity": "Медиафутбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/4/b5/873f018235bd277162616c1654e58.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "liga-stavok",
    "fullName": "Артем Дзюба",
    "activity": "Футбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/8/64/3a1d42295ca1576ad0c72cb259dd7.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "liga-stavok",
    "fullName": "Кирилл Капризов",
    "activity": "Хоккей",
    "photoUrl": "https://dumpster.cdn.sports.ru/a/74/4bade78e837f2b7056589a2c0e78e.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Влад Голдин",
    "activity": "Баскетбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/8/f5/fe63a72cbc9d18b350822133b2507.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "winline",
    "fullName": "Эдгар Давидс",
    "activity": "Футбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/3/c7/135925079d87d72c009f189374fb0.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "liga-stavok",
    "fullName": "Илья Ковальчук",
    "activity": "Хоккей",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/f4/82a4cf3dcab597f3c92f3db0be734.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "liga-stavok",
    "fullName": "Виктор Гусев",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/7/6a/4acea6e2c0a14605f1c07e76e9315.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "liga-stavok",
    "fullName": "Евгений Ловчев",
    "activity": "Эксперт",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/dc/145fb3b9e07a96a509d8c99ce4c11.png",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "liga-stavok",
    "fullName": "Евгений Евневич",
    "activity": "Комментатор",
    "photoUrl": "https://dumpster.cdn.sports.ru/2/c1/eb18059f3afceac7f56f81f95090b.png",
    "primaryNetwork": "youtube",
    "followers": null
  },
  {
    "bookmakerId": "liga-stavok",
    "fullName": "Анастасия Кобылянских",
    "activity": "Легкая атлетика",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/71/eb6f301b34da1e108e7bd35e20c9e.png",
    "primaryNetwork": "vk",
    "followers": null
  },
  {
    "bookmakerId": "leon",
    "fullName": "Виктор Логинов",
    "activity": "Актер",
    "photoUrl": "https://dumpster.cdn.sports.ru/4/83/af1e4faa7a0c9e7750bbcdde1e0bb.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "leon",
    "fullName": "Дарья Исаева",
    "activity": "Журналистка",
    "photoUrl": "https://dumpster.cdn.sports.ru/1/0a/3770f5f1ed3960c7a3df3ac3a866d.png",
    "primaryNetwork": "telegram",
    "followers": null
  },
  {
    "bookmakerId": "melbet",
    "fullName": "Мурат Гассиев",
    "activity": "Бокс",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/6e/6c4d6952dd9c347d58773e8a568ad.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "melbet",
    "fullName": "Габар",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/b/45/9956cb1cf7b22b57a893d94745f2e.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "melbet",
    "fullName": "Андрей Прокофьев",
    "activity": "Блогер",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/59/52f63d1479527e847050ee9c747aa.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "melbet",
    "fullName": "Анатолий Катрич",
    "activity": "Медиафутбол",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/b3/4b8751600a9bcc1247deb4f908946.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "bet-m",
    "fullName": "FARDI",
    "activity": "Рэпер",
    "photoUrl": "https://dumpster.cdn.sports.ru/c/54/b06debc525c0bbbc59fc56f7d4f0d.png",
    "primaryNetwork": "instagram",
    "followers": null
  },
  {
    "bookmakerId": "bet-m",
    "fullName": "Sayfergoat",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/7/4f/0e5422decd72682c044b65d98f558.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "bet-m",
    "fullName": "Tadzheek",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/0/d5/1dc24a428548590ebb16482dd3a7c.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "bet-m",
    "fullName": "Adm1tripov",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/b/8b/2587aced674b893f13dd5461cce00.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "bet-m",
    "fullName": "Yueechka",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/e/02/f75ce3ac3f4eccf4c90934d018506.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "bet-m",
    "fullName": "Uraniumrr",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/5/c2/589fe737e9bc1cb63d6ddf491f443.png",
    "primaryNetwork": "twitch",
    "followers": null
  },
  {
    "bookmakerId": "bet-m",
    "fullName": "NSTV",
    "activity": "Стример",
    "photoUrl": "https://dumpster.cdn.sports.ru/8/7d/f94006fd12cd26ccf514f5dd65136.png",
    "primaryNetwork": "twitch",
    "followers": null
  }
];
