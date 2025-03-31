'use client';

import { useTranslation } from '@/src/hooks';
import { CameraIcon } from '@/src/shared/ui/Icon';
import { BottomNavigation } from '@/src/shared/components';

const localization = {
  ru: {
    postProperty: 'Разместить объявление',
    addPhotos: 'Добавить фотографии',
    propertyType: 'Тип недвижимости',
    select: 'Выбрать',
    location: 'Местоположение',
    price: 'Цена',
    description: 'Описание',
    enterDescription: 'Введите описание',
    contactDetails: 'Контактные данные',
    phoneNumber: 'Номер телефона',
    publishButton: 'Опубликовать'
  },
  uz: {
    postProperty: 'E\'lon joylashtirish',
    addPhotos: 'Rasmlar qo\'shish',
    propertyType: 'Ko\'chmas mulk turi',
    select: 'Tanlash',
    location: 'Joylashuv',
    price: 'Narxi',
    description: 'Tavsif',
    enterDescription: 'Tavsifni kiriting',
    contactDetails: 'Aloqa ma\'lumotlari',
    phoneNumber: 'Telefon raqami',
    publishButton: 'Nashr qilish'
  }
};

export default function PostPropertyPage() {
  const { t } = useTranslation(localization);
  // const [photos, ] = useState([]);
  
  // Функция для добавления фотографий
  const handleAddPhoto = () => {
    console.log('Add photo functionality would be implemented here');
    // В реальном приложении здесь была бы логика выбора фотографий
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      
      <div className="flex-1 p-4">
        {/* Секция фотографий */}
        <div className="mb-6">
          <p className="text-[#1F1F1F] text-lg font-medium mb-3">{t('addPhotos')}</p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleAddPhoto}
              className="w-[100px] h-[100px] rounded-xl bg-white flex flex-col items-center justify-center border border-dashed border-gray-300"
            >
              <CameraIcon color="#A3A3A3" size={40} />
              <span className="text-xs text-[#A3A3A3] mt-2">+</span>
            </button>
            
            {/* {photos.map((photo, index) => (
              <div key={index} className="w-[100px] h-[100px] rounded-xl bg-gray-200 relative">
                <img 
                  src={photo.url} 
                  alt="Property" 
                  className="w-full h-full object-cover rounded-xl"
                />
                <button className="absolute top-1 right-1 bg-white rounded-full p-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M1 11L11 1" stroke="#FF6B6B" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            ))} */}
          </div>
        </div>
        
        {/* Тип недвижимости */}
        <div className="mb-5">
          <p className="text-[#1F1F1F] text-lg font-medium mb-3">{t('propertyType')}</p>
          <div className="bg-white rounded-xl p-4 flex justify-between items-center">
            <span className="text-[#8F8F8F]">{t('select')}</span>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1L7 7L1 13" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        {/* Местоположение */}
        <div className="mb-5">
          <p className="text-[#1F1F1F] text-lg font-medium mb-3">{t('location')}</p>
          <div className="bg-white rounded-xl p-4 flex justify-between items-center">
            <span className="text-[#8F8F8F]">{t('select')}</span>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1L7 7L1 13" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        {/* Цена */}
        <div className="mb-5">
          <p className="text-[#1F1F1F] text-lg font-medium mb-3">{t('price')}</p>
          <input 
            type="number" 
            placeholder="0" 
            className="w-full bg-white rounded-xl p-4 text-[#1F1F1F] outline-none"
          />
        </div>
        
        {/* Описание */}
        <div className="mb-5">
          <p className="text-[#1F1F1F] text-lg font-medium mb-3">{t('description')}</p>
          <textarea 
            placeholder={t('enterDescription')} 
            className="w-full bg-white rounded-xl p-4 text-[#1F1F1F] outline-none min-h-[120px] resize-none"
          />
        </div>
        
        {/* Контактные данные */}
        <div className="mb-8">
          <p className="text-[#1F1F1F] text-lg font-medium mb-3">{t('contactDetails')}</p>
          <div className="bg-white rounded-xl p-4">
            <label className="block text-[#8F8F8F] text-sm mb-1">{t('phoneNumber')}</label>
            <input 
              type="tel" 
              defaultValue="+998" 
              className="w-full text-[#1F1F1F] outline-none"
            />
          </div>
        </div>
        
        {/* Кнопка публикации */}
        <button className="w-full bg-[#1F1F1F] text-white rounded-xl py-4 text-lg font-medium">
          {t('publishButton')}
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
}