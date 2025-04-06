'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  en: {
    properties: 'Properties',
  },
};

const allProperties: PropertyData[] = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    description: 'Светлая квартира с панорамным видом на город, качественный ремонт, новая мебель',
    price: '450$',
    location: 'Ташкент, Юнусабадский район',
    area: '75м²',
    rooms: 3,
    images: ['/Rectangle.png', '/Rectangle.png', '/Rectangle.png'],
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
    images: ['/Rectangle.png', '/Rectangle.png', '/Rectangle.png'],
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
    images: ['/Rectangle.png', '/Rectangle.png', '/Rectangle.png'],
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
    images: ['/Rectangle.png', '/Rectangle.png', '/Rectangle.png'],
    daysAgo: 3,
    hasRenovation: false,
    hasFurniture: false,
    fromOwner: true,
  },
  {
    id: 5,
    title: 'Двухуровневая квартира с террасой',
    description: 'Просторная квартира в новом жилом комплексе с видом на парк, собственная терраса',
    price: '200 000$',
    location: 'Ташкент, Чиланзар',
    area: '120м²',
    rooms: 4,
    images: ['/Rectangle.png', '/Rectangle.png', '/Rectangle.png'],
    daysAgo: 4,
    hasRenovation: true,
    hasFurniture: true,
    fromOwner: true,
  },
];

export default function Home() {
  const { t } = useTranslation(localization);
  const router = useRouter();
  const [displayedProperties, setDisplayedProperties] = useState<PropertyData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Эффект для инициализации и проверки онбординга
  useEffect(() => {
    const isOnboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
    const isUserRegistered = localStorage.getItem('userRegistered') === 'true';
    const isNavigating = sessionStorage.getItem('isNavigating') === 'true';
    
    if (isNavigating) {
      sessionStorage.removeItem('isNavigating');
      return;
    }
    
    if (!isOnboardingCompleted) {
      sessionStorage.setItem('isNavigating', 'true');
      router.push('/onboarding');
      return;
    }
    
    if (isOnboardingCompleted && !isUserRegistered) {
      sessionStorage.setItem('isNavigating', 'true');
      router.push('/register');
      return;
    }
  }, [router]);

  useEffect(() => {
    setDisplayedProperties(allProperties.slice(0, 2));
  }, []);

  const loadMoreProperties = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const startIndex = page * 2;
      const endIndex = startIndex + 2;
      const nextProperties = allProperties.slice(startIndex, endIndex);
      
      if (nextProperties.length > 0) {
        setDisplayedProperties(prev => [
          ...prev, 
          ...nextProperties,
        ]);
        setPage(prev => prev + 1);
      }
      
      setIsLoading(false);
    }, 500);
  }, [page, isLoading]);

  // Intersection Observer для бесконечного скролла
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && displayedProperties.length < allProperties.length) {
          loadMoreProperties();
        }
      },
      { threshold: 1 },
    );

    const currentTrigger = loadMoreTriggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [loadMoreProperties, displayedProperties.length]);

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="page-scrollable"
      >
        <div className="flex flex-col min-h-screen bg-[#f7f7f7] overflow-x-hidden">
          <main className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <SearchBar />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="mt-4"
            >
              <SurveyBanner />
            </motion.div>
          
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              className='px-4'
            >
              <Categories  />
            </motion.div>

            <div className="px-4 mb-6">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                className="flex justify-between items-center mb-4"
              >
                <h2 className="text-[34px] font-bold text-[#1F1F1F]">
                  {t('properties')}
                </h2>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                className="space-y-4"
              >
                <AnimatePresence>
                  {displayedProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        ease: 'easeOut', 
                      }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              
                {/* Триггер для бесконечного скролла */}
                <div 
                  ref={loadMoreTriggerRef} 
                  className="h-10 w-full"
                >
                  {isLoading && (
                    <div className="flex justify-center items-center">
                      <div className="w-5 h-5 border-2 border-[#1F1F1F] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      
      </motion.div>
      <BottomNavigation />

    </div>
  );
}