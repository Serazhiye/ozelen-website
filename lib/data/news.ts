export type Article = {
  /** Идентификатор для React-ключа */
  slug: string;
  title: string;
  category: string;
  date: string;
  /** Издание / источник публикации */
  source: string;
  /** Внешняя ссылка на публикацию в СМИ */
  url: string;
  excerpt: string;
  featured?: boolean;
};

export const newsCategories = [
  "Все",
  "Проекты",
  "Экология",
  "Компания",
  "Награды",
  "Интервью",
] as const;

/**
 * Внешняя пресса о компании — публикации сторонних СМИ о Nord Botanic.
 * Ссылки ведут на издания-источники (открываются в новой вкладке).
 */
export const articles: Article[] = [
  {
    slug: "forbes-central-park",
    title: "Как Nord Botanic превратил бывшую станцию в крупнейший парк столицы",
    category: "Проекты",
    date: "18 июня 2026",
    source: "Forbes Kazakhstan",
    url: "https://forbes.kz",
    featured: true,
    excerpt:
      "Издание разбирает, как подрядчик реализовал 42-гектарный парк на месте заброшенных железнодорожных земель — от рекультивации грунта до 90 000 деревьев и кустарников.",
  },
  {
    slug: "kapital-street-trees",
    title: "Инженерия под асфальтом: почему в новых кварталах деревья наконец приживаются",
    category: "Экология",
    date: "30 мая 2026",
    source: "Kapital.kz",
    url: "https://kapital.kz",
    excerpt:
      "Деловое издание рассказывает о структурных почвенных ячейках и подповерхностном поливе Nord Botanic, которые меняют выживаемость уличных деревьев.",
  },
  {
    slug: "tengrinews-biodiversity",
    title: "Городское озеленение с приростом биоразнообразия: опыт Nord Botanic",
    category: "Экология",
    date: "12 мая 2026",
    source: "Tengrinews",
    url: "https://tengrinews.kz",
    excerpt:
      "Как крупные инфраструктурные проекты компании оставляют природу измеримо лучше, чем находят, — с цифрами по биоразнообразию и воде.",
  },
  {
    slug: "kursiv-contractor-of-year",
    title: "Nord Botanic — «Подрядчик года по зелёной инфраструктуре»",
    category: "Награды",
    date: "24 апреля 2026",
    source: "Курсив",
    url: "https://kursiv.kz",
    excerpt:
      "Региональная премия в области инфраструктуры отметила набережный бульвар компании за инженерное и экологическое качество.",
  },
  {
    slug: "inbusiness-smart-irrigation",
    title: "Умный полив экономит заказчикам до 42% воды — кейс Nord Botanic",
    category: "Проекты",
    date: "3 апреля 2026",
    source: "Inbusiness.kz",
    url: "https://inbusiness.kz",
    excerpt:
      "Центральное управление, данные о погоде и датчики влажности меняют то, как поливают большие ландшафты. Результаты, измеренные на 900 зонах.",
  },
  {
    slug: "kazpravda-river-restoration",
    title: "36 километров реки: как восстанавливают деградировавший коридор",
    category: "Экология",
    date: "15 марта 2026",
    source: "Казахстанская правда",
    url: "https://kazpravda.kz",
    excerpt:
      "Многолетняя программа Nord Botanic возвращает размытым и загрязнённым берегам экологическую функцию и вновь открывает их для людей.",
  },
  {
    slug: "atameken-arboriculture",
    title: "Компания расширяет сертифицированное подразделение арбористики",
    category: "Компания",
    date: "28 февраля 2026",
    source: "Atameken Business",
    url: "https://inbusiness.kz",
    excerpt:
      "Рост спроса на долгосрочное обслуживание ведёт к значительному расширению команд по уходу за деревьями и управлению активами.",
  },
  {
    slug: "ls-extreme-climate",
    title: "Интервью: как проектировать ландшафт для −35 °C и летней засухи",
    category: "Интервью",
    date: "9 февраля 2026",
    source: "LS / lsm.kz",
    url: "https://lsm.kz",
    excerpt:
      "Директор по ландшафту Nord Botanic — о подборе устойчивых видов и деталях, которые сохраняют городские посадки живыми десятилетиями.",
  },
  {
    slug: "astana-times-airport",
    title: "Airport Green Zone reaches completion inside a live airfield",
    category: "Проекты",
    date: "22 января 2026",
    source: "The Astana Times",
    url: "https://astanatimes.com",
    excerpt:
      "58-гектарный ландшафт прибытия, реализованный внутри действующего аэродрома, — баланс авиационной безопасности и первоклассного впечатления от прибытия.",
  },
];

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}
