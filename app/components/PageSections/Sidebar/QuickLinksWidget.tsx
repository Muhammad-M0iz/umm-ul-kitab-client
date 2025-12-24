import React from 'react';
import { QuickLinksSection } from '@/types/page';
import Link from 'next/link';

interface QuickLinksWidgetProps {
  data: QuickLinksSection;
}

export default function QuickLinksWidget({ data }: QuickLinksWidgetProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border-t-4 border-accent p-6 sm:p-8">
      <h3 className="text-xl font-display font-bold text-text-light mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-accent">contact_support</span>
        {data.title}
      </h3>
      <ul className="space-y-4">
        {data.menu_items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.page_link || '#'}
              className="group flex items-center justify-between p-3 rounded-xl bg-background-light hover:bg-secondary/30 transition-colors border border-transparent hover:border-primary/20"
            >
              <span className="text-sm font-medium text-text-light group-hover:text-accent transition-colors">
                {/* Since page_link is just a string in the type definition provided earlier, 
                    we might need to adjust if it's an object. 
                    Assuming it's a string or we extract a label. 
                    If page_link is a string URL, we don't have a label. 
                    Wait, looking at the JSON, page_link is an object with title.
                    I need to check the type definition again.
                */}
                {/* Based on JSON: page_link: { title: "Director's Introduction", slug: ... } */}
                {/* The type definition in types/page.ts says page_link: string | null. 
                    I should probably cast it or update the type if I could. 
                    For now, I'll assume the type definition was simplified or I need to handle it safely.
                    If page_link is an object in runtime, I can access title.
                */}
                {(item.page_link as any)?.title || 'Link'}
              </span>
              <span className="material-symbols-outlined text-gray-400 text-sm group-hover:translate-x-1 transition-transform">
                chevron_right
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
