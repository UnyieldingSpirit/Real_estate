'use client';

import { useState } from 'react';
import { useTranslation } from '@/src/hooks';
import PropertyCard from '@/src/shared/components/PropertyCard';
import { BottomNavigation } from '@/src/shared/components';

const localization = {
  ru: {
    favorites: 'Мои объявления',
    noFavorites: 'У вас пока нет избранных объявлений',
    browseProperties: 'Просмотреть объявления'
  },
  uz: {
    favorites: 'Mening e\'lonlarim',
    noFavorites: 'Sizda hali sevimli e\'lonlar yo\'q',
    browseProperties: 'E\'lonlarni ko\'rish'
  }
};

// Примеры избранных объявлений
const favoriteProperties = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    description: 'Светлая квартира с хорошим ремонтом',
    price: '120 000 $',
    location: 'Ташкент, Юнусабадский район',
    area: '75м²',
    rooms: 3,
    images: [
      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg',
      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/60190594_1_261x203.jpg'
    ],
    daysAgo: 2,
    hasRenovation: true,
    hasFurniture: true,
    fromOwner: true
  },
  {
    id: 2,
    title: 'Уютная двухкомнатная квартира',
    description: 'Квартира с отличным видом',
    price: '85 000 $',
    location: 'Ташкент, Чиланзарский район',
    area: '54м²',
    rooms: 2,
    images: [
      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg'
    ],
    daysAgo: 5,
    hasRenovation: true,
    hasFurniture: false,
    fromOwner: true
  }
];

export default function FavoritesPage() {
  const { t } = useTranslation(localization);
  const [favorites,] = useState(favoriteProperties);
  
  const navigateToHome = () => {
    window.location.href = '/';
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      
      <div className="flex-1 p-4 pb-32">
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <path d="M40 70C56.5685 70 70 56.5685 70 40C70 23.4315 56.5685 10 40 10C23.4315 10 10 23.4315 10 40C10 56.5685 23.4315 70 40 70Z" stroke="#A3A3A3" strokeWidth="2"/>
                <path d="M28 40L36 48L52 32" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[#1F1F1F] text-xl font-medium mb-3">{t('noFavorites')}</p>
            <button 
              onClick={navigateToHome}
              className="bg-[#FF6B6B] text-white rounded-xl py-3 px-6 mt-4"
            >
              {t('browseProperties')}
            </button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
}