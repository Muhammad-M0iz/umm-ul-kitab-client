import { StatisticsWidget as StatisticsWidgetType } from "@/types/home";

const defaultIcons = ['school', 'groups', 'verified'];

export default function StatisticsWidget({ data }: { data: StatisticsWidgetType }) {
  const stats = data.stats || [];
  if (!stats.length) return null;

  return (
    <section className="py-16 bg-accent text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-islamic opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold">{data.title || "Jamia at a Glance"}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:divide-x divide-white/20">
          {stats.map((s, idx) => (
            <div key={s.id} className="p-4">
              <span className="material-symbols-outlined text-5xl text-gold mb-2 block mx-auto">
                {s.icon || defaultIcons[idx % 3]}
              </span>
              <p className="text-5xl font-bold font-display mb-1">{s.number}</p>
              <p className="text-sm uppercase tracking-wider font-light opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}