import { QuickLinksSection } from "@/types/page";
import Link from "next/link";

export default function QuickLinks({ data }: { data: QuickLinksSection }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-md border-t-4 border-accent sticky top-32">
      <h3 className="text-xl font-display font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
        {data.title}
      </h3>
      <div className="space-y-3">
        {data.menu_items.map((item, index) => (
          <Link
            key={item.id || index}
            href={item.page_link || "#"}
            className="flex items-center gap-4 p-3 rounded-xl bg-background-light hover:bg-secondary/50 transition-all group border border-transparent hover:border-primary/20"
          >
            <div className="bg-primary/10 text-accent rounded-lg p-2 group-hover:bg-accent group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">link</span>
            </div>
            <div>
              <span className="block text-xs text-gray-400 uppercase tracking-wider mb-0.5 font-light">
                Link
              </span>
              <span className="font-bold text-sm text-gray-700">
                {/* Placeholder since we don't have label in JSON example */}
                Item {item.id}
              </span>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-accent ml-auto transition-colors">
              chevron_right
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
