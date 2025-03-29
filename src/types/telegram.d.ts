/* eslint-disable @typescript-eslint/no-explicit-any */
interface TelegramWebApp {
    MainButton: boolean;
    ready: any;
    viewportStableHeight: number;
    BackButton: any;
    expand: () => void;
    close: () => void;
    enableClosingConfirmation: (enable: boolean) => void;
    requestFullscreen: () => (enable: boolean) => void;
    disableVerticalSwipes: (disable: boolean) => void;
    // Добавьте другие методы, которые вы используете
}

interface Telegram {
    WebApp: TelegramWebApp;
}

interface Window {
    Telegram: Telegram;
}