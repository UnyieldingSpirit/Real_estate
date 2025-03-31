'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationHeader from '@/src/shared/components/NavigationHeader';
import { useTranslation } from '@/src/hooks';
import { MailIcon } from '@/src/shared/ui/Icon';
import PhotoGalleryModal from '@/src/shared/components/PhotoGalleryModal';

// Имитация данных для детальной страницы
const propertyData = {
  id: '1',
  title: 'Современная квартира в центре',
  price: '300 $/мес.',
  location: 'Ташкент, Чиланзарский район',
  area: '60м²',
  rooms: 4,
  description: 'Рядом поликлиника, сад, маркет, метро',
  images: [
    '/Rectangle.png',
    '/Rectangle.png',
    '/Rectangle.png',
    '/Rectangle.png',
  ],
  features: {
    hasRenovation: true,
    hasFurniture: true,
    isFromOwner: true
  },
  owner: {
    name: 'Алена Ибрагимова',
    avatar: '/avatar.svg',
    title: 'Хозяин'
  }
};

const localization = {
  ru: {
    viewAll: 'Посмотреть всё',
    description: 'Описание',
    features: 'Особенности',
    renovation: 'Ремонт',
    furniture: 'Мебель',
    owner: 'Собственник',
    contact: 'Пожаловаться',
    dislike: 'Не нравится',
    like: 'Нравится',
    call: 'Позвонить'
  },
  uz: {
    viewAll: 'Hammasini ko\'rish',
    description: 'Tavsif',
    features: 'Xususiyatlar',
    renovation: 'Ta\'mirlash',
    furniture: 'Mebel',
    owner: 'Mulkdor',
    contact: 'Shikoyat qilish',
    dislike: 'Yoqmadi',
    like: 'Yoqdi',
    call: 'Qo\'ng\'iroq qilish'
  }
};

