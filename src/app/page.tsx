'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SurveyBanner from '@/src/shared/components/SurveyBanner';
import Categories from '../shared/components/PropertyCategories';
import SearchBar from '../shared/components/SearchWFFilter';
import PropertyCard from '../shared/components/PropertyCard';
import { useTranslation } from '@/src/hooks';
import { BottomNavigation } from '../shared/components';

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
  },
};

export default function Home() {
  const { t } = useTranslation(localization);
  const router = useRouter();

  // Эффект выполняется один раз при монтировании компонента
  useEffect(() => {
    // Проверяем завершение онбординга
    const isOnboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
    // Проверяем завершение регистрации
    const isUserRegistered = localStorage.getItem('userRegistered') === 'true';
    // Проверяем, находимся ли мы в процессе навигации (предотвращает циклические редиректы)
    const isNavigating = sessionStorage.getItem('isNavigating') === 'true';
    
    if (isNavigating) {
      // Если мы в процессе навигации, очищаем флаг
      sessionStorage.removeItem('isNavigating');
      return; // Прерываем выполнение, чтобы избежать циклических редиректов
    }
    
    if (!isOnboardingCompleted) {
      // Если онбординг не пройден, перенаправляем на страницу онбординга
      sessionStorage.setItem('isNavigating', 'true');
      router.push('/onboarding');
      return;
    }
    
    if (isOnboardingCompleted && !isUserRegistered) {
      // Если онбординг пройден, но регистрация не завершена
      sessionStorage.setItem('isNavigating', 'true');
      router.push('/register');
      return;
    }
    
    // Если и онбординг и регистрация завершены, остаемся на главной
    console.log('Онбординг и регистрация завершены, остаемся на главной странице');
  }, [router]);

  const properties: PropertyData[] = [
    {
      id: 1,
      title: 'Современная квартира в центре',
      description: 'Светлая квартира с панорамным видом на город, качественный ремонт, новая мебель',
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
      description: 'Квартира с отличным видом, рядом метро и торговый центр. Подходит для семейной пары',
      price: '85 000$',
      location: 'Ташкент, Чиланзарский район',
      area: '54м²',
      rooms: 2,
      images: [
        '/Rectangle.png',
        '/Rectangle.png',
        '/Rectangle.png',
      ],
      daysAgo: 5,
      hasRenovation: true,
      hasFurniture: false,
      fromOwner: true,
    },
    {
      id: 3,
      title: 'Просторная трехкомнатная квартира',
      description: 'Новый дом, евроремонт, видеонаблюдение, закрытая территория. Отличный вариант для большой семьи',
      price: '150 000$',
      location: 'Ташкент, Мирзо-Улугбекский район',
      area: '92м²',
      rooms: 3,
      images: [
        '/Rectangle.png',
        '/Rectangle.png',
        '/Rectangle.png',
      ],
      daysAgo: 1,
      hasRenovation: true,
      hasFurniture: true,
      fromOwner: false,
    },
    {
      id: 4,
      title: 'Квартира-студия в центре',
      description: 'Компактное жилье для молодых, идеально для одного человека или пары. Близко к университету',
      price: '65 000$',
      location: 'Ташкент, Сергелийский район',
      area: '35м²',
      rooms: 1,
      images: [
        '/Rectangle.png',
        '/Rectangle.png',
        '/Rectangle.png',
      ],
      daysAgo: 3,
      hasRenovation: false,
      hasFurniture: false,
      fromOwner: true,
    },
  ];

  return (
    <div className="page-scrollable">
      <div className="flex flex-col min-h-screen bg-[#f7f7f7] overflow-x-hidden">
        <main className="flex-1">
          <div className="pt-4">
            <SearchBar />
          </div>
          
          <div className="mt-4">
            <SurveyBanner />
          </div>
          
          <Categories />

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
      </div>
      
      <div className="fixed-bottom-nav">
        <BottomNavigation />
      </div>
    </div>
  );
}