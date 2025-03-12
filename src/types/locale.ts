import type { Locale } from '../store/language';

export type LocaleMessages<T = Record<string, unknown>> = Record<Locale, T>;