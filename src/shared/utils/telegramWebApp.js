export function initTelegramWebApp() {
  if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Определение мобильной платформы по User-Agent
    const isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    console.log('User-Agent:', navigator.userAgent);
    console.log('Определена платформа:', isMobileDevice ? 'Мобильная' : 'Десктоп');

    // Общие настройки (применяются всегда)
    tg.enableClosingConfirmation(true);

    // Установка цвета темы
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#f7f7f7');

    // Мобильно-специфичные методы
    if (isMobileDevice) {
      console.log('Активация мобильных функций');

      // Расширение на всю высоту
      if (typeof tg.expand === 'function') {
        tg.expand();
      }

      // Полноэкранный режим
      if (typeof tg.requestFullscreen === 'function') {
        tg.requestFullscreen();
      }

      // Отключение вертикальных свайпов
      if (typeof tg.disableVerticalSwipes === 'function') {
        tg.disableVerticalSwipes(true);
      }
    } else {
      console.log('Мобильные функции не активированы (десктопная платформа)');
    }

    console.log('Telegram WebApp инициализирован');
  } else {
    console.warn('Telegram WebApp API недоступен');
  }
}