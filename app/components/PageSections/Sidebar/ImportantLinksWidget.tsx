import React from 'react';
import { ImportantLinksWidgetSection } from '@/types/page';
import Link from 'next/link';

interface ImportantLinksWidgetProps {
  data: ImportantLinksWidgetSection;
}

export default function ImportantLinksWidget({ data }: ImportantLinksWidgetProps) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border-t-4 border-gold p-6 sm:p-8">
      <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-gold">link</span>
        {data.title}
      </h3>
      <ul className="space-y-4">
        {data.links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.url}
              className="group flex items-center justify-between p-3 rounded-xl bg-background-light dark:bg-gray-800 hover:bg-secondary/30 transition-colors border border-transparent hover:border-gold/20"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gold transition-colors">
                {link.label}
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
