'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguageStore, Locale } from '@/src/store/language';

const languages = [
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: 'Узбекский' },
  { code: 'en', label: 'Английский' }
];

export default function LanguageSelectPage() {
  const router = useRouter();
  const { currentLocale, setLocale } = useLanguageStore();
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentLocale === Locale.RU ? 'ru' : 'uz'
  );
  
  // Обработчик выбора языка
  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };
  
  // Обработчик применения выбора языка
  const handleApply = () => {
    const newLocale = selectedLanguage === 'ru' ? Locale.RU : Locale.UZ;
    setLocale(newLocale);
    router.back(); // Возвращаемся на предыдущую страницу
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7] relative">
      <div className="flex-1 p-4">
        <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-2">
          Выберите язык
        </h1>
        <p className="text-[#777777] text-[18px] mb-8">
          Выберите язык
        </p>
        
        {/* Список языков */}
        <div className="space-y-3 mb-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`w-full p-4 rounded-xl text-[18px] text-left transition-colors ${
                selectedLanguage === language.code 
                  ? 'bg-[#FF7560] text-white' 
                  : 'bg-white text-[#1F1F1F]'
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
      </div>

      {/* Кнопка Применить - позиционирована абсолютно */}
      <div className="absolute bottom-[120px] left-4 right-4">
        <button
          onClick={handleApply}
          className="w-full p-4 rounded-xl bg-[#1F1F1F] text-white font-medium"
          disabled={selectedLanguage === (currentLocale === Locale.RU ? 'ru' : 'uz')}
        >
          Применить
        </button>
      </div>
    </div>
  );
}