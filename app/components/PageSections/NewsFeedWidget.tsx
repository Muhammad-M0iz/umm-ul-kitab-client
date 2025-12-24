"use client";
import { useState } from "react";
import { NewsFeedWidgetSection, NewsItem } from "@/types/page";
import { mediaUrl } from "@/lib/strapi";
import Image from "next/image";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function NewsFeedWidget({ data }: { data: NewsFeedWidgetSection }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.featured_news.length / itemsPerPage);
  const currentNews = data.featured_news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of news feed
      const element = document.getElementById("news-feed-top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-secondary/50 p-8 lg:p-12 relative overflow-hidden min-h-[800px]">
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-secondary/30 to-transparent opacity-50"></div>
      
      <div id="news-feed-top" className="mb-12 border-b border-secondary pb-6 flex justify-between items-end relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-light">
            {data.title}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <div className="hidden sm:flex gap-2">
          <button className="p-2 rounded-lg bg-secondary/50 text-accent hover:bg-secondary">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="p-2 rounded-lg text-gray-400 hover:text-accent">
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>
      </div>

      <div className="space-y-20 relative z-10">
        {currentNews.map((item, index) => (
          <NewsItemCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-24 pt-10 border-t border-secondary flex flex-col items-center relative z-10">
          <p className="text-sm text-gray-500 mb-6 font-light">
            Showing page <span className="font-bold text-accent">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </p>
          <nav className="flex items-center gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-12 w-12 flex items-center justify-center rounded-full border border-secondary bg-white hover:bg-secondary/50 text-gray-400 hover:text-primary transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-12 w-12 flex items-center justify-center rounded-full transition-all shadow-sm font-medium ${
                  currentPage === page
                    ? "bg-accent text-white shadow-lg shadow-accent/30 font-bold"
                    : "bg-white border border-secondary hover:bg-primary/10 text-gray-600 hover:text-primary"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-12 w-12 flex items-center justify-center rounded-full border border-secondary bg-white hover:bg-secondary/50 text-gray-600 hover:text-primary transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

function NewsItemCard({ item, index }: { item: NewsItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Determine layout based on index or random? The reference shows different layouts.
  // First item is large (hero style). Others are side-by-side.
  // Let's make the first item on the first page special if we want to match the reference exactly.
  // Or just alternate. The reference has:
  // 1. Large image left, text right (col-span-7 / col-span-5)
  // 2. Image left (col-span-4), text right (col-span-8)
  // 3. Same as 2
  // 4. Icon placeholder left, text right.
  
  // Let's use the "Hero" layout for the very first item of the first page, and "List" layout for others.
  // But since we are mapping inside the component, we can just check index === 0.
  
  const isHero = index === 0; 

  const dateStr = item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  if (isHero) {
    return (
      <article className="relative group">
        <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full"></div>
        <div className="mb-6 pl-4 md:pl-0">
          <div className="flex items-center gap-3 mb-3">
            {item.category && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold border border-primary/20">
                {item.category}
              </span>
            )}
            {dateStr && (
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>{" "}
                {dateStr}
              </span>
            )}
          </div>
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-accent leading-tight">
            {item.title}
          </h3>
        </div>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="relative rounded-[2rem] overflow-hidden shadow-lg h-[400px] w-full">
              {item.cover_image ? (
                <Image
                  src={mediaUrl(item.cover_image.url)}
                  alt={item.cover_image.alternativeText || item.title}
                  fill
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
                />
              ) : (
                <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                   <span className="material-symbols-outlined text-6xl text-primary/40">image</span>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className={`prose prose-lg prose-headings:font-display text-gray-600 font-light leading-relaxed ${isExpanded ? '' : 'line-clamp-6'}`}>
               <BlocksRenderer content={item.body} />
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-accent font-bold text-sm mt-2 mb-4 focus:outline-none"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
            <div className="mt-2 pt-6 border-t border-secondary flex gap-4">
              <button className="text-accent hover:text-primary font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined">share</span> Share
              </button>
              <button className="text-accent hover:text-primary font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined">bookmark</span> Save
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative group">
      <div className={`absolute -left-4 md:-left-8 top-0 bottom-0 w-1 bg-gradient-to-b ${index % 2 === 0 ? 'from-gold/50' : 'from-accent/30'} to-transparent rounded-full`}></div>
      <div className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 lg:col-span-4 order-1 md:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-md h-64 w-full group-hover:shadow-xl transition-all duration-300">
             {item.cover_image ? (
                <Image
                  src={mediaUrl(item.cover_image.url)}
                  alt={item.cover_image.alternativeText || item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary/30 flex items-center justify-center group-hover:bg-secondary/50 transition-colors">
                   <span className="material-symbols-outlined text-6xl text-primary/40 group-hover:scale-110 transition-transform duration-500">campaign</span>
                </div>
              )}
            {item.category && (
                <div className="absolute top-3 left-3">
                <span className={`text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-sm ${index % 2 === 0 ? 'bg-gold' : 'bg-accent'}`}>
                    {item.category}
                </span>
                </div>
            )}
          </div>
        </div>
        <div className="md:col-span-7 lg:col-span-8 order-2 md:order-1">
          <div className="flex items-center gap-3 mb-3">
             {dateStr && (
                <span className="text-gray-400 text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> {dateStr}
                </span>
             )}
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-text-light mb-4 group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <div className={`prose text-gray-600 font-light leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
             <BlocksRenderer content={item.body} />
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-accent font-bold text-sm mt-2 focus:outline-none"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
    </article>
  );
}
