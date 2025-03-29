'use client';

import { JSX, useState } from 'react';
import NavigationHeader from '@/src/shared/components/NavigationHeader';
import { useTranslation } from '@/src/hooks';
import { BottomNavigation } from '@/src/shared/components';
import { CameraIcon, EditIcon } from '@/src/shared/ui/Icon';
import LanguageSelector from '@/src/shared/components/LanguageSelector/LanguageSelector';

// Интерфейс для локализации
interface ProfileLocalization {
  profile: string;
  edit: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  myAdvertisements: string;
  savedSearches: string;
  settings: string;
  support: string;
  logOut: string;
}

// Интерфейс для данных профиля
interface ProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

// Интерфейс для пункта меню
interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

// Локализация
const localization: Record<string, ProfileLocalization> = {
  ru: {
    profile: 'Профиль',
    edit: 'Редактировать',
    name: 'Имя',
    email: 'Электронная почта',
    phone: 'Телефон',
    language: 'Язык',
    myAdvertisements: 'Мои объявления',
    savedSearches: 'Сохраненные поиски',
    settings: 'Настройки',
    support: 'Поддержка',
    logOut: 'Выйти'
  },
  uz: {
    profile: 'Profil',
    edit: 'Tahrirlash',
    name: 'Ism',
    email: 'Elektron pochta',
    phone: 'Telefon',
    language: 'Til',
    myAdvertisements: 'Mening e\'lonlarim',
    savedSearches: 'Saqlangan qidiruvlar',
    settings: 'Sozlamalar',
    support: 'Yordam',
    logOut: 'Chiqish'
  }
};

export default function ProfilePage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useTranslation(localization as any);
  
  // Демо-данные профиля
  const [profile] = useState<ProfileData>({
    name: 'Александр Иванов',
    email: 'alexander@example.com',
    phone: '+998 90 123 45 67',
    avatar: null
  });
  
  const handleEditProfile = (): void => {
    console.log('Edit profile');
  };
  
  const handleChangePhoto = (): void => {
    console.log('Change profile photo');
  };
  
  const handleLogout = (): void => {
    console.log('Logout');
  };
  
  const navigateTo = (path: string): void => {
    console.log(`Navigate to: ${path}`);
  };
  
  // Компонент пункта меню
  const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onClick }): JSX.Element => (
    <div 
      className="flex items-center p-4 bg-white rounded-xl mb-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-4 text-[#8F8F8F]">{icon}</div>
      <span className="text-[#1F1F1F]">{title}</span>
      <div className="ml-auto">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
          <path d="M1 1L7 7L1 13" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      <NavigationHeader title={t('profile')} showLanguageSelector={true} />
      
      <div className="flex-1 p-4 pb-32">
        {/* Профильная информация */}
        <div className="bg-white rounded-xl p-5 mb-6">
          <div className="flex items-center mb-5">
            <div 
              className="w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center relative mr-4"
              onClick={handleChangePhoto}
            >
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <CameraIcon size={40} color="#A3A3A3" />
              )}
              <div className="absolute bottom-0 right-0 bg-[#FF6B6B] rounded-full w-6 h-6 flex items-center justify-center">
                <EditIcon size={12} color="white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-[#1F1F1F] text-xl font-medium">{profile.name}</h2>
              <button 
                onClick={handleEditProfile}
                className="text-[#FF6B6B] text-sm"
              >
                {t('edit')}
              </button>
            </div>
          </div>
          
          <div className="mb-3">
            <p className="text-[#8F8F8F] text-sm mb-1">{t('email')}</p>
            <p className="text-[#1F1F1F]">{profile.email}</p>
          </div>
          
          <div className="mb-3">
            <p className="text-[#8F8F8F] text-sm mb-1">{t('phone')}</p>
            <p className="text-[#1F1F1F]">{profile.phone}</p>
          </div>
          
          <div>
            <p className="text-[#8F8F8F] text-sm mb-1">{t('language')}</p>
            <div className="inline-block">
              <LanguageSelector />
            </div>
          </div>
        </div>
        
        {/* Меню профиля */}
        <div className="space-y-3">
          <MenuItem 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="currentColor"/>
            </svg>}
            title={t('myAdvertisements')} 
            onClick={() => navigateTo('/my-advertisements')}
          />
          
          <MenuItem 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.023 9.158c0 4.007-3.313 7.254-7.39 7.254-4.076 0-7.39-3.247-7.39-7.254 0-4.008 3.314-7.254 7.39-7.254 4.077 0 7.39 3.246 7.39 7.254z" stroke="currentColor" strokeWidth="2"/>
              <path d="M15.756 15.764L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>}
            title={t('savedSearches')} 
            onClick={() => navigateTo('/saved-searches')}
          />
          
          <MenuItem 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4V3m0 18v-1m8-8h1M3 12h1m14.364-5.364l.7071-.7071M4.9289 19.0711l.7071-.7071m12.7279 0l.7071.7071M4.9289 4.9289l.7071.7071" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>}
            title={t('settings')} 
            onClick={() => navigateTo('/settings')}
          />
          
          <MenuItem 
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 12V8M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>}
            title={t('support')} 
            onClick={() => navigateTo('/support')}
          />
        </div>
        
        {/* Кнопка выхода */}
        <div className="mt-8">
          <button 
            onClick={handleLogout}
            className="w-full py-4 text-[#FF6B6B] text-center font-medium"
          >
            {t('logOut')}
          </button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}