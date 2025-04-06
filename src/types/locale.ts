import type { Locale } from '@/src/store/language';

export type LocaleMessages<T = Record<string, unknown>> = Record<Locale, T>