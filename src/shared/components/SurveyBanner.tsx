'use client';

import { useTranslation } from '@/src/hooks';

const localization = {
  ru: {
    takeSurvey: 'Пройди опрос',
    surveyDescription: 'И мы предоставим тебе подходящие варианты'
  },
  uz: {
    takeSurvey: 'So\'rovnomani to\'ldiring',
    surveyDescription: 'Va biz sizga mos variantlarni taqdim etamiz'
  }
};

export default function SurveyBanner() {
  const { t } = useTranslation(localization);
  
  const handleSurveyClick = () => {
    console.log('Open survey');
    // Survey functionality would be implemented here
  };
  
  return (
    <div 
      className="bg-white rounded-2xl p-5 mb-6 mx-4 shadow-sm"
      onClick={handleSurveyClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-[26px] font-bold text-[#1F1F1F] mb-1">
            {t('takeSurvey')}
          </h2>
          <p className="text-[#8F8F8F] text-base">
            {t('surveyDescription')}
          </p>
        </div>
        
        <div className="w-10 h-10 flex items-center justify-center bg-[#FFF5F5] rounded-full">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L1 13" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}