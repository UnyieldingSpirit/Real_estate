'use client';

import { JSX, useEffect } from 'react';

export default function TelegramWebAppInitializer(): JSX.Element | null {
  useEffect(() => {
    // Проверка наличия API Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      // Определение мобильной платформы по User-Agent
      const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

      console.log('User-Agent:', navigator.userAgent);
      console.log('Определена платформа:', isMobileDevice ? 'Мобильная' : 'Десктоп');

      try {
        // Общие настройки (применяются всегда)
        if (typeof tg.enableClosingConfirmation === 'function') {
          tg.enableClosingConfirmation(true);
        }

        // Мобильно-специфичные методы
        if (isMobileDevice) {
          console.log('Активация мобильных функций');

          // Расширение на всю высоту
          if (typeof tg.expand === 'function') {
            tg.expand();
          }

          // Отключение вертикальных свайпов - проверяем наличие метода
          // Метод requestFullscreen не поддерживается - удаляем его вызов
          
          // Безопасно проверяем наличие метода перед вызовом
          if (typeof tg.disableVerticalSwipes === 'function') {
            tg.disableVerticalSwipes(true);
          }
        } else {
          console.log('Мобильные функции не активированы (десктопная платформа)');
        }

        console.log('Telegram WebApp инициализирован');
      } catch (error) {
        console.warn('Ошибка при инициализации Telegram WebApp:', error);
      }
    } else {
      console.warn('Telegram WebApp API недоступен');
    }
  }, []);

  return null; // Компонент не рендерит ничего в DOM
}