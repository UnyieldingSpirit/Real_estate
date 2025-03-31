'use client';

import { useState, useEffect } from 'react';
import { NavbarPlusIcon } from '@/src/shared/ui/Icon';

interface PhotoGalleryModalProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoGalleryModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose
}: PhotoGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Сбрасываем индекс при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      // Блокируем скролл на основной странице
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    } else {
      // Разблокируем скролл
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    }
    
    // Очистка при размонтировании
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, initialIndex]);
  
  // Если модальное окно закрыто, не рендерим ничего
  if (!isOpen) return null;
  
  // Переход к следующей фотографии
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  // Переход к предыдущей фотографии
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Обработчик для предотвращения закрытия при клике на контент
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  // Обработчик клика на кнопку закрытия
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose} // Закрытие при клике на фон
    >
      {/* Контент модального окна */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4" onClick={handleContentClick}>
        {/* Верхняя панель с кнопкой закрытия (только крестик справа) */}
        <div className="absolute top-[105px] right-0 z-10 p-5">
          {/* Кнопка закрытия (плюс повёрнутый на 45 градусов) */}
          <button 
            onClick={handleCloseClick} 
            className="w-10 h-10 flex items-center justify-center"
            aria-label="Закрыть"
          >
            <div className="transform rotate-45">
              <NavbarPlusIcon color="#9A9A9A" size={28} />
            </div>
          </button>
        </div>
        
        {/* Блок с основным изображением и кнопками навигации */}
        <div className="flex flex-col items-center h-[280px]">
          {/* Основное изображение */}
          <div className="relative w-full flex h-full justify-center">
            <img 
              src={images[currentIndex]} 
              alt={`Фото ${currentIndex + 1}`}
              className="max-h-[70vh] max-w-full h-full object-cover rounded-3xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/600x400?text=Нет+фото';
              }}
            />
          </div>
          
          {/* Кнопки навигации сразу под изображением */}
          <div className="flex justify-center space-x-4 mt-4">
            <button 
              onClick={goToPrev}
              className="w-14 h-14 border border-white rounded-full flex items-center justify-center bg-transparent"
              aria-label="Предыдущее фото"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button 
              onClick={goToNext}
              className="w-14 h-14 border border-white rounded-full flex items-center justify-center bg-transparent"
              aria-label="Следующее фото"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}