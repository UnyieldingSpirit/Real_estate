'use client';

import { JSX, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/src/hooks';
import { CheckmarkIcon, CameraIcon } from '@/src/shared/ui/Icon';

interface Localization {
  edit: string;
  fillAllFields: string;
  city: string;
  district: string;
  area: string;
  currency: string;
  price: string;
  description: string;
  hasRenovation: string;
  hasFurniture: string;
  fromOwners: string;
  apply: string;
  delete: string;
  from: string;
  to: string;
  select: string;
  addPhotos: string;
  photoLimit: string;
  uploadMore: string;
}

type TranslationDictionary = {
  [locale: string]: Localization;
};

const localization: TranslationDictionary = {
  ru: {
    edit: 'Редактировать',
    fillAllFields: 'Заполните все поля',
    city: 'Город',
    district: 'Район',
    area: 'Площадь (м2)',
    currency: 'Валюта',
    price: 'Цена',
    description: 'Описание',
    hasRenovation: 'Наличие ремонта',
    hasFurniture: 'Мебель/техника в наличии',
    fromOwners: 'От собственников',
    apply: 'Изменить',
    delete: 'Удалить',
    from: 'от',
    to: 'до',
    select: 'Выбрать',
    addPhotos: 'Добавить фотографии',
    photoLimit: 'Можно добавить до 10 фотографий',
    uploadMore: 'Добавить еще',
  },
  uz: {
    edit: 'Tahrirlash',
    fillAllFields: 'Barcha maydonlarni to\'ldiring',
    city: 'Shahar',
    district: 'Tuman',
    area: 'Maydon (m2)',
    currency: 'Valyuta',
    price: 'Narxi',
    description: 'Tavsif',
    hasRenovation: 'Ta\'mirlangan',
    hasFurniture: 'Mebel/texnika mavjud',
    fromOwners: 'Mulkdorlardan',
    apply: 'O\'zgartirish',
    delete: 'O\'chirish',
    from: 'dan',
    to: 'gacha',
    select: 'Tanlash',
    addPhotos: 'Rasmlar qo\'shish',
    photoLimit: '10 tagacha rasm qo\'shish mumkin',
    uploadMore: 'Yana qo\'shish',
  },
  en: {
    edit: 'Edit',
    fillAllFields: 'Fill all fields',
    city: 'City',
    district: 'District',
    area: 'Area (m2)',
    currency: 'Currency',
    price: 'Price',
    description: 'Description',
    hasRenovation: 'Renovation',
    hasFurniture: 'Furniture',
    fromOwners: 'From owners',
    apply: 'Apply',
    delete: 'Delete',
    from: 'from',
    to: 'to',
    select: 'Select',
    addPhotos: 'Add photos',
    photoLimit: 'You can add up to 10 photos',
    uploadMore: 'Upload more',
  },
};

const cities: string[] = ['Ташкент', 'Самарканд', 'Бухара', 'Андижан'];
const districts: Record<string, string[]> = {
  'Ташкент': ['Чиланзарский', 'Юнусабадский', 'Мирзо-Улугбекский', 'Сергелийский'],
  'Самарканд': ['Район 1', 'Район 2'],
  'Бухара': ['Район 1', 'Район 2'],
  'Андижан': ['Район 1', 'Район 2'],
};

type CurrencyType = '$' | 'UZS';

interface PropertyData {
  city: string;
  district: string;
  area: string;
  currency: CurrencyType;
  price: string;
  description: string;
  hasRenovation: boolean;
  hasFurniture: boolean;
  fromOwners: boolean;
  photos: string[];
}

export default function EditPropertyPage({ params }: { params: { id: string } }): JSX.Element {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useTranslation(localization as any);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Состояния для выпадающих списков
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState<boolean>(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState<boolean>(false);
  
  // Состояние для отслеживания загрузки фото
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  
  // Имитируем загрузку существующих данных объявления
  const [property, setProperty] = useState<PropertyData>({
    city: 'Ташкент',
    district: 'Чиланзарский',
    area: '60',
    currency: '$',
    price: '600',
    description: 'Рядом поликлиника, сад, маркет, метро',
    hasRenovation: true,
    hasFurniture: false,
    fromOwners: false,
    photos: ['/Rectangle.png'],
  });
  
  // Максимальное количество фото
  const MAX_PHOTOS = 10;
  
  // Обработчики изменения данных
  const handleCityChange = (city: string): void => {
    setProperty({ ...property, city });
    setShowCityDropdown(false);
    
    // Сбрасываем район, если город изменился
    if (property.city !== city) {
      setProperty(prev => ({ 
        ...prev, 
        city, 
        district: districts[city][0] || '', 
      }));
    }
  };
  
  const handleDistrictChange = (district: string): void => {
    setProperty({ ...property, district });
    setShowDistrictDropdown(false);
  };
  
  const handleCurrencyChange = (currency: CurrencyType): void => {
    setProperty({ ...property, currency });
    setShowCurrencyDropdown(false);
  };
  
  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProperty({ ...property, area: e.target.value });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProperty({ ...property, price: e.target.value });
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setProperty({ ...property, description: e.target.value });
  };
  
  const toggleRenovation = (): void => {
    setProperty({ ...property, hasRenovation: !property.hasRenovation });
  };
  
  const toggleFurniture = (): void => {
    setProperty({ ...property, hasFurniture: !property.hasFurniture });
  };
  
  const toggleFromOwners = (): void => {
    setProperty({ ...property, fromOwners: !property.fromOwners });
  };
  
  // Обработчик открытия диалога выбора файлов
  const handleAddPhoto = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Обработчик выбора файлов
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || property.photos.length >= MAX_PHOTOS) return;
    
    // Имитация загрузки фото
    setIsUploading(true);
    
    // Создаем массив для хранения URL изображений
    const newPhotos: string[] = [];
    
    // Для каждого выбранного файла создаем временный URL и имитируем загрузку
    Array.from(files).forEach((file, index) => {
      if (property.photos.length + newPhotos.length >= MAX_PHOTOS) return;
      
      // Создаем URL для предпросмотра изображения
      const previewUrl = URL.createObjectURL(file);
      newPhotos.push(previewUrl);
      
      // Имитируем прогресс загрузки
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // Если это последний файл, завершаем загрузку
            if (index === files.length - 1 || property.photos.length + newPhotos.length >= MAX_PHOTOS) {
              setTimeout(() => {
                setIsUploading(false);
                setUploadProgress(0);
                
                // Добавляем новые фото к существующим
                setProperty(prev => ({
                  ...prev,
                  photos: [...prev.photos, ...newPhotos].slice(0, MAX_PHOTOS),
                }));
              }, 500);
            }
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    });
    
    // Сбрасываем input для возможности повторного выбора тех же файлов
    e.target.value = '';
  };
  
  // Обработчик удаления фотографии
  const handleRemovePhoto = (index: number): void => {
    const updatedPhotos = [...property.photos];
    
    // Если это ссылка на объект URL, освобождаем ресурсы
    if (updatedPhotos[index].startsWith('blob:')) {
      URL.revokeObjectURL(updatedPhotos[index]);
    }
    
    updatedPhotos.splice(index, 1);
    setProperty({ ...property, photos: updatedPhotos });
  };
  
  // Обработчик сохранения изменений
  const handleSaveChanges = (): void => {
    // В реальном приложении здесь был бы API-запрос для сохранения
    
    // После успешного сохранения перенаправляем на страницу объявления
    router.push(`/property-favorites/${params.id}`);
  };

  const renderSelector = (
    title: string, 
    value: string, 
    showDropdown: boolean, 
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>, 
    options: string[], 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: (option: any) => void,
  ): JSX.Element => {
    return (
      <div className="mb-6">
        <div className="text-[#8F8F8F] mb-2 text-lg">{title}</div>
        <div className="relative">
          <div 
            className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-[#2F3334] text-lg">{value}</span>
            <svg 
              width="16" 
              height="9" 
              viewBox="0 0 16 9" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            >
              <path d="M1.5 1L8 7.5L14.5 1" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {showDropdown && (
            <div className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-md z-10 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div 
                  key={option} 
                  className="p-4 hover:bg-gray-50 cursor-pointer text-lg text-[#2F3334]"
                  onClick={() => setValue(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="page-scrollable">
      <div className="bg-[#f7f7f7] min-h-screen">
        {/* Заголовок */}
        <div className="px-4 pb-6">
          <h1 className="text-[32px] font-bold text-[#1F1F1F]">{t('edit')}</h1>
          <p className="text-[#777777] text-base">{t('fillAllFields')}</p>
          
          {/* Секция фотографий */}
          <div className="mt-6 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[#8F8F8F] text-lg">{t('addPhotos')}</div>
              <div className="text-[#777777] text-sm">
                {property.photos.length}/{MAX_PHOTOS}
              </div>
            </div>
            
            <p className="text-[#777777] text-sm mb-4">{t('photoLimit')}</p>
            
            <div className="flex flex-wrap gap-3">
              {property.photos.map((photo, index) => (
                <div key={index} className="w-[100px] h-[100px] rounded-xl bg-gray-200 relative">
                  <img 
                    src={photo} 
                    alt={`Фото ${index + 1}`} 
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/100x100?text=No+Image';
                    }}
                  />
                  <button 
                    className="absolute top-1 right-1 bg-white rounded-full p-1"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1L11 11M1 11L11 1" stroke="#FF6B6B" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {property.photos.length < MAX_PHOTOS && (
                <button 
                  onClick={handleAddPhoto}
                  className="w-[100px] h-[100px] rounded-xl bg-white flex flex-col items-center justify-center border border-dashed border-gray-300"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-2 border-[#FF6B6B] border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-xs text-[#A3A3A3]">{uploadProgress}%</span>
                    </div>
                  ) : (
                    <>
                      <CameraIcon color="#A3A3A3" size={40} />
                      <span className="text-xs text-[#A3A3A3] mt-2">+</span>
                    </>
                  )}
                </button>
              )}
              
              {/* Скрытый input для выбора файлов */}
              <input 
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                disabled={property.photos.length >= MAX_PHOTOS || isUploading}
              />
            </div>
          </div>
          
          {/* Город */}
          {renderSelector(
            t('city'), 
            property.city, 
            showCityDropdown, 
            setShowCityDropdown, 
            cities, 
            handleCityChange,
          )}
          
          {/* Район */}
          {renderSelector(
            t('district'), 
            property.district, 
            showDistrictDropdown, 
            setShowDistrictDropdown, 
            districts[property.city] || [], 
            handleDistrictChange,
          )}
          
          {/* Площадь */}
          <div className="mb-6">
            <div className="text-[#8F8F8F] mb-2 text-lg">{t('area')}</div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <input
                type="number"
                value={property.area}
                onChange={handleAreaChange}
                className="w-full text-[#2F3334] text-lg outline-none"
                placeholder="0"
                style={{ appearance: 'textfield' }}
              />
            </div>
          </div>
          
          {/* Валюта */}
          <div className="mb-6">
            <div className="text-[#8F8F8F] mb-2 text-lg">{t('currency')}</div>
            <div className="relative">
              <div 
                className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm cursor-pointer"
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              >
                <span className="text-[#2F3334] text-lg">{property.currency}</span>
                <svg 
                  width="16" 
                  height="9" 
                  viewBox="0 0 16 9" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`}
                >
                  <path d="M1.5 1L8 7.5L14.5 1" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {showCurrencyDropdown && (
                <div className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-md z-10 max-h-60 overflow-y-auto">
                  <div 
                    className="p-4 hover:bg-gray-50 cursor-pointer text-lg text-[#2F3334]"
                    onClick={() => handleCurrencyChange('$')}
                  >
                    $
                  </div>
                  <div 
                    className="p-4 hover:bg-gray-50 cursor-pointer text-lg text-[#2F3334]"
                    onClick={() => handleCurrencyChange('UZS')}
                  >
                    UZS
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Цена */}
          <div className="mb-6">
            <div className="text-[#8F8F8F] mb-2 text-lg">{t('price')}</div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center">
              <input
                type="number"
                value={property.price}
                onChange={handlePriceChange}
                className="flex-1 text-[#2F3334] text-lg outline-none"
                placeholder="0"
                style={{ appearance: 'textfield' }}
              />
              <span className="text-[#2F3334] text-lg">{property.currency}</span>
            </div>
          </div>
          
          {/* Описание */}
          <div className="mb-8">
            <div className="text-[#8F8F8F] mb-2 text-lg">{t('description')}</div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <textarea
                value={property.description}
                onChange={handleDescriptionChange}
                className="w-full text-[#2F3334] text-lg outline-none resize-none min-h-[100px]"
                placeholder={t('description')}
              />
            </div>
          </div>
          
          {/* Чекбоксы */}
          <div className="mb-8">
            <div className="flex items-center mb-4" onClick={toggleRenovation}>
              <div className={`w-6 h-6 rounded border ${property.hasRenovation ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                {property.hasRenovation && <CheckmarkIcon color="white" size={14} />}
              </div>
              <span className="text-[#8F8F8F] text-lg">{t('hasRenovation')}</span>
            </div>
            
            <div className="flex items-center mb-4" onClick={toggleFurniture}>
              <div className={`w-6 h-6 rounded border ${property.hasFurniture ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                {property.hasFurniture && <CheckmarkIcon color="white" size={14} />}
              </div>
              <span className="text-[#8F8F8F] text-lg">{t('hasFurniture')}</span>
            </div>
            
            <div className="flex items-center" onClick={toggleFromOwners}>
              <div className={`w-6 h-6 rounded border ${property.fromOwners ? 'bg-[#FF6B6B] border-[#FF6B6B]' : 'border-gray-300'} flex items-center justify-center mr-3`}>
                {property.fromOwners && <CheckmarkIcon color="white" size={14} />}
              </div>
              <span className="text-[#8F8F8F] text-lg">{t('fromOwners')}</span>
            </div>
          </div>
          
          {/* Кнопки сохранить/удалить */}
          <div className="pb-8">
            <button
              onClick={handleSaveChanges}
              className="w-full p-4 bg-[#1F1F1F] text-white rounded-xl text-lg font-medium mb-4"
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Загрузка...</span>
                </div>
              ) : (
                t('apply')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}