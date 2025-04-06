'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from '@/src/hooks';
import { usePostLocalization } from '../add/localization';

export default function VerificationPage() {
  const router = useRouter();
  const { t } = useTranslation(usePostLocalization());

  // Анимация для круга
  const circleVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0, 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  // Анимация для значка поиска
  const searchIconVariants = {
    hidden: { 
      scale: 0.5,
      opacity: 0, 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.6,
      },
    },
  };

  // Анимация для текста
  const textVariants = {
    hidden: { 
      y: 20,
      opacity: 0, 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.8,
      },
    },
  };

  // Анимация для кнопки
  const buttonVariants = {
    hidden: { 
      y: 20,
      opacity: 0, 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: 'easeOut',
        delay: 1.0,
      },
    },
    tap: { 
      scale: 0.98,
    },
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f7f7f7] px-6">
      <div className="flex flex-col items-center justify-center max-w-md">
        {/* Круг с иконкой */}
        <div className="relative mb-8 flex items-center justify-center">
          <motion.div 
            className="w-52 h-52 rounded-full border-2 border-[#FF7560]"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
          ></motion.div>
          
          <motion.div
            className="absolute"
            variants={searchIconVariants}
            initial="hidden"
            animate="visible"
          >
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </motion.div>
        </div>
        
        {/* Текст */}
        <motion.h1 
          className="text-[32px] font-bold text-center text-[#1F1F1F] mb-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {t('onVerification')}
        </motion.h1>
        
        <motion.p 
          className="text-[#777777] text-center text-[18px] mb-12 w-[90%]"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {t('verificationText')}
        </motion.p>
        
        {/* Кнопка */}
        <motion.button
          className="fixed  bottom-8 left-5 right-5  h-14 rounded-xl font-medium bg-[#1F1F1F] text-white"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileTap="tap"
          onClick={() => router.push('/')}
        >
          {t('continue')}
        </motion.button>
      </div>
    </div>
  );
}