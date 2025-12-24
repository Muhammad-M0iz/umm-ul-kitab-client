"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavigationItem } from "@/types/navigation";

interface NavItemProps {
  item: NavigationItem;
  depth?: number;
}

const NavItem = ({ item, depth = 0 }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100); // Small delay to prevent flickering
  };

  // Base styles for links
  const linkStyles =
    depth === 0
      ? `relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
          isOpen
            ? "text-primary bg-primary/5"
            : "text-gray-700 hover:text-primary hover:bg-primary/5"
        }`
      : `group relative flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors duration-200 ${
          isOpen
            ? "text-primary bg-gray-50"
            : "text-gray-600 hover:text-primary hover:bg-gray-50"
        }`;

  // Dropdown container styles
  const dropdownStyles =
    depth === 0
      ? "absolute top-full left-0 mt-2 w-64 bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100 py-2 z-50 origin-top"
      : "absolute top-0 left-full ml-0.5 w-64 bg-white shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-100 py-2 z-50 origin-top-left";

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.url ? (
        <Link href={item.url} className={linkStyles}>
          {depth > 0 && (
            <span className="absolute start-0 top-2 bottom-2 w-1 bg-primary rounded-e-full scale-y-0 transition-transform duration-300 origin-center group-hover:scale-y-100"></span>
          )}
          <span className="truncate">{item.title}</span>
          {hasChildren && (
            <span
              className={`material-symbols-outlined text-[1.1rem] transition-transform duration-300 ${
                isOpen && depth === 0 ? "rotate-180" : ""
              }`}
            >
              {depth === 0 ? "expand_more" : "chevron_right"}
            </span>
          )}
        </Link>
      ) : (
        <button className={linkStyles}>
          {depth > 0 && (
            <span className="absolute start-0 top-2 bottom-2 w-1 bg-primary rounded-e-full scale-y-0 transition-transform duration-300 origin-center group-hover:scale-y-100"></span>
          )}
          <span className="truncate">{item.title}</span>
          {hasChildren && (
            <span
              className={`material-symbols-outlined text-[1.1rem] transition-transform duration-300 ${
                isOpen && depth === 0 ? "rotate-180" : ""
              }`}
            >
              {depth === 0 ? "expand_more" : "chevron_right"}
            </span>
          )}
        </button>
      )}

      {hasChildren && isOpen && (
        <div
          className={`${dropdownStyles} animate-in fade-in zoom-in-95 duration-200`}
        >
          {item.children
            .sort((a, b) => a.order - b.order)
            .map((child) => (
              <NavItem key={child.id} item={child} depth={depth + 1} />
            ))}
        </div>
      )}
    </div>
  );
};

interface NavbarProps {
  navigation: NavigationItem[];
}

export default function Navbar({ navigation }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sortedNavigation = [...navigation].sort((a, b) => a.order - b.order);

  // Logic to handle "More" dropdown if too many items
  const DISPLAY_LIMIT = 5;
  const visibleItems = sortedNavigation.slice(0, DISPLAY_LIMIT);
  const moreItems = sortedNavigation.slice(DISPLAY_LIMIT);

  const moreItem: NavigationItem | null =
    moreItems.length > 0
      ? {
          id: 9999,
          title: "More",
          order: 9999,
          url: null,
          children: moreItems,
        }
      : null;

  return (
    <nav className="bg-surface-light shadow-sm sticky top-0 z-50 transition-colors duration-300 backdrop-blur-md bg-white/90 supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-4 sm:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg border-[3px] border-white ring-2 ring-primary/20">
                JUW
              </div>
              <div className="hidden xl:block">
                <h1 className="text-2xl font-display font-bold text-accent tracking-wide">
                  Jamia Ummul Kitab
                </h1>
                <div className="flex items-center gap-2">
                  <span className="h-px w-8 bg-primary"></span>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                    Women's Campus
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-8 rtl:space-x-reverse">
            {visibleItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
            {moreItem && <NavItem item={moreItem} />}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center pl-4">
            <a
              href="#"
              className="bg-primary hover:bg-accent text-white px-7 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(192,139,155,0.39)] hover:shadow-[0_6px_20px_rgba(192,139,155,0.23)] hover:-translate-y-0.5 flex items-center gap-2 text-sm font-semibold tracking-wide"
            >
              <span>Enroll Now</span>
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {sortedNavigation.map((item) => (
              <MobileNavItem key={item.id} item={item} />
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <a
                href="#"
                className="w-full bg-primary text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-bold"
              >
                <span>Enroll Now</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Mobile Nav Item Component
const MobileNavItem = ({ item, depth = 0 }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-gray-50 last:border-0">
      <div className="flex items-center justify-between">
        {item.url && !hasChildren ? (
          <Link
            href={item.url}
            className="block py-3 text-base font-medium text-gray-700 hover:text-accent w-full"
          >
            {item.title}
          </Link>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full py-3 text-base font-medium text-gray-700 hover:text-accent text-left"
          >
            {item.title}
            {hasChildren && (
              <span
                className={`material-symbols-outlined transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            )}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="pl-4 bg-gray-50 rounded-lg mb-2">
          {item.children
            .sort((a, b) => a.order - b.order)
            .map((child) => (
              <MobileNavItem key={child.id} item={child} depth={depth + 1} />
            ))}
        </div>
      )}
    </div>
  );
};
