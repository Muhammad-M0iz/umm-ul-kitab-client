import { EventsWidget as EventsWidgetType } from "@/types/home";
import { mediaUrl } from "@/lib/strapi";

export default function EventsWidget({ data }: { data: EventsWidgetType }) {
  const items = data.featured_events || [];
  if (!items.length) return null;

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Mark Your Calendar</span>
            <h2 className="text-4xl font-display font-bold text-text-light">Upcoming Events</h2>
          </div>
          <a className="hidden sm:flex items-center text-accent font-bold text-sm uppercase tracking-wide border-b border-accent pb-1 hover:text-primary hover:border-primary transition-colors" href="#">
            View All Events <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
          </a>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {items.map((e) => {
            const dateObj = new Date(e.event_date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
            const img = e.featured_image && mediaUrl(e.featured_image.url);
            
            return (
              <div key={e.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300 overflow-hidden group">
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <span className="material-symbols-outlined text-5xl">event</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex gap-4">
                    <div className="bg-secondary/50 text-center rounded-lg p-3 min-w-[70px] h-min">
                      <span className="block text-2xl font-bold text-accent font-display">{day}</span>
                      <span className="block text-xs uppercase font-bold text-gray-500">{month}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{e.title}</h3>
                      {e.time && (
                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">schedule</span> {e.time}
                        </p>
                      )}
                      {e.location && (
                        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base">location_on</span> {e.location}
                        </p>
                      )}
                      <a className="text-primary text-xs font-bold uppercase tracking-wide hover:underline" href={e.link || "#"}>Details</a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}