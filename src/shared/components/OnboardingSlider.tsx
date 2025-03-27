'use client';

import { useState, useEffect } from 'react';
import { BackIcon } from '../ui/Icon';
import { slides } from '@/src/shared/constants/slides';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import SlideIndicator from '../ui/SlideIndicator';

export default function OnboardingSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Handle window resize event
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine font sizes based on screen width
  const getTitleFontSize = () => {
    if (windowWidth <= 330) return 'text-[24px]';
    if (windowWidth <= 360) return 'text-[28px]';
    return 'text-[32px]';
  };
  
  const getDescriptionFontSize = () => {
    if (windowWidth <= 330) return 'text-[14px]';
    if (windowWidth <= 360) return 'text-[16px]';
    return 'text-[18px]';
  };
  
  const handleNext = () => {
    // If on the second slide (index 1), redirect to registration
    if (currentSlide === 1) {
      window.location.href = '/register';
      return;
    }
    
    // Otherwise, proceed to next slide if not at the end
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (currentSlide === slides.length - 1) {
      window.location.href = '/register';
    }
  };
  
  // Calculate image section height responsively
  const getImageSectionHeight = () => {
    if (windowWidth <= 330) return 'h-[50%]';
    if (windowWidth <= 360) return 'h-[52%]';
    return 'h-[55%]';
  };
  
  // Calculate content section height responsively
  const getContentSectionHeight = () => {
    if (windowWidth <= 330) return 'h-[50%]';
    if (windowWidth <= 360) return 'h-[48%]';
    return 'h-[45%]';
  };
  
  return (
    <div className="flex flex-col h-screen w-full bg-white relative">
      {/* Селектор языка */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      {/* Секция с фото */}
      <div className={`w-full ${getImageSectionHeight()} bg-white relative overflow-hidden`}>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{backgroundImage: `url(${slides[currentSlide].image})`}} 
        />
      </div>
      
      {/* Контентная секция */}
      <div className={`${getContentSectionHeight()} flex flex-col justify-between p-4 bg-white rounded-t-[30px] -mt-6 relative z-10`}>
        <div className="text-center">
          <h1 className={`${getTitleFontSize()} font-black mb-[20px] text-[#1F1F1F]`} style={{fontFamily: 'ALS Hauss, sans-serif'}}>
            {slides[currentSlide].title}
          </h1>
          <p className={`${getDescriptionFontSize()} text-[#1F1F1F] mb-4 leading-relaxed font-normal`} style={{fontFamily: 'Inter, sans-serif'}}>
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div 
            className={`mb-[30px] w-[90px] h-[90px] sm:w-[103px] sm:h-[103px] flex items-center justify-center bg-[#FF756012] rounded-full cursor-pointer shadow-md`}
            onClick={handleNext}
          >
            <BackIcon 
              color="#FF756054" 
              size={windowWidth <= 360 ? 18 : 22} 
              style={{ transform: 'rotate(180deg)', height: windowWidth <= 360 ? '36px' : '42px' }} 
            />
          </div>

          <SlideIndicator 
            totalSlides={slides.length}
            currentSlide={currentSlide}
          />
        </div>
      </div>
    </div>
  );
}