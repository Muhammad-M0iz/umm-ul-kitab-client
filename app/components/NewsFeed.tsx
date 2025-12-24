import { NewsFeedWidget as NewsFeedWidgetType } from "@/types/home";
import { mediaUrl } from "@/lib/strapi";

export default function NewsFeed({ data }: { data: NewsFeedWidgetType }) {
  const items = data.featured_news || [];
  if (!items.length) return null;

  return (
    <section className="py-20 bg-background-light border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Latest Updates</span>
            <h2 className="text-4xl font-display font-bold text-text-light">News Feed</h2>
          </div>
          <a className="hidden sm:flex items-center text-accent font-bold text-sm uppercase tracking-wide border-b border-accent pb-1 hover:text-primary hover:border-primary transition-colors" href="#">
            All News <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((n) => {
             const img = n.cover_image && mediaUrl(n.cover_image.url);
             return (
              <article key={n.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="h-48 overflow-hidden relative">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-primary/30">newspaper</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-accent uppercase tracking-wider">
                    {n.category || "Campus"}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors font-display leading-tight">
                    {n.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {n.excerpt}
                  </p>
                  <a className="inline-flex items-center text-primary font-bold text-xs uppercase tracking-wide group-hover:underline" href={n.link || "#"}>
                    Read More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}