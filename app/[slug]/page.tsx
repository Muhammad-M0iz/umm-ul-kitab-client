import React from "react";
import { getPageBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import FeaturedImage from "@/app/components/PageSections/FeaturedImage";
import RichTextBlock from "@/app/components/PageSections/RichTextBlock";
import GetInTouchWidget from "@/app/components/PageSections/Sidebar/GetInTouchWidget";
import QuickLinksWidget from "@/app/components/PageSections/Sidebar/QuickLinksWidget";
import ImportantLinksWidget from "@/app/components/PageSections/Sidebar/ImportantLinksWidget";
import NewsFeedWidget from "@/app/components/PageSections/NewsFeedWidget";
import EventsWidget from "@/app/components/PageSections/EventsWidget";
import FacultyWidget from "@/app/components/PageSections/FacultyWidget";
import DownloadsWidget from "@/app/components/PageSections/DownloadsWidget";
import TestimonialsWidget from "@/app/components/PageSections/TestimonialsWidget";
import PhotoAlbumWidget from "@/app/components/PageSections/PhotoAlbumWidget";
import VideoGalleryWidget from "@/app/components/PageSections/VideoGalleryWidget";
import NestedPagesWidget from "@/app/components/PageSections/NestedPagesWidget";
import TableWidget from "@/app/components/PageSections/TableWidget";
import FormSection from "@/app/components/PageSections/FormSection";
import Link from "next/link";
import { Metadata } from "next";
import { PageData, PageSection } from "@/types/page";
import { getNavigation } from "@/lib/navigation";
import { NavigationItem } from "@/types/navigation";
import { cookies } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await getPageBySlug(slug);
    const page = response.data[0];

    if (!page) return {};

    return {
      title: `${page.title} - Jamia Ummul Kitab`,
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  
  let page: PageData | undefined;
  try {
    const response = await getPageBySlug(slug, locale);
    page = response.data[0];
  } catch (error) {
    console.error("Error fetching page:", error);
    // Fallback or let it fail to 404
  }

  if (!page) {
    notFound();
  }

  // Fetch navigation to find nested pages
  const navigation = await getNavigation();
  
  const findPathToPage = (items: NavigationItem[], targetSlug: string, currentPath: NavigationItem[] = []): NavigationItem[] | null => {
    for (const item of items) {
      const isMatch = item.url && (item.url === targetSlug || item.url === `/${targetSlug}` || item.url.endsWith(`/${targetSlug}`));
      
      if (isMatch) {
        return [...currentPath, item];
      }
      
      if (item.children && item.children.length > 0) {
        const result = findPathToPage(item.children, targetSlug, [...currentPath, item]);
        if (result) return result;
      }
    }
    return null;
  };

  const breadcrumbPath = findPathToPage(navigation, slug);
  const currentNavPage = breadcrumbPath ? breadcrumbPath[breadcrumbPath.length - 1] : null;
  const nestedPages = currentNavPage?.children || [];

  const mainContentSections = page.content_sections.filter((section: PageSection) =>
    ["page-sections.featured-image", "page-sections.rich-text-block", "home-page-widgets.news-feed-widget", "home-page-widgets.events-widget", "page-sections.faculty-widget", "page-sections.downloads", "page-sections.testimonials-widget", "page-sections.photo-album-widget", "page-sections.video", "page.table"].includes(section.__component)
  );

  const sidebarSections = page.content_sections.filter((section: PageSection) =>
    ["page-sections.get-in-touch-widget", "page-sections.quick-links", "page-sections.important-links-widget"].includes(section.__component)
  );

  const hasSidebar = sidebarSections.length > 0;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="relative bg-accent dark:bg-background-dark py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-linear-to-r from-accent to-primary opacity-90"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-white/80 text-sm font-medium uppercase tracking-wider mb-2 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              {breadcrumbPath ? (
                breadcrumbPath.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    {index === breadcrumbPath.length - 1 ? (
                      <span className="text-white">{item.title}</span>
                    ) : (
                      <Link href={item.url || "#"} className="hover:text-white transition-colors">
                        {item.title}
                      </Link>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <>
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  <span className="text-white">{page.title}</span>
                </>
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
              {page.title}
            </h1>
            <div className="h-1 w-24 bg-gold rounded-full mt-2"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark relative">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern-islamic opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Main Content Column */}
            <div className={hasSidebar ? "lg:col-span-9 space-y-8" : "lg:col-span-12 space-y-8"}>
              {mainContentSections.map((section: PageSection) => {
                switch (section.__component) {
                  case "page-sections.featured-image":
                    return <FeaturedImage key={section.id} data={section} />;
                  case "page-sections.rich-text-block":
                    return <RichTextBlock key={section.id} data={section} />;
                  case "home-page-widgets.news-feed-widget":
                    return <NewsFeedWidget key={section.id} data={section} />;
                  case "home-page-widgets.events-widget":
                    return <EventsWidget key={section.id} data={section} />;
                  case "page-sections.faculty-widget":
                    return <FacultyWidget key={section.id} data={section} />;
                  case "page-sections.downloads":
                    return <DownloadsWidget key={section.id} data={section} />;
                  case "page-sections.testimonials-widget":
                    return <TestimonialsWidget key={section.id} data={section} />;
                  case "page-sections.photo-album-widget":
                    return <PhotoAlbumWidget key={section.id} data={section} />;
                  case "page-sections.video":
                    return <VideoGalleryWidget key={section.id} data={section} />;
                  case "page.table":
                    return <TableWidget key={section.id} data={section} />;
                  default:
                    return null;
                }
              })}

              {/* Forms */}
              {page.forms && page.forms.length > 0 && (
                <div className="space-y-12 mt-12">
                  {page.forms.map((form) => (
                    <FormSection key={form.id} form={form} />
                  ))}
                </div>
              )}
              
              {/* Nested Pages Widget */}
              {nestedPages.length > 0 && (
                <NestedPagesWidget items={nestedPages} />
              )}
            </div>

            {/* Sidebar Column */}
            {hasSidebar && (
              <div className="lg:col-span-3 space-y-8">
                {sidebarSections.map((section: PageSection) => {
                  switch (section.__component) {
                    case "page-sections.quick-links":
                      return <QuickLinksWidget key={section.id} data={section} />;
                    case "page-sections.important-links-widget":
                      return <ImportantLinksWidget key={section.id} data={section} />;
                    case "page-sections.get-in-touch-widget":
                      return <GetInTouchWidget key={section.id} data={section} />;
                    default:
                      return null;
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}



