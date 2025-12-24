export interface NavigationItem {
  id: number;
  title: string;
  order: number;
  url: string | null;
  children: NavigationItem[];
}
