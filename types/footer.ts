export interface FooterLink {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
}

export interface FooterMenuItem {
  id: number;
  title: string;
  custom_url: string | null;
  page_link: {
    slug: string;
  } | null;
}

export interface FooterQuickLinkSection {
  id: number;
  title: string;
  menu_items: FooterMenuItem[];
}

export interface FooterImportantLinkSection {
  id: number;
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  id: number;
  number: string;
  email: string;
  location: string;
}

export interface FooterData {
  id: number;
  title: string;
  subtitle: string;
  copyright_text: string;
  contact: FooterContact;
  Quicklinks: FooterQuickLinkSection[];
  importantLinks: FooterImportantLinkSection[];
}
