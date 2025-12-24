"use client";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import ReactMarkdown from 'react-markdown';
import { RichTextBlockSection } from "@/types/page";
import Link from 'next/link';
import Image from 'next/image';
import { createElement, type ReactNode } from 'react';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

const isExternalUrl = (url?: string | null) => !!url && /^https?:\/\//i.test(url);

// --- Shared Fancy Components ---

const FancyH1 = ({ children }: { children?: ReactNode }) => (
  <div className="relative mb-8 group mt-10">
    <h1 className="text-4xl font-display font-bold text-text-light pr-4">{children}</h1>
    <div className="h-1 w-20 bg-primary mt-2 rounded-full transition-all group-hover:w-32"></div>
  </div>
);

const FancyH2 = ({ children }: { children?: ReactNode }) => (
  <div className="flex items-center gap-4 mb-6 mt-12 group">
    <h2 className="text-3xl font-display font-bold text-text-light whitespace-nowrap">{children}</h2>
    <div className="h-px grow bg-linear-to-r from-primary/40 to-transparent"></div>
  </div>
);

const FancyH3 = ({ children }: { children?: ReactNode }) => (
  <h3 className="text-2xl font-display font-bold text-accent mb-4 mt-8 flex items-center gap-2">
    <span className="w-1.5 h-6 bg-gold rounded-full"></span>
    {children}
  </h3>
);

const FancyH4 = ({ children }: { children?: ReactNode }) => (
  <h4 className="text-xl font-display font-bold text-text-light mb-4 mt-6">{children}</h4>
);

const FancyParagraph = ({ children }: { children?: ReactNode }) => (
  <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p>
);

const FancyLink = ({ children, href }: { children?: ReactNode; href?: string }) => {
  if (!href) return <>{children}</>;
  return (
    <Link 
      href={href} 
      className="inline-flex items-center gap-1 text-accent font-bold border-b-2 border-accent/20 hover:border-accent transition-all"
      {...(isExternalUrl(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span className="material-symbols-outlined text-[14px]">north_east</span>
    </Link>
  );
};

const FancyQuote = ({ children }: { children?: ReactNode }) => (
  <div className="relative my-10 pl-10 pr-6 py-8 bg-secondary/10 rounded-2xl border-l-4 border-gold overflow-hidden">
    <span className="absolute top-2 left-2 text-6xl text-gold/20 font-serif">&quot;</span>
    <div className="relative z-10 italic text-xl text-text-light font-display leading-relaxed">
      {children}
    </div>
  </div>
);

const FancyCode = ({ children }: { children?: ReactNode }) => (
  <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto my-8 shadow-inner font-mono text-sm border border-white/10">
    <code>{children}</code>
  </pre>
);

const FancyList = ({ children, ordered }: { children?: ReactNode; ordered?: boolean }) => {
  if (ordered) {
    return <ol className="mb-8 ml-4 space-y-4 [counter-reset:section]">{children}</ol>;
  }
  return <ul className="mb-8 ml-2 space-y-4">{children}</ul>;
};

const FancyListItem = ({ children }: { children?: ReactNode }) => (
  <li className="flex gap-4 items-start group">
    <div className="shrink-0 mt-1.5">
      <div className="w-5 h-5 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
      </div>
    </div>
    <div className="text-gray-700 leading-relaxed text-lg">{children}</div>
  </li>
);

// --- Configuration for BlocksRenderer ---

const blockOverrides = {
  paragraph: ({ children }: { children?: ReactNode }) => <FancyParagraph>{children}</FancyParagraph>,
  heading: ({ children, level }: { children?: ReactNode; level: number }) => {
    switch (level) {
      case 1: return <FancyH1>{children}</FancyH1>;
      case 2: return <FancyH2>{children}</FancyH2>;
      case 3: return <FancyH3>{children}</FancyH3>;
      default: return <FancyH4>{children}</FancyH4>;
    }
  },
  list: ({ children, format }: { children?: ReactNode; format?: 'ordered' | 'unordered' }) => 
    <FancyList ordered={format === 'ordered'}>{children}</FancyList>,
  'list-item': ({ children }: { children?: ReactNode }) => <FancyListItem>{children}</FancyListItem>,
  link: ({ children, url }: { children?: ReactNode; url: string }) => <FancyLink href={url}>{children}</FancyLink>,
  quote: ({ children }: { children?: ReactNode }) => <FancyQuote>{children}</FancyQuote>,
  code: ({ plainText }: { plainText?: string }) => <FancyCode>{plainText}</FancyCode>,
  image: ({ image }: { image?: { url?: string; alternativeText?: string | null; width?: number; height?: number; caption?: string | null } }) => {
    if (!image?.url) return null;
    const src = image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
    return (
      <figure className="my-10 group">
        <div className="relative overflow-hidden rounded-2xl shadow-lg border border-secondary/30 bg-gray-50">
          <Image
            src={src}
            width={image.width ?? 800}
            height={image.height ?? 450}
            alt={image.alternativeText ?? ''}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        {image.caption && <figcaption className="text-center text-sm text-gray-500 mt-3 italic">{image.caption}</figcaption>}
      </figure>
    );
  },
};

const modifierOverrides = {
  bold: ({ children }: { children?: ReactNode }) => (
    <strong className="font-bold text-accent bg-secondary/30 px-1 rounded-sm">{children}</strong>
  ),
  italic: ({ children }: { children?: ReactNode }) => <em className="italic text-gray-800 border-b border-gold/30">{children}</em>,
  code: ({ children }: { children?: ReactNode }) => <code className="bg-gray-100 text-accent px-1.5 py-0.5 rounded font-mono text-sm border border-gray-200">{children}</code>,
};

// --- Configuration for ReactMarkdown ---

const markdownComponents: any = {
  h1: ({ children }: any) => <FancyH1>{children}</FancyH1>,
  h2: ({ children }: any) => <FancyH2>{children}</FancyH2>,
  h3: ({ children }: any) => <FancyH3>{children}</FancyH3>,
  h4: ({ children }: any) => <FancyH4>{children}</FancyH4>,
  h5: ({ children }: any) => <FancyH4>{children}</FancyH4>,
  h6: ({ children }: any) => <FancyH4>{children}</FancyH4>,
  p: ({ children }: any) => <FancyParagraph>{children}</FancyParagraph>,
  a: ({ children, href }: any) => <FancyLink href={href}>{children}</FancyLink>,
  blockquote: ({ children }: any) => <FancyQuote>{children}</FancyQuote>,
  code: ({ children, inline }: any) => inline ? modifierOverrides.code({ children }) : <FancyCode>{children}</FancyCode>,
  ul: ({ children }: any) => <FancyList ordered={false}>{children}</FancyList>,
  ol: ({ children }: any) => <FancyList ordered={true}>{children}</FancyList>,
  li: ({ children }: any) => <FancyListItem>{children}</FancyListItem>,
  strong: ({ children }: any) => modifierOverrides.bold({ children }),
  em: ({ children }: any) => modifierOverrides.italic({ children }),
  img: ({ src, alt }: any) => {
    if (!src) return null;
    return blockOverrides.image({ image: { url: src, alternativeText: alt } });
  }
};

export default function RichTextBlock({ data }: { data: RichTextBlockSection }) {
  const isBlocks = Array.isArray(data.body);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-sm border border-secondary/50 max-w-none mx-auto">
      {isBlocks ? (
        <BlocksRenderer
          content={data.body as BlocksContent}
          blocks={blockOverrides}
          modifiers={modifierOverrides}
        />
      ) : (
        <div className="max-w-none">
          <ReactMarkdown components={markdownComponents}>{data.body as string}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
