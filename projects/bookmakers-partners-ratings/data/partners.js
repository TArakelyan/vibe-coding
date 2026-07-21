/** Партнерские соглашения букмекеров — строки таблицы (букмекер, партнер, вид спорта, логотип партнера, год окончания, титульный). */
const PARTNERS = [
  {
    "bookmakerId": "fonbet",
    "partnerName": "FONBET Кубок России",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/6/c1/f98a204031669674df84dc3ffbe8c.png",
    "endYear": 2029,
    "isTitular": true
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "ЦСКА Москва",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/0a/86e7bb570ffad5312514b483c9f00.png",
    "endYear": 2031,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Рубин",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/98/e405e32c4f53eb5fb25642b20e7ab.png",
    "endYear": 2026,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "FONBET КХЛ",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/e/cb/b07173eb2edba011bf340de5bfc14.png",
    "endYear": 2028,
    "isTitular": true
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "2DROTS",
    "sport": "медиафутбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/7f/e6da38566f31bf13acc55c06bcb9e.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Локомотив",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/4d/e1c24b226d6f81c06581fca73e5ec.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Крылья Советов",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/a4/b0d6b7c241e5787ff9219809b2706.png",
    "endYear": 2026,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Ростов",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/c/2e/9db3850af9a1bf98f262fd3854ba6.png",
    "endYear": 2026,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Металлург МГ",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/c/46/fe1797ae954cc220e0765cc60d3ac.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Авангард",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/c1/9324b7611f2f47c4b2f4fe016d91b.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Салават Юлаев",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/9/be/f609ba77a948236a382424b9d1cfc.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация дзюдо России",
    "sport": "федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/54/437bea0d02d99caf7922dc90333d7.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация шахмат России",
    "sport": "федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/6/83/2938c6e9e80b16f02a9f1040162a7.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация спортивной гимнастики России",
    "sport": "федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/8b/8add2c31317497d3c9b74adb419f8.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация падела России",
    "sport": "федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/c9/fbb2a956a36e42d5fc92c12e675e3.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация спортивного программирования",
    "sport": "федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/42/32ac182b9d14c06e7570b95dd602e.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация фигурного катания",
    "sport": "федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/60/2df36ef7bb26bcffe18318b3ffce6.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация спорта лиц с поражением опорно-двигательного аппарата",
    "sport": "федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/8a/48b28b29410450734af74188f0785.png",
    "endYear": 2026,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "MOUZ",
    "sport": "киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/20/1d5ad50ff1e345216dcd98ae622a2.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "CCT",
    "sport": "киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/c0/9c235465fd49d947f7f87b5e364df.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Avulus",
    "sport": "киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/5e/9ce74bfde6a451d4d353c8d8780a1.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Ночная Хоккейная лига",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/20/8a67c91e7447cfd0b897679a39c19.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Федерация адаптивного хоккея",
    "sport": "следж-хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/ea/bfeb614341bfeadd21a418cca06eb.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Siberian Power Show",
    "sport": "Мультиспортивный фестиаль",
    "partnerLogo": "https://dumpster.cdn.sports.ru/5/ba/8912a77a71af54c95fad473bb3ff6.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Всероссийская федерация легкой атлетики (ВФЛА)",
    "sport": "Легкая атлетика",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/7c/3d1b3c77843198aa17bc39b5674dd.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "fonbet",
    "partnerName": "Гимнастическая Премьер-лига",
    "sport": "Гимнастика",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/9e/b438ac33c988b863d72e7f9d37ed3.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "РПЛ",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/0c/db47e315431906eaad2079c98a4be.png",
    "endYear": 2030,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Зенит",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/e/15/2f51b74d8d0e12a0cda10abd249f7.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Краснодар",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/40/5d64ab630a28bf94e9b264deb32b1.png",
    "endYear": 2027,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Спартак",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/9/d3/21f6e5217c48b6c1e1d0ac262b365.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Зимний Кубок РПЛ",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/6b/56f5855258d4c8be4d6e369914af2.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "winline",
    "partnerName": "ЦСКА",
    "sport": "баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/dc/f83990d7cda1ebc2a863b6131d617.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Единая Лига ВТБ",
    "sport": "баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/9d/43378cedfbd7fa013501e470bb111.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "УНИКС",
    "sport": "баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/f0/ef60e9eb55479c914304a04eb43be.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Автомобилист",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/4f/1c0a4e006f9d8455413c9af8cca03.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Ак Барс",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/99/33da1784c79c905e1c902adf12f90.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Сибирь",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/e/d7/57e989615db377661ae4609874c3b.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Трактор",
    "sport": "хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/43/dc70fb9da8e3b9f9c45278920d54c.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "МФЛ",
    "sport": "медиафутбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/2b/919bb21d10696c47ade1444bc349c.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Амкал",
    "sport": "медиафутбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/9c/daf4ad06dc9ffb1abbb8428b40967.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "СКА Ростов",
    "sport": "медиафутбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/4e/b5a44c110086c4a460af164f6fe0d.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "FC 10",
    "sport": "медиафутбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/fe/b01110c35ef88681e3128de8f58d9.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Tundra",
    "sport": "киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/08/c4b5339771d5f3fad87ff33220226.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Virtus.PRO",
    "sport": "киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/fa/b104d5d99574e31ee603d62ec43f4.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Женская Суперлига",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/79/951c8da9fc3f3e98066c668df0528.png",
    "endYear": 2028,
    "isTitular": true
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Женский Суперкубок России",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/2c/f50c1b650d41aa82ffee8f57dc18d.png",
    "endYear": 2028,
    "isTitular": true
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Женский Кубок России",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/93/a6021ae430eccaedfe12c99446ffb.png",
    "endYear": 2028,
    "isTitular": true
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Уличный футбол",
    "sport": "футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/c6/b7021d3e9b092e1899b309efeaabd.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Кубок России",
    "sport": "футзал",
    "partnerLogo": "https://dumpster.cdn.sports.ru/5/61/03e694d0582b2459016cd4b8eac76.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Суперкубок России",
    "sport": "футзал",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/9c/769f21656b22993985f8d62087161.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Media Poker",
    "sport": "Покер",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/5d/1bbf5f6ed3b484492c9c0e21c4414.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "MHL",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/c/63/9678a74341eb1a115b30931a59977.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "UBA",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/6e/9e5620ddb9d5d536830bf56067d71.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "HC 10",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/13/9405e3b72c8b0a6195f24d3f4e306.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "BC 10",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/e/93/83cbbdd34def7e7b5d41d6254021.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Tru Fighters",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/17/b4ec77f23e59f51238dd4d69f4b9f.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Лига 3х3",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/db/568b9ed0fc55c0842dab78700594b.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Кубок России",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/36/eb9b4880cbcfdd3e7deda84d37b45.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Чемпионат России 3х3",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/d3/3ebbcb1e5b0b3234188946dc1402e.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Sayonara Boys",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/42/bd1bdb1f34ec459a259e51c8cb41b.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Hoops",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/c/bb/280a01e9cd1fd6a46ee7218fce59b.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "ESL",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/bd/1c8fbe779796648e260bea9f894fc.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "PGL",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/fe/c1070ef68ee23fad74d093098f17b.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Padel Tour",
    "sport": "Падел",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/d3/4a8e6f68597ad6b6a9f474961296f.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Казанский марафон",
    "sport": "Бег",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/3c/198806c014061f937bd15c90ad957.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "winline",
    "partnerName": "Федерация нард России",
    "sport": "Нарды",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/5b/d3504f50fd6807efee8f7ce425c43.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Сборная России",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/05/fee6b3a7849dedaaf4c6544239926.png",
    "endYear": 2026,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Чемпионат мира",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/75/d7b1798dbc79bab375cde404179f4.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Media Basket",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/83/a77b653531979ab67c3f1949e37b3.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "PRIME SQUAD",
    "sport": "Медиафутбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/c0/7aa84a33ef82a950e2e2f288dc964.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Медиа Ралли",
    "sport": "Автоспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/09/51388b3f9817f328b8a2292cf9f69.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Prime FL",
    "sport": "ММА",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/a5/faec9f2e2836fe87945ad1c532783.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Media Golf",
    "sport": "Гольф",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/3d/5a8f9c366339d6a93a1524b33122d.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Prime FL",
    "sport": "ММА",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/a5/faec9f2e2836fe87945ad1c532783.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "T-Squad",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/ea/eef0b592650f5645392053f572725.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Players Club",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/9/5e/e3452c7e6663ab57c7df9426d0888.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Федерация бокса России",
    "sport": "Федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/5/93/a8a6ea75604842afdd590569b8940.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "L1ga Team",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/ca/b53e9ecaae94b19c9f9581cc0505d.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "liga-stavok",
    "partnerName": "Лига Лапты",
    "sport": "Лапта",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/43/aca8e0ce21748ce9ef56d40dd65e9.png",
    "endYear": 2026,
    "isTitular": true
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "ЦСКА",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/d7/36f163b6f2cfe0e0bbab36862b4f9.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "СКА",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/5a/b4d7a0aa791754951e77a718b5613.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Динамо",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/dd/07e54b142ef06f0ef129ae2624bdb.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Северсталь",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/86/7d76f0d327d7027dcba73d599959e.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Амур",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/87/fef2543f5b00b7fbae97b8c5d31be.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Адмирал",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/c1/f99d65c3a2a4534473c4b4c28b1ec.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Спартак",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/9/18/01b3180103977ee22d45af89ab62b.png",
    "endYear": 2027,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Сочи",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/e0/61780eac62c97e304f49d9539ce17.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Нефтехимик",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/7c/231541253e5c32a69b14e9f5f2864.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "ВХЛ",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/c/ba/0dea3a9536683cb375dc759858771.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "МХЛ",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/41/b6ef1450ef7a94f796f13328dede1.png",
    "endYear": 2028,
    "isTitular": true
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Химик",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/6/f2/448003982f03bb91b72db39e9ae14.png",
    "endYear": 2027,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Крылья советов",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/e/a4/02e4e16568130aba7348d64682e65.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Кубок мэра Москвы",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/86/79f27033c561315164928ca1931f6.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "OLIMPBET Суперкубок России",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/3d/342218ef65edc906ad677e0f88dc8.png",
    "endYear": 2027,
    "isTitular": true
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Top Dog",
    "sport": "Единоборства",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/ed/3df941b0629549137bb59a70896ae.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Force FC",
    "sport": "Единоборства",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/a6/1d91863c07d6c55e11015ce53bde7.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Ice Fights",
    "sport": "Единоборства",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/b9/8dae137eb73eb1ea65375a6550f84.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Суперлига",
    "sport": "Гандбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/9d/25bcc8d4f55a4b2bf77d5655265bd.png",
    "endYear": 2026,
    "isTitular": true
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Чеховские медведи",
    "sport": "Гандбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/e8/68b7c1c3d39bae35372c50d85b21f.png",
    "endYear": 2026,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Финал 4-х",
    "sport": "Гандбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/6b/81b63a002e442955516b4a0fa44d4.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Чемпионат России",
    "sport": "Пляжный футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/52/eed30c6413de39bf0c6fda5e11bc.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Кубок России",
    "sport": "Пляжный футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/8/53/1261dd9c2945d602382ed961e55ce.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Суперкубок России",
    "sport": "Пляжный футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/ec/37f703d76174c3a68b485b5b020e4.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Спортивная борьба",
    "sport": "Единоборства",
    "partnerLogo": "https://dumpster.cdn.sports.ru/a/e9/de6d7fe5c92bf9ce7d9f1268a1555.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "olimpbet",
    "partnerName": "Трудовые резервы",
    "sport": "Спортивное общество",
    "partnerLogo": "https://dumpster.cdn.sports.ru/e/31/f5d6a9b0c1553a2cedb6060747ef6.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "pari",
    "partnerName": "Нижний Новгород",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/6/28/d200fd75bb8680fc1fd7d8b75c5a0.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "pari",
    "partnerName": "Лига Pari",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/8f/ea76050e5cdb9d8d69b476ee088c2.png",
    "endYear": 2029,
    "isTitular": true
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Amateur League",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/c1/bd0fad63a80c2ec708a0f29876ead.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "pari",
    "partnerName": "Parivision",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/c7/a704fcd12f460ba22f5137fd0f020.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "pari",
    "partnerName": "DMS",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/56/c0626517f0820535da79a04ccaf51.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "pari",
    "partnerName": "United Cup",
    "sport": "Теннис",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/24/c30967a6e5ffdabd18d6c437d2258.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Российский футбольный союз",
    "sport": "Федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/c/1c/a132463136ecba5ee02697ff39d8e.png",
    "endYear": 2027,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Сборная России",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/48/0bc47748c6b5fc0cb9938cc48da59.png",
    "endYear": 2027,
    "isTitular": true
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Динамо",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/5/22/7c14a03b431afec17377814cee62b.png",
    "endYear": 2029,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Локомотив",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/7e/580642f3880bca9042922529283ff.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "ЮФЛ",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/15/5a5f9addaf13cca8fd839660bdb21.png",
    "endYear": 2027,
    "isTitular": true
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Broke Boys",
    "sport": "Медиафутбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/2a/ef47ae015f49684f9d20e8dd96cc8.png",
    "endYear": 2026,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "BB Team",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/13/89e688087bc6bb3c3f7d94e20c1d8.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Team Spirit",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/23/08b19cdcf790493ec65b2f2ba87fc.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "BB Dacha",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/f7/2747335a9905738fb6c91068344db.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Deadlock Cup",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/71/8b3388f01bf29423c3afc4ba9ae84.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Valorant League",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/c/12/056a38752818b5dd5a7a6a7c543b5.svg",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Streamers Battle",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/9/cd/5c77a1504db2dd903902fcc0c01bf.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Aunkere Cup",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/e/72/ab0dcf843c0435e70b378455ac8b6.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Fissure",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/d5/db7ca22995e08e23fbfb737d76e07.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "FC Streamers Cup",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/25/17ffb713a37cd0abcfc2789344843.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Woman Cup",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/3e/0e6a8f550d6073b94dafe73477e80.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "LanDaLan",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/40/fd5b1e16de0124affebf57f850044.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Rise of Legends",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/ff/ec4af1322e295430861768f2c7187.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "UFC",
    "sport": "Единоборства",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/73/d56edbf2efd2b933f2258fa4996c5.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "BB Poker",
    "sport": "Покер",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/db/daaf3d534672ee43917024b49b1b2.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Media Chess",
    "sport": "Шахматы",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/6d/615c9cd4b52312284281747957567.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "Федерация городошного спорта",
    "sport": "Федерация",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/25/fba06aa2986ee3d248ceb0807b67c.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "BLAST Premier",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/3/c3/707f7bb2375e0b6b96de25e7af506.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betboom",
    "partnerName": "BLAST Slam",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/69/2fc047dbec1c8c750add3229e0b14.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "БЕТСИТИ Парма",
    "sport": "Баскетбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/81/51647d3252167bb0e43c57d61614e.png",
    "endYear": 2028,
    "isTitular": true
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Сочи",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/1/b3/c412ee314991d03754d31fef87225.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Динамо Мх",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/e9/7368bbaad011b5e08ed46cedb4dcd.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Урал",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/1f/161bdc93dd90bb07678e8fb3b3be6.png",
    "endYear": 2027,
    "isTitular": false
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Факел",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/0/1e/efd8de11962af3b19618026414e28.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Fight Nights",
    "sport": "Единоборства",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/ab/92acab640cf92ac05cbd1be07ad2d.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Кубок лиги",
    "sport": "Футзал",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/1c/99b0f2c56b2de5941bd1ab6f71ab0.png",
    "endYear": 2027,
    "isTitular": true
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Суперлига",
    "sport": "Футзал",
    "partnerLogo": "https://dumpster.cdn.sports.ru/f/ce/0a7f6b14c55e020c7fd5dde0570ed.png",
    "endYear": 2027,
    "isTitular": true
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Ростов-Дон",
    "sport": "Гандбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/07/f61542b04e64b2d19b723fa68c049.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "betcity",
    "partnerName": "Лада",
    "sport": "Хоккей",
    "partnerLogo": "https://dumpster.cdn.sports.ru/5/76/837b905e5772a0f56ddd2c3539786.png",
    "endYear": 2028,
    "isTitular": false
  },
  {
    "bookmakerId": "tennisi",
    "partnerName": "КАМАЗ",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/4/b0/4d25963f24d33f203b865088d26ef.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "leon",
    "partnerName": "Leon-Вторая Лига",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/cc/92812b068167963017f221ed2152a.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "leon",
    "partnerName": "Амкар",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/7/23/520bf061835c1cbdc83b4d5bd887c.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "leon",
    "partnerName": "Ротор",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/b/dd/696960165b0a88e3defe0fc70cd44.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "leon",
    "partnerName": "СКА-Хабаровск",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/9/f8/a7ed869b42a95dee672527f880aa7.png",
    "endYear": null,
    "isTitular": false
  },
  {
    "bookmakerId": "leon",
    "partnerName": "Арсенал Тула",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/2/a2/e88a26cce0d74d8a533a93f3d7e6b.png",
    "endYear": null,
    "yearUnknown": true,
    "isTitular": false
  },
  {
    "bookmakerId": "bet-m",
    "partnerName": "33",
    "sport": "Киберспорт",
    "partnerLogo": "https://dumpster.cdn.sports.ru/d/35/980249e07c61497fa4160d9e384f1.png",
    "endYear": null,
    "isTitular": true
  },
  {
    "bookmakerId": "bettery",
    "partnerName": "Черноморец Нв",
    "sport": "Футбол",
    "partnerLogo": "https://dumpster.cdn.sports.ru/5/72/de2131c113e38522565809a4c365b.png",
    "endYear": null,
    "isTitular": false
  }
];
