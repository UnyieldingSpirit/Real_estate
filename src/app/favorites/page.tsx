'use client';
import React, { useState } from 'react';
import { BottomNavigation } from '@/src/shared/components';
import PropertyCard from '@/src/shared/components/PropertyCard';
import { useTranslation } from '@/src/hooks';
import EmptyState from '@/src/shared/components/EmptyState';

// Типы для вкладок
type AdvertisementTab = 'active' | 'inReview' | 'favorites';

// Локализация
const localization = {
  ru: {
    myAds: 'Мои',
    active: 'Активные',
    inReview: 'На проверке',
    favorites: 'Избранное'
  },
  uz: {
    myAds: 'Mening',
    active: 'Faol',
    inReview: 'Tekshiruvda',
    favorites: 'Tanlanganlar'
  }
};

// Пример объявлений (в реальном приложении это будет приходить с бэкенда)
const mockAdvertisements = {
  active: [
    {
      id: 1,
      title: 'Современная квартира в центре',
      price: '300 $/мес.',
      location: 'Ташкент, Чиланзарский район',
      area: '60м²',
      rooms: 4,
      images: ['/Rectangle.png'],
      daysAgo: 4,
      hasRenovation: true,
      hasFurniture: true,
      fromOwner: true,
      status: 'active'
    }
  ],
  inReview: [
    {
      id: 2,
      title: 'Уютная двухкомнатная квартира',
      price: '200 $/мес.',
      location: 'Ташкент, Юнусабадский район',
      area: '45м²',
      rooms: 2,
      images: ['/Rectangle.png'],
      daysAgo: 2,
      hasRenovation: false,
      hasFurniture: true,
      fromOwner: false,
      status: 'inReview'
    }
  ],
  favorites: []
};

export default function MyAdvertisementsPage() {
  const { t } = useTranslation(localization);
  const [activeTab, setActiveTab] = useState<AdvertisementTab>('active');

  // Определяем, какие объявления показывать в зависимости от выбранной вкладки
  const getAdvertisementsForTab = () => {
    switch (activeTab) {
      case 'active':
        return mockAdvertisements.active;
      case 'inReview':
        return mockAdvertisements.inReview;
      case 'favorites':
        return mockAdvertisements.favorites;
      default:
        return [];
    }
  };

  const advertisements = getAdvertisementsForTab();

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="px-4 pt-4">
        <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-4">
          {t('myAds')}
        </h1>
        
        {/* Вкладки */}
        <div className="flex justify-between  mb-4 bg-white p-2 rounded-[12px]">
          {[
            { key: 'active', label: t('active') },
            { key: 'inReview', label: t('inReview') },
            { key: 'favorites', label: t('favorites') }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as AdvertisementTab)}
              className={`px-4 py-2 rounded-[12px] text-base font-medium transition-colors ${
                activeTab === tab.key 
                  ? 'bg-[#FF7560] text-white' 
                  : ' text-[#8E8E8E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Список объявлений */}
           {advertisements.length > 0 ? (
          <div className="space-y-4">
            {advertisements.map(ad => (
              <PropertyCard 
                key={ad.id} 
                property={ad}
                myAdvertisementMode={true}
              />
            ))}
          </div>
        ) : (
          <EmptyState activeTab={activeTab} />
        )}
      
      <BottomNavigation />
    </div>
  );
}