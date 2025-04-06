import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Locale {
    RU = 'ru',
    UZ = 'uz',
    EN = 'en',
}

interface LanguageState {
    currentLocale: Locale;
    setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLocale: Locale.RU,
      setLocale: (locale: Locale) => set({ currentLocale: locale }),
    }),
    {
      name: 'language-storage',
    },
  ),
);