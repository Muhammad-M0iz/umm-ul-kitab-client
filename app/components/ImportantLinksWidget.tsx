import { ImportantLinksWidget as ImportantLinksWidgetType } from "@/types/home";

const linkStyles = [
  { 
    bg: 'bg-primary/10', text: 'text-primary', hoverBg: 'group-hover:bg-primary', hoverText: 'group-hover:text-primary', 
    icon: 'menu_book' 
  },
  { 
    bg: 'bg-accent/10', text: 'text-accent', hoverBg: 'group-hover:bg-accent', hoverText: 'group-hover:text-accent',
    icon: 'how_to_reg'
  },
  { 
    bg: 'bg-gold/10', text: 'text-gold', hoverBg: 'group-hover:bg-gold', hoverText: 'group-hover:text-gold',
    icon: 'download'
  },
  { 
    bg: 'bg-purple-100', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', hoverText: 'group-hover:text-purple-600',
    icon: 'contact_support'
  },
];

export default function ImportantLinksWidget({ data }: { data: ImportantLinksWidgetType }) {
  const links = data.links || [];
  if (!links.length) return null;

  return (
    <section className="py-20 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Quick Access</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-light mb-6">
            {data.title || "Important Links"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {links.map((l, idx) => {
            const style = linkStyles[idx % linkStyles.length];
            return (
              // FIX: Use 'idx' or combined key to ensure uniqueness
              <a key={`${l.id}-${idx}`} href={l.url || "#"} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center gap-4 border border-gray-100">
                <div className={`w-16 h-16 rounded-full ${style.bg} flex items-center justify-center ${style.text} ${style.hoverBg} group-hover:text-white transition-colors`}>
                  <span className="material-symbols-outlined text-3xl">{l.icon || style.icon}</span>
                </div>
                <h3 className={`font-bold text-gray-800 ${style.hoverText} transition-colors`}>
                  {l.label}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}