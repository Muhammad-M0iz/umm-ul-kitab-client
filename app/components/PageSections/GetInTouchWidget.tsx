import { GetInTouchWidgetSection } from "@/types/page";
import Link from "next/link";

export default function GetInTouchWidget({ data }: { data: GetInTouchWidgetSection }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-md border-t-4 border-accent mb-8">
      <h3 className="text-xl font-display font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
        {data.title}
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <a
          href={`tel:${data.contact_number}`}
          className="flex flex-col items-center justify-center p-4 bg-secondary/30 hover:bg-secondary/60 rounded-2xl transition-all group"
        >
          <span className="material-symbols-outlined text-accent text-2xl mb-2 group-hover:scale-110 transition-transform">
            call
          </span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
            Call Now
          </span>
        </a>
        <a
          href={`mailto:${data.email}`}
          className="flex flex-col items-center justify-center p-4 bg-secondary/30 hover:bg-secondary/60 rounded-2xl transition-all group"
        >
          <span className="material-symbols-outlined text-accent text-2xl mb-2 group-hover:scale-110 transition-transform">
            mail
          </span>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
            Email Us
          </span>
        </a>
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
              Address
            </span>
            <p className="text-sm font-medium text-gray-700">
              Jamia Ummul Kitab,<br />
              Main Campus, Lahore, Pakistan
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">
              Office Hours
            </span>
            <p className="text-sm font-medium text-gray-700">
              Mon - Sat: 8:00 AM - 4:00 PM<br />
              Friday: 8:00 AM - 12:00 PM
            </p>
          </div>
        </div>
      </div>
      {data.button_label && (
        <Link
          href={data.button_link || "#"}
          className="block w-full py-4 bg-accent hover:bg-primary text-white text-center font-bold uppercase tracking-wide text-sm rounded-xl shadow-lg shadow-accent/20 transition-all hover:-translate-y-1"
        >
          {data.button_label}
        </Link>
      )}
    </div>
  );
}
