'use client';

import { useTranslation } from '@/src/hooks';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/src/store/categoryStore';

const localization = {
  ru: {
    takeSurvey: 'Пройди опрос',
    surveyDescriptionStart: 'И мы предоставим тебе подходящие',
    surveyDescriptionEnd: 'варианты',
  },
  uz: {
    takeSurvey: 'So\'rovnomani to\'ldiring',
    surveyDescriptionStart: 'Va biz sizga mos',
    surveyDescriptionEnd: 'variantlarni',
  },
};

// Функция для создания светлого оттенка цвета с прозрачностью
const getLightColorWithOpacity = (hexColor: string, opacity = 0.1) => {
  // Проверяем, является ли цвет в формате #RRGGBB или #RRGGBBAA
  const hex = hexColor.replace('#', '');
  
  // Если длина не 6 и не 8, используем дефолтный цвет
  if (hex.length !== 6 && hex.length !== 8) {
    return `rgba(255, 117, 96, ${opacity})`;
  }
  
  // Преобразуем hex в RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function SurveyBanner() {
  const { t } = useTranslation(localization);
  const router = useRouter();
  
  // Получаем активный цвет из store
  const activeColor = useCategoryStore(state => state.getActiveColor());
  
  // Создаем светлый оттенок цвета для фона кнопки
  const buttonBgColor = getLightColorWithOpacity(activeColor, 0.1);
  
  const handleSurveyClick = () => {
    // Перенаправляем пользователя на страницу опроса
    router.push('/survey');
  };
  
  return (
    <div 
      className="bg-white rounded-2xl p-4 mb-6 mx-4 shadow-sm relative h-[130px] cursor-pointer"
      onClick={handleSurveyClick}
    >
      <div className="flex h-full">
        <div className="">
          <h2 className="text-[22px] font-bold text-[#1F1F1F] mb-1">
            {t('takeSurvey')}
          </h2>
          <p className="text-[#8F8F8F] text-[16px] leading-tight">
            {t('surveyDescriptionStart')} <br />
            {t('surveyDescriptionEnd')}
          </p>
        </div>
      </div>
      
      <div 
        className="w-[41px] h-[41px] flex items-center justify-center rounded-full absolute"
        style={{ 
          bottom: '12px', 
          right: '12px',
          backgroundColor: buttonBgColor, 
        }}
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M1 1L7 7L1 13" 
            stroke={activeColor} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}