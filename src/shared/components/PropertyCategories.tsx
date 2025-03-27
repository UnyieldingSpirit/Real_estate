'use client';

import { useState } from 'react';
import { useTranslation } from '@/src/hooks';

// Enum для категорий с настройками
export enum PropertyCategoryType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  COMMERCIAL = 'commercial',
  DACHA = 'dacha',
}

// Конфигурация категорий
export const PROPERTY_CATEGORIES = {
  [PropertyCategoryType.APARTMENT]: {
    titleKey: 'apartment',
    image: '/apartment.svg',
    activeColor: '#F08674',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    iconComponent: 'ApartmentIcon',
  },
  [PropertyCategoryType.HOUSE]: {
    titleKey: 'house',
    image: '/house.svg',
    activeColor: '#6B95FF',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    iconComponent: 'HouseIcon',
  },
  [PropertyCategoryType.COMMERCIAL]: {
    titleKey: 'commercial',
    image: '/commercial.svg',
    activeColor: '#9C74F0',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    iconComponent: 'CommercialIcon',
  },
  [PropertyCategoryType.DACHA]: {
    titleKey: 'dacha',
    image: '/dacha.svg',
    activeColor: '#74F0A9',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    iconComponent: 'DachaIcon',
  },
};

const localization = {
  ru: {
    categories: 'Категории',
    apartment: 'Квартира',
    house: 'Частный дом',
    commercial: 'Нежилая недвижимость',
    dacha: 'Дача'
  },
  uz: {
    categories: 'Toifalar',
    apartment: 'Kvartira',
    house: 'Xususiy uy',
    commercial: 'Tijorat ko\'chmas mulki',
    dacha: 'Dala hovli'
  }
};

export default function Categories() {
  const { t } = useTranslation(localization);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
    console.log(`Selected category: ${category}`);
  };
  
  return (
    <div className="px-4 mb-6">
      <h2 className="text-[34px] font-bold text-[#1F1F1F] mb-4">
        {t('categories')}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {Object.values(PropertyCategoryType).map((category) => {
          const config = PROPERTY_CATEGORIES[category];
          const isActive = category === activeCategory;
          const bgColor = isActive ? config.activeColor : config.inactiveColor;
          const textColor = isActive ? '#FFFFFF' : config.textColor;
          
          return (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="rounded-2xl shadow-sm overflow-hidden cursor-pointer h-[150px] relative transition-colors duration-300"
              style={{ backgroundColor: bgColor }}
            >
              <div className="p-3.5 h-full flex flex-col justify-between">
                <h3 
                  className="text-xl font-medium z-10 transition-colors duration-300"
                  style={{ color: textColor }}
                >
                  {t(config.titleKey)}
                </h3>
                
                <div className="w-full h-3/4 absolute bottom-0 right-0 flex justify-end items-end">
                  <img 
                    src={config.image || `/images/categories/${category}.svg`}
                    alt={t(config.titleKey)}
                    className="w-[110px] h-[90px] object-contain"
                    onError={(e) => {
                      e.target.src = `/images/categories/placeholder.svg`;
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}