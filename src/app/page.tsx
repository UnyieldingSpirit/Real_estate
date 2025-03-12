'use client';

import { useState } from 'react';
import SurveyBanner from '@/src/shared/components/SurveyBanner';
import { HouseIcon, HeartIcon, PlusIcon, ProfileIcon } from '@/src/shared/ui/Icon';
import Categories from '../shared/components/PropertyCategories';
import SearchBar from '../shared/components/SearchWFFilter';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      {/* Основной контент */}
      <main className="flex-1 pb-20">
        {/* Компонент поиска */}
        <div className="pt-4">
          <SearchBar />
        </div>
        
        {/* Компонент опроса */}
        <div className="mt-4">
          <SurveyBanner />
        </div>
        
        {/* Компонент категорий */}
        <Categories />
      </main>
      
      {/* Нижняя навигация */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6">
        <div className="flex justify-between items-center">
          <button className="flex flex-col items-center">
            <HouseIcon size={28} color="#FF6B6B" />
            <span className="text-xs mt-1 text-[#FF6B6B]">Главная</span>
          </button>
          
          <button className="flex flex-col items-center">
            <HeartIcon size={28} color="#A3A3A3" />
            <span className="text-xs mt-1 text-[#A3A3A3]">Избранное</span>
          </button>
          
          <button className="flex flex-col items-center">
            <div className="w-14 h-14 bg-[#FF6B6B] rounded-full flex items-center justify-center -mt-7">
              <PlusIcon size={28} color="white" />
            </div>
            <span className="text-xs mt-1 text-[#A3A3A3]">Добавить</span>
          </button>
          
          <button className="flex flex-col items-center">
            <ProfileIcon size={28} color="#A3A3A3" />
            <span className="text-xs mt-1 text-[#A3A3A3]">Профиль</span>
          </button>
        </div>
      </footer>
    </div>
  );
}