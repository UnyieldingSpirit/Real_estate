'use client';

import SurveyBanner from '@/src/shared/components/SurveyBanner';
import Categories from '../shared/components/PropertyCategories';
import SearchBar from '../shared/components/SearchWFFilter';
import PropertyCard from '../shared/components/PropertyCard';
import { useTranslation } from '@/src/hooks';
import { BottomNavigation } from '../shared/components';

// Определение типов для объекта недвижимости
interface PropertyData {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  area: string;
  rooms: number;
  images: string[];
  daysAgo: number;
  hasRenovation: boolean;
  hasFurniture: boolean;
  fromOwner: boolean;
}

const localization = {
  ru: {
    properties: 'Предложения',
  },
  uz: {
    properties: 'E\'lonlar',
  }
};

// Переносим данные внутрь компонента
export default function Home() {
  const { t } = useTranslation(localization);

  // Внутренняя константа вместо экспортированной
  const properties: PropertyData[] = [
    {
      id: 1,
      title: 'Современная квартира в центре',
      description: 'Светлая квартира с хорошим ремонтом',
      price: '450$',
      location: 'Ташкент, Юнусабадский район',
      area: '75м²',
      rooms: 3,
      images: [
        '/Rectangle.png',
        '/Rectangle.png',
        '/Rectangle.png'
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
      price: '85 000$',
      location: 'Ташкент, Чиланзарский район',
      area: '54м²',
      rooms: 2,
      images: [
        '/Rectangle.png',
        '/Rectangle.png',
        '/Rectangle.png'
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
      price: '150 000$',
      location: 'Ташкент, Мирзо-Улугбекский район',
      area: '92м²',
      rooms: 3,
      images: [
        '/Rectangle.png',
        '/Rectangle.png',
        '/Rectangle.png'
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
      price: '65 000$',
      location: 'Ташкент, Сергелийский район',
      area: '35м²',
      rooms: 1,
      images: [
        '/Rectangle.png',
        '/Rectangle.png',
        '/Rectangle.png'
      ],
      daysAgo: 3,
      hasRenovation: false,
      hasFurniture: false,
      fromOwner: true
    }
  ];

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
          </div>

          <div className="space-y-4">
            {properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
              />
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}