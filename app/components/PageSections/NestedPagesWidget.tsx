import React from "react";
import Link from "next/link";
import { NavigationItem } from "@/types/navigation";

interface NestedPagesWidgetProps {
  items: NavigationItem[];
}

const NestedPagesWidget = ({ items }: NestedPagesWidgetProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.url || "#"}
            className="group relative bg-white rounded-[2rem] p-8 shadow-sm border border-secondary transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex flex-col h-full overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/50 rounded-bl-[4rem] -mr-8 -mt-8 transition-all group-hover:bg-primary/20 group-hover:scale-110 duration-500"></div>
            
            <h2 className="text-2xl font-display font-bold text-text-light mb-3 group-hover:text-accent transition-colors relative z-10">
              {item.title}
            </h2>
            
            {/* Description placeholder - since NavigationItem doesn't have description, we omit or use a generic one if needed. 
                For now, keeping the layout structure but empty or minimal. 
            */}
            <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow relative z-10">
              {/* We don't have a description in the navigation item, so we can either leave this empty or put a placeholder. 
                 Leaving it empty might break the layout if flex-grow is expected to push the button down. 
                 Let's put a generic text or just hide it if empty. 
                 Actually, let's try to fetch it or just leave it out. 
                 The user said "create widgets like this", implying the visual. 
                 Without content, it might look empty. 
                 I'll leave the paragraph tag but empty for now, or maybe just the title is enough?
                 Let's assume no description for now.
              */}
            </p>

            <div className="mt-auto flex items-center text-primary font-bold text-sm tracking-wide uppercase group-hover:text-accent transition-colors relative z-10">
              Explore <span className="material-symbols-outlined text-lg ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NestedPagesWidget;
