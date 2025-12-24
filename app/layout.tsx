import type { Metadata } from "next";
import { Playfair_Display, Lato, Amiri } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import Script from "next/script";


const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Jamia Ummul Kitab",
  description: "An institute committed to the revival of Islamic civilization through education, character building, and social reform.",
};

import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  const dir = locale === "ur" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} ${amiri.variable} antialiased bg-background-light text-text-light font-body transition-colors duration-300`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
