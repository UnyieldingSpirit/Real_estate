'use client';

import SurveyBanner from '@/src/shared/components/SurveyBanner';
import { HouseIcon, HeartIcon, PlusIcon, ProfileIcon } from '@/src/shared/ui/Icon';
import Categories from '../shared/components/PropertyCategories';
import SearchBar from '../shared/components/SearchWFFilter';
import PropertyCard from '../shared/components/PropertyCard';
import { useTranslation } from '@/src/hooks';

const localization = {
  ru: {
    properties: 'Объявления',
    viewAll: 'Смотреть все'
  },
  uz: {
    properties: 'E\'lonlar',
    viewAll: 'Hammasini ko\'rish'
  }
};

export const properties = [

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

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/60190594_1_261x203.jpg',

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg'

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

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg',

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg',

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg'

    ],

    daysAgo: 5,

    hasRenovation: true,

    hasFurniture: false,

    fromOwner: true

  },

  {

    id: 3,

    title: 'Просторная трехкомнатная квартира',

    description: 'Квартира в новом доме с ремонтом',

    price: '150 000 $',

    location: 'Ташкент, Мирзо-Улугбекский район',

    area: '92м²',

    rooms: 3,

      images: [

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg',

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg',

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg'

    ],

    daysAgo: 1,

    hasRenovation: true,

    hasFurniture: true,

    fromOwner: false

  },

  {

    id: 4,

    title: 'Квартира-студия в центре',

    description: 'Компактная квартира для молодых',

    price: '65 000 $',

    location: 'Ташкент, Сергелийский район',

    area: '35м²',

    rooms: 1,

     images: [

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg',

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg',

      'https://img-resizer.prd.01.eu-west-1.eu.olx.org/img-eu-olxuz-production/62790478_1_1366x210_rev004.jpg'

    ],

    daysAgo: 3,

    hasRenovation: false,

    hasFurniture: false,

    fromOwner: true

  }

];

export default function Home() {
  const { t } = useTranslation(localization);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7] overflow-x-hidden">
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

        {/* Список объявлений */}
        <div className="px-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[34px] font-bold text-[#1F1F1F]">
              {t('properties')}
            </h2>
            <button className="text-[#FF6B6B] text-base font-medium">
              {t('viewAll')}
            </button>
          </div>

          <div className="space-y-4">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
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