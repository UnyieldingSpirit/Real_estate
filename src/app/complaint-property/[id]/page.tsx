'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationHeader from '@/src/shared/components/NavigationHeader';
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

  // Handle reason selection
  const handleReasonSelect = (reason: ComplaintReason) => {
    setSelectedReason(reason);
  };

  // Handle complaint submission
  const handleSubmit = () => {
    // In a real application, you would send this data to an API
    console.log('Submitting complaint for property ID:', params.id);
    console.log('Reason:', selectedReason);
    console.log('Custom reason text:', otherReasonText);
    
    // Show success screen
    setIsSubmitted(true);
  };

  // Handle continue after submission
  const handleContinue = () => {
    // Go back to property details
    router.push(`/property/${params.id}`);
  };

  // If complaint has been submitted, show success screen
  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {/* Checkmark circle */}
          <div className="w-[150px] h-[150px] rounded-full border-2 border-[#FF6B6B] flex items-center justify-center mb-8">
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 30L30 55L75 5" stroke="#4F4F4F" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Success message */}
          <h1 className="text-[#1F1F1F] text-[32px] font-bold text-center mb-4">
            {t('complaintAccepted')}
          </h1>
          <p className="text-[#777777] text-lg text-center mb-10">
            {t('thankYouMessage')}
          </p>
          
          {/* Continue button */}
          <button 
            onClick={handleContinue}
            className="w-full bg-[#1F1F1F] text-white py-4 rounded-2xl font-medium"
          >
            {t('continue')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      <NavigationHeader title={t('complaint')} showLanguageSelector={false} />
      
      <div className="flex-1 p-4">
        <p className="text-[#777777] text-lg mb-6">
          {t('selectReason')}
        </p>
        
        {/* Complaint reasons */}
        <div className="space-y-4 mb-6">
          <button 
            className={`w-full p-4 rounded-xl text-center ${selectedReason === 'notActual' ? 'bg-[#F08674] text-white' : 'bg-white text-[#1F1F1F]'}`}
            onClick={() => handleReasonSelect('notActual')}
          >
            {t('notActual')}
          </button>
          
          <button 
            className={`w-full p-4 rounded-xl text-center ${selectedReason === 'incorrectData' ? 'bg-[#F08674] text-white' : 'bg-white text-[#1F1F1F]'}`}
            onClick={() => handleReasonSelect('incorrectData')}
          >
            {t('incorrectData')}
          </button>
        </div>
        
        {/* Other reason textarea */}
        <div className="mb-8">
          <p className="text-[#777777] mb-2">{t('otherReason')}</p>
          <textarea 
            className="w-full h-[180px] p-4 rounded-xl bg-white resize-none outline-none"
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
        
        {/* Submit button */}
        <button 
          onClick={handleSubmit}
          className="w-full bg-[#1F1F1F] text-white py-4 rounded-2xl font-medium"
          disabled={!selectedReason && !otherReasonText}
        >
          {t('submitComplaint')}
        </button>
      </div>
    </div>
  );
}