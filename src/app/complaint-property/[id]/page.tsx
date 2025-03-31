'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/src/hooks';

// Types
type ComplaintReason = 'notActual' | 'incorrectData' | 'other';

// Localization object
const localization = {
  ru: {
    complaint: 'Пожаловаться',
    selectReason: 'Выберите причину или опишите',
    notActual: 'Объявление не актуально',
    incorrectData: 'Данные не корректны',
    otherReason: 'Другая причина',
    submitComplaint: 'Пожаловаться',
    complaintAccepted: 'Жалоба принята',
    thankYouMessage: 'Ваша жалоба успешна отправлена на рассмотрение. Спасибо что делаете наш сервис лучше!',
    continue: 'Продолжить'
  },
  uz: {
    complaint: 'Shikoyat qilish',
    selectReason: 'Sababni tanlang yoki tasvirlang',
    notActual: 'E\'lon dolzarb emas',
    incorrectData: 'Ma\'lumotlar noto\'g\'ri',
    otherReason: 'Boshqa sabab',
    submitComplaint: 'Shikoyat qilish',
    complaintAccepted: 'Shikoyat qabul qilindi',
    thankYouMessage: 'Sizning shikoyatingiz muvaffaqiyatli yuborildi. Xizmatimizni yaxshilayotganingiz uchun rahmat!',
    continue: 'Davom etish'
  }
};

export default function PropertyComplaintPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useTranslation(localization);
  const [selectedReason, setSelectedReason] = useState<ComplaintReason | null>(null);
  const [otherReasonText, setOtherReasonText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Анимация успешной отправки
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showCircle, setShowCircle] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Handle reason selection
  const handleReasonSelect = (reason: ComplaintReason) => {
    setSelectedReason(reason);
  };

  // Handle complaint submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Имитация отправки запроса
    setTimeout(() => {
      console.log('Submitting complaint for property ID:', params.id);
      console.log('Reason:', selectedReason);
      console.log('Custom reason text:', otherReasonText);
      
      // Show success screen
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Запускаем последовательную анимацию
      setTimeout(() => setShowCheckmark(true), 300);
      setTimeout(() => setShowCircle(true), 800);
      setTimeout(() => setShowText(true), 1300);
      setTimeout(() => setShowButton(true), 1800);
    }, 1500);
  };

  // Handle continue after submission
  const handleContinue = () => {
    // Go back to property details
    router.push(`/property/${params.id}`);
  };

  // Сбрасываем анимации при размонтировании
  useEffect(() => {
    return () => {
      setShowCheckmark(false);
      setShowCircle(false);
      setShowText(false);
      setShowButton(false);
    };
  }, []);

  // If complaint has been submitted, show success screen
  if (isSubmitted) {
    return (
      <div className="page-scrollable">
        <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
          <div className="flex-1 flex flex-col items-center  px-5 pb-20">
            {/* Контейнер для анимированного чекмарка */}
            <div className={`w-[250px] h-[250px] mt-[70px] rounded-full flex items-center justify-center mb-10 transition-all duration-500 ease-out
                          ${showCircle ? 'border-2 border-[#FF6B6B]' : 'border-0'}`}>
              <div className={`transition-opacity duration-500 ease-out ${showCheckmark ? 'opacity-100' : 'opacity-0'}`}>
                <img src="/checkmark-circle.svg" alt="" />
              </div>
            </div>
            
            {/* Success message - появляется с анимацией */}
            <div className={`transition-all duration-500 ease-out ${showText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
              <h1 className="text-[#1F1F1F] text-[32px] font-bold text-center mb-4">
                {t('complaintAccepted')}
              </h1>
              <p className="text-[#8E8E8E] text-[18px] text-center mb-auto">
                {t('thankYouMessage')}
              </p>
            </div>
            
            {/* Continue button - fixed at bottom - появляется в конце */}
            <div className={`fixed bottom-8 left-5 right-5 transition-all duration-500 ease-out 
                         ${showButton ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
              <button 
                onClick={handleContinue}
                className="w-full bg-[#1F1F1F] text-white py-4 rounded-xl font-medium"
              >
                {t('continue')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-scrollable">
      <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
        
        <div className="flex-1 px-5 pb-20">
          <h2 className='text-[#1F1F1F] text-[28px] font-bold'>{t('complaint')}</h2>
          <p className="text-[#777777] text-[16px] mb-6">
            {t('selectReason')}
          </p>
          
          {/* Complaint reasons */}
          <div className="space-y-3 mb-6">
            <button 
              className={`w-full p-5 rounded-xl text-[18px] text-start ${selectedReason === 'notActual' ? 'bg-[#FF7560] text-white' : 'bg-white text-[#1F1F1F]'}`}
              onClick={() => handleReasonSelect('notActual')}
            >
              {t('notActual')}
            </button>
            
            <button 
              className={`w-full p-5 rounded-xl text-[18px] text-start ${selectedReason === 'incorrectData' ? 'bg-[#FF7560] text-white' : 'bg-white text-[#1F1F1F]'}`}
              onClick={() => handleReasonSelect('incorrectData')}
            >
              {t('incorrectData')}
            </button>
          </div>
          
          {/* Other reason textarea */}
          <div className="mb-auto">
            <p className="text-[#777777] text-[16px] mb-2">{t('otherReason')}</p>
            <textarea 
              className="w-full h-[180px] p-4 rounded-xl bg-white text-[#1F1F1F] resize-none outline-none"
              placeholder=""
              value={otherReasonText}
              onChange={(e) => {
                setOtherReasonText(e.target.value);
                if (e.target.value) {
                  setSelectedReason('other');
                }
              }}
            />
          </div>
          
          {/* Submit button - fixed at bottom */}
          <div className="fixed bottom-[40px] left-5 right-5">
            <button 
              onClick={handleSubmit}
              className="w-full bg-[#1F1F1F] text-white py-4 text-[18px] rounded-xl font-medium relative"
              disabled={(!selectedReason && !otherReasonText) || isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                t('submitComplaint')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}