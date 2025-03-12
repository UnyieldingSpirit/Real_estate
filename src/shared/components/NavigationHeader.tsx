'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BackIcon } from '../ui/Icon';
import LanguageSelector from './LanguageSelector/LanguageSelector';

interface NavigationHeaderProps {
  title?: string;
  showLanguageSelector?: boolean;
  onBack?: () => void;
}

export default function NavigationHeader({ 
  title, 
  showLanguageSelector = false, 
  onBack 
}: NavigationHeaderProps) {
  const router = useRouter();
  
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  
  return (
    <header className="w-full bg-white py-4 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          onClick={handleBackClick}
          className="w-[36px] h-[36px] rounded-full bg-white shadow-md flex items-center justify-center"
          aria-label="Назад"
        >
          <BackIcon size={12} color="#1B1B1B" style={{ height: '20px' }} />
        </button>
        
        {title && (
          <h1 className="ml-4 text-lg font-bold text-[#1F1F1F]">{title}</h1>
        )}
      </div>
      
      {showLanguageSelector && (
        <div>
          <LanguageSelector />
        </div>
      )}
    </header>
  );
}