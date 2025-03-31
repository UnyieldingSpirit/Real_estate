import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import EnhancedMainWrapper from "../shared/components/EnhancedMainWrapper";

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
        <meta name="theme-color" content="#f7f7f7" />
        
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
              
              // Определение наличия Telegram Web App и настройка соответствующих отступов
              function setupTelegramPaddings() {
                if (window.Telegram && window.Telegram.WebApp) {
                  const tg = window.Telegram.WebApp;
                  
                  // Установка CSS-переменных для безопасных зон
                  if (tg.viewportStableHeight) {
                    document.documentElement.style.setProperty('--tg-viewport-stable-height', \`\${tg.viewportStableHeight}px\`);
                  }
                  
                  // Применяем отступы для полноэкранного режима, если доступно
                  if (tg.isExpanded) {
                    document.body.classList.add('tg-expanded');
                  }
                  
                  // Слушаем изменения viewportHeight
                  window.addEventListener('viewportChanged', function() {
                    if (tg.viewportStableHeight) {
                      document.documentElement.style.setProperty('--tg-viewport-stable-height', \`\${tg.viewportStableHeight}px\`);
                    }
                  });
                }
              }
              
              // Выполняем с разными событиями для надежности
              document.addEventListener('DOMContentLoaded', () => {
                applyPadding();
                setupTelegramPaddings();
                
                // Явно отключаем скролл на html и body
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
              });
              
              window.addEventListener('load', () => {
                applyPadding();
                setupTelegramPaddings();
                
                // Явно отключаем скролл на html и body
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
              });
              
              // Также применяем немедленно
              setTimeout(() => {
                applyPadding();
                setupTelegramPaddings();
                
                // Явно отключаем скролл на html и body
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
              }, 0);
              
              // И с небольшой задержкой
              setTimeout(() => {
                applyPadding();
                setupTelegramPaddings();
                
                // Явно отключаем скролл на html и body
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
              }, 500);
            `
          }}
        />
        
        {/* Стили для layout и навигации */}
        <style>
          {`
            :root {
              --safe-area-inset-top: env(safe-area-inset-top, 0px);
              --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
              --tg-viewport-stable-height: 100vh;
            }
            
            /* Жестко отключаем скролл на html и body */
            html, body {
              overflow: hidden !important;
              height: 100% !important;
              position: fixed !important;
              width: 100% !important;
              touch-action: manipulation !important;
            }
            
            /* Базовые стили для main-content */
            .main-content {
              flex: 1;
              background-color: #f7f7f7;
              position: relative;
              /* Отключаем скролл на основном контейнере */
              overflow: hidden !important;
              min-height: 100vh;
              min-height: var(--tg-viewport-stable-height, 100vh);
              /* Добавляем отступы для полноэкранного режима */
              padding-top: var(--safe-area-inset-top, 0px);
              padding-bottom: calc(var(--safe-area-inset-bottom, 0px) + 100px);
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
            
            /* Стиль для страниц, где нужен скролл */
            .page-scrollable {
              height: 100%;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
              /* Отступ для нижней навигации */
              padding-bottom: 120px;
              padding-top: 100px;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
            }
            
            /* Фиксируем нижнюю навигацию */
            .fixed-bottom-nav {
              position: fixed !important;
              bottom: calc(30px + var(--safe-area-inset-bottom, 0px)) !important;
              left: 14px !important;
              right: 14px !important;
              z-index: 5000 !important;
            }
            
            /* Стили для режима Telegram expanded */
            body.tg-expanded .main-content {
              padding-top: var(--safe-area-inset-top, 0px);
              padding-bottom: var(--safe-area-inset-bottom, 0px);
            }
            
            body.tg-expanded .fixed-bottom-nav {
              bottom: calc(30px + var(--safe-area-inset-bottom, 0px)) !important;
            }
          `}
        </style>
      </head>
      <body
        className={`${inter.variable} ${interSans.variable} ${robotoMono.variable} bg-[#f7f7f7] antialiased touch-manipulation`}
        style={{ fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}
      >
       <EnhancedMainWrapper>
  {children}
</EnhancedMainWrapper>
      </body>
    </html>
  );
}