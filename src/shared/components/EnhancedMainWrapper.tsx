'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TelegramWebAppInitializer from './TelegramWebAppInitializer';

interface EnhancedMainWrapperProps {
  children: ReactNode;
}

export default function EnhancedMainWrapper({ children }: EnhancedMainWrapperProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prevPath, setPrevPath] = useState('');
  const pathname = usePathname();

  // Отслеживаем изменение пути для показа лоадера и сброса скролла
  useEffect(() => {
    if (prevPath && prevPath !== pathname) {
      handleRouteChange();
    }
    
    setPrevPath(pathname);
    
    // Сбрасываем скролл при смене страницы
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    
    // Добавляем слушатели для отслеживания навигации
    document.addEventListener('click', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [pathname]);

  // Функция для обработки клика по ссылке или кнопке навигации
  const handleUserInteraction = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button')) {
      
      const link = target.closest('a');
      if (link && link.href && !link.href.startsWith('#') && 
          !link.href.includes('mailto:') && !link.href.includes('tel:') &&
          link.target !== '_blank') {
        handleRouteChange();
      }
    }
  };

  // Функция для обработки изменения маршрута
  const handleRouteChange = () => {
    setIsLoading(true);
    
    // Сбрасываем скролл вверх
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    
    // Скрываем лоадер после перехода
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Основной контент с поддержкой скроллинга */}
      <main 
        ref={mainRef}
        className="main-content scrollbar-none relative"
        style={{ 
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          height: '100vh'
        }}
      >
        <TelegramWebAppInitializer />
        {children}
        
        {/* Минималистичный лоадер переходов между страницами - только по центру без затемнения */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="loader">
              <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                    <stop stopColor="#FF7560" stopOpacity="0" offset="0%"/>
                    <stop stopColor="#FF7560" stopOpacity=".631" offset="63.146%"/>
                    <stop stopColor="#FF7560" offset="100%"/>
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)">
                    <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" strokeWidth="3">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite" />
                    </path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        )}
      </main>
    </>
  );
}