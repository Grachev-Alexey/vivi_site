import { Service, Review } from "./types";

const UNIFIED_PHONE = "+7 (969) 777-14-85";

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Екатерина В.",
    text: "Лазер Pioneer просто космос! После александритового этот вообще не больно. Студия The Cashmere — любовь.",
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

export const CITY = {
  id: "volgograd",
  name: "Волгоград",
  address: "ул. Рокоссовского, д. 32А",
  phone: UNIFIED_PHONE,
  yandexMapsOrgId: "67997354453",
};

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
Ты - умный ассистент студии The Cashmere.
Твоя задача: консультировать по гибридному лазеру Pioneer Ozero Khanka и ценам.
Акция: Скидка 50% на первый визит + одна зона в подарок (кроме крупных).
Цены (с учетом скидки):
- Бикини глубокое: 1200р
- Подмышки: 650р
- Голени: 1450р
- Ноги полностью (Бедра+Голени): 3100р
Наш адрес: Волгоград, ул. Рокоссовского, д. 32А.
Телефон: +7 (969) 777-14-85.
`;