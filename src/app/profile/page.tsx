'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomNavigation } from '@/src/shared/components';
import { useTranslation } from '@/src/hooks';

const localization = {
  ru: {
    profile: 'Профиль',
    views: 'Просмотров',
    ads: 'Объявлений',
    phoneNumber: 'Номер телефона',
    language: 'Язык',
    logout: 'Выйти',
    apply: 'Применить'
  },
  uz: {
    profile: 'Profil',
    views: 'Ko\'rishlar',
    ads: 'E\'lonlar',
    phoneNumber: 'Telefon raqami',
    language: 'Til',
    logout: 'Chiqish',
    apply: 'Qo\'llash'
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useTranslation(localization);
  
  // Состояние для хранения данных профиля
  const [profileData, ] = useState({
    viewsCount: 30,
    adsCount: 10,
    phoneNumber: '+998 99 999 99 99',
    language: 'Русский'
  });
  
  // Обработчик перехода на страницу выбора языка
  const handleLanguageClick = () => {
    router.push('/language-select');
  };
  
  return (
    <div className="page-scrollable">
      <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
        <div className="flex-1 px-4 pb-32">
          <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-6">
            {t('profile')}
          </h1>
          
          {/* Аватар профиля */}
          <div className="flex justify-center mb-6">
            <div className="w-[180px] h-[180px] rounded-full bg-white flex items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 52.5V47.5C48 44.8478 46.9464 42.3043 45.0711 40.4289C43.1957 38.5536 40.6522 37.5 38 37.5H22C19.3478 37.5 16.8043 38.5536 14.9289 40.4289C13.0536 42.3043 12 44.8478 12 47.5V52.5" 
                      stroke="#CCCCCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 27.5C35.5228 27.5 40 23.0228 40 17.5C40 11.9772 35.5228 7.5 30 7.5C24.4772 7.5 20 11.9772 20 17.5C20 23.0228 24.4772 27.5 30 27.5Z" 
                      stroke="#CCCCCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Статистика профиля */}
          <div className="bg-white rounded-xl mb-4 overflow-hidden">
            <div className="flex">
              <div className="flex-1 p-4">
                <div className="text-[32px] font-bold text-[#1F1F1F]">{profileData.viewsCount}</div>
                <div className="text-[#8F8F8F]">{t('views')}</div>
              </div>
              <div className='w-[3px] h-[64px] mt-5 bg-[#EFEFEF]'></div>
              <div className="flex-1 p-4">
                <div className="text-[32px] font-bold text-[#1F1F1F]">{profileData.adsCount}</div>
                <div className="text-[#8F8F8F]">{t('ads')}</div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-[#8F8F8F] mb-1">{t('phoneNumber')}</div>
            <div className="bg-[#F0F0F0] p-4 rounded-xl">
              <div className="text-[#1F1F1F]">{profileData.phoneNumber}</div>
            </div>
          </div>
          
          {/* Язык */}
          <div className="mb-4">
            <div 
              className="bg-white p-6 rounded-xl flex justify-between items-center cursor-pointer"
              onClick={handleLanguageClick}
            >
              <div className="text-[#8F8F8F] mr-2">{t('language')}</div>
              <div className="flex items-center">
                <span className="text-[#1F1F1F] text-[16px] mr-6">{profileData.language}</span>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L1 13" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <BottomNavigation />
      </div>
    </div>
  );
}