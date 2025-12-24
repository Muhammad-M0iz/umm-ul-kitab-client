import { ItemGridBlock as ItemGridBlockType } from "@/types/home";
import { mediaUrl } from "@/lib/strapi";

const accentClasses = [
  { bg: 'bg-accent', icon: 'volunteer_activism' },
  { bg: 'bg-primary', icon: 'palette' }
];

export default function ItemGridBlock({ data }: { data: ItemGridBlockType }) {
  const items = data.items || [];
  if (!items.length) return null;

  const imageItems = items.slice(0, 3);
  const coloredItems = items.slice(3, 5);

  return (
    // CHANGE: bg-white instead of bg-secondary/20
    <section className="py-20 bg-white border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Campus Life</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-light mb-6">
            {data.title || "Life at Jamia"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
          {imageItems[0] && (
            <div className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer">
              {imageItems[0].photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={mediaUrl(imageItems[0].photo.url)} 
                  alt={imageItems[0].item_title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold font-display mb-1">{imageItems[0].item_title}</h3>
                <p className="text-sm text-gray-300">{imageItems[0].item_subtitle}</p>
              </div>
            </div>
          )}

          {imageItems.slice(1, 3).map((it) => (
            <div key={it.id} className="relative group rounded-2xl overflow-hidden cursor-pointer">
              {it.photo && (
                 // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={mediaUrl(it.photo.url)} 
                  alt={it.item_title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold font-display">{it.item_title}</h3>
              </div>
            </div>
          ))}

          {coloredItems.map((it, idx) => {
             const style = accentClasses[idx % accentClasses.length];
             return (
              <div key={it.id} className={`relative group rounded-2xl overflow-hidden cursor-pointer ${style.bg} flex items-center justify-center flex-col text-white p-6 text-center`}>
                <span className="material-symbols-outlined text-4xl mb-2">{style.icon}</span>
                <h3 className="text-lg font-bold font-display mb-1">{it.item_title}</h3>
                <p className="text-xs text-white/80">{it.item_subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}