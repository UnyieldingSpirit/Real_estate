'use client';

import React, { JSX } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HouseIcon, HeartIcon, NavbarPlusIcon, ProfileIcon } from '@/src/shared/ui/Icon';
import { useTranslation } from '@/src/hooks';
import { useCategoryStore } from '@/src/store/categoryStore';

// Типизация для локализации
interface LocalizationMessages {
  home: string;
  post: string;
  favorites: string;
  profile: string;
}

type Localization = {
  ru: LocalizationMessages;
  uz: LocalizationMessages;
};

const localization: Localization = {
  ru: {
    home: 'Главная',
    post: 'Разместить',
    favorites: 'Мои',
    profile: 'Профиль'
  },
  uz: {
    home: 'Asosiy',
    post: 'Joylashtirish',
    favorites: 'Mening',
    profile: 'Profil'
  }
};

export default function BottomNavigation(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useTranslation(localization as any);
  // Получаем активный цвет из store
  const activeColor = useCategoryStore(state => state.getActiveColor());

  // Определяем активную вкладку на основе текущего пути
  const isActive = (path: string): boolean => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navigateTo = (path: string): void => {
    router.push(path);
  };

  // Тип для навигационного элемента
  interface NavItem {
    path: string;
    label: keyof LocalizationMessages;
    icon: (props: { size: number; color: string }) => JSX.Element;
  }

  // Массив элементов навигации
  const navItems: NavItem[] = [
    { path: '/', label: 'home', icon: HouseIcon },
    { path: '/post', label: 'post', icon: NavbarPlusIcon },
    { path: '/favorites', label: 'favorites', icon: HeartIcon },
    { path: '/profile', label: 'profile', icon: ProfileIcon },
  ];

  return (
    <div className="fixed bottom-[30px] left-[14px] right-[14px] z-50">
      <div className="bg-white h-[70px] rounded-[80px] shadow-lg py-4 px-6">
        <div className="flex justify-between items-end">
          {navItems.map((item) => (
            <button 
              key={item.path}
              className="flex flex-col items-center" 
              onClick={() => navigateTo(item.path)}
              aria-label={t(item.label)}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              <div className="h-6 flex items-center justify-center">
                <item.icon 
                  size={26} 
                  color={isActive(item.path) ? activeColor : "#A3A3A3"} 
                />
              </div>
              <span 
                className="text-xs mt-2"
                style={{ color: isActive(item.path) ? activeColor : "#A3A3A3" }}
              >
                {t(item.label)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}