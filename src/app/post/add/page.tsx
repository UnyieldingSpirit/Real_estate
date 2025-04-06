'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/src/hooks';
import { usePostLocalization } from './localization';
import PropertyCategories from '@/src/shared/components/PropertyCategories';
import { PropertyCategoryType } from '@/src/store/categoryStore';

// Тип для загруженных фото
interface UploadedPhoto {
  id: string;
  url: string;
  file: File;
}

// Тип комнатности
type RoomType = 'one' | 'two' | 'three' | 'four' | 'moreThanFive' | '';

// Основные шаги формы
type FormStep = 'propertyType' | 'photos' | 'rooms' | 'information' | 'verification';

export default function AddPropertyPage() {
  const { t } = useTranslation(usePostLocalization());
  
  // Состояние формы
  const [currentStep, setCurrentStep] = useState<FormStep>('propertyType');
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyCategoryType | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<UploadedPhoto | null>(null);
  const [additionalPhotos, setAdditionalPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<RoomType>('');
  const router = useRouter();
  // Информация о недвижимости
  const [city, setCity] = useState<string>('Ташкент');
  const [district, setDistrict] = useState<string>('Чиланзарский');
  const [area, setArea] = useState<string>('60');
  const [currency, setCurrency] = useState<string>('Доллары');
  const [price, setPrice] = useState<string>('600');
  const [description, setDescription] = useState<string>('Рядом поликлиника, сад, маркет, метро');
  const [hasRenovation, setHasRenovation] = useState<boolean>(true);
  const [hasFurniture, setHasFurniture] = useState<boolean>(false);
  const [fromOwners, setFromOwners] = useState<boolean>(false);
  
  // Состояние выпадающих списков
  const [cityDropdownOpen, setCityDropdownOpen] = useState<boolean>(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState<boolean>(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState<boolean>(false);
  
  // Направление анимации (для переходов между шагами)
  const [direction, setDirection] = useState<number>(1); // 1 - вперед, -1 - назад
  
  // Закрываем все дропдауны при клике за их пределами
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cityDropdownOpen || districtDropdownOpen || currencyDropdownOpen) {
        setCityDropdownOpen(false);
        setDistrictDropdownOpen(false);
        setCurrencyDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cityDropdownOpen, districtDropdownOpen, currencyDropdownOpen]);
  
  // Анимация для шагов
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
      };
    },
  };
  
  // Обработчики переходов между шагами
  const goToNextStep = () => {
    setDirection(1);
    if (currentStep === 'propertyType') setCurrentStep('photos');
    else if (currentStep === 'photos') setCurrentStep('rooms');
    else if (currentStep === 'rooms') setCurrentStep('information');
  };
  
  const goToPreviousStep = () => {
    setDirection(-1);
    if (currentStep === 'photos') setCurrentStep('propertyType');
    else if (currentStep === 'rooms') setCurrentStep('photos');
    else if (currentStep === 'information') setCurrentStep('rooms');
  };
  
  // Обработчик выбора типа недвижимости
  const handlePropertyTypeSelect = (category: PropertyCategoryType) => {
    setSelectedPropertyType(category);
  };
  
  // Обработчик загрузки основного фото
  const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setCoverPhoto({
        id: Date.now().toString(),
        url,
        file,
      });
    }
  };
  
  // Обработчик загрузки дополнительных фото
  const handleAdditionalPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
    
      // Создаем копию текущего массива фотографий
      const newPhotos = [...additionalPhotos];
    
      // Создаем новый объект фото
      const newPhoto = {
        id: Date.now().toString(),
        url,
        file,
      };
    
      // Если уже есть фото по этому индексу, заменяем его
      if (newPhotos[index]) {
        URL.revokeObjectURL(newPhotos[index].url);
        newPhotos[index] = newPhoto;
      } else {
      // Иначе добавляем новое фото
        newPhotos.push(newPhoto);
      }
    
      setAdditionalPhotos(newPhotos);
    }
  };

    
  const renderAdditionalPhotos = () => {
  // Определяем, сколько всего плиток для фото нам нужно (текущее количество + 1 пустая, но не более 5)
    const totalPhotoTiles = Math.min(additionalPhotos.length + 1, 5);
    const photoTiles = [];
  
    for (let i = 0; i < totalPhotoTiles; i++) {
      const photo = additionalPhotos[i];
      photoTiles.push(
        <div key={i} className="w-full h-36 rounded-xl overflow-hidden bg-white">
          {photo ? (
            <div className="relative w-full h-full">
              <img 
                src={photo.url} 
                alt={t('photos')}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDeletePhoto(photo.id, 'additional')}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7560" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="mb-2">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <span className="text-[#8F8F8F] text-sm">{t('uploadPhoto')}</span>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => handleAdditionalPhotoUpload(e, i)}
              />
            </label>
          )}
        </div>,
      );
    }
  
    return (
      <div className="grid grid-cols-2 gap-4">
        {photoTiles}
      </div>
    );
  };
    

    
  const handlePublish = () => {
  // Здесь будет логика отправки данных формы на сервер
    console.log({
      propertyType: selectedPropertyType,
      coverPhoto,
      additionalPhotos,
      rooms: selectedRooms,
      city,
      district,
      area,
      currency,
      price,
      description,
      hasRenovation,
      hasFurniture,
      fromOwners,
    });
  
    // Перенаправляем на страницу проверки
    router.push('/post/verification');
  };
  
  // Обработчик удаления фото
  const handleDeletePhoto = (id: string, type: 'cover' | 'additional') => {
    if (type === 'cover') {
      if (coverPhoto && coverPhoto.id === id) {
        URL.revokeObjectURL(coverPhoto.url);
        setCoverPhoto(null);
      }
    } else {
      const updatedPhotos = additionalPhotos.filter(photo => photo.id !== id);
      const photoToDelete = additionalPhotos.find(photo => photo.id === id);
      if (photoToDelete) {
        URL.revokeObjectURL(photoToDelete.url);
      }
      setAdditionalPhotos(updatedPhotos);
    }
  };
  
  // Обработчик выбора комнатности
  const handleRoomsSelect = (rooms: RoomType) => {
    setSelectedRooms(rooms);
  };
  
  
  // Отображение кнопок навигации в зависимости от текущего шага
  const renderNavButtons = () => {
    // Не показываем кнопки на шаге верификации
    if (currentStep === 'verification') {
      return null;
    }
    
    return (
      <div className="fixed  bottom-8 left-5 right-5 flex gap-4">
        {currentStep !== 'propertyType' && (
          <button
            onClick={goToPreviousStep}
            className="w-14 h-14 bg-gray-300 rounded-xl flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="2">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" />
            </svg>
          </button>
        )}
        
        {currentStep !== 'information' ? (
          <button
            onClick={goToNextStep}
            className={`flex-1 h-14 rounded-xl font-medium ${
              ((currentStep === 'propertyType' && !selectedPropertyType) ||
              (currentStep === 'photos' && !coverPhoto) ||
              (currentStep === 'rooms' && !selectedRooms)) 
                ? 'bg-[#CCCCCC] text-white' 
                : 'bg-[#1F1F1F] text-white'
            }`}
            disabled={
              (currentStep === 'propertyType' && !selectedPropertyType) ||
              (currentStep === 'photos' && !coverPhoto) ||
              (currentStep === 'rooms' && !selectedRooms)
            }
          >
            {t('continue')}
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className={`flex-1 h-14 rounded-xl font-medium ${
              (!price || !description) ? 'bg-[#CCCCCC] text-white' : 'bg-[#1F1F1F] text-white'
            }`}
            disabled={!price || !description}
          >
            {t('publish')}
          </button>
        )}
      </div>
    );
  };
  
  const renderTextareaField = (
    label: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder: string = '',
  ) => (
    <div>
      <label className="text-[#8F8F8F] text-base mb-1 block">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white rounded-xl p-4 outline-none min-h-[120px] resize-none text-[#1F1F1F] focus:ring-2 focus:ring-[#FF7560]/30"
      />
    </div>
  );

    
  const renderInputField = (
    label: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    type: string = 'text',
    placeholder: string = '',
  ) => (
    <div>
      <label className="text-[#8F8F8F] text-base mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white rounded-xl p-4 outline-none text-[#1F1F1F] focus:ring-2 focus:ring-[#FF7560]/30"
      />
    </div>
  );
  return (
    <div className="flex flex-col page-scrollable min-h-screen bg-[#f7f7f7]">
      <div className="flex-1 px-4 pb-32">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          {/* Шаг 1: Выбор типа недвижимости */}
          {currentStep === 'propertyType' && (
            <motion.div
              key="propertyType"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                type: 'tween', 
                ease: 'easeInOut', 
                duration: 0.3, 
              }}
            >
              <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-1">
                {t('propertyType')}
              </h1>
              <p className="text-[#777777] text-[16px] mb-6">
                {t('choosePropertyType')}
              </p>
              
              <PropertyCategories 
                onCategorySelect={handlePropertyTypeSelect}
                updateStoreCategory={true}
                preventRouting={true}
              />
            </motion.div>
          )}
          
          {/* Шаг 2: Загрузка фотографий */}
          {currentStep === 'photos' && (
            <motion.div
              key="photos"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                type: 'tween', 
                ease: 'easeInOut', 
                duration: 0.3, 
              }}
            >
              <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-1">
                {t('photos')}
              </h1>
              <p className="text-[#777777] text-[16px] mb-6">
                {t('uploadPhotos')}
              </p>
              
              {/* Блок загрузки обложки */}
              <div className="mb-4">
                <h2 className="text-[#8F8F8F] text-lg mb-2">{t('cover')}</h2>
                
                <div className="w-full rounded-xl overflow-hidden bg-white">
                  {coverPhoto ? (
                    <div className="relative w-full h-56">
                      <img 
                        src={coverPhoto.url} 
                        alt={t('mainPhoto')}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleDeletePhoto(coverPhoto.id, 'cover')}
                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7560" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center cursor-pointer w-full h-56">
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="mb-2">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </div>
                        <span className="text-[#8F8F8F]">{t('uploadPhoto')}</span>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleCoverPhotoUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
              
              {/* Блок загрузки дополнительных фото */}
              <div className="mb-6">
                <h2 className="text-[#8F8F8F] text-lg mb-2">{t('photos')}</h2>
                {renderAdditionalPhotos()}
              </div>
            </motion.div>
          )}
          
          {/* Шаг 3: Выбор комнатности */}
          {currentStep === 'rooms' && (
            <motion.div
              key="rooms"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                type: 'tween', 
                ease: 'easeInOut', 
                duration: 0.3, 
              }}
            >
              <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-1">
                {t('rooms')}
              </h1>
              <p className="text-[#777777] text-[16px] mb-6">
                {t('chooseRooms')}
              </p>
              
              {/* Иконка планировки комнат */}
              <div className="flex justify-center mb-8">
                <div className="w-[250px] h-[250px] bg-white rounded-full flex items-center justify-center">
                  <svg width="246" height="246" viewBox="0 0 246 246" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="123" cy="123" r="123" fill="white"/>
                    {/* <circle cx="123" cy="123" r="122.5" stroke="#FF7560"/> */}
                    <path d="M116 172V186M116 123V151M151 123V151H137M186 123H95M74 123H60M60 74L123 60L186 74" stroke="#404040" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M186 99.2V181.8C186 182.914 185.558 183.982 184.77 184.77C183.982 185.558 182.914 186 181.8 186H64.2C63.0861 186 62.0178 185.558 61.2302 184.77C60.4425 183.982 60 182.914 60 181.8V99.2C60 98.0861 60.4425 97.0178 61.2302 96.2301C62.0178 95.4425 63.0861 95 64.2 95H181.8C182.914 95 183.982 95.4425 184.77 96.2301C185.558 97.0178 186 98.0861 186 99.2Z" stroke="#404040" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              {/* Кнопки выбора комнатности */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'one', label: t('oneRoom') },
                    { value: 'two', label: t('twoRooms') },
                    { value: 'three', label: t('threeRooms') },
                    { value: 'four', label: t('fourRooms') },
                    { value: 'moreThanFive', label: t('moreThanFive') },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileTap={{ scale: 0.98 }}
                      className={`py-4 px-2 rounded-xl text-center ${
                        selectedRooms === option.value 
                          ? 'bg-[#FF7560] text-white' 
                          : 'bg-white text-[#1F1F1F]'
                      }`}
                      onClick={() => handleRoomsSelect(option.value as RoomType)}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Шаг 4: Информация о недвижимости */}
          {currentStep === 'information' && (
            <motion.div
              key="information"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                type: 'tween', 
                ease: 'easeInOut', 
                duration: 0.3, 
              }}
            >
              <h1 className="text-[32px] font-bold text-[#1F1F1F] mb-1">
                {t('information')}
              </h1>
              <p className="text-[#777777] text-[16px] mb-6">
                {t('fillAllFields')}
              </p>
              
              {/* Форма с информацией */}
              <div className="space-y-5">
                {/* Город */}
                <div>
                  <label className="text-[#8F8F8F] text-base mb-1 block">{t('city')}</label>
                  <div className="relative">
                    <div 
                      className="w-full bg-white rounded-xl p-4 flex justify-between items-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCityDropdownOpen(!cityDropdownOpen);
                        setDistrictDropdownOpen(false);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      <span className="text-[#1F1F1F]">{city}</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#A3A3A3" 
                        strokeWidth="2"
                        className={`transition-transform duration-200 ${cityDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
      
                    {cityDropdownOpen && (
                      <div 
                        className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {['Ташкент', 'Самарканд', 'Бухара', 'Андижан'].map((item) => (
                          <div 
                            key={item}
                            className="p-4 hover:bg-gray-50 cursor-pointer text-[#1F1F1F]"
                            onClick={() => {
                              setCity(item);
                              setCityDropdownOpen(false);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Район */}
                <div>
                  <label className="text-[#8F8F8F] text-base mb-1 block">{t('district')}</label>
                  <div className="relative">
                    <div 
                      className="w-full bg-white rounded-xl p-4 flex justify-between items-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDistrictDropdownOpen(!districtDropdownOpen);
                        setCityDropdownOpen(false);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      <span className="text-[#1F1F1F]">{district}</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#A3A3A3" 
                        strokeWidth="2"
                        className={`transition-transform duration-200 ${districtDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
      
                    {districtDropdownOpen && (
                      <div 
                        className="absolute left-0 right-0 mt-1 text-[#1F1F1F] bg-white rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {['Чиланзарский', 'Юнусабадский', 'Мирзо-Улугбекский', 'Сергелийский'].map((item) => (
                          <div 
                            key={item}
                            className="p-4 text-[#1F1F1F] hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setDistrict(item);
                              setDistrictDropdownOpen(false);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Площадь */}
                <div>
                  <label className="text-[#8F8F8F] text-base mb-1 block">{t('area')}</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="60"
                      className="w-full bg-white rounded-xl p-4 outline-none text-[#1F1F1F] focus:ring-2 focus:ring-[#FF7560]/30"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#8F8F8F]">
        м²
                    </div>
                  </div>
                </div>
  
                {/* Валюта */}
                <div>
                  <label className="text-[#8F8F8F] text-base mb-1 block">{t('currency')}</label>
                  <div className="relative">
                    <div 
                      className="w-full bg-white rounded-xl p-4 flex justify-between items-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrencyDropdownOpen(!currencyDropdownOpen);
                        setCityDropdownOpen(false);
                        setDistrictDropdownOpen(false);
                      }}
                    >
                      <span className="text-[#1F1F1F]">{currency}</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#A3A3A3" 
                        strokeWidth="2"
                        className={`transition-transform duration-200 ${currencyDropdownOpen ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
      
                    {currencyDropdownOpen && (
                      <div 
                        className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {['Доллары', 'UZS'].map((item) => (
                          <div 
                            key={item}
                            className="p-4 text-[#1F1F1F] hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setCurrency(item);
                              setCurrencyDropdownOpen(false);
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Цена */}
                <div>
                  <label className="text-[#8F8F8F] text-base mb-1 block">{t('price')}</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8F8F8F]">
                      {currency === 'Доллары' ? '$' : '₽'}
                    </div>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="500"
                      className="w-full bg-white rounded-xl p-4 pl-8 outline-none text-[#1F1F1F] focus:ring-2 focus:ring-[#FF7560]/30"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                    />
                  </div>
                </div>
  
                {/* Описание */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-[#8F8F8F] text-base mb-1 block">{t('description')}</label>
                    <span className="text-xs text-gray-400">{description.length}/500</span>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                    placeholder="Опишите особенности объекта недвижимости..."
                    className="w-full bg-white rounded-xl p-4 outline-none min-h-[120px] resize-none text-[#1F1F1F] focus:ring-2 focus:ring-[#FF7560]/30"
                  />
                </div>
  
                {/* Чекбоксы */}
                <div className="mt-4 space-y-4">
                  {/* Наличие ремонта */}
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setHasRenovation(!hasRenovation)}
                  >
                    <div className={`w-6 h-6 rounded border ${hasRenovation ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3 transition-colors`}>
                      {hasRenovation && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-[#1F1F1F] text-base">{t('withRenovation')}</span>
                  </div>
    
                  {/* Мебель/техника */}
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => setHasFurniture(!hasFurniture)}
                  >
                    <div className={`w-6 h-6 rounded border ${hasFurniture ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3 transition-colors`}>
                      {hasFurniture && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span className="text-[#1F1F1F] text-base">{t('withFurniture')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {renderNavButtons()}
    </div>
  );
}