'use client';

import { useState } from 'react';
import { BackIcon } from '../ui/Icon';
import { slides } from '@/src/shared/constants/slides';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import SlideIndicator from '../ui/SlideIndicator';

export default function OnboardingSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
  
  return (
    <div className="flex flex-col h-screen w-full bg-white relative">
      {/* Селектор языка */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      {/* Секция с фото */}
      <div className="w-full h-[55%] bg-white relative overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{backgroundImage: `url(${slides[currentSlide].image})`}} 
        />
      </div>
      
      {/* Контентная секция */}
      <div className="h-[45%] flex flex-col justify-between px-[14px] pt-[24px] pb-[34px] bg-white rounded-t-[30px] -mt-6 relative z-10">
        <div className="text-center">
          <h1 className="text-[32px] font-black mb-[28px] text-[#1F1F1F]" style={{fontFamily: 'ALS Hauss, sans-serif'}}>
            {slides[currentSlide].title}
          </h1>
          <p className="text-[18px] text-[#1F1F1F] leading-relaxed font-normal" style={{fontFamily: 'Inter, sans-serif'}}>
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="flex flex-col items-center mt-[36px]">
          <div 
            className="mb-[46px] w-[103px] h-[103px] flex items-center justify-center bg-[#FFF0F0] rounded-full cursor-pointer shadow-md"
            onClick={handleNext}
          >
            <BackIcon color="#FF6B6B" size={22} style={{ transform: 'rotate(180deg)', height: '42px' }} />
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