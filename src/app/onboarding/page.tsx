'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguageStore } from '@/src/store/language';
import LanguageSelector from '@/src/shared/components/LanguageSelector/LanguageSelector';
import { BackIcon } from '@/src/shared/ui/Icon';
import SlideIndicator from '@/src/shared/ui/SlideIndicator';

const translations = {
  ru: [
    {
      title: 'Приложение, которое поможет',
      description: 'MoyDom поможет легко снять или купить недвижимость в вашем городе',
      image: '/images/onboarding-1.png',
    },
    {
      title: 'Легко и удобно находите то что нужно',
      description: 'В MoyDom простой и удобный функционал без излишеств',
      image: '/images/onboarding-2.png',
    },
    {
      title: 'Быстрые сделки без посредников',
      description: 'Находите лучшие предложения напрямую от собственников',
      image: '/images/onboarding-3.png',
    },
  ],
  uz: [
    {
      title: 'Yordam beradigan ilova',
      description: 'MoyDom sizga shahardagi uylarni ijaraga olish yoki xarid qilishni osonlashtiradi',
      image: '/images/onboarding-1.png',
    },
    {
      title: 'Kerakli narsani oson va qulay toping',
      description: 'MoyDom’da sodda va qulay interfeys mavjud',
      image: '/images/onboarding-2.png',
    },
    {
      title: 'Vositachilarsiz tez bitimlar',
      description: 'Eng yaxshi takliflarni to‘g‘ridan-to‘g‘ri egalardan toping',
      image: '/images/onboarding-3.png',
    },
  ],
  en: [
    {
      title: 'An app that helps you',
      description: 'MoyDom helps you easily rent or buy real estate in your city',
      image: '/images/onboarding-1.png',
    },
    {
      title: 'Find what you need easily and conveniently',
      description: 'MoyDom has a simple and user-friendly interface without distractions',
      image: '/images/onboarding-2.png',
    },
    {
      title: 'Fast deals without middlemen',
      description: 'Get the best offers directly from property owners',
      image: '/images/onboarding-3.png',
    },
  ],
};

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [pixelRatio, setPixelRatio] = useState(1);

  const { currentLocale } = useLanguageStore();
  const router = useRouter();

  const slides = translations[currentLocale];

  useEffect(() => {
    function updateSizes() {
      setWindowWidth(window.innerWidth);
      setPixelRatio(window.devicePixelRatio || 1);
    }

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  const getTitleFontSize = () => {
    if (windowWidth <= 330) return 'text-[22px]';
    if (windowWidth <= 380) return 'text-[26px]';
    if (windowWidth <= 440) return pixelRatio >= 3 ? 'text-[32px]' : 'text-[30px]';
    return 'text-[34px]';
  };

  const getDescriptionFontSize = () => {
    if (windowWidth <= 330) return 'text-[14px]';
    if (windowWidth <= 380) return 'text-[16px]';
    if (windowWidth <= 440) return pixelRatio >= 3 ? 'text-[18px]' : 'text-[17px]';
    return 'text-[20px]';
  };

  const handleNext = () => {
    if (currentSlide === 1 || currentSlide === slides.length - 1) {
      localStorage.setItem('onboardingCompleted', 'true');
      router.push('/register');
      return;
    }

    setCurrentSlide(currentSlide + 1);
  };

  const getImageSectionHeight = () => {
    if (windowWidth <= 330) return 'h-[50%]';
    if (windowWidth <= 360) return 'h-[52%]';
    return 'h-[55%]';
  };

  const getContentSectionHeight = () => {
    if (windowWidth <= 330) return 'h-[50%]';
    if (windowWidth <= 360) return 'h-[48%]';
    return 'h-[45%]';
  };

  const current = slides[currentSlide];

  return (
    <div className="fixed inset-0 flex flex-col h-screen w-full bg-white">
      <div className="absolute top-[100px] right-4 z-20">
        <LanguageSelector />
      </div>

      <div className={`w-full ${getImageSectionHeight()} bg-white relative overflow-hidden`}>
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${current.image})` }}
        />
      </div>

      <div
        className={`${getContentSectionHeight()} flex flex-col justify-between p-4 bg-white rounded-t-[30px] -mt-6 relative z-10`}
      >
        <div className="text-center">
          <h1
            className={`${getTitleFontSize()} font-black mb-[20px] text-[#1F1F1F]`}
            style={{ fontFamily: 'ALS Hauss, sans-serif' }}
          >
            {current.title}
          </h1>
          <p
            className={`${getDescriptionFontSize()} text-[#1F1F1F] mb-4 leading-relaxed font-normal`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {current.description}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={
              'mb-[30px] w-[90px] h-[90px] sm:w-[103px] sm:h-[103px] flex items-center justify-center bg-[#FF756012] rounded-full cursor-pointer shadow-md'
            }
            onClick={handleNext}
          >
            <BackIcon
              color="#FF756054"
              size={windowWidth <= 360 ? 18 : 22}
              style={{
                transform: 'rotate(180deg)',
                height: windowWidth <= 360 ? '36px' : '42px',
              }}
            />
          </div>

          <SlideIndicator totalSlides={slides.length} currentSlide={currentSlide} />
        </div>
      </div>
    </div>
  );
}