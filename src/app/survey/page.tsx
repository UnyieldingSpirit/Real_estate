'use client';

import { useState, JSX, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SlideIndicator from '@/src/shared/ui/SlideIndicator';
import { useTranslation } from '@/src/hooks';
import PropertyCategories from '@/src/shared/components/PropertyCategories';
import { PropertyCategoryType } from '@/src/store/categoryStore';
import { motion, AnimatePresence } from 'framer-motion';

// Типы для локализации
interface PropertyTypeLocalization {
  title: string;
  subtitle: string;
  apartment: string;
  house: string;
  commercial: string;
  dacha: string;
}

interface RoomsLocalization {
  title: string;
  subtitle: string;
  one: string;
  two: string;
  three: string;
  four: string;
  moreThanFive: string;
}

interface BudgetLocalization {
  title: string;
  subtitle: string;
  currency: string;
  from: string;
}

interface Localization {
  propertyType: PropertyTypeLocalization;
  rooms: RoomsLocalization;
  budget: BudgetLocalization;
  continue: string;
  goToResults: string;
}

// Типы для данных опроса
type RoomType = 'one' | 'two' | 'three' | 'four' | 'moreThanFive' | '';
type CurrencyType = '$' | 'UZS';

interface SurveyData {
  propertyType: PropertyCategoryType | '';
  rooms: RoomType;
  currency: CurrencyType;
  budget: number;
}

// Локализация
const localization: Record<string, Localization> = {
  ru: {
    propertyType: {
      title: 'Тип недвижимости',
      subtitle: 'Выберите тип недвижимости',
      apartment: 'Квартира',
      house: 'Частный дом',
      commercial: 'Нежилая недвижимость',
      dacha: 'Дача',
    },
    rooms: {
      title: 'Комнатность',
      subtitle: 'Какую комнатность рассматриваете?',
      one: 'Одна комната',
      two: 'Две комнаты',
      three: 'Три комнаты',
      four: 'Четыре комнаты',
      moreThanFive: 'Больше пяти',
    },
    budget: {
      title: 'Бюджет',
      subtitle: 'На какой бюджет рассчитываете?',
      currency: 'Валюта',
      from: 'От',
    },
    continue: 'Продолжить',
    goToResults: 'Перейти к предложениям',
  },
  uz: {
    propertyType: {
      title: 'Ko\'chmas mulk turi',
      subtitle: 'Ko\'chmas mulk turini tanlang',
      apartment: 'Kvartira',
      house: 'Xususiy uy',
      commercial: 'Tijorat ko\'chmas mulki',
      dacha: 'Dala hovli',
    },
    rooms: {
      title: 'Xonalar soni',
      subtitle: 'Qanday xonalar sonini ko\'rib chiqyapsiz?',
      one: 'Bir xona',
      two: 'Ikki xona',
      three: 'Uch xona',
      four: 'To\'rt xona',
      moreThanFive: 'Besh va undan ortiq',
    },
    budget: {
      title: 'Byudjet',
      subtitle: 'Qanday byudjetni mo\'ljallagan edingiz?',
      currency: 'Valyuta',
      from: 'Dan',
    },
    continue: 'Davom etish',
    goToResults: 'Takliflarga o\'tish',
  },
};

// Пресеты значений для слайдера бюджета
const budgetPresets = {
  '$': [
    { value: 300, label: '300$' },
    { value: 500, label: '500$' },
    { value: 1000, label: '1000$' },
    { value: 2000, label: '2000$' },
    { value: 3000, label: '3000$+' },
  ],
  'UZS': [
    { value: 3000000, label: '3M' },
    { value: 10000000, label: '10M' },
    { value: 30000000, label: '30M' },
    { value: 50000000, label: '50M' },
    { value: 100000000, label: '100M+' },
  ],
};

export default function SurveyPage(): JSX.Element {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useTranslation(localization as any);
  
  // Состояние для хранения ответов на опрос
  const [surveyData, setSurveyData] = useState<SurveyData>({
    propertyType: '',
    rooms: '',
    currency: '$',
    budget: 300,
  });
  
  // Состояние для отслеживания текущего шага
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Состояние для слайдера бюджета
  const [sliderPosition, setSliderPosition] = useState<number>(10); // процент от 0 до 100
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState<boolean>(false);
  
  // Состояние для анимации перехода
  const [direction, setDirection] = useState<number>(1); // 1 для вперед, -1 для назад
  
  // Максимальные значения для бюджета
  const maxBudget = {
    '$': 3000,
    'UZS': 100000000,
  };
  
  // Общее количество шагов
  const totalSteps: number = 3;

  // Обработчик выбора категории недвижимости
  const handleCategorySelect = (category: PropertyCategoryType): void => {
    setSurveyData({...surveyData, propertyType: category});
  };

  // Обработчик выбора комнатности
  const handleRoomsSelect = (rooms: RoomType): void => {
    setSurveyData({...surveyData, rooms: rooms});
  };
  
  // Обработчик выбора валюты
  const handleCurrencySelect = (currency: CurrencyType): void => {
    // При смене валюты сбрасываем бюджет на стандартное значение
    const defaultBudget = currency === '$' ? 300 : 10000000;
    setSurveyData({...surveyData, currency, budget: defaultBudget});
    
    // Пересчитываем положение слайдера
    const newPosition = (defaultBudget / maxBudget[currency]) * 100;
    setSliderPosition(Math.min(newPosition, 100));
  };
  
  // Обработчик выбора предустановленного значения бюджета
  const handleBudgetPresetSelect = (value: number): void => {
    setSurveyData({...surveyData, budget: value});
    const newPosition = (value / maxBudget[surveyData.currency]) * 100;
    setSliderPosition(Math.min(newPosition, 100));
  };
  
  // Логика для слайдера бюджета
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      let newPosition = (offsetX / rect.width) * 100;
      
      // Ограничиваем значение от 0 до 100
      newPosition = Math.max(0, Math.min(100, newPosition));
      setSliderPosition(newPosition);
      
      // Обновляем бюджет в зависимости от положения слайдера
      const newBudget = Math.round((newPosition / 100) * maxBudget[surveyData.currency]);
      setSurveyData({...surveyData, budget: newBudget});
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    // Обработчики для тачскрина
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !sliderRef.current) return;
      e.preventDefault(); // Предотвращаем скролл страницы при перетаскивании
      
      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = e.touches[0].clientX - rect.left;
      let newPosition = (offsetX / rect.width) * 100;
      
      // Ограничиваем значение от 0 до 100
      newPosition = Math.max(0, Math.min(100, newPosition));
      setSliderPosition(newPosition);
      
      // Обновляем бюджет в зависимости от положения слайдера
      const newBudget = Math.round((newPosition / 100) * maxBudget[surveyData.currency]);
      setSurveyData({...surveyData, budget: newBudget});
    };
    
    const handleTouchEnd = () => {
      isDragging.current = false;
      // document.removeEventListener('touchmove', handleTouchMove, { passive: false });
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    if (isDragging.current) {
      document.body.style.cursor = 'grabbing';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      // document.removeEventListener('touchmove', handleTouchMove, { passive: false });
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [surveyData.currency, maxBudget]);
  
  // Обработчик начала перетаскивания слайдера
  const handleSliderDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation(); // Останавливаем всплытие события
    isDragging.current = true;
  };
  
  // Обработчик клика на полосу слайдера
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    let newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    
    // Ограничиваем значение от 0 до 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
    
    // Обновляем бюджет в зависимости от положения слайдера
    const newBudget = Math.round((newPosition / 100) * maxBudget[surveyData.currency]);
    setSurveyData({...surveyData, budget: newBudget});
  };
  
  // Обработчик кнопки "Продолжить"
  const handleContinue = (): void => {
    if (currentStep < totalSteps - 1) {
      setDirection(1); // направление вперед
      setCurrentStep(currentStep + 1);
    } else {
      // Если это последний шаг, переходим к результатам с сохранением параметров поиска
      const searchParams = new URLSearchParams({
        propertyType: surveyData.propertyType,
        rooms: surveyData.rooms,
        currency: surveyData.currency,
        budget: surveyData.budget.toString(),
      });
      
      router.push(`/property-search?${searchParams.toString()}`);
    }
  };
  
  // Обработчик кнопки "Назад"
  const handleBack = (): void => {
    if (currentStep > 0) {
      setDirection(-1); // направление назад
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Получаем текст кнопки в зависимости от текущего шага
  const getButtonText = (): string => {
    if (currentStep === totalSteps - 1) {
      return t('goToResults');
    }
    return t('continue');
  };
  
  // Проверка доступности кнопки для текущего шага
  const isButtonDisabled = (): boolean => {
    if (currentStep === 0 && !surveyData.propertyType) return true;
    if (currentStep === 1 && !surveyData.rooms) return true;
    return false;
  };
  
  // Форматирование числа с разделителями разрядов
  const formatNumber = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  
  // Анимация для слайдов
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
      };
    },
  };
  
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col h-full bg-[#f7f7f7] relative">
        {/* Основное содержимое */}
        <div className="flex-1 px-4 pb-32 pt-4 overflow-hidden">
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                type: 'tween', 
                ease: 'easeInOut', 
                duration: 0.3, 
              }}
              className="h-full"
            >
              {/* Первый шаг - Выбор типа недвижимости */}
              {currentStep === 0 && (
                <div>
                  <h1 className="text-[28px] font-bold text-[#1F1F1F] mb-1">
                    {t('propertyType.title')}
                  </h1>
                  <p className="text-[#777777] text-[16px] mb-6">
                    {t('propertyType.subtitle')}
                  </p>
                  
                  <PropertyCategories 
                    onCategorySelect={handleCategorySelect}
                    updateStoreCategory={true}
                    preventRouting={true} 
                  />
                </div>
              )}
              
              {/* Второй шаг - Выбор комнатности */}
              {currentStep === 1 && (
                <div>
                  <h1 className="text-[28px] font-bold text-[#1F1F1F] mb-1">
                    {t('rooms.title')}
                  </h1>
                  <p className="text-[#777777] text-[16px] mb-6">
                    {t('rooms.subtitle')}
                  </p>
                  
                  <div className="flex justify-center mb-8">
                    <svg width="246" height="246" viewBox="0 0 246 246" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="123" cy="123" r="123" fill="white"/>
                      <circle cx="123" cy="123" r="122.5" stroke="#FF7560"/>
                      <path d="M116 172V186M116 123V151M151 123V151H137M186 123H95M74 123H60M60 74L123 60L186 74" stroke="#404040" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M186 99.2V181.8C186 182.914 185.558 183.982 184.77 184.77C183.982 185.558 182.914 186 181.8 186H64.2C63.0861 186 62.0178 185.558 61.2302 184.77C60.4425 183.982 60 182.914 60 181.8V99.2C60 98.0861 60.4425 97.0178 61.2302 96.2301C62.0178 95.4425 63.0861 95 64.2 95H181.8C182.914 95 183.982 95.4425 184.77 96.2301C185.558 97.0178 186 98.0861 186 99.2Z" stroke="#404040" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'one', label: t('rooms.one') },
                        { value: 'two', label: t('rooms.two') },
                        { value: 'three', label: t('rooms.three') },
                        { value: 'four', label: t('rooms.four') },
                        { value: 'moreThanFive', label: t('rooms.moreThanFive') },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          whileTap={{ scale: 0.95 }}
                          className={`py-4 px-2 rounded-xl text-center ${
                            surveyData.rooms === option.value 
                              ? 'bg-[#FF7560] text-white' 
                              : 'bg-white text-[#1F1F1F]'
                          }`}
                          onClick={() => handleRoomsSelect(option.value as RoomType)}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Третий шаг - Выбор бюджета */}
              {currentStep === 2 && (
                <div>
                  <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-1">
                    {t('budget.title')}
                  </h1>
                  <p className="text-[#777777] text-[16px] mb-6">
                    {t('budget.subtitle')}
                  </p>
                  
                  <div className="flex justify-center mb-8">
                    <svg width="246" height="246" viewBox="0 0 246 246" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="123" cy="123" r="123" fill="white"/>
                      <circle cx="123" cy="123" r="122.5" stroke="#FF7560"/>
                      <path d="M84.6665 97.6667H110.333" stroke="#404040" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M179.845 104.083H163.149C151.695 104.083 142.417 112.701 142.417 123.333C142.417 133.966 151.701 142.583 163.142 142.583H179.845C180.384 142.583 180.647 142.583 180.872 142.57C184.337 142.359 187.096 139.798 187.32 136.584C187.333 136.378 187.333 136.128 187.333 135.634V111.033C187.333 110.538 187.333 110.288 187.32 110.083C187.089 106.868 184.337 104.308 180.872 104.096C180.653 104.083 180.384 104.083 179.845 104.083Z" stroke="#404040" strokeWidth="5"/>
                      <path d="M180.692 104.083C180.192 92.0713 178.587 84.705 173.396 79.5203C165.882 72 153.781 72 129.583 72H110.333C86.1361 72 74.0342 72 66.5203 79.5203C59.0064 87.0407 59 99.1361 59 123.333C59 147.531 59 159.632 66.5203 167.146C74.0407 174.66 86.1361 174.667 110.333 174.667H129.583C153.781 174.667 165.882 174.667 173.396 167.146C178.587 161.962 180.198 154.595 180.692 142.583" stroke="#404040" strokeWidth="5"/>
                      <path d="M161.609 123.333H161.673" stroke="#404040" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-[#777777] text-sm mb-1">
                      {t('budget.currency')}
                    </p>
                    
                    {/* Селектор валюты с выпадающей плашкой */}
                    <div className="relative text-[#2F3334] mb-6">
                      <button 
                        className="w-full bg-white p-4 rounded-xl flex justify-between items-center shadow-sm"
                        onClick={() => {
                          setShowCurrencyDropdown(!showCurrencyDropdown);
                        }}
                      >
                        <span className="text-xl">{surveyData.currency}</span>
                        <svg 
                          width="16" 
                          height="9" 
                          viewBox="0 0 16 9" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                        >
                          <path d="M1.5 1L8 7.5L14.5 1" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      {/* Выпадающее меню с валютами */}
                      <AnimatePresence>
                        {showCurrencyDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-10 overflow-hidden"
                          >
                            {['$', 'UZS'].map((currency) => (
                              <motion.div
                                key={currency}
                                whileHover={{ backgroundColor: '#f7f7f7' }}
                                className={`p-4 flex items-center cursor-pointer ${
                                  surveyData.currency === currency ? 'bg-gray-100' : ''
                                }`}
                                onClick={() => {
                                  handleCurrencySelect(currency as CurrencyType);
                                  setShowCurrencyDropdown(false);
                                }}
                              >
                                <span className="text-xl">{currency}</span>
                                {surveyData.currency === currency && (
                                  <div className="ml-auto">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7560" strokeWidth="2">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Слайдер для выбора бюджета */}
                    <div 
                      ref={sliderRef}
                      className="relative h-3 bg-gray-200 rounded-full mb-5 cursor-pointer"
                      onClick={handleSliderClick}
                    >
                      <div 
                        className="absolute h-3 bg-[#FF7560] rounded-full"
                        style={{ width: `${sliderPosition}%` }}
                      ></div>
                      <div
                        className="absolute w-7 h-7 bg-white rounded-full -mt-2 -ml-3.5 shadow-md cursor-grab flex items-center justify-center"
                        style={{ left: `${sliderPosition}%` }}
                        onMouseDown={handleSliderDragStart}
                        onTouchStart={handleSliderDragStart}
                      >
                        <div className="w-3 h-3 bg-[#FF7560] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="text-[32px] font-bold text-[#1F1F1F] text-center">
                      {t('budget.from')} {surveyData.currency === '$' 
                        ? `${formatNumber(surveyData.budget)}$` 
                        : `${formatNumber(surveyData.budget)} UZS`
                      }
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Фиксированная нижняя панель с индикатором и кнопками навигации */}
        <div className="fixed bottom-0 left-0 right-0 p-8">
          <div className="flex justify-center mb-6">
            <SlideIndicator totalSlides={totalSteps} currentSlide={currentStep} />
          </div>
          
          <div className="flex items-center gap-4">
            {/* Кнопка Назад */}
            {currentStep > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gray-300 rounded-xl w-16 flex justify-center"
                onClick={handleBack}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                </svg>
              </motion.button>
            )}
            
            {/* Кнопка Продолжить/Перейти к результатам */}
            <motion.button 
              whileTap={{ scale: 0.98 }}
              className={`flex-1 p-4 rounded-xl font-medium transition-all ${
                isButtonDisabled() 
                  ? 'bg-[#1F1F1F] text-white opacity-50' 
                  : 'bg-[#1F1F1F] text-white'
              }`}
              onClick={handleContinue}
              disabled={isButtonDisabled()}
            >
              {getButtonText()}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}