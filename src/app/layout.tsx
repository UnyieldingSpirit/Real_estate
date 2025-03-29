import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import TelegramWebAppInitializer from "../shared/components/TelegramWebAppInitializer";


// Загружаем Inter как основной шрифт
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

// Заменил Geist на Inter для sans-serif шрифта
const interSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

// Заменил Geist Mono на Roboto Mono для монопространственного шрифта
const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoyDom Real Estate",
  description: "Find your perfect home",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
  other: {
    'user-scalable': '0',
    'apple-mobile-web-app-capable': 'yes',
    'viewport-fit': 'cover',
    'HandheldFriendly': 'true'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="overscroll-none">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="HandheldFriendly" content="true" />
        
        {/* Добавляем загрузку для шрифта ALS Hauss */}
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/als-hauss"
        />
        
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        
        <Script
          id="prevent-zoom"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('touchstart', (event) => {
                if (event.touches.length > 1) {
                  event.preventDefault();
                }
              }, { passive: false });
              
              document.addEventListener('gesturestart', (event) => {
                event.preventDefault();
              }, { passive: false });
            `
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${interSans.variable} ${robotoMono.variable} antialiased touch-manipulation overflow-x-hidden`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <main className="scrollbar-none flex-1 overflow-y-auto overflow-x-hidden">
          <TelegramWebAppInitializer />
          {children}
        </main>
      </body>
    </html>
  );
}