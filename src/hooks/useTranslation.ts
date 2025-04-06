import { useMemo } from 'react';
import { useLanguageStore } from '../store/language';
import type { LocaleMessages } from '../types/locale';

interface TranslationOptions {
    returnObjects?: boolean;
    [key: string]: string | number | boolean | undefined;
}

export function useTranslation<T extends LocaleMessages>(localization: T) {
  const store = useLanguageStore();
  const messages = useMemo(() =>
    localization[store.currentLocale],
  [localization, store.currentLocale],
  );

  const t = <R = string>(key: string, params?: TranslationOptions): R => {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let message: any = messages;

    // Проходим по всем частям ключа
    for (const part of keys) {
      if (message === null || message === undefined || !(part in message)) {
        return key as unknown as R;
      }
      message = message[part];
    }

    // Возвращаем объект если указан флаг returnObjects
    if (params?.returnObjects) {
      return message as R;
    }

    // Обработка параметров в строке
    let result = message;
    if (typeof result === 'string' && params) {
      // Handle {{param}} syntax
      result = result.replace(/\{\{(\w+)\}\}/g, (_, match) => {
        return params[match] !== undefined ? String(params[match]) : `{{${match}}}`;
      });
      // Handle {param} syntax
      result = result.replace(/\{(\w+)\}/g, (_: unknown, match: string | number) => {
        return params[match] !== undefined ? String(params[match]) : `{${match}}`;
      });
    }

    // Возвращаем строку или исходный ключ
    return (typeof result === 'string' ? result : key) as unknown as R;
  };

  return { t, messages };
}