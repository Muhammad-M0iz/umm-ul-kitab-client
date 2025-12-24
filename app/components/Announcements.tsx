import { AnnouncementsWidget as AnnouncementsWidgetType } from "@/types/home";

// Styles extracted exactly from code.html
const cardStyles = [
  { border: 'border-primary', badgeBg: 'bg-primary/10', badgeText: 'text-primary' },
  { border: 'border-gold', badgeBg: 'bg-gold/10', badgeText: 'text-gold' },
  { border: 'border-accent', badgeBg: 'bg-accent/10', badgeText: 'text-accent' },
];

export default function Announcements({ data }: { data: AnnouncementsWidgetType }) {
  const items = data.announcements || [];
  if (!items.length) return null;

  return (
    <section className="py-20 bg-surface-light relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-pattern-geometric opacity-[0.03] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Updates Board</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-light mb-6">Announcements</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a, idx) => {
            const style = cardStyles[idx % cardStyles.length];
            return (
              <div key={a.id} className={`bg-background-light p-6 rounded-xl border-l-4 ${style.border} shadow-sm hover:shadow-md transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`${style.badgeBg} ${style.badgeText} text-[10px] font-bold px-2 py-1 rounded uppercase`}>
                    {a.category || "Academic"}
                  </span>
                  <span className="text-gray-400 text-xs">{a.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.subtitle}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-10 text-center">
          <a className="inline-flex items-center text-accent font-bold text-sm uppercase tracking-wide hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5" href="#">
            View All Announcements <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}