import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/src/hooks';
import { useCategoryStore } from '@/src/store/categoryStore';

// Локализация для пустого состояния
const localization = {
  ru: {
    noAds: {
      active: 'Нет активных объявлений',
      inReview: 'Нет объявлений на проверке',
      favorites: 'Избранных объявлений пока нет'
    },
    createAdDescription: 'Разместите объявление и найдите покупателя или арендатора',
    createAdButton: 'Разместить объявление'
  },
  uz: {
    noAds: {
      active: 'Faol e\'lonlar yo\'q',
      inReview: 'Tekshiruvdagi e\'lonlar yo\'q',
      favorites: 'Tanlanganlar yo\'q'
    },
    createAdDescription: 'E\'lon joylashtiring va sotuvchi yoki ijaraga beruvchini toping',
    createAdButton: 'E\'lon yaratish'
  }
};

interface EmptyStateProps {
  activeTab: string;
}

export default function EmptyState({ activeTab }: EmptyStateProps) {
  const router = useRouter();
  const { t } = useTranslation(localization);
  const activeColor = useCategoryStore(state => state.getActiveColor());

  const handleCreateAd = () => {
    router.push('/post');
  };

  const getIllustration = () => {
    switch (activeTab) {
      case 'active':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110Z" stroke={activeColor} strokeWidth="2" strokeDasharray="8 8"/>
            <path d="M40 60L52 72L80 44" stroke={activeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'inReview':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110Z" stroke="#F5A623" strokeWidth="2" strokeDasharray="8 8"/>
            <path d="M60 40V60L75 75" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 45L75 75" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'favorites':
        return (
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110Z" stroke="#9C27B0" strokeWidth="2" strokeDasharray="8 8"/>
            <path d="M60 30L70 54H96L74 70L84 94L60 78L36 94L46 70L24 54H50L60 30Z" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="mb-6">
        {getIllustration()}
      </div>
      
      <h2 className="text-[#1F1F1F] text-2xl font-bold mb-3" style={{fontFamily: 'ALS Hauss, sans-serif'}}>
        {t(`noAds.${activeTab}`)}
      </h2>
      
      <p className="text-[#8F8F8F] text-base mb-6 max-w-[280px]">
        {t('createAdDescription')}
      </p>
      
      <button 
        onClick={handleCreateAd}
        className="w-full max-w-[320px] bg-[#1F1F1F] text-white rounded-xl px-6 py-4 text-base font-medium 
        hover:bg-[#353535] transition-colors active:scale-[0.98]"
      >
        {t('createAdButton')}
      </button>
    </div>
  );
}