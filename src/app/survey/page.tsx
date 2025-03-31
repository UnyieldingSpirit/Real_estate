'use client';

import { useState, JSX } from 'react';
import { useRouter } from 'next/navigation';
import SlideIndicator from '@/src/shared/ui/SlideIndicator';
import { useTranslation } from '@/src/hooks';

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
type PropertyType = 'apartment' | 'house' | 'commercial' | 'dacha' | '';
type RoomType = 'one' | 'two' | 'three' | 'four' | 'moreThanFive' | '';
type CurrencyType = '$' | 'UZS';

interface SurveyData {
  propertyType: PropertyType;
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
      dacha: 'Дача'
    },
    rooms: {
      title: 'Комнатность',
      subtitle: 'Какую комнатность рассматриваете?',
      one: 'Одна комната',
      two: 'Две комнаты',
      three: 'Три комнаты',
      four: 'Четыре комнаты',
      moreThanFive: 'Больше пяти'
    },
    budget: {
      title: 'Бюджет',
      subtitle: 'На какой бюджет рассчитываете?',
      currency: 'Валюта',
      from: 'От'
    },
    continue: 'Продолжить',
    goToResults: 'Перейти к предложениям'
  },
  uz: {
    propertyType: {
      title: 'Ko\'chmas mulk turi',
      subtitle: 'Ko\'chmas mulk turini tanlang',
      apartment: 'Kvartira',
      house: 'Xususiy uy',
      commercial: 'Tijorat ko\'chmas mulki',
      dacha: 'Dala hovli'
    },
    rooms: {
      title: 'Xonalar soni',
      subtitle: 'Qanday xonalar sonini ko\'rib chiqyapsiz?',
      one: 'Bir xona',
      two: 'Ikki xona',
      three: 'Uch xona',
      four: 'To\'rt xona',
      moreThanFive: 'Besh va undan ortiq'
    },
    budget: {
      title: 'Byudjet',
      subtitle: 'Qanday byudjetni mo\'ljallagan edingiz?',
      currency: 'Valyuta',
      from: 'Dan'
    },
    continue: 'Davom etish',
    goToResults: 'Takliflarga o\'tish'
  }
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
    budget: 300
  });
  
  // Состояние для отслеживания текущего шага
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  // Общее количество шагов
  const totalSteps: number = 3;
  
  // Обработчик выбора типа недвижимости
  const handlePropertyTypeSelect = (type: PropertyType): void => {
    setSurveyData({...surveyData, propertyType: type});
  };
  
  // Обработчик выбора комнатности
  const handleRoomsSelect = (rooms: RoomType): void => {
    setSurveyData({...surveyData, rooms: rooms});
  };
  
  // Обработчик выбора валюты
  const handleCurrencySelect = (currency: CurrencyType): void => {
    if (currency === '$') {
      setSurveyData({...surveyData, currency: currency, budget: 300});
    } else {
      setSurveyData({...surveyData, currency: currency, budget: 10000000});
    }
  };
  
  // // Обработчик изменения бюджета
  // const handleBudgetChange = (value: number): void => {
  //   setSurveyData({...surveyData, budget: value});
  // };
  
  // Обработчик кнопки "Продолжить"
  const handleContinue = (): void => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Если это последний шаг, переходим к результатам
      router.push('/property-search');
    }
  };
  
  // Получаем текст кнопки в зависимости от текущего шага
  const getButtonText = (): string => {
    if (currentStep === totalSteps - 1) {
      return t('goToResults');
    }
    return t('continue');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Шапка с кнопкой назад */}
      
      <div className="flex-1 p-4 flex flex-col">
        {/* Первый шаг - Выбор типа недвижимости */}
        {currentStep === 0 && (
          <div className="flex-1">
            <h1 className="text-[28px] font-bold text-[#1F1F1F] mb-1">
              {t('propertyType.title')}
            </h1>
            <p className="text-[#777777] text-[16px] mb-6">
              {t('propertyType.subtitle')}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`p-4 rounded-xl flex flex-col items-center h-[180px] cursor-pointer
                ${surveyData.propertyType === 'apartment' ? 'bg-[#F08674]' : 'bg-white border border-gray-200'}`}
                onClick={() => handlePropertyTypeSelect('apartment')}
              >
                <div className="flex-1 flex items-center justify-center w-full">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Иконка квартиры */}
                    <rect x="20" y="20" width="60" height="60" stroke={surveyData.propertyType === 'apartment' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                    <rect x="30" y="30" width="10" height="10" fill={surveyData.propertyType === 'apartment' ? '#FFFFFF' : '#000000'} />
                    <rect x="30" y="50" width="10" height="10" fill={surveyData.propertyType === 'apartment' ? '#FFFFFF' : '#000000'} />
                    <rect x="50" y="30" width="10" height="10" fill={surveyData.propertyType === 'apartment' ? '#FFFFFF' : '#000000'} />
                    <rect x="50" y="50" width="10" height="10" fill={surveyData.propertyType === 'apartment' ? '#FFFFFF' : '#000000'} />
                  </svg>
                </div>
                <span className={`text-base font-medium ${surveyData.propertyType === 'apartment' ? 'text-white' : 'text-[#1F1F1F]'}`}>
                  {t('propertyType.apartment')}
                </span>
              </div>

              <div 
                className={`p-4 rounded-xl flex flex-col items-center h-[180px] cursor-pointer
                ${surveyData.propertyType === 'house' ? 'bg-[#F08674]' : 'bg-white border border-gray-200'}`}
                onClick={() => handlePropertyTypeSelect('house')}
              >
                <div className="flex-1 flex items-center justify-center w-full">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Иконка частного дома */}
                    <path d="M50 20L20 50H30V80H70V50H80L50 20Z" stroke={surveyData.propertyType === 'house' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                    <rect x="40" y="60" width="20" height="20" stroke={surveyData.propertyType === 'house' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <span className={`text-base font-medium ${surveyData.propertyType === 'house' ? 'text-white' : 'text-[#1F1F1F]'}`}>
                  {t('propertyType.house')}
                </span>
              </div>

              <div 
                className={`p-4 rounded-xl flex flex-col items-center h-[180px] cursor-pointer
                ${surveyData.propertyType === 'commercial' ? 'bg-[#F08674]' : 'bg-white border border-gray-200'}`}
                onClick={() => handlePropertyTypeSelect('commercial')}
              >
                <div className="flex-1 flex items-center justify-center w-full">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Иконка нежилой недвижимости */}
                    <rect x="20" y="40" width="60" height="40" stroke={surveyData.propertyType === 'commercial' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                    <rect x="30" y="50" width="40" height="10" fill={surveyData.propertyType === 'commercial' ? '#FFFFFF' : '#000000'} />
                    <rect x="30" y="65" width="15" height="15" stroke={surveyData.propertyType === 'commercial' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <span className={`text-base font-medium ${surveyData.propertyType === 'commercial' ? 'text-white' : 'text-[#1F1F1F]'}`}>
                  {t('propertyType.commercial')}
                </span>
              </div>

              <div 
                className={`p-4 rounded-xl flex flex-col items-center h-[180px] cursor-pointer
                ${surveyData.propertyType === 'dacha' ? 'bg-[#F08674]' : 'bg-white border border-gray-200'}`}
                onClick={() => handlePropertyTypeSelect('dacha')}
              >
                <div className="flex-1 flex items-center justify-center w-full">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Иконка дачи */}
                    <path d="M50 20L20 50H30V70H70V50H80L50 20Z" stroke={surveyData.propertyType === 'dacha' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                    <rect x="40" y="50" width="20" height="20" stroke={surveyData.propertyType === 'dacha' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                    <path d="M20 70C20 70 30 90 50 90C70 90 80 70 80 70" stroke={surveyData.propertyType === 'dacha' ? '#FFFFFF' : '#000000'} strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <span className={`text-base font-medium ${surveyData.propertyType === 'dacha' ? 'text-white' : 'text-[#1F1F1F]'}`}>
                  {t('propertyType.dacha')}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* Второй шаг - Выбор комнатности */}
        {currentStep === 1 && (
          <div className="flex-1">
            <h1 className="text-[28px] font-bold text-[#1F1F1F] mb-1">
              {t('rooms.title')}
            </h1>
            <p className="text-[#777777] text-[16px] mb-6">
              {t('rooms.subtitle')}
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="w-[200px] h-[200px] rounded-full border border-[#F08674] flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Иконка план комнат */}
                  <rect x="10" y="10" width="100" height="100" stroke="#1F1F1F" strokeWidth="2" fill="none" />
                  <line x1="40" y1="10" x2="40" y2="110" stroke="#1F1F1F" strokeWidth="2" />
                  <line x1="80" y1="10" x2="80" y2="110" stroke="#1F1F1F" strokeWidth="2" />
                  <line x1="10" y1="60" x2="110" y2="60" stroke="#1F1F1F" strokeWidth="2" />
                  <circle cx="25" cy="45" r="5" fill="#1F1F1F" />
                  <circle cx="60" cy="45" r="5" fill="#1F1F1F" />
                  <circle cx="95" cy="45" r="5" fill="#1F1F1F" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                className={`w-full p-4 rounded-xl font-medium text-left
                ${surveyData.rooms === 'one' ? 'bg-[#F08674] text-white' : 'bg-white border border-gray-200 text-[#1F1F1F]'}`}
                onClick={() => handleRoomsSelect('one')}
              >
                {t('rooms.one')}
              </button>
              
              <button 
                className={`w-full p-4 rounded-xl font-medium text-left
                ${surveyData.rooms === 'two' ? 'bg-[#F08674] text-white' : 'bg-white border border-gray-200 text-[#1F1F1F]'}`}
                onClick={() => handleRoomsSelect('two')}
              >
                {t('rooms.two')}
              </button>
              
              <button 
                className={`w-full p-4 rounded-xl font-medium text-left
                ${surveyData.rooms === 'three' ? 'bg-[#F08674] text-white' : 'bg-white border border-gray-200 text-[#1F1F1F]'}`}
                onClick={() => handleRoomsSelect('three')}
              >
                {t('rooms.three')}
              </button>
              
              <button 
                className={`w-full p-4 rounded-xl font-medium text-left
                ${surveyData.rooms === 'four' ? 'bg-[#F08674] text-white' : 'bg-white border border-gray-200 text-[#1F1F1F]'}`}
                onClick={() => handleRoomsSelect('four')}
              >
                {t('rooms.four')}
              </button>
              
              <button 
                className={`w-full p-4 rounded-xl font-medium text-left
                ${surveyData.rooms === 'moreThanFive' ? 'bg-[#F08674] text-white' : 'bg-white border border-gray-200 text-[#1F1F1F]'}`}
                onClick={() => handleRoomsSelect('moreThanFive')}
              >
                {t('rooms.moreThanFive')}
              </button>
            </div>
          </div>
        )}
        
        {/* Третий шаг - Выбор бюджета */}
        {currentStep === 2 && (
          <div className="flex-1">
            <h1 className="text-[28px] font-bold text-[#1F1F1F] mb-1">
              {t('budget.title')}
            </h1>
            <p className="text-[#777777] text-[16px] mb-6">
              {t('budget.subtitle')}
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="w-[200px] h-[200px] rounded-full border border-[#F08674] flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Иконка кошелька */}
                  <rect x="20" y="40" width="80" height="50" rx="5" stroke="#1F1F1F" strokeWidth="2" fill="none" />
                  <path d="M20 60H40V80H20" stroke="#1F1F1F" strokeWidth="2" fill="none" />
                  <circle cx="90" cy="60" r="6" fill="#1F1F1F" />
                  <path d="M30 40C30 30 50 20 70 30C90 40 90 40 90 40" stroke="#1F1F1F" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-[#777777] text-sm mb-1">
                {t('budget.currency')}
              </p>
              <div className="flex items-center mb-5">
                <button 
                  className={`flex-1 p-3 border ${surveyData.currency === '$' ? 'border-[#F08674] bg-white' : 'border-gray-200 bg-white'} rounded-l-xl`}
                  onClick={() => handleCurrencySelect('$')}
                >
                  <span className={`text-xl font-medium ${surveyData.currency === '$' ? 'text-[#F08674]' : 'text-[#1F1F1F]'}`}>$</span>
                </button>
                <button 
                  className={`flex-1 p-3 border ${surveyData.currency === 'UZS' ? 'border-[#F08674] bg-white' : 'border-gray-200 bg-white'} rounded-r-xl`}
                  onClick={() => handleCurrencySelect('UZS')}
                >
                  <span className={`text-xl font-medium ${surveyData.currency === 'UZS' ? 'text-[#F08674]' : 'text-[#1F1F1F]'}`}>UZS</span>
                </button>
              </div>
              
              <div className="relative h-2 bg-gray-200 rounded-full mb-3">
                <div 
                  className="absolute h-2 bg-[#F08674] rounded-full"
                  style={{ 
                    width: `${surveyData.currency === '$' ? (surveyData.budget / 3000) * 100 : (surveyData.budget / 100000000) * 100}%`,
                    maxWidth: '100%'
                  }}
                ></div>
                <div 
                  className="absolute w-5 h-5 bg-white border-2 border-[#F08674] rounded-full -mt-1.5 transform -translate-x-1/2"
                  style={{ 
                    left: `${surveyData.currency === '$' ? (surveyData.budget / 3000) * 100 : (surveyData.budget / 100000000) * 100}%`,
                    // maxLeft: '100%'
                  }}
                ></div>
              </div>
              
              <div className="text-xl font-bold text-[#1F1F1F] text-center">
                {t('budget.from')} {surveyData.currency === '$' ? 
                  surveyData.budget.toLocaleString() + '$' : 
                  surveyData.budget.toLocaleString() + ' UZS'}
              </div>
            </div>
          </div>
        )}
        
        {/* Индикатор прогресса и кнопка */}
        <div className="mt-auto">
          <div className="flex justify-center mb-8">
            <SlideIndicator totalSlides={totalSteps} currentSlide={currentStep} />
          </div>
          
          <button 
            className={`w-full p-4 rounded-xl bg-[#1F1F1F] text-white font-medium ${
              (currentStep === 0 && !surveyData.propertyType) || 
              (currentStep === 1 && !surveyData.rooms) ? 
              'opacity-50' : ''
            }`}
            onClick={handleContinue}
            disabled={(currentStep === 0 && !surveyData.propertyType) || (currentStep === 1 && !surveyData.rooms)}
          >
            {getButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
}