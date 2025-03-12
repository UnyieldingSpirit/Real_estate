'use client';

import { useState } from 'react';
import { SearchIcon, FilterIcon } from '@/src/shared/ui/Icon';
import { useTranslation } from '@/src/hooks';

const localization = {
  ru: {
    search: 'Поиск',
    filter: 'Фильтр'
  },
  uz: {
    search: 'Qidirish',
    filter: 'Filtr'
  }
};

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation(localization);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterClick = () => {
    console.log('Open filter modal');
     window.location.href = '/filter';
  };
  
  return (
    <div className="flex items-center gap-3 px-4 py-3 w-full">
      <div className="flex items-center flex-1 h-14 bg-white rounded-2xl px-4 py-3 shadow-sm">
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
        className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm"
        aria-label={t('filter')}
      >
        <div className="relative">
     <FilterIcon size={24} color="#343434"/>
        </div>
      </button>
    </div>
  );
}