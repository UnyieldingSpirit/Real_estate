'use client';

import { SetStateAction, useState } from 'react';
import { SearchIcon, FilterIcon } from '@/src/shared/ui/Icon';
import { useTranslation } from '@/src/hooks';

const localization = {
  ru: {
    search: 'Поиск',
    filter: 'Фильтр',
  },
  uz: {
    search: 'Qidirish',
    filter: 'Filtr',
  },
  en: {
    search: 'Search',
    filter: 'Filter',
  },
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation(localization);
  
  const handleSearchChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterClick = () => {
    window.location.href = '/filter';
  };
  
  return (
    <div className="flex items-center gap-3 px-4  w-full">
      <div className="flex items-center flex-1 h-16 bg-white rounded-2xl px-4 py-3 shadow-sm">
        <SearchIcon size={24} color="#343434" />
        <input
          type="text"
          placeholder={t('search')}
          value={searchQuery}
          onChange={handleSearchChange}
          className="ml-3 w-full text-base text-[#1F1F1F] placeholder-[#868686] outline-none bg-transparent"
        />
      </div>
      
      <button 
        onClick={handleFilterClick}
        className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm"
        aria-label={t('filter')}
      >
        <div className="relative">
          <FilterIcon size={24} color="#343434"/>
        </div>
      </button>
    </div>
  );
}