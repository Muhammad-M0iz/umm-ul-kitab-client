"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <div className="bg-accent text-white text-sm py-2 px-4 sm:px-8 flex justify-between items-center relative z-20 border-b border-white/10">
      <div className="flex items-center space-x-6 rtl:space-x-reverse opacity-90">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[1.1rem]">phone</span>
          <span className="tracking-wide font-light">+92-300-1234567</span>
        </span>
        <span className="flex items-center gap-2 hidden sm:flex">
          <span className="material-symbols-outlined text-[1.1rem]">mail</span>
          <span className="tracking-wide font-light">info@jamiaurwatulwusqa.com</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleLanguageChange("ur")}
          className="hover:text-pink-100 transition-colors font-arabic text-lg leading-none cursor-pointer bg-transparent border-none p-0 text-white"
        >
          اردو
        </button>
        <span className="h-3 w-px bg-white/40"></span>
        <button
          onClick={() => handleLanguageChange("en")}
          className="font-bold tracking-wide text-xs uppercase cursor-pointer bg-transparent border-none p-0 text-white hover:text-pink-100 transition-colors"
        >
          English
        </button>
      </div>
    </div>
  );
}