export default function PropertyDetailPage() {
  const router = useRouter();
  const { t } = useTranslation(localization);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  
  // Action states
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  // Обработчик для открытия галереи всех изображений
  const handleOpenGallery = (index = 0) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  // Обработчик для закрытия галереи
  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };
  
  // Обработчик нажатия на кнопку "Нравится"
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };
  
  // Обработчик нажатия на кнопку "Не нравится"
  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };
  
  // Обработчик нажатия на кнопку "Позвонить"
  const handleCall = () => {
    console.log("Calling the owner...");
    // Здесь будет реальная логика для совершения звонка
  };
  
  // Обработчик нажатия на кнопку "Пожаловаться"
  const handleContact = (id: number) => {
  router.push(`/property-complaint/${id}`);
  };

  const renderGallery = () => {
    const images = propertyData.images || [];
    const imagesCount = images.length;

    if (imagesCount === 0) {
      // Если нет изображений, показываем заглушку
      return (
        <div className="w-full h-72 bg-gray-200 rounded-3xl flex items-center justify-center">
          <span className="text-gray-500">Нет фото</span>
        </div>
      );
    } else if (imagesCount === 1) {
      // Если одно изображение, показываем только его
      return (
        <div 
          className="w-full h-72 rounded-3xl overflow-hidden cursor-pointer"
          onClick={() => handleOpenGallery(0)}
        >
          <img 
            src={images[0]} 
            alt={propertyData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/600x400?text=Нет+фото';
            }}
          />
        </div>
      );
    } else if (imagesCount === 2) {
      // Если два изображения, показываем слайдер
      return (
        <div className="w-full h-72 rounded-3xl overflow-hidden relative">
          <img 
            src={images[currentImageIndex]} 
            alt={propertyData.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => handleOpenGallery(currentImageIndex)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/600x400?text=Нет+фото';
            }}
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex 
                    ? 'border-2 border-white bg-transparent' 
                    : 'bg-white'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
          {/* Стрелки для навигации */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/60 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/60 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      );
    } else if (imagesCount === 3) {
      // Если три изображения, показываем 1 большое и 2 маленьких
      return (
        <div className="space-y-2">
          {/* Главное изображение */}
          <div 
            className="w-full h-64 rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => handleOpenGallery(0)}
          >
            <img 
              src={images[0]} 
              alt={propertyData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/600x400?text=Нет+фото';
              }}
            />
          </div>
          
          {/* Маленькие изображения */}
          <div className="flex space-x-2">
            <div 
              className="w-1/2 h-28 rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenGallery(1)}
            >
              <img 
                src={images[1]} 
                alt={`${propertyData.title} - фото 2`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Третье изображение с оверлеем "Посмотреть всё" */}
            <div 
              className="w-1/2 h-28 rounded-3xl overflow-hidden relative cursor-pointer" 
              onClick={() => handleOpenGallery(2)}
            >
              <img 
                src={images[2]} 
                alt={`${propertyData.title} - фото 3`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <div className="rounded-full w-12 h-12 bg-white/20 flex items-center justify-center mb-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
                <span className="text-white text-sm">{t('viewAll')}</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Если 4 и более изображений - 1 большое и 3 маленьких
      return (
        <div className="space-y-2">
          {/* Главное изображение */}
          <div 
            className="w-full h-64 rounded-3xl overflow-hidden cursor-pointer"
            onClick={() => handleOpenGallery(0)}
          >
            <img 
              src={images[0]} 
              alt={propertyData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/600x400?text=Нет+фото';
              }}
            />
          </div>
          
          {/* Маленькие изображения */}
          <div className="flex space-x-2">
            <div 
              className="w-1/3 h-28 rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenGallery(1)}
            >
              <img 
                src={images[1]} 
                alt={`${propertyData.title} - фото 2`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div 
              className="w-1/3 h-28 rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => handleOpenGallery(2)}
            >
              <img 
                src={images[2]} 
                alt={`${propertyData.title} - фото 3`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Четвертое изображение с оверлеем "Посмотреть всё" */}
            <div 
              className="w-1/3 h-28 rounded-3xl overflow-hidden relative cursor-pointer" 
              onClick={() => handleOpenGallery(3)}
            >
              <img 
                src={images[3]} 
                alt={`${propertyData.title} - фото 4`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <div className="rounded-full w-12 h-12 bg-white/20 flex items-center justify-center mb-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
                <span className="text-white text-sm">{t('viewAll')}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  
  return (
       <div className="page-scrollable">
      <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
      <NavigationHeader />
      
      <div className="flex-1"> {/* Added padding for action buttons */}
        {/* Галерея изображений с отступами по бокам */}
        <div className="px-4 py-4">
          {renderGallery()}
        </div>
        
        {/* Информация о недвижимости - основная информация */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-xl p-4">
            {/* Цена и локация */}
            <h1 className="text-[32px] font-bold text-[#1F1F1F]">{propertyData.price}</h1>
            <div className="flex items-center text-[#7D7D7D] mt-1 mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{propertyData.location}</span>
            </div>
            
            {/* Площадь и комнаты */}
            <div className="flex gap-4">
              <div className="flex items-center bg-[#F2F2F2] py-2 px-4 rounded-full">
                <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.5 5.83334V3.33334C17.5 2.41667 16.75 1.66667 15.8333 1.66667H13.3333C12.4167 1.66667 11.6667 2.41667 11.6667 3.33334V5.83334C11.6667 6.75 12.4167 7.5 13.3333 7.5H15.8333C16.75 7.5 17.5 6.75 17.5 5.83334ZM17.5 13.3333V10.8333C17.5 9.91667 16.75 9.16667 15.8333 9.16667H13.3333C12.4167 9.16667 11.6667 9.91667 11.6667 10.8333V13.3333C11.6667 14.25 12.4167 15 13.3333 15H15.8333C16.75 15 17.5 14.25 17.5 13.3333ZM8.33333 13.3333V10.8333C8.33333 9.91667 7.58333 9.16667 6.66667 9.16667H4.16667C3.25 9.16667 2.5 9.91667 2.5 10.8333V13.3333C2.5 14.25 3.25 15 4.16667 15H6.66667C7.58333 15 8.33333 14.25 8.33333 13.3333ZM8.33333 3.33334V5.83334C8.33333 6.75 7.58333 7.5 6.66667 7.5H4.16667C3.25 7.5 2.5 6.75 2.5 5.83334V3.33334C2.5 2.41667 3.25 1.66667 4.16667 1.66667H6.66667C7.58333 1.66667 8.33333 2.41667 8.33333 3.33334Z" fill="#333333"/>
                </svg>
                <span className="text-[#1F1F1F]">{propertyData.area}</span>
              </div>
              
              <div className="flex items-center bg-[#F2F2F2] py-2 px-4 rounded-full">
                <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8333 2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM7.5 14.1667H5.83333V9.16667H7.5V14.1667ZM10.8333 14.1667H9.16667V7.5H10.8333V14.1667ZM14.1667 14.1667H12.5V11.6667H14.1667V14.1667Z" fill="#333333"/>
                </svg>
                <span className="text-[#1F1F1F]">{propertyData.rooms}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Описание */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-xl p-4">
            <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2">
              {t('description')}
            </h2>
            <p className="text-[#7D7D7D] text-base">
              {propertyData.description}
            </p>
          </div>
        </div>
        
        {/* Особенности */}
        <div className="px-4 mb-4">
          <h2 className="text-2xl font-bold text-[#1F1F1F] mb-4">
            {t('features')}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {propertyData.features.hasRenovation && (
              <div className="bg-white rounded-xl p-4 flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                 <img src="/renovation.svg" alt="" />
                </div>
                <span className="text-[#7D7D7D] text-center">{t('renovation')}</span>
              </div>
            )}
            
            {propertyData.features.hasFurniture && (
              <div className="bg-white rounded-xl p-4 flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <img src="/furnitures.svg" alt="" />
                </div>
                <span className="text-[#7D7D7D] text-center">{t('furniture')}</span>
              </div>
            )}
            
            {propertyData.features.isFromOwner && (
              <div className="bg-white rounded-xl p-4 flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center mb-2">
               <img src="/user.svg" alt="" />
                </div>
                <span className="text-[#7D7D7D] text-center">{t('owner')}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Хозяин */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden mr-3">
                <img 
                  src={propertyData.owner.avatar} 
                  alt={propertyData.owner.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/100x100?text=Avatar';
                  }}
                />
              </div>
              <div>
                <div className="text-sm text-[#7D7D7D]">{propertyData.owner.title}</div>
                <div className="font-medium text-[#2F3334]">{propertyData.owner.name}</div>
              </div>
            </div>
            
            <button className="w-14 h-14 bg-[#FF6B6B] rounded-full flex items-center justify-center">
              <MailIcon color="white" size={20} />
            </button>
          </div>
        </div>
        
        {/* Кнопка Пожаловаться */}
        <div className="px-4 mb-10">
          <button 
            onClick={handleContact(propertyData.id)}
            className="w-full bg-[#ABABAB42] text-[#1F1F1F] text-[16px] rounded-xl py-4 font-medium"
          >
            {t('contact')}
          </button>
        </div>
        
        {/* Нижняя панель с кнопками действий - не фиксированная, как на фото */}
        <div className="py-6 px-6 flex justify-between items-center rounded-t-[20px] mx-4">
          <div className="flex flex-col items-center">
            <button 
              onClick={handleDislike}
              className={`w-[82px] h-[82px] ${isDisliked ? 'bg-[#F18D74]' : 'bg-[#EEEEEE]'} rounded-full flex items-center justify-center transition-colors`}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={isDisliked ? "white" : "#9A9A9A"} strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <span className="mt-2 text-sm text-[#7D7D7D]">{t('dislike')}</span>
          </div>
          
          <div className="flex flex-col mb-2 items-center">
            <button 
              onClick={handleCall}
              className="w-[90px] h-[90px] bg-[#4CAF50] rounded-full flex items-center justify-center"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.36 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-[#7D7D7D]">{t('call')}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={handleLike}
              className={`w-[82px] h-[82px] ${isLiked ? 'bg-[#BE74F1]' : 'bg-[#EEEEEE]'} rounded-full flex items-center justify-center transition-colors`}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill={isLiked ? "white" : "none"} stroke={isLiked ? "white" : "#9A9A9A"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-[#7D7D7D]">{t('like')}</span>
          </div>
        </div>
      </div>
      
      {/* Модальное окно для просмотра фотографий */}
      <PhotoGalleryModal 
        images={propertyData.images || []}
        initialIndex={galleryInitialIndex}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
      />
    </div>
    </div>
  );
}