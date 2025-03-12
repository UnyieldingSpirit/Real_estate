'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GlobeIcon } from '../../ui/Icon';
import { useLanguageStore, Locale } from '../../../store/language';
import { useTranslation } from '../../../hooks/useTranslation';
import { localization } from './locails';

export default function LanguageSelector() {
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const { currentLocale, setLocale } = useLanguageStore();
  const { t } = useTranslation(localization);
  const menuRef = useRef<HTMLDivElement | null>(null);
  
  const toggleLanguage = (): void => {
    setShowLanguages(!showLanguages);
  };
  
  const selectLanguage = (language: Locale): void => {
    setLocale(language);
    setShowLanguages(false);
  };
  
  // Закрытие меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div 
        className="bg-white h-[44px] rounded-xl py-2 px-3 flex items-center shadow-md cursor-pointer justify-center"
        onClick={toggleLanguage}
        style={{ width: '80px' }} // Фиксированная ширина 80px
      >
        <GlobeIcon size={25} />
        <span className="ml-1 font-bold text-[#1F1F1F]">
          {currentLocale === Locale.RU ? 'RU' : 'UZ'}
        </span>
      </div>
      
      {showLanguages && (
        <div 
          className="mt-1 bg-white rounded-xl shadow-lg overflow-hidden absolute right-0" 
          style={{ width: '80px' }}
        >
          <div 
            className={`py-3 px-4 hover:bg-gray-100 cursor-pointer flex justify-center ${currentLocale === Locale.RU ? 'bg-gray-200' : ''}`}
            onClick={() => selectLanguage(Locale.RU)}
          >
            <span className="font-medium text-[#1F1F1F]">RU</span>
          </div>
          <div 
            className={`py-3 px-4 hover:bg-gray-100 cursor-pointer flex justify-center ${currentLocale === Locale.UZ ? 'bg-gray-200' : ''}`}
            onClick={() => selectLanguage(Locale.UZ)} 
          >
            <span className="font-medium text-[#1F1F1F]">UZ</span>
          </div>
        </div>
      )}
    </div>
  );
};
