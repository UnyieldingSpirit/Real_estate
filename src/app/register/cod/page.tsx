/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/src/hooks';

// Типизация локализации
interface LocalizationMessages {
  enterCode: string;
  codeSent: string;
  requestAgain: string;
  confirm: string;
  verificationFailed: string;
}

type Localization = {
  ru: LocalizationMessages;
  uz: LocalizationMessages;
  en: LocalizationMessages;
};

const localization: Localization = {
  ru: {
    enterCode: 'Введите код из SMS',
    codeSent: 'На ваш телефон или почту был отправлен код, введите его в поле ввода для сброса пароля',
    requestAgain: 'Запросить еще раз',
    confirm: 'Подтвердить',
    verificationFailed: 'Неверный код. Пожалуйста, попробуйте снова.',
  },
  uz: {
    enterCode: 'SMS dan kodni kiriting',
    codeSent: 'Telefoningiz yoki pochtangizga kod yuborildi, parolni tiklash uchun uni kiritish maydoniga kiriting',
    requestAgain: 'Yana so\'rash',
    confirm: 'Tasdiqlash',
    verificationFailed: 'Noto\'g\'ri kod. Iltimos, qaytadan urinib ko\'ring.',
  },
  en: {
    enterCode: 'Enter code from SMS',
    codeSent: 'A code has been sent to your phone or email. Enter it in the input field to reset your password',
    requestAgain: 'Request again',
    confirm: 'Confirm',
    verificationFailed: 'Invalid code. Please try again.',
  },
};

export default function VerificationCodePage(): JSX.Element {
  const [code, setCode] = useState<Array<string>>(['', '', '', '']);
  const [timer, setTimer] = useState<number>(60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  // const router = useRouter();
  const { t } = useTranslation(localization as any);
  
  // Set up input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);
  
  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timer]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle input change
  const handleCodeChange = (index: number, value: string): void => {
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
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle key press
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
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
        inputRefs.current[digits.length]?.focus();
      } else {
        // Focus last input
        inputRefs.current[3]?.focus();
      }
    }
  };
  
  // Handle requesting a new code
  const handleRequestNewCode = (): void => {
    if (timer === 0) {
      // Reset timer and activate it
      setTimer(60);
      setIsTimerActive(true);
      
    }
  };
  
  // Handle code verification
  const handleVerify = async (): Promise<void> => {
    // Check if code is complete
    if (code.join('').length !== 4) {
      setError(t('verificationFailed'));
      return;
    }
    
    try {
      // В реальном приложении здесь будет API-запрос для проверки кода
      // Сейчас мы просто имитируем успешную верификацию
      console.log('Verifying code:', code.join(''));
      
      // Маркируем, что пользователь завершил регистрацию
      localStorage.setItem('userRegistered', 'true');
      
      // Используем небольшую задержку, чтобы убедиться, что localStorage обновился
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Перенаправляем на главную страницу
      console.log('Redirecting to home page...');
      window.location.href = '/';
    } catch (err) {
      console.error('Verification error:', err);
      setError(t('verificationFailed'));
    }
  };
  
  return (
    <div className="flex flex-col page-scrollable">
      {/* Header with back button */}
      {/* <NavigationHeader showLanguageSelector={true} /> */}
      
      <div className="flex-1 flex flex-col p-4">
        <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-4">
          {t('enterCode')}
        </h1>
        <p className="text-[#7D7D7D] text-base mb-12">
          {t('codeSent')}
        </p>
        
        <div className="flex justify-between gap-3 mb-8">
          {Array(4).fill(0).map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={code[index]}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-full aspect-square text-center text-black text-4xl font-semibold rounded-xl bg-white shadow-sm focus:outline-none focus:border-gray-300 border border-gray-200 
                ${error ? 'border-red-500' : ''}`}
              aria-label={`Verification code digit ${index + 1}`}
            />
          ))}
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mb-4" role="alert">{error}</p>
        )}
        
        <div className="mb-12 text-left">
          <button 
            onClick={handleRequestNewCode}
            disabled={isTimerActive}
            className={`text-[#7D7D7D] text-base ${isTimerActive ? 'opacity-70' : 'underline'}`}
            aria-disabled={isTimerActive}
          >
            {t('requestAgain')} {isTimerActive ? `(${formatTime(timer)})` : ''}
          </button>
        </div>
        
        <button
          onClick={handleVerify}
          className="py-4 bg-[#1F1F1F] text-white font-medium rounded-xl shadow-md"
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  );
}