'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/src/hooks';
import PropertyCard from '@/src/shared/components/PropertyCard';
import SearchBar from '@/src/shared/components/SearchWFFilter';

// Типы для фильтра
interface FilterParams {
  city?: string;
  district?: string;
  minArea?: string;
  maxArea?: string;
  currency?: string;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  hasRenovation?: boolean;
  hasFurniture?: boolean;
  fromOwners?: boolean;
}

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

// Локализация
const localization = {
  ru: {
    searchResults: 'Результаты поиска',
    found: 'Найдено объявлений',
    noResults: 'По вашему запросу ничего не найдено',
    filterAgain: 'Изменить параметры фильтра',
    loading: 'Загрузка...',
    categories: {
      apartment: 'Квартиры',
      house: 'Частные дома',
      commercial: 'Нежилая недвижимость',
      dacha: 'Дачи',
    },
  },
  uz: {
    searchResults: 'Qidiruv natijalari',
    found: 'E\'lonlar topildi',
    noResults: 'So\'rovingiz bo\'yicha hech narsa topilmadi',
    filterAgain: 'Filtr parametrlarini o\'zgartirish',
    loading: 'Yuklanmoqda...',
    categories: {
      apartment: 'Kvartiralar',
      house: 'Xususiy uylar',
      commercial: 'Tijorat ko\'chmas mulki',
      dacha: 'Dala hovlilar',
    },
  },
  en: {
    searchResults: 'Search results',
    found: 'Properties found',
    noResults: 'No properties found for your query',
    filterAgain: 'Change filter parameters',
    loading: 'Loading...',
    categories: {
      apartment: 'Apartments',
      house: 'Private Houses',
      commercial: 'Commercial Properties',
      dacha: 'Dachas',
    },
  },
};

export default function PropertySearchPage() {
  const { t } = useTranslation(localization);
  const searchParams = useSearchParams();
  
  // Состояние для хранения отфильтрованных объявлений
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [, setLoading] = useState(true);
  
  // Состояние для хранения параметров фильтра
  const [, setFilterParams] = useState<FilterParams>({});
  // Состояние для хранения выбранной категории
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Извлекаем параметры фильтра из URL
  useEffect(() => {
    const getFilterFromUrl = (): FilterParams => {
      const params: FilterParams = {};
      
      // Город
      const city = searchParams.get('city');
      if (city) params.city = city;
      
      // Район
      const district = searchParams.get('district');
      if (district) params.district = district;
      
      // Площадь
      const minArea = searchParams.get('minArea');
      const maxArea = searchParams.get('maxArea');
      if (minArea) params.minArea = minArea;
      if (maxArea) params.maxArea = maxArea;
      
      // Валюта
      const currency = searchParams.get('currency');
      if (currency) params.currency = currency;
      
      // Тип операции (аренда/продажа)
      const propertyType = searchParams.get('propertyType');
      if (propertyType) params.propertyType = propertyType;
      
      // Цена
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      
      // Булевы параметры
      const hasRenovation = searchParams.get('hasRenovation');
      const hasFurniture = searchParams.get('hasFurniture');
      const fromOwners = searchParams.get('fromOwners');
      
      if (hasRenovation === 'true') params.hasRenovation = true;
      if (hasFurniture === 'true') params.hasFurniture = true;
      if (fromOwners === 'true') params.fromOwners = true;
      
      return params;
    };
    
    // Получаем категорию из URL
    const category = searchParams.get('category');
    setSelectedCategory(category);
    
    // Получаем параметры из URL
    const params = getFilterFromUrl();
    setFilterParams(params);
    console.log('Applied filters:', params);
    console.log('Selected category:', category);
    
    // Имитируем запрос к API с учетом фильтров
    setLoading(true);
    
    // Здесь в реальном приложении был бы запрос к API
    setTimeout(() => {
      // Тестовые данные (в реальном приложении здесь был бы ответ от API)
      const filteredProperties: PropertyData[] = [
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
            '/Rectangle.png',
          ],
          daysAgo: 2,
          hasRenovation: true,
          hasFurniture: true,
          fromOwner: true,
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
          ],
          daysAgo: 5,
          hasRenovation: true,
          hasFurniture: false,
          fromOwner: true,
        },
      ];
      
      setProperties(filteredProperties);
      setLoading(false);
    }, 100);
  }, [searchParams]);
  
  return (
    <div className="page-scrollable">
      <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
        <main className="flex-1">
          {/* Поисковая строка */}
          <div className="">
            <SearchBar />
          </div>
          
          {/* Заголовок и результаты */}
          <div className="px-4 mt-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[28px] font-bold text-[#1F1F1F]">
                {selectedCategory 
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ? t(`categories.${selectedCategory}` as any)
                  : t('searchResults')
                }
              </h2>
            </div>

            <div>
              <div className="space-y-4">
                {properties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}