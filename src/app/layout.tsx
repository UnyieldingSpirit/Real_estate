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
        
        {/* Скрипт для определения типа устройства и применения отступов */}
        <Script
          id="device-detector"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function isMobileDevice() {
                // Проверка ТОЛЬКО по user-agent
                const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                console.log('Обнаружение устройства:', { 
                  'User-Agent': navigator.userAgent,
                  'Мобильный User-Agent': mobileUA
                });
                
                return mobileUA;
              }
              
              function applyPadding() {
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                  if (isMobileDevice()) {
                    mainContent.style.paddingTop = '6rem';
                    mainContent.style.paddingBottom = '6rem';
                    mainContent.classList.add('mobile-padding');
                    mainContent.classList.remove('desktop-padding');
                  } else {
                    console.log('Применяю десктопные отступы: без отступов');
                    mainContent.style.paddingTop = '0';
                    mainContent.style.paddingBottom = '0';
                    mainContent.classList.add('desktop-padding');
                    mainContent.classList.remove('mobile-padding');
                  }
                } else {
                  console.warn('Элемент .main-content не найден, повторяю попытку...');
                  // Если элемент не найден, пытаемся снова через небольшую задержку
                  setTimeout(applyPadding, 100);
                }
              }
              
              // Выполняем с разными событиями для надежности
              document.addEventListener('DOMContentLoaded', applyPadding);
              window.addEventListener('load', applyPadding);
              
              // Также применяем немедленно
              setTimeout(applyPadding, 0);
              // И с небольшой задержкой
              setTimeout(applyPadding, 500);
            `
          }}
        />
        
        {/* Стили для подстраховки */}
        <style>
          {`
            /* Базовые стили для main-content */
            .main-content {
              overflow-y: auto;
              overflow-x: hidden;
              flex: 1;
              background-color: #f7f7f7;
              position: relative;
            }
            
            /* Классы для JS-применения */
            .mobile-padding {
              padding-top: 6rem !important;
              padding-bottom: 6rem !important;
            }
            
            .desktop-padding {
              padding-top: 0 !important;
              padding-bottom: 0 !important;
            }
          `}
        </style>
      </head>
      <body
        className={`${inter.variable} ${interSans.variable} ${robotoMono.variable} antialiased touch-manipulation`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <main className="main-content scrollbar-none">
          <TelegramWebAppInitializer />
          {children}
        </main>
      </body>
    </html>
  );
}