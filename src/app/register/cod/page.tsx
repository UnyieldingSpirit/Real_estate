'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BackIcon } from '@/src/shared/ui/Icon';
import { useTranslation } from '@/src/hooks';
import NavigationHeader from '@/src/shared/components/NavigationHeader';

const localization = {
  ru: {
    enterCode: 'Введите код из SMS',
    codeSent: 'На ваш телефон или почту был отправлен код, введите его в поле ввода для сброса пароля',
    requestAgain: 'Запросить еще раз',
    confirm: 'Подтвердить',
    verificationFailed: 'Неверный код. Пожалуйста, попробуйте снова.'
  },
  uz: {
    enterCode: 'SMS dan kodni kiriting',
    codeSent: 'Telefoningiz yoki pochtangizga kod yuborildi, parolni tiklash uchun uni kiritish maydoniga kiriting',
    requestAgain: 'Yana so\'rash',
    confirm: 'Tasdiqlash',
    verificationFailed: 'Noto\'g\'ri kod. Iltimos, qaytadan urinib ko\'ring.'
  }
};

export default function VerificationCodePage() {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [error, setError] = useState('');
  
  const inputRefs = useRef([]);
  const router = useRouter();
  const { t } = useTranslation(localization);
  
  // Set up input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);
  
  // Timer countdown effect
  useEffect(() => {
    let interval;
    
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle input change
  const handleCodeChange = (index, value) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update the code array
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Clear error if being shown
    if (error) setError('');
    
    // Auto-focus next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  // Handle key press
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted content is numbers only and the correct length
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('').slice(0, 4);
      
      // Fill inputs with pasted digits
      const newCode = [...code];
      digits.forEach((digit, index) => {
        if (index < 4) newCode[index] = digit;
      });
      
      setCode(newCode);
      
      // Focus the appropriate input after paste
      if (digits.length < 4) {
        inputRefs.current[digits.length].focus();
      } else {
        // Focus last input
        inputRefs.current[3].focus();
      }
    }
  };
  
  // Handle requesting a new code
  const handleRequestNewCode = () => {
    if (timer === 0) {
      // Reset timer and activate it
      setTimer(60);
      setIsTimerActive(true);
      
      // API call to request a new code would go here
      console.log('Requesting new verification code');
    }
  };
  
  // Handle code verification
  const handleVerify = () => {
    // Check if code is complete
    if (code.join('').length !== 4) {
      setError(t('verificationFailed'));
      return;
    }
    
    // API call to verify code would go here
    console.log('Verifying code:', code.join(''));
    
    // For demo, we'll redirect to home or main page
    router.push('/');
  };
  
  // Handle navigation back
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with back button */}
    <NavigationHeader showLanguageSelector={true} />
      
      <div className="flex-1 flex flex-col px-5 pt-6">
        {/* Title and description */}
        <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-4">
          {t('enterCode')}
        </h1>
        <p className="text-[#7D7D7D] text-base mb-12">
          {t('codeSent')}
        </p>
        
        {/* Code input fields */}
        <div className="flex justify-between gap-3 mb-8">
          {Array(4).fill(0).map((_, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : null}
              className={`w-full aspect-square text-center text-black  text-4xl font-semibold rounded-xl bg-white shadow-sm focus:outline-none focus:border-gray-300 border border-gray-200 
                ${error ? 'border-red-500' : ''}`}
            />
          ))}
        </div>
        
        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        
        {/* Request new code with timer */}
        <div className="mb-12 text-left">
          <button 
            onClick={handleRequestNewCode}
            disabled={isTimerActive}
            className={`text-[#7D7D7D] text-base ${isTimerActive ? 'opacity-70' : 'underline'}`}
          >
            {t('requestAgain')} {isTimerActive ? `(${formatTime(timer)})` : ''}
          </button>
        </div>
        
        {/* Submit button */}
        <button
          onClick={handleVerify}
          className="py-3 bg-[#1F1F1F] text-white font-medium rounded-2xl shadow-md"
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  );
}