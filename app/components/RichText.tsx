"use client";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import { type ReactNode } from "react";

const isExternalUrl = (url?: string | null) => !!url && /^https?:\/\//i.test(url);

export default function RichText({ nodes }: { nodes: any }) {
  if (!nodes) return null;
  
  return (
    <div className="prose prose-lg max-w-none 
      prose-headings:font-display prose-headings:font-bold prose-headings:text-text-light
      prose-p:text-gray-600 prose-p:leading-relaxed
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-strong:text-text-light
      prose-img:rounded-2xl
      prose-li:text-gray-600
      prose-ul:list-disc prose-ol:list-decimal">
      <BlocksRenderer 
        content={nodes as BlocksContent} 
        blocks={{
          paragraph: ({ children }: { children?: ReactNode }) => <p className="mb-6 leading-relaxed text-gray-700">{children}</p>,
          heading: ({ children, level }: { children?: ReactNode; level: number }) => {
            switch (level) {
              case 1: return (
                <div className="relative mb-8 group">
                  <h1 className="text-4xl font-display font-bold text-text-light pr-4">{children}</h1>
                  <div className="h-1 w-20 bg-primary mt-2 rounded-full transition-all group-hover:w-32"></div>
                </div>
              );
              case 2: return (
                <div className="flex items-center gap-4 mb-6 mt-10 group">
                  <h2 className="text-3xl font-display font-bold text-text-light whitespace-nowrap">{children}</h2>
                  <div className="h-px grow bg-linear-to-r from-primary/40 to-transparent"></div>
                </div>
              );
              case 3: return <h3 className="text-2xl font-display font-bold text-accent mb-4 mt-8 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-gold rounded-full"></span>
                {children}
              </h3>;
              default: return <h4 className="text-xl font-display font-bold text-text-light mb-4 mt-6">{children}</h4>;
            }
          },
          list: ({ children, format }: { children?: ReactNode; format?: 'ordered' | 'unordered' }) => 
            format === 'ordered' ? (
              <ol className="mb-8 ml-4 space-y-4 [counter-reset:section]">{children}</ol>
            ) : (
              <ul className="mb-8 ml-2 space-y-4">{children}</ul>
            ),
          'list-item': ({ children }: { children?: ReactNode }) => (
            <li className="flex gap-4 items-start group">
              <div className="shrink-0 mt-1.5">
                <div className="w-5 h-5 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed">{children}</div>
            </li>
          ),
          link: ({ children, url }: { children?: ReactNode; url: string }) => {
            if (!url) return <>{children}</>;
            return (
              <Link 
                href={url} 
                className="inline-flex items-center gap-1 text-accent font-bold border-b-2 border-accent/20 hover:border-accent transition-all"
                {...(isExternalUrl(url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {children}
                <span className="material-symbols-outlined text-[14px]">north_east</span>
              </Link>
            );
          },
          quote: ({ children }: { children?: ReactNode }) => (
            <div className="relative my-10 pl-10 pr-6 py-8 bg-secondary/10 rounded-2xl border-l-4 border-gold overflow-hidden">
              <span className="absolute top-2 left-2 text-6xl text-gold/20 font-serif">&quot;</span>
              <div className="relative z-10 italic text-xl text-text-light font-display leading-relaxed">
                {children}
              </div>
            </div>
          ),
          code: ({ plainText }: { plainText?: string }) => (
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto my-8 shadow-inner font-mono text-sm border border-white/10">
              <code>{plainText}</code>
            </pre>
          ),
        }}
        modifiers={{
          bold: ({ children }: { children?: ReactNode }) => (
            <strong className="font-bold text-accent bg-secondary/30 px-1 rounded-sm">{children}</strong>
          ),
          italic: ({ children }: { children?: ReactNode }) => <em className="italic text-gray-800 border-b border-gold/30">{children}</em>,
        }}
      />
    </div>
  );
}
