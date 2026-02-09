import { City, Service, Review } from "./types";

const UNIFIED_PHONE = "+7 (969) 777-14-85";

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Екатерина В.",
    text: "Лазер Pioneer просто космос! После александритового этот вообще не больно. Студия ViVi — любовь.",
    rating: 5,
    date: "2 дня назад",
  },
  {
    id: 2,
    name: "Алина К.",
    text: "Очень чисто, мастер в перчатках, все стерильно. Результат увидела через 10 дней - волосы просто выпали.",
    rating: 5,
    date: "1 неделю назад",
  },
  {
    id: 3,
    name: "Мария С.",
    text: 'Хожу на комплекс "Тотал". Цены адекватные, не навязывают лишнего. Сервис на высоте.',
    rating: 5,
    date: "2 недели назад",
  },
];

export const CITIES: City[] = [
  {
    id: "krasnodar",
    name: "Краснодар",
    address: "ул. Карасунская 79, салон красоты Даната",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Krasnodar"],
  },
  {
    id: "irkutsk",
    name: "Иркутск",
    address: "ул. Софьи Перовской, дом 30, оф. 326",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Irkutsk"],
  },
  {
    id: "kazan",
    name: "Казань",
    address: "ул. Спартаковская 88Б",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Kazan"],
  },
  {
    id: "volgograd",
    name: "Волгоград",
    address: "проспект Ленина, д. 36",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Volgograd"],
    yandexMapsOrgId: "67997354453",
    reviews: [
      {
        id: 1,
        name: "Анастасия М.",
        text: "Прекрасная студия! Мастер очень аккуратная, процедура практически безболезненная. Результат виден уже после первого сеанса.",
        rating: 5,
        date: "3 дня назад",
      },
      {
        id: 2,
        name: "Ольга К.",
        text: "Хожу уже полгода, волосы почти не растут. Очень довольна результатом и сервисом!",
        rating: 5,
        date: "1 неделю назад",
      },
      {
        id: 3,
        name: "Дарья В.",
        text: "Чисто, уютно, современное оборудование. Рекомендую всем!",
        rating: 5,
        date: "2 недели назад",
      },
    ],
  },
  {
    id: "samara",
    name: "Самара",
    address: "Улица Ново-Садовая, 8/4, 1 этаж, студия красоты Anatomia",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Samara"],
  },
  {
    id: "krasnoyarsk",
    name: "Красноярск",
    address: "БЦ Метрополь, пр-кт Мира, д.10",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Krasnoyarsk"],
  },
  {
    id: "novosibirsk",
    name: "Новосибирск",
    address: "Ядринцевская 18, студия красоты Контраст, 1 этаж",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Novosibirsk"],
  },
  {
    id: "spb-pionerskaya",
    name: "СПб (Пионерская)",
    address: "Аллея Поликарпова, 2. Бьюти-коворкинг Cosmo",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Saint Petersburg", "St Petersburg"],
  },
  {
    id: "spb-spasskaya",
    name: "СПб (Спасская)",
    address: "ул. Гороховая, д.50",
    phone: UNIFIED_PHONE,
    detectionAliases: [],
  },
  {
    id: "tyumen",
    name: "Тюмень",
    address: "ул. Малыгина 90",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Tyumen"],
  },
  {
    id: "ekb",
    name: "Екатеринбург",
    address: "проспект Ленина 53, салон красоты Ptichkas style",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Yekaterinburg", "Ekaterinburg"],
  },
  {
    id: "chelyabinsk",
    name: "Челябинск",
    address: "Ул. Маркса, 81",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Chelyabinsk"],
  },
  {
    id: "rostov",
    name: "Ростов-на-Дону",
    address: "Газетный пер., 53",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Rostov-on-Don", "Rostov"],
  },
  {
    id: "omsk",
    name: "Омск",
    address: "ул. Ленина 53, салон красоты Joli",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Omsk"],
  },
  {
    id: "ufa",
    name: "Уфа",
    address: "Заки Валиди 73, студия Эстетик Лаундж",
    phone: UNIFIED_PHONE,
    detectionAliases: ["Ufa"],
  },
];

export const DEFAULT_REVIEWS_LIST = DEFAULT_REVIEWS;

