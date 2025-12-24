export type Media = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width?: number;
  height?: number;
};

export type CarouselSlide = {
  id: number;
  title?: string | null;
  subtitle?: string | null;
  image: Media[]; // Strapi returns array in this schema
};

export type CarouselWidget = {
  __component: "home-page-widgets.carousel-widget";
  id: number;
  slides: CarouselSlide[];
};

export type RichNode = {
  type: string;
  level?: number;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  rel?: string;
  target?: string;
  children?: RichNode[];
  text?: string;
};

export type MessageWidget = {
  __component: "home-page-widgets.message-widget";
  id: number;
  title: string;
  message_body: RichNode[];
  author_name?: string | null;
  author_designation?: string | null;
  author_photo?: Media | null;
};

export type AnnouncementItem = {
  id: number;
  documentId: string;
  date: string | null;
  title: string;
  subtitle?: string | null;
  category?: string | null;
};

export type AnnouncementsWidget = {
  __component: "home-page-widgets.announcements";
  id: number;
  title?: string | null;
  announcements: AnnouncementItem[];
};

export type NewsItem = {
  id: number;
  documentId: string;
  title: string;
  link?: string | null;
  date?: string | null;
  category?: string | null;
  excerpt?: string | null;
  cover_image?: Media | null;
};

export type NewsFeedWidget = {
  __component: "home-page-widgets.news-feed-widget";
  id: number;
  title?: string | null;
  featured_news: NewsItem[];
};

export type StatItem = { id: number; number: string; label: string; icon?: string | null };
export type StatisticsWidget = {
  __component: "home-page-widgets.statistics-widget";
  id: number;
  title?: string | null;
  stats: StatItem[];
};

export type GridItem = {
  id: number;
  item_title: string;
  item_subtitle?: string | null;
  item_link?: string | null;
  photo?: Media | null;
};

export type ItemGridBlock = {
  __component: "page-sections.item-grid-block";
  id: number;
  title?: string | null;
  featured_programs: unknown[];
  items: GridItem[];
};

export type EventItem = {
  id: number;
  documentId: string;
  title: string;
  link?: string | null;
  event_date: string;
  time?: string | null;
  location?: string | null;
  featured_image?: Media | null;
};

export type EventsWidget = {
  __component: "home-page-widgets.events-widget";
  id: number;
  featured_events: EventItem[];
};

export type ImportantLink = { id: number; label: string; url: string; icon?: string | null };
export type ImportantLinksWidget = {
  __component: "page-sections.important-links-widget";
  id: number;
  title?: string | null;
  links: ImportantLink[];
};

export type HomePageData = {
  data: {
    id: number;
    documentId: string;
    seo_title: string | null;
    seo_description: string | null;
    locale: string;
    page_sections: (
      | CarouselWidget
      | MessageWidget
      | AnnouncementsWidget
      | NewsFeedWidget
      | StatisticsWidget
      | ItemGridBlock
      | EventsWidget
      | ImportantLinksWidget
    )[];
  };
  meta: Record<string, unknown>;
};
