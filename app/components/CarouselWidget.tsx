import { CarouselWidget as CarouselWidgetType } from "@/types/home";
import { mediaUrl } from "@/lib/strapi";

export default function CarouselWidget({ data }: { data: CarouselWidgetType }) {
  const slides = data.slides || [];
  if (!slides.length) return null;

  return (
    <section className="relative bg-background-light overflow-hidden group">
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth h-[600px] sm:h-[700px]">
        {slides.map((s, idx) => {
          const img = s.image?.[0];
          const src = mediaUrl(img?.url || "");
          
          return (
            <div key={s.id} className="min-w-full h-full snap-center relative flex items-center justify-center bg-gray-100">
              {src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={src} 
                  alt={img?.alternativeText || s.title || "slide"} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              )}
              {/* Gradient Overlay from HTML */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10">
                <div className="max-w-3xl space-y-6">
                  {s.title && (
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight drop-shadow-lg">
                      {s.title}
                    </h1>
                  )}
                  
                  {s.subtitle && (
                    <p className="text-lg md:text-xl text-gray-200 font-light max-w-xl leading-relaxed drop-shadow-md">
                      {s.subtitle}
                    </p>
                  )}
                  
                  <div className="pt-4 flex gap-4">
                    <a className="bg-primary hover:bg-white hover:text-primary text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2" href="#">
                      Apply Now <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-accent px-8 py-3 rounded-full font-bold transition-all shadow-lg" href="#">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            className={`w-3 h-3 rounded-full shadow-md ${idx === 0 ? 'bg-white' : 'bg-white/40 hover:bg-white'} transition-colors`} 
          />
        ))}
      </div>
      
      <button className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-all hidden md:block">
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-sm transition-all hidden md:block">
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </section>
  );
}