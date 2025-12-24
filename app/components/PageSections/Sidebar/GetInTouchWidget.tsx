import React from 'react';
import { GetInTouchWidgetSection } from '@/types/page';
import Link from 'next/link';

interface GetInTouchWidgetProps {
  data: GetInTouchWidgetSection;
}

export default function GetInTouchWidget({ data }: GetInTouchWidgetProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
        <span className="material-symbols-outlined text-[10rem]">mail</span>
      </div>
      <h3 className="text-xl font-display font-bold mb-2 relative z-10">{data.title}</h3>
      {data.description && (
        <p className="text-white/80 text-sm mb-6 relative z-10 font-light">{data.description}</p>
      )}
      
      <div className="relative z-10 space-y-4 mt-4">
        {data.contact_number && (
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined bg-white/20 p-2 rounded-full text-sm">call</span>
                <span className="text-sm font-medium">{data.contact_number}</span>
            </div>
        )}
        {data.email && (
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined bg-white/20 p-2 rounded-full text-sm">mail</span>
                <span className="text-sm font-medium">{data.email}</span>
            </div>
        )}
      </div>

      {data.button_link && (
        <div className="mt-6 relative z-10">
            <Link 
                href={data.button_link}
                className="block w-full py-3 bg-white text-accent font-bold rounded-lg shadow-sm hover:bg-pink-50 transition-colors uppercase text-xs tracking-wider text-center"
            >
                {data.button_label || 'Contact Us'}
            </Link>
        </div>
      )}
    </div>
  );
}
