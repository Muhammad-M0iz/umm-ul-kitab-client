import React from "react";
import Link from "next/link";
import { getFooterData } from "@/lib/footer";

export default async function Footer() {
  const footerData = await getFooterData();

  if (!footerData) {
    return null;
  }

  const { title, subtitle, copyright_text, contact, Quicklinks, importantLinks } = footerData;

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t-8 border-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern-islamic opacity-5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white text-primary flex items-center justify-center font-serif font-bold text-xl shadow-lg">
                JUW
              </div>
              <div>
                <span className="block text-xl font-display font-bold tracking-wide">
                  {title}
                </span>
                <span className="text-xs text-primary font-medium tracking-widest uppercase">
                  {subtitle}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              An institute committed to the revival of Islamic civilization through education, character building, and social reform.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons - Placeholder as they are not in the API yet, or we can hardcode common ones */}
              <a href="#" className="bg-white/5 hover:bg-primary hover:text-white text-gray-400 p-3 rounded-full transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a href="#" className="bg-white/5 hover:bg-primary hover:text-white text-gray-400 p-3 rounded-full transition-all duration-300">
                <span className="sr-only">Twitter</span>
                <span className="material-symbols-outlined text-xl">alternate_email</span>
              </a>
              <a href="#" className="bg-white/5 hover:bg-primary hover:text-white text-gray-400 p-3 rounded-full transition-all duration-300">
                <span className="sr-only">YouTube</span>
                <span className="material-symbols-outlined text-xl">play_circle</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {Quicklinks.map((section) => (
            <div key={section.id}>
              <h3 className="text-lg font-display font-bold mb-6 text-primary">
                {section.title}
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm font-light">
                {section.menu_items.map((item) => {
                  const href = item.custom_url || (item.page_link ? `/${item.page_link.slug}` : "#");
                  return (
                    <li key={item.id}>
                      <Link
                        href={href}
                        className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Important Links */}
          {importantLinks.map((section) => (
            <div key={section.id}>
              <h3 className="text-lg font-display font-bold mb-6 text-primary">
                {section.title}
              </h3>
              <ul className="space-y-3 text-gray-400 text-sm font-light">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      target={link.isExternal ? "_blank" : undefined}
                      className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-primary">
              Contact
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">
                  location_on
                </span>
                <span>{contact.location}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">
                  call
                </span>
                <span>{contact.number}</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light">
          <p>{copyright_text}</p>
          <div className="flex space-x-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
