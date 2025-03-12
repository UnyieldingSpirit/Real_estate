'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BackIcon, CheckmarkIcon } from '@/src/shared/ui/Icon';
import { useTranslation } from '@/src/hooks';
import NavigationHeader from '@/src/shared/components/NavigationHeader';

const localization = {
  ru: {
    filter: 'Фильтр',
    city: 'Город',
    district: 'Район',
    area: 'Площадь (м²)',
    currency: 'Валюта',
    type: 'Тип',
    price: 'Цена',
    minPrice: 'мин.',
    maxPrice: 'макс.',
    hasRenovation: 'Наличие ремонта',
    hasFurniture: 'Мебель/техника в наличии',
    fromOwners: 'От собственников',
    apply: 'Применить',
    reset: 'Сбросить',
    from: 'от',
    select: 'Выбрать',
    rent: 'Аренда',
    buy: 'Покупка',
    dollars: 'Доллары',
    sum: 'Сум'
  },
  uz: {
    filter: 'Filtr',
    city: 'Shahar',
    district: 'Tuman',
    area: 'Maydon (m²)',
    currency: 'Valyuta',
    type: 'Turi',
    price: 'Narxi',
    minPrice: 'min.',
    maxPrice: 'maks.',
    hasRenovation: 'Ta\'mirlangan',
    hasFurniture: 'Mebel/texnika mavjud',
    fromOwners: 'Mulkdorlardan',
    apply: 'Qo\'llash',
    reset: 'Tozalash',
    from: 'dan',
    select: 'Tanlash',
    rent: 'Ijara',
    buy: 'Sotib olish',
    dollars: 'Dollar',
    sum: 'So\'m'
  }
};

// Список городов и районов для демонстрации
const cities = ['Ташкент', 'Самарканд', 'Бухара', 'Андижан'];
const districts = {
  'Ташкент': ['Чиланзарский', 'Юнусабадский', 'Мирзо-Улугбекский', 'Сергелийский'],
  'Самарканд': ['Район 1', 'Район 2'],
  'Бухара': ['Район 1', 'Район 2'],
  'Андижан': ['Район 1', 'Район 2']
};

