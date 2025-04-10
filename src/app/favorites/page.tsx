'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/src/shared/components';
import PropertyCard from '@/src/shared/components/PropertyCard';
import { useTranslation } from '@/src/hooks';
import EmptyState from '@/src/shared/components/EmptyState';

type AdvertisementTab = 'active' | 'inReview' | 'favorites';

const localization = {
  ru: {
    myAds: 'Мои',
    active: 'Активные',
    inReview: 'На проверке',
    favorites: 'Избранное',
  },
  uz: {
    myAds: 'Mening',
    active: 'Faol',
    inReview: 'Tekshiruvda',
    favorites: 'Tanlanganlar',
  },
  en: {
    myAds: 'My',
    active: 'Active',
    inReview: 'In Review',
    favorites: 'Favorites',
  },
};

const favoritesAds = [
  {
    id: 3,
    title: 'Квартира в избранном',
    price: '350 $/мес.',
    location: 'Ташкент, Юнусабадский район',
    area: '75м²',
    rooms: 3,
    images: ['/Rectangle.png'],
    daysAgo: 1,
    hasRenovation: true,
    hasFurniture: true,
    fromOwner: false,
  },
];

// Пример объявлений (в реальном приложении это будет приходить с бэкенда)
const mockAdvertisements = {
  active: [
    {
      id: 1,
      title: 'Современная квартира в центре',
      price: '300',
      location: 'Ташкент, Чиланзарский район',
      area: '60м²',
      rooms: 4,
      images: ['/Rectangle.png'],
      daysAgo: 4,
      hasRenovation: true,
      hasFurniture: true,
      fromOwner: true,
      status: 'active',
    },
  ],
  inReview: [
    {
      id: 2,
      title: 'Уютная двухкомнатная квартира',
      price: '200',
      location: 'Ташкент, Юнусабадский район',
      area: '45м²',
      rooms: 2,
      images: ['/Rectangle.png'],
      daysAgo: 2,
      hasRenovation: false,
      hasFurniture: true,
      fromOwner: false,
      status: 'inReview',
    },
  ],
  favorites: favoritesAds,
};

export default function MyAdvertisementsPage() {
  const router = useRouter();
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

  // Обработчик клика на карточку объявления
  const handlePropertyClick = (id: number, isFavorite: boolean) => {
    if (isFavorite) {
    // Если это избранное объявление, переходим на страницу просмотра избранного
      router.push(`/property-favorites/${id}`);
    } else if (activeTab === 'active') {
    // Если это активное объявление, переходим на страницу редактирования
      router.push(`/property-favorites/${id}`);
    } else {
    // В остальных случаях (например, "на проверке") переходим на обычную страницу просмотра
      router.push(`/property/${id}`);
    }
  };

  const advertisements = getAdvertisementsForTab();
  const isFavoritesTab = activeTab === 'favorites';

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col page-scrollable"
      >
        <div className="px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-[32px] font-bold text-[#1F1F1F] mb-4"
          >
            {t('myAds')}
          </motion.h1>

          <div className="flex justify-between mb-4 bg-white p-2 rounded-[12px]">
            {[
              { key: 'active', label: t('active') },
              { key: 'inReview', label: t('inReview') },
              { key: 'favorites', label: t('favorites') },
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
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-4 px-4"
          >
            {advertisements.length > 0 ? (
              advertisements.map((ad, index) => (
                <motion.div 
                  key={ad.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    ease: 'easeOut', 
                  }}
                  onClick={() => handlePropertyClick(ad.id, isFavoritesTab)}
                >
                  <PropertyCard 
                    property={ad}
                    myAdvertisementMode={!isFavoritesTab}
                    fromFavoritesPage={isFavoritesTab}
                  />
                </motion.div>
              ))
            ) : (
              <EmptyState activeTab={activeTab} />
            )}
          </motion.div>
        </AnimatePresence>
      
      </motion.div>
      <BottomNavigation />
    </div>
  );
}