'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore, Locale } from '@/src/store/language';

// Локализация для разных языков
const localization = {
  ru: {
    title: 'Выберите язык',
    subtitle: 'Выберите предпочитаемый язык',
    apply: 'Применить',
    russian: 'Русский',
    uzbek: 'Узбекский',
    english: 'Английский',
  },
  uz: {
    title: 'Til tanlang',
    subtitle: 'Ma\'qul tilni tanlang',
    apply: 'Qo\'llash',
    russian: 'Rus tili',
    uzbek: 'O\'zbek tili',
    english: 'Ingliz tili',
  },
  en: {
    title: 'Select language',
    subtitle: 'Choose your preferred language',
    apply: 'Apply',
    russian: 'Russian',
    uzbek: 'Uzbek',
    english: 'English',
  },
};

export default function LanguageSelectPage() {
  const router = useRouter();
  const { currentLocale, setLocale } = useLanguageStore();
  
  // Преобразование Locale в строковый код языка
  const getLanguageCode = (locale: Locale): string => {
    switch (locale) {
      case Locale.RU: return 'ru';
      case Locale.UZ: return 'uz';
      case Locale.EN: return 'en';
      default: return 'ru';
    }
  };
  
  // Преобразование строкового кода в Locale
  const getLocaleFromCode = (code: string): Locale => {
    switch (code) {
      case 'ru': return Locale.RU;
      case 'uz': return Locale.UZ;
      case 'en': return Locale.EN;
      default: return Locale.RU;
    }
  };
  
  const [selectedLanguage, setSelectedLanguage] = useState(getLanguageCode(currentLocale));
  
  // Определяем текущий язык для отображения текстов
  const currentLanguage = getLanguageCode(currentLocale);
  const texts = localization[currentLanguage as keyof typeof localization];
  
  // Список языков с локализованными названиями
  const languages = [
    { code: 'ru', label: texts.russian },
    { code: 'uz', label: texts.uzbek },
    { code: 'en', label: texts.english },
  ];
  
  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };
  
  const handleApply = () => {
    const newLocale = getLocaleFromCode(selectedLanguage);
    setLocale(newLocale);
    router.back();
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col min-h-screen bg-[#f7f7f7] relative"
    >
      <div className="flex-1 p-4">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-[32px] font-bold text-[#1F1F1F] mb-2"
        >
          {texts.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="text-[#777777] text-[18px] mb-8"
        >
          {texts.subtitle}
        </motion.p>
        
        {/* Список языков */}
        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {languages.map((language, index) => (
              <motion.button
                key={language.code}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4 + index * 0.1,
                  ease: 'easeOut',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full p-4 rounded-xl text-[18px] text-left transition-colors ${
                  selectedLanguage === language.code 
                    ? 'bg-[#FF7560] text-white' 
                    : 'bg-white text-[#1F1F1F]'
                }`}
              >
                {language.label}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Кнопка Применить - позиционирована абсолютно */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
        className="absolute bottom-[150px] left-4 right-4"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleApply}
          className="w-full p-4 rounded-xl bg-[#1F1F1F] text-white font-medium"
          disabled={selectedLanguage === getLanguageCode(currentLocale)}
        >
          {texts.apply}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}