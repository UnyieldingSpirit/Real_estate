'use client';

import { useState, useRef, useEffect } from 'react';
import NavigationHeader from '@/src/shared/components/NavigationHeader';
import { useTranslation } from '@/src/hooks';

const localization = {
  ru: {
    authorization: 'Авторизация',
    enterPhoneNumber: 'Введите номер телефона',
    phoneNumber: 'Номер телефона',
    requestCode: 'Запросить код'
  },
  uz: {
    authorization: 'Avtorizatsiya',
    enterPhoneNumber: 'Telefon raqamingizni kiriting',
    phoneNumber: 'Telefon raqami',
    requestCode: 'Kodni so\'rash'
  }
};

export default function RegistrationPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const inputRef = useRef(null);
  const { t } = useTranslation(localization);

  // Automatically focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle phone number input with formatting
  const handlePhoneInput = (e) => {
    // Remove any non-digit characters
    const value = e.target.value.replace(/\D/g, '');
    
    // Don't allow removing the +998 prefix
    if (value.length < 3) {
      setPhoneNumber('+998');
      return;
    }
    
    // Limit to 12 digits total (including the 998 country code)
    if (value.length > 12) {
      return;
    }
    
    // Format the phone number: +998 (XX) XXX XX XX
    let formattedNumber = '+';
    
    for (let i = 0; i < value.length; i++) {
      // Add country code
      if (i < 3) {
        formattedNumber += value[i];
      } 
      // Add opening parenthesis before operator code
      else if (i === 3) {
        formattedNumber += ' (' + value[i];
      } 
      // Add second digit of operator code
      else if (i === 4) {
        formattedNumber += value[i];
      } 
      // Close parenthesis after operator code
      else if (i === 5) {
        formattedNumber += ') ' + value[i];
      }
      // Add space after first 3 digits of number
      else if (i === 8) {
        formattedNumber += ' ' + value[i];
      }
      // Add space after next 2 digits
      else if (i === 10) {
        formattedNumber += ' ' + value[i];
      }
      // All other digits
      else {
        formattedNumber += value[i];
      }
    }
    
    setPhoneNumber(formattedNumber);
  };

  // Close keyboard when clicking outside the input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        inputRef.current.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRequestCode = () => {
    // Handle code request logic here
    console.log('Requesting code for:', phoneNumber);
      // Navigate to verification page or show verification UI
         window.location.href = '/cod';
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <NavigationHeader  showLanguageSelector={true} />
      
      <div className="flex flex-col flex-1 px-4">
        <h2 className="text-[#1F1F1F] text-4xl font-black mt-6">
          {t('authorization')}
        </h2>
        <p className="text-[#777777] text-lg mt-4 mb-10">
          {t('enterPhoneNumber')}
        </p>
        
        {/* Key icon in circle */}
        <div className="self-center w-[250px] h-[250px] rounded-full bg-white flex items-center justify-center mb-10"
             style={{ 
               border: '2px solid #FF6B6B',
               boxShadow: '0px 0px 0px 2px rgba(255, 107, 107, 0.1)'
             }}>
       <img src="/smart-key.svg" alt="" />
        </div>
        
        {/* Phone number input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-[#777777] text-lg mb-2">
            {t('phoneNumber')}
          </label>
          <input
            ref={inputRef}
            type="tel"
            id="phone"
            value={phoneNumber || '+998'}
            onChange={handlePhoneInput}
            className="w-full p-2 text-xl h-[60px] text-[#1F1F1F] border border-gray-200 rounded-2xl bg-gray-50 focus:outline-none focus:border-gray-300"
          
            inputMode="numeric"
          />
        </div>
        
        {/* Request code button */}
        <button
          onClick={handleRequestCode}
          className="py-2 rounded-2xl bg-[#1F1F1F] text-white font-medium text-lg"
          style={{
            transition: 'background-color 0.2s ease',
          }}
        >
          {t('requestCode')}
        </button>
      </div>
    </div>
  );
}