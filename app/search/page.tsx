'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSearch, type SearchHit } from '@/app/hooks/useSearch';

// Helper to format index titles (e.g., "news-articles" -> "News Articles")
const formatIndexTitle = (value: string) =>
  value
    .split(/[-_]/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');

// Helper to format date for Event Card
const formatDate = (dateString?: string) => {
  if (!dateString) return { day: '??', month: '???' };
  const date = new Date(dateString);
  return {
    day: date.getDate().toString(),
    month: date.toLocaleString('default', { month: 'short' }),
  };
};

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { query, setQuery, results, status, error, hasResults, activeQuery } = useSearch({ initialQuery });
  const router = useRouter();

  // Sync URL with active query
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeQuery) {
      params.set('q', activeQuery);
    }
    const search = params.toString();
    // Use replace to avoid cluttering history, scroll: false to maintain position
    router.replace(`/search${search ? `?${search}` : ''}`, { scroll: false });
  }, [activeQuery, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The hook handles the search execution via debounce or we can force it here if needed,
    // but the hook's useEffect on query change handles it.
    // Actually, the hook debounces. If we want immediate submit on enter, we might need to trigger it.
    // But for now, let's rely on the hook's debounce which is standard for "type to search".
    // If the user presses enter, it just prevents form submission refresh.
  };

  return (
    <main className="flex-grow relative min-h-screen">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-pattern-islamic opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-accent mb-6">Search Results</h1>
          <p className="text-gray-500 text-lg">Find courses, articles, events, and more</p>
        </div>

        {/* Search Input */}
        <div className="bg-white p-2 rounded-full shadow-[0_4px_20px_0_rgba(192,139,155,0.15)] border border-primary/20 mb-16 relative group focus-within:ring-2 focus-within:ring-primary/30 transition-all duration-300">
          <form className="flex items-center w-full" onSubmit={handleSearchSubmit}>
            <span className="material-symbols-outlined absolute left-6 text-gray-400 text-2xl group-focus-within:text-primary transition-colors">search</span>
            <input
              className="w-full pl-16 pr-32 py-4 rounded-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-lg font-light outline-none"
              placeholder="Type to search..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <div className="absolute right-2 flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-primary uppercase tracking-wider px-3 py-2 transition-colors" type="button">
                Filters <span className="material-symbols-outlined text-sm">tune</span>
              </button>
              <button className="bg-primary hover:bg-accent text-white h-12 w-12 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg transform active:scale-95" type="submit">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* Status Messages */}
        {status === 'loading' && !hasResults && (
           <div className="text-center text-gray-500 py-12">Searching...</div>
        )}
        
        {error && (
          <p className="text-center text-red-500 mb-8">{error}</p>
        )}

        {status === 'success' && !hasResults && query.trim() !== '' && (
           <p className="text-center text-gray-500 text-lg">No results found for "{query}". Try another keyword.</p>
        )}

        {/* Results */}
        <div className="space-y-12">
          {results.map((group) => (
            <section key={group.indexUid}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-display font-bold text-text-light">{formatIndexTitle(group.indexUid)}</h2>
                <span className="h-px flex-grow bg-gradient-to-r from-primary/30 to-transparent"></span>
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{group.estimatedTotalHits} results</span>
              </div>
              
              <div className="space-y-4">
                {group.hits.map((hit, index) => (
                  <ResultCard key={hit.id || hit.documentId || index} hit={hit} indexUid={group.indexUid} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Load More (Placeholder - functionality not in hook yet) */}
        {hasResults && (
          <div className="pt-12 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide">
              Load More Results
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function ResultCard({ hit, indexUid }: { hit: SearchHit; indexUid: string }) {
  // Determine card type based on indexUid
  const isEvent = indexUid.includes('event');
  const isPage = indexUid.includes('page');
  // Default to news/article style

  const title = (hit.title as string) || 'Untitled';
  const description = (hit.description as string) || (hit.content as string)?.substring(0, 150) || '';
  const slug = (hit.slug as string) || '#';
  
  // Construct URL - adjust based on your routing structure
  const href = isEvent ? `/events/${slug}` : isPage ? `/${slug}` : `/news/${slug}`;

  if (isEvent) {
    const { day, month } = formatDate(hit.startDate as string || hit.publishedAt as string);
    return (
      <Link href={href} className="block bg-white rounded-2xl p-6 border border-secondary hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-32 sm:h-24 bg-secondary/30 rounded-xl flex-shrink-0 flex flex-col items-center justify-center text-accent">
            <span className="text-lg font-bold font-display">{day}</span>
            <span className="text-xs uppercase tracking-wider font-bold">{month}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2 block group-hover:text-primary transition-colors">Event</span>
            <h3 className="text-xl font-bold font-display text-text-light mb-2 group-hover:text-accent transition-colors">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{description}</p>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wide">
              <span>View Details</span>
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (isPage) {
    return (
      <Link href={href} className="block bg-white rounded-2xl p-6 border border-secondary hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2 block group-hover:text-primary transition-colors">Page</span>
            <h3 className="text-xl font-bold font-display text-text-light group-hover:text-accent transition-colors">{title}</h3>
          </div>
          <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-3xl">article</span>
        </div>
      </Link>
    );
  }

  // Default / News Style
  return (
    <Link href={href} className="block bg-white rounded-2xl p-6 border border-secondary hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
      <div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2 block group-hover:text-primary transition-colors">
            {indexUid.includes('news') ? 'News Article' : 'Result'}
        </span>
        <h3 className="text-xl font-bold font-display text-text-light mb-2 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
