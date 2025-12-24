import { getHomePage } from "@/lib/strapi";
import type { HomePageData } from "@/types/home";
import CarouselWidget from "./components/CarouselWidget";
import MessageWidget from "./components/MessageWidget";
import Announcements from "./components/Announcements";
import NewsFeed from "./components/NewsFeed";
import StatisticsWidget from "./components/StatisticsWidget";
import ItemGridBlock from "./components/ItemGridBlock";
import EventsWidget from "./components/EventsWidget";
import ImportantLinksWidget from "./components/ImportantLinksWidget";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const json = (await getHomePage(locale)) as HomePageData;
  const sections = json?.data?.page_sections || [];

  return (
    <main>
      {sections.map((s) => {
        switch (s.__component) {
          case "home-page-widgets.carousel-widget":
            return <CarouselWidget key={s.id} data={s} />;
          case "home-page-widgets.message-widget":
            return <MessageWidget key={s.id} data={s} />;
          case "home-page-widgets.announcements":
            return <Announcements key={s.id} data={s} />;
          case "home-page-widgets.news-feed-widget":
            return <NewsFeed key={s.id} data={s} />;
          case "home-page-widgets.statistics-widget":
            return <StatisticsWidget key={s.id} data={s} />;
          case "page-sections.item-grid-block":
            return <ItemGridBlock key={s.id} data={s} />;
          case "home-page-widgets.events-widget":
            return <EventsWidget key={s.id} data={s} />;
          case "page-sections.important-links-widget":
            return <ImportantLinksWidget key={s.id} data={s} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