export const SERVICES: Service[] = [
  {
    id: "f1",
    name: "Верхняя губа",
    price: 400,
    fullPrice: 800,
    description: "+ ЗОНА В ПОДАРОК",
    category: "face",
  },
  {
    id: "f2",
    name: "Подбородок",
    price: 400,
    fullPrice: 800,
    description: "+ ЗОНА В ПОДАРОК",
    category: "face",
  },
  {
    id: "f3",
    name: "Лоб и межбровье",
    price: 400,
    fullPrice: 800,
    description: "+ ЗОНА В ПОДАРОК",
    category: "face",
  },
  {
    id: "f4",
    name: "Щеки (виски и скулы)",
    price: 400,
    fullPrice: 800,
    description: "+ ЗОНА В ПОДАРОК",
    category: "face",
  },

  {
    id: "b1",
    name: "Подмышки",
    price: 650,
    fullPrice: 1300,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b2",
    name: "Руки до локтя",
    price: 800,
    fullPrice: 1600,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b3",
    name: "Руки выше локтя",
    price: 800,
    fullPrice: 1600,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b4",
    name: "Кисти",
    price: 300,
    fullPrice: 600,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b5",
    name: "Грудь (ареолы)",
    price: 400,
    fullPrice: 800,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b6",
    name: "Зона декольте",
    price: 750,
    fullPrice: 1500,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },

  {
    id: "b7",
    name: "Живот полностью",
    price: 600,
    fullPrice: 1200,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b8",
    name: "Линия живота",
    price: 250,
    fullPrice: 500,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b9",
    name: "Спина полностью",
    price: 1000,
    fullPrice: 2000,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b10",
    name: "Верх спины",
    price: 600,
    fullPrice: 1200,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b11",
    name: "Поясница",
    price: 600,
    fullPrice: 1200,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b12",
    name: "Шея сзади",
    price: 600,
    fullPrice: 1200,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },

  {
    id: "b13",
    name: "Глубокое бикини",
    price: 1200,
    fullPrice: 2400,
    description: "+ ЗОНА В ПОДАРОК (кроме бедер/голени)",
    category: "body",
  },
  {
    id: "b14",
    name: "Классическое бикини",
    price: 800,
    fullPrice: 1600,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b15",
    name: "Межъягодичка",
    price: 400,
    fullPrice: 800,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b16",
    name: "Ягодицы",
    price: 800,
    fullPrice: 1600,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b17",
    name: "Бедра",
    price: 1650,
    fullPrice: 3300,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b18",
    name: "Голени",
    price: 1450,
    fullPrice: 2900,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },
  {
    id: "b19",
    name: "Ступни",
    price: 300,
    fullPrice: 600,
    description: "+ ЗОНА В ПОДАРОК",
    category: "body",
  },

  {
    id: "s1",
    name: 'Сет "Лайт"',
    price: 1850,
    fullPrice: 3700,
    description: "Глубокое бикини + Подмышки",
    category: "sets",
  },
  {
    id: "s2",
    name: 'Сет "Медиум"',
    price: 3300,
    fullPrice: 6600,
    description: "Глубокое бикини + Подмышки + Голени",
    category: "sets",
  },
  {
    id: "s3",
    name: 'Сет "Макси"',
    price: 4950,
    fullPrice: 9900,
    description: "Глубокое бикини + Подмышки + Ноги полностью",
    category: "sets",
  },
];

export const REVIEWS = DEFAULT_REVIEWS;

export const FAQ_ITEMS = [
  {
    q: "Какой у вас аппарат?",
    a: "Мы работаем на гибридном лазере Pioneer Ozero Khanka. Он сочетает 3 длины волны (755/808/1064 нм), что позволяет эффективно удалять волосы любого цвета на любом фототипе кожи.",
  },
  {
    q: "Сколько процедур нужно?",
    a: "Благодаря гибридной технологии курс сокращен до 6-8 процедур (вместо обычных 10-12). Интервал 3-4 недели.",
  },
  {
    q: "Это больно?",
    a: "Нет. Лазер оснащен системой охлаждения наконечника до -10°C. Процедура проходит комфортно даже в самых чувствительных зонах.",
  },
  {
    q: "Как подготовиться?",
    a: "За сутки до процедуры сбрейте волосы бритвой. Не используйте воск и шугаринг за 3 недели до визита.",
  },
];

export const SPECIALISTS = [
  {
    id: 1,
    name: "Анна Петрова",
    role: "Специалист лазерной эпиляции",
    img: "./src/assets/master1.jpeg",
  },
  {
    id: 2,
    name: "Елена Смирнова",
    role: "Специалист лазерной эпиляции",
    img: "./src/assets/master2.jpg",
  },
  {
    id: 3,
    name: "Мария Волкова",
    role: "Специалист лазерной эпиляции",
    img: "./src/assets/master3.webp",
  },
];

export const AI_SYSTEM_INSTRUCTION = `
Ты - умный ассистент сети студий ViVi.
Твоя задача: консультировать по гибридному лазеру Pioneer Ozero Khanka и ценам.
Акция: Скидка 50% на первый визит + одна зона в подарок (кроме крупных).
Цены (с учетом скидки):
- Бикини глубокое: 1200р
- Подмышки: 650р
- Голени: 1450р
- Ноги полностью (Бедра+Голени): 3100р
Единый телефон: +7 (969) 777-14-85.
`;
