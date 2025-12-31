import { BlocksContent } from "@strapi/blocks-react-renderer";

export interface FeaturedImageSection {
  __component: "page-sections.featured-image";
  id: number;
  image: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
  };
}

export interface RichTextBlockSection {
  __component: "page-sections.rich-text-block";
  id: number;
  body: any; // Can be string (markdown) or BlocksContent (JSON)
}

export interface GetInTouchWidgetSection {
  __component: "page-sections.get-in-touch-widget";
  id: number;
  title: string;
  description: string | null;
  contact_number: string;
  button_label: string;
  button_link: string;
  email: string;
}

export interface QuickLinksSection {
  __component: "page-sections.quick-links";
  id: number;
  title: string;
  menu_items: {
    id: number;
    documentId: string;
    page_link: string | null;
  }[];
}

export interface NewsItem {
  id: number;
  documentId: string;
  title: string;
  body: BlocksContent;
  link: string | null;
  date: string | null;
  category: string | null;
  cover_image: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
  } | null;
}

export interface NewsFeedWidgetSection {
  __component: "home-page-widgets.news-feed-widget";
  id: number;
  title: string;
  featured_news: NewsItem[];
}

export interface EventItem {
  id: number;
  documentId: string;
  title: string;
  link: string | null;
  event_date: string;
  location: string;
  body: BlocksContent;
  featured_image: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
  } | null;
}

export interface EventsWidgetSection {
  __component: "home-page-widgets.events-widget";
  id: number;
  featured_events: EventItem[];
}

export interface Department {
  id: number;
  documentId: string;
  name: string;
}

export interface FacultyMember {
  id: number;
  documentId: string;
  name: string;
  designation: string;
  subtitle: string | null;
  departments?: Department[];
  photo: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
  } | null;
}

export interface FacultyWidgetSection {
  __component: "page-sections.faculty-widget";
  id: number;
  title: string;
  subtitle?: string | null;
  faculty_members: FacultyMember[];
}

export interface DownloadItem {
  id: number;
  documentId: string;
  title: string;
  file: {
    id: number;
    documentId: string;
    url: string;
    name: string;
    ext?: string;
    size?: number;
  };
}

export interface DownloadsWidgetSection {
  __component: "page-sections.downloads";
  id: number;
  title: string;
  downloads: DownloadItem[];
}

export interface Testimonial {
  id: number;
  documentId: string;
  author_name: string;
  designation: string;
  body: string;
  photo: {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string | null;
  } | null;
}

export interface TestimonialsWidgetSection {
  __component: "page-sections.testimonials-widget";
  id: number;
  testimonials: Testimonial[];
}

export interface ImportantLink {
  id: number;
  label: string;
  url: string;
}

export interface ImportantLinksWidgetSection {
  __component: "page-sections.important-links-widget";
  id: number;
  title: string;
  links: ImportantLink[];
}

export interface Photo {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  caption: string | null;
}

export interface PhotoAlbum {
  id: number;
  documentId: string;
  title: string;
  slug: string | null;
  description: string | null;
  photos: Photo[];
}

export interface PhotoAlbumWidgetSection {
  __component: "page-sections.photo-album-widget";
  id: number;
  title: string;
  photo_albums: PhotoAlbum[];
}

export interface VideoFile {
  id: number;
  documentId: string;
  url: string;
  name: string;
}

export interface VideoItem {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  video_file: VideoFile | null;
}

export interface VideoSection {
  __component: "page-sections.video";
  id: number;
  title: string;
  videos: VideoItem[];
}

export interface TableSection {
  __component: "page.table";
  id: number;
  title: string | null;
  Table: {
    id: number;
    columns: {
      id: number;
      label: string;
      type: string;
    }[];
    rows: string[][];
  };
}

export type PageSection =
  | FeaturedImageSection
  | RichTextBlockSection
  | GetInTouchWidgetSection
  | QuickLinksSection
  | NewsFeedWidgetSection
  | EventsWidgetSection
  | FacultyWidgetSection
  | DownloadsWidgetSection
  | TestimonialsWidgetSection
  | ImportantLinksWidgetSection
  | PhotoAlbumWidgetSection
  | VideoSection
  | TableSection;

export interface FormFieldDefinition {
  id: string;
  type?: string | null;
  label?: string | null;
  description?: string | null;
  placeholder?: string | null;
  required?: boolean | null;
  options?: Array<string | { label?: string | null; value?: string | null }> | null;
  validation?: {
    options?: string[];
    allowedTypes?: string[];
    pattern?: string;
  } | null;
  childFields?: FormFieldDefinition[] | null;
}

export interface Form {
  id: number;
  documentId: string;
  name: string;
  slug?: string | null;
  fields: FormFieldDefinition[];
}

export interface PageData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  content_sections: PageSection[];
  forms?: Form[];
}

export interface PageResponse {
  data: PageData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
