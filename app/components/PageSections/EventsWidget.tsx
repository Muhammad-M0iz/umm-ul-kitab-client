"use client";
import { useState } from "react";
import { EventsWidgetSection, EventItem } from "@/types/page";
import { mediaUrl } from "@/lib/strapi";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventsWidget({ data }: { data: EventsWidgetSection }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Value>(null);
  const itemsPerPage = 5;

  const filteredEvents = data.featured_events.filter((event) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query);

    let matchesDate = true;
    if (date instanceof Date) {
      const eventDate = new Date(event.event_date);
      matchesDate =
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    }

    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const element = document.getElementById("events-top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const hasEvent = data.featured_events.some((event) => {
        const eventDate = new Date(event.event_date);
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        );
      });
      if (hasEvent) {
        return (
          <div className="flex justify-center mt-1">
            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 xl:gap-12">
      {/* Sidebar Calendar & Categories */}
      <div className="lg:col-span-4 xl:col-span-4 space-y-8">
        <div className="bg-white rounded-4xl shadow-lg p-6 sm:p-8 border border-secondary sticky top-28">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-bold text-text-light">
                Calendar
              </h2>
              {date && (
                <button
                  onClick={() => setDate(null)}
                  className="text-xs font-medium text-primary hover:text-accent transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
            <div className="calendar-wrapper">
              <Calendar
                onChange={(value) => {
                  setDate(value);
                  setCurrentPage(1);
                }}
                value={date}
                tileContent={tileContent}
                className="w-full border-none font-body"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span>Event Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Events List */}
      <div className="lg:col-span-8 xl:col-span-8">
        <div id="events-top" className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-display font-bold text-text-light">Upcoming Events</h2>
          <div className="relative w-full sm:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input
              className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-white text-sm focus:ring-primary focus:border-primary"
              placeholder="Search events..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all font-medium text-sm ${
                  currentPage === page
                    ? "bg-primary text-white shadow-lg shadow-primary/30 font-bold"
                    : "border border-gray-200 text-gray-500 hover:bg-secondary hover:text-primary"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const eventDate = new Date(event.event_date);
  const dateStr = eventDate.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = eventDate.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  // Randomly assign a category color/label for visual variety as per design, since API doesn't provide it yet
  const categories = [
    { label: 'Religious', color: 'text-primary', bg: 'bg-primary/20' },
    { label: 'Workshop', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Ceremony', color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Cultural', color: 'text-primary', bg: 'bg-primary/10' }
  ];
  const category = categories[event.id % categories.length];

  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary flex flex-col md:flex-row gap-6 hover:-translate-y-1">
      <div className="md:w-1/3 h-48 md:h-auto relative rounded-2xl overflow-hidden shrink-0">
        <div className={`absolute inset-0 ${category.bg} mix-blend-multiply z-10`}></div>
        {event.featured_image ? (
          <Image
            src={mediaUrl(event.featured_image.url)}
            alt={event.featured_image.alternativeText || event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
           <div className="w-full h-full bg-gray-200 flex items-center justify-center">
             <span className="material-symbols-outlined text-4xl text-gray-400">event</span>
           </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg z-20 shadow-sm">
          <span className={`text-xs font-bold ${category.color} uppercase tracking-wider`}>{category.label}</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base text-accent">calendar_month</span> {dateStr}</span>
          <span className="h-3 w-px bg-gray-300"></span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base text-accent">schedule</span> {timeStr}</span>
        </div>
        
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors capitalize">
          {event.title}
        </h3>
        
        <div className="flex items-start gap-2 mb-4">
          <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
          <span className="text-gray-600">{event.location}</span>
        </div>
        
        <div className="text-gray-500 text-sm mb-6 line-clamp-2">
           <BlocksRenderer content={event.body} />
        </div>
        
        <div className="mt-auto">
          <a href={event.link || "#"} className="inline-flex items-center text-primary font-bold tracking-wide text-sm hover:text-accent transition-colors group/btn">
            EVENT DETAILS <span className="material-symbols-outlined text-sm ml-1 transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
