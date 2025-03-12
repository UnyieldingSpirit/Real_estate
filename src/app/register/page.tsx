'use client';

import { useState, useRef, useEffect } from 'react';
import NavigationHeader from '@/src/shared/components/NavigationHeader';
import { useTranslation } from '@/src/hooks';

const localization = {
  ru: {
    authorization: 'Авторизация',
    enterPhoneNumber: 'Введите номер телефона',
    phoneNumber: 'Номер телефона',
    requestCode: 'Запросить код',
    requiredField: 'Обязательное поле'
  },
  uz: {
    authorization: 'Avtorizatsiya',
    enterPhoneNumber: 'Telefon raqamingizni kiriting',
    phoneNumber: 'Telefon raqami',
    requestCode: 'Kodni so\'rash',
    requiredField: 'Majburiy maydon'
  }
};

export default function RegistrationPage() {
  const [phoneNumber, setPhoneNumber] = useState('+998');
  const [error, setError] = useState('');
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const inputRef = useRef(null);
  const { t } = useTranslation(localization);

  // Fix cursor position to always be after prefix
  const fixCursorPosition = () => {
    if (inputRef.current) {
      // Ensure cursor is always after prefix
      const minPosition = '+998'.length;
      if (inputRef.current.selectionStart < minPosition) {
        inputRef.current.setSelectionRange(minPosition, minPosition);
      }
    }
  };

  // Position cursor after the prefix on initial focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const position = '+998'.length;
      inputRef.current.setSelectionRange(position, position);
    }
  }, []);

  // Handle phone number input with formatting
  const handlePhoneInput = (e) => {
    // Store current cursor position
    const cursorPosition = e.target.selectionStart;
    
    // Get the value and prevent modifying the prefix
    let value = e.target.value;
    
    // If the user tries to modify the prefix, restore it
    if (!value.startsWith('+998')) {
      // Extract the new input and append it after the prefix
      const newInput = value.replace(/\D/g, '');
      value = '+998' + newInput.substring(Math.max(0, newInput.length - 9));
    } else {
      // Only allow removing characters after the prefix
      value = value.substring(0, 4) + value.substring(4).replace(/[^0-9\s()]/g, '');
    }
    
    // Remove any non-digit characters for processing
    const digitsOnly = value.replace(/\D/g, '');

    // Don't allow removing the +998 prefix
    if (digitsOnly.length < 3) {
      setPhoneNumber('+998');
      if (isSubmitAttempted) {
        setError(t('requiredField'));
      }
      return;
    }
    
    // Limit to 12 digits total (including the 998 country code)
    if (digitsOnly.length > 12) {
      return;
    }
    
    // Format the phone number: +998 (XX) XXX XX XX
    let formattedNumber = '+';
    
    for (let i = 0; i < digitsOnly.length; i++) {
      // Add country code
      if (i < 3) {
        formattedNumber += digitsOnly[i];
      } 
      // Add opening parenthesis before operator code
      else if (i === 3) {
        formattedNumber += ' (' + digitsOnly[i];
      } 
      // Add second digit of operator code
      else if (i === 4) {
        formattedNumber += digitsOnly[i];
      } 
      // Close parenthesis after operator code
      else if (i === 5) {
        formattedNumber += ') ' + digitsOnly[i];
      }
      // Add space after first 3 digits of number
      else if (i === 8) {
        formattedNumber += ' ' + digitsOnly[i];
      }
      // Add space after next 2 digits
      else if (i === 10) {
        formattedNumber += ' ' + digitsOnly[i];
      }
      // All other digits
      else {
        formattedNumber += digitsOnly[i];
      }
    }
    
    setPhoneNumber(formattedNumber);
    
    // Clear error if we have a full phone number
    if (digitsOnly.length === 12) {
      setError('');
    } else if (isSubmitAttempted) {
      setError(t('requiredField'));
    }
    
    // Schedule cursor position fix
    setTimeout(() => {
      fixCursorPosition();
    }, 0);
  };

  // Handle input focus event
  const handleFocus = () => {
    fixCursorPosition();
    if (phoneNumber === '+998') {
      setPhoneNumber('+998');
    }
  };

  // Handle input click event
  const handleClick = () => {
    fixCursorPosition();
  };

  // Handle input keydown event to prevent cursor from moving before prefix
  const handleKeyDown = (e) => {
    // If Home key is pressed, prevent default and position cursor after prefix
    if (e.key === 'Home') {
      e.preventDefault();
      const position = '+998'.length;
      inputRef.current.setSelectionRange(position, position);
    }
    
    // If backspace at prefix boundary, prevent deletion of prefix
    if (e.key === 'Backspace' && inputRef.current.selectionStart <= '+998'.length) {
      e.preventDefault();
    }
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

  // Validate phone when request code button is clicked
  const handleRequestCode = () => {
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    if (digitsOnly.length !== 12) {
      setError(t('requiredField'));
      setIsSubmitAttempted(true);
      return;
    }
    
    console.log('Requesting code for:', phoneNumber);
    window.location.href = '/register/cod';
  };

  const getInputBorderStyle = () => {
    if (error && isSubmitAttempted) {
      return 'border-red-500 focus:border-red-500';
    }
    return 'border-gray-200 focus:border-gray-300';
  };

  return (
    <div className="flex flex-col h-screen ">
      <NavigationHeader showLanguageSelector={true} />
      
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-[#1F1F1F] text-4xl font-black">
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
        <div className="mb-9">
          <label htmlFor="phone" className="block text-[#777777] text-lg mb-2">
            {t('phoneNumber')}
          </label>
          <input
            ref={inputRef}
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={handlePhoneInput}
            onFocus={handleFocus}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`w-full p-2 text-xl h-[60px] text-[#1F1F1F] border rounded-2xl bg-gray-50 focus:outline-none ${getInputBorderStyle()}`}
            inputMode="numeric"
          />
          {error && isSubmitAttempted && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        
        {/* Request code button */}
        <button
          onClick={handleRequestCode}
          className="py-2.5 rounded-2xl bg-[#1F1F1F] text-white font-medium text-lg"
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