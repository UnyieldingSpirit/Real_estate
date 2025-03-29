interface TelegramWebApp {
    expand: () => void;
    close: () => void;
    enableClosingConfirmation: (enable: boolean) => void;
    requestFullscreen: () => void;
    disableVerticalSwipes: (disable: boolean) => void;
    // Добавьте другие методы, которые вы используете
}

interface Telegram {
    WebApp: TelegramWebApp;
}

interface Window {
    Telegram: Telegram;
}