export default function FilterPage() {
  const router = useRouter();
  const { t } = useTranslation(localization);
  
  // Состояния для фильтров
  const [selectedCity, setSelectedCity] = useState('Ташкент');
  const [selectedDistrict, setSelectedDistrict] = useState('Чиланзарский');
  const [minArea, setMinArea] = useState('60');
  const [currency, setCurrency] = useState('Доллары');
  const [propertyType, setPropertyType] = useState('Аренда');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [hasRenovation, setHasRenovation] = useState(true);
  const [hasFurniture, setHasFurniture] = useState(false);
  const [fromOwners, setFromOwners] = useState(false);
  
  // Показать/скрыть выпадающие списки
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleBack = () => {
    router.back();
  };
  
  const handleApplyFilters = () => {
    // Здесь будет логика применения фильтров
    console.log({
      selectedCity,
      selectedDistrict,
      minArea,
      currency,
      propertyType,
      minPrice,
      maxPrice,
      hasRenovation,
      hasFurniture,
      fromOwners
    });
    
    router.back();
  };
  
  const handleResetFilters = () => {
    setSelectedCity('Ташкент');
    setSelectedDistrict('Чиланзарский');
    setMinArea('');
    setCurrency('Доллары');
    setPropertyType('Аренда');
    setMinPrice('');
    setMaxPrice('');
    setHasRenovation(false);
    setHasFurniture(false);
    setFromOwners(false);
  };
  
  // Функция для отображения селектора
  const renderSelector = (title, value, showDropdown, setShowDropdown, options, setValue) => {
    return (
      <div className="mb-6">
        <div className="text-[#8F8F8F] mb-2 text-lg">{title}</div>
        <div className="relative">
          <div 
            className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-[#2F3334] text-lg">{value}</span>
            <svg 
              width="16" 
              height="9" 
              viewBox="0 0 16 9" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            >
              <path d="M1.5 1L8 7.5L14.5 1" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {showDropdown && (
            <div className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-md z-10 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div 
                  key={option} 
                  className="p-4 hover:bg-gray-50 cursor-pointer text-lg text-[#2F3334]"
                  onClick={() => {
                    setValue(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Header */}
     <NavigationHeader showLanguageSelector={false} />
          <div className="px-4">
        <h1 className="text-[32px] font-bold text-[#1F1F1F]">{t('filter')}</h1>
              
        {/* Город */}
        {renderSelector(
          t('city'), 
          selectedCity, 
          showCityDropdown, 
          setShowCityDropdown, 
          cities, 
          setSelectedCity
        )}
        
        {/* Район */}
        {renderSelector(
          t('district'), 
          selectedDistrict, 
          showDistrictDropdown, 
          setShowDistrictDropdown, 
          districts[selectedCity] || [], 
          setSelectedDistrict
        )}
        
        {/* Площадь */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] mb-2 text-lg">{t('area')}</div>
          <div className="relative">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center">
                <span className="text-[#8F8F8F] text-lg mr-2">{t('from')}</span>
                <input
                  type="number"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="flex-1 text-[#2F3334] text-lg outline-none"
                  placeholder="0"
                  style={{ appearance: 'textfield' }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Валюта */}
        {renderSelector(
          t('currency'), 
          currency, 
          showCurrencyDropdown, 
          setShowCurrencyDropdown, 
          [t('dollars'), t('sum')], 
          setCurrency
        )}
        
        {/* Тип */}
        {renderSelector(
          t('type'), 
          propertyType, 
          showTypeDropdown, 
          setShowTypeDropdown, 
          [t('rent'), t('buy')], 
          setPropertyType
        )}
        
        {/* Цена */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] mb-2 text-lg">{t('price')}</div>
          <div className="flex gap-3">
            <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full text-[#2F3334] text-lg outline-none"
                placeholder={t('minPrice')}
                style={{ appearance: 'textfield' }}
              />
            </div>
            <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full text-[#2F3334] text-lg outline-none"
                placeholder={t('maxPrice')}
                style={{ appearance: 'textfield' }}
              />
            </div>
          </div>
        </div>
        
        {/* Чекбоксы */}
        <div className="mb-8">
          <div className="flex items-center mb-4" onClick={() => setHasRenovation(!hasRenovation)}>
            <div className={`w-6 h-6 rounded border ${hasRenovation ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3`}>
              {hasRenovation && <CheckmarkIcon color="white" size={14} />}
            </div>
            <span className="text-[#8F8F8F] text-lg">{t('hasRenovation')}</span>
          </div>
          
          <div className="flex items-center mb-4" onClick={() => setHasFurniture(!hasFurniture)}>
            <div className={`w-6 h-6 rounded border ${hasFurniture ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3`}>
              {hasFurniture && <CheckmarkIcon color="white" size={14} />}
            </div>
            <span className="text-[#8F8F8F] text-lg">{t('hasFurniture')}</span>
          </div>
          
          <div className="flex items-center" onClick={() => setFromOwners(!fromOwners)}>
            <div className={`w-6 h-6 rounded border ${fromOwners ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3`}>
              {fromOwners && <CheckmarkIcon color="white" size={14} />}
            </div>
            <span className="text-[#8F8F8F] text-lg">{t('fromOwners')}</span>
          </div>
        </div>
      </div>
      
      {/* Кнопки применить/сбросить */}
      <div className="px-4 py-3 mb-4">
        <button
          onClick={handleApplyFilters}
          className="w-full p-4 bg-[#1F1F1F] text-white rounded-xl text-lg font-medium mb-3"
        >
          {t('apply')}
        </button>
        
        <button
          onClick={handleResetFilters}
          className="w-full p-4 text-[#8F8F8F] text-lg font-medium"
        >
          {t('reset')}
        </button>
      </div>
    </div>
  );
}