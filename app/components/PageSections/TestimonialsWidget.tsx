import React from 'react';
import { TestimonialsWidgetSection } from '@/types/page';
import Image from 'next/image';

interface TestimonialsWidgetProps {
  data: TestimonialsWidgetSection;
}

export default function TestimonialsWidget({ data }: TestimonialsWidgetProps) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-display font-bold text-text-light mb-8 border-b border-primary/20 pb-4">
          Voices of Our Community
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                {testimonial.photo ? (
                  <Image
                    src={testimonial.photo.url}
                    alt={testimonial.author_name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-gray-400">person</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="material-symbols-outlined text-3xl opacity-80">format_quote</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                  {testimonial.author_name}
                </h3>
                <p className="text-primary text-sm font-bold uppercase tracking-wide mb-4">
                  {testimonial.designation}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic flex-1">
                  "{testimonial.body}"
                </p>
                <a
                  className="inline-flex items-center text-accent text-xs font-bold uppercase tracking-widest hover:gap-2 transition-all"
                  href="#"
                >
                  Read Full Story <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Placeholder - Logic can be added if API supports it */}
        {data.testimonials.length > 4 && (
            <div className="mt-12 flex justify-center gap-2">
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white shadow-md hover:bg-primary transition-colors" href="#">1</a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-secondary text-gray-600 hover:bg-secondary/50 transition-colors" href="#">2</a>
            <span className="flex items-center justify-center w-10 h-10 text-gray-400">...</span>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-secondary text-gray-600 hover:bg-secondary/50 transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
            </a>
            </div>
        )}
      </div>
    </div>
  );
}
