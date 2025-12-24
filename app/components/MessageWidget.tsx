import { MessageWidget as MessageWidgetType } from "@/types/home";
import { mediaUrl } from "@/lib/strapi";
import RichText from "./RichText";

export default function MessageWidget({ data }: { data: MessageWidgetType }) {
  const photo = data.author_photo;
  const imageSrc = photo ? mediaUrl(photo.url) : null;

  return (
    // CHANGE: bg-white instead of bg-secondary/30
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-white relative">
          <div className="grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative h-[400px] lg:h-auto overflow-hidden group">
              {imageSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={imageSrc} 
                  alt={photo?.alternativeText || "Director"} 
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                />
              )}
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply"></div>
            </div>
            
            <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center relative">
              <span className="material-symbols-outlined text-primary/10 text-9xl absolute top-4 right-4 rotate-180 select-none">format_quote</span>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-primary"></span>
                  <h3 className="text-xs font-bold tracking-widest text-primary uppercase">Director&apos;s Message</h3>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-6">
                  Message from the <span className="text-accent">Principal</span>
                </h2>
                
                <div className="text-gray-600 italic text-lg lg:text-xl font-display leading-relaxed mb-8">
                   <RichText nodes={data.message_body || []} />
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{data.author_name || "Ustadha Syeda Zahra Naqvi"}</h4>
                    <p className="text-sm text-primary font-medium">{data.author_designation || "Principal, Women's Campus"}</p>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
                  <a className="inline-flex items-center gap-2 text-accent font-bold hover:text-primary transition-colors text-sm uppercase tracking-wide" href="#">
                    Read Full Message <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}