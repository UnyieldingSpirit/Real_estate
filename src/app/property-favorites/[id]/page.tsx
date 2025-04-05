/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/src/hooks';
import { MailIcon } from '@/src/shared/ui/Icon';
import PhotoGalleryModal from '@/src/shared/components/PhotoGalleryModal';

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
    delete: 'Удалить',
    edit: 'Изменить',
    deleteConfirm: 'Вы уверены, что хотите удалить это объявление?'
  },
  uz: {
    viewAll: 'Hammasini ko\'rish',
    description: 'Tavsif',
    features: 'Xususiyatlar',
    renovation: 'Ta\'mirlash',
    furniture: 'Mebel',
    owner: 'Mulkdor',
    contact: 'Shikoyat qilish',
    delete: 'O\'chirish',
    edit: 'Tahrirlash',
    deleteConfirm: 'Siz bu e\'lonni o\'chirishni xohlaysizmi?'
  }
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { t } = useTranslation(localization);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Обработчик для открытия галереи всех изображений
  const handleOpenGallery = (index = 0) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  // Обработчик для закрытия галереи
  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };
  
  // Обработчик удаления объявления
  const handleDelete = () => {
    console.log("Deleting property...");
    // В реальном приложении здесь был бы API-запрос для удаления объявления
    
    // После успешного удаления перенаправляем на главную страницу
    router.push('/');
  };
  
  // Обработчик редактирования объявления
  const handleEdit = () => {
    console.log("Editing property...");
    // Перенаправляем на страницу редактирования с ID объявления
    router.push(`/edit-property/${params?.id || propertyData.id}`);
  };

  // Закрытие модального окна при клике вне его
  const handleModalBackdropClick = (e: { target: any; currentTarget: any; }) => {
    if (e.target === e.currentTarget) {
      setIsDeleteModalOpen(false);
    }
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
        
        <div className="flex-1"> {/* Без отступа для кнопок */}
          {/* Галерея изображений с отступами по бокам */}
          <div className="px-4 py-4">
            {renderGallery()}
          </div>
          
          {/* Информация о недвижимости - основная информация */}
          <div className="px-4 mb-4">
            <div className="bg-white rounded-xl p-4">
              {/* Цена и локация */}
              <h1 className="text-[28px] font-bold text-[#1F1F1F]">{propertyData.price}</h1>
              <div className="flex items-center text-[#7D7D7D] mt-1 mb-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{propertyData.location}</span>
              </div>
              
              {/* Площадь и комнаты */}
              <div className="flex gap-4">
                <div className="flex items-center bg-[#F2F2F2] px-2 py-1 rounded-full">
                  <img src="/square.svg" alt="Площадь" className='w-[16px] h-[16px] mr-2' />
                  <span className="text-[#1F1F1F]">{propertyData.area}</span>
                </div>
                
                <div className="flex items-center bg-[#F2F2F2] px-2 py-1 rounded-full">
                  <img src="/rooms.svg" alt="Комнаты" className='w-[16px] h-[16px] mr-2' />
                  <span className="text-[#1F1F1F]">{propertyData.rooms}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Описание */}
          <div className="px-4 mb-4">
            <div className="bg-white rounded-xl p-4">
              <h2 className="text-[22px] font-bold text-[#1F1F1F] mb-2">
                {t('description')}
              </h2>
              <p className="text-[#838383] text-[18px]">
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
        </div>
        
        <div className="py-6 px-6 flex justify-center gap-10 mx-4 mb-4"> 
          {/* Кнопка Удалить */} 
          <div className="flex flex-col items-center"> 
            <button 
              onClick={() => setIsDeleteModalOpen(true)} 
              className="w-[70px] h-[70px] bg-[#E7E7E7] hover:bg-[#EC6A5F] rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
            > 
              {/* Иконка мусорного бака */} 
              <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17 0C15.8179 0 14.6445 0.208369 13.5456 0.616023C12.4466 1.0237 11.4388 1.62457 10.5831 2.39089C9.72717 3.15748 9.03882 4.07603 8.56578 5.09877C8.27985 5.71699 8.07676 6.3644 7.96077 7.02679H1.30769C0.585474 7.02679 0 7.61666 0 8.34431C0 9.07196 0.585474 9.66183 1.30769 9.66183H3.48718V17.3064C3.48718 20.1755 3.89108 23.0301 4.68681 25.7849C5.8768 29.9046 9.30285 32.9741 13.5028 33.6834L13.7779 33.7298C15.9111 34.0901 18.0889 34.0901 20.2221 33.7298L20.4971 33.6833C24.6971 32.974 28.1231 29.9046 29.3131 25.785C30.1089 23.0301 30.5128 20.1755 30.5128 17.3064V9.66183H32.6923C33.4145 9.66183 34 9.07196 34 8.34431C34 7.61666 33.4145 7.02679 32.6923 7.02679H26.0392C25.9232 6.3644 25.7201 5.71699 25.4342 5.09878C24.9612 4.07603 24.2728 3.15748 23.4169 2.39089C22.5612 1.62457 21.5534 1.0237 20.4544 0.616024C19.3555 0.208369 18.1821 0 17 0ZM14.4492 3.08878C15.2542 2.79018 16.1213 2.63504 17 2.63504C17.8787 2.63504 18.7458 2.79018 19.5508 3.08879C20.3557 3.38737 21.0778 3.82168 21.6793 4.36035C22.2805 4.89876 22.748 5.52946 23.0636 6.21177C23.1866 6.47777 23.2859 6.75023 23.3613 7.02679L10.6387 7.02678C10.7141 6.75023 10.8134 6.47777 10.9364 6.21177C11.252 5.52945 11.7195 4.89876 12.3207 4.36035C12.9222 3.82168 13.6443 3.38737 14.4492 3.08878ZM13.5128 15.8103C14.235 15.8103 14.8205 16.4001 14.8205 17.1278V24.1546C14.8205 24.8822 14.235 25.4721 13.5128 25.4721C12.7906 25.4721 12.2051 24.8822 12.2051 24.1546V17.1278C12.2051 16.4001 12.7906 15.8103 13.5128 15.8103ZM20.4872 15.8103C21.2094 15.8103 21.7949 16.4001 21.7949 17.1278V24.1546C21.7949 24.8822 21.2094 25.4721 20.4872 25.4721C19.765 25.4721 19.1795 24.8822 19.1795 24.1546V17.1278C19.1795 16.4001 19.765 15.8103 20.4872 15.8103Z" fill="white"/> 
              </svg> 
            </button> 
            <span className="mt-2 text-[#808080] text-base">{t('delete')}</span> 
          </div> 
          
          {/* Кнопка Изменить */} 
          <div className="flex flex-col items-center"> 
            <button 
              onClick={handleEdit} 
              className="w-[70px] h-[70px] bg-[#E7E7E7] hover:bg-[#64AAFF] rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
            > 
              {/* Иконка карандаша/редактирования */} 
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6202 0C20.6629 0 18.7858 0.777518 17.4018 2.16151L8.6982 10.8651C4.7008 14.8625 1.86495 19.8712 0.493852 25.3555L0.0732971 27.0378C-0.362886 28.7825 1.21749 30.3629 2.96223 29.9267L4.64445 29.5061C10.1288 28.135 15.1375 25.2992 19.1349 21.3018L27.8385 12.5982C29.2225 11.2142 30 9.3371 30 7.37985C30 3.30407 26.6959 0 22.6202 0ZM20.1189 9.88113C21.4512 11.2134 22.9957 11.7809 24.1413 11.5816L25.4816 10.2413C26.2405 9.48239 26.6668 8.4531 26.6668 7.37985C26.6668 5.14493 24.8551 3.33316 22.6202 3.33316C21.5469 3.33316 20.5176 3.75951 19.7587 4.51841L18.4184 5.85868C18.2191 7.00432 18.7866 8.54884 20.1189 9.88113Z" fill="white"/> 
              </svg> 
            </button> 
            <span className="mt-2 text-[#808080] text-base">{t('edit')}</span> 
          </div> 
        </div>
      </div>
      
      <PhotoGalleryModal 
        images={propertyData.images || []}
        initialIndex={galleryInitialIndex}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
      />

{isDeleteModalOpen && (
  <div 
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    onClick={handleModalBackdropClick}
  >
    <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 relative">
      {/* Иконка закрытия (X) в правом верхнем углу */}
      <button 
        onClick={() => setIsDeleteModalOpen(false)}
        className="absolute top-4 right-4"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 6L18 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      
      <h2 className="text-center text-[24px] text-[#0F0F0F] font-bold mb-4 mt-6">
        Вы действительно хотите удалить объявление?
      </h2>
      
      <div className="flex justify-center gap-10 w-full">
        <button 
          onClick={() => setIsDeleteModalOpen(false)} 
          className="py-3 px-6 text-[18px] text-[#8D8D8D]"
        >
          Нет
        </button>
        
        <button 
          onClick={() => {
            setIsDeleteModalOpen(false);
            handleDelete();
          }} 
          className="py-3 px-6 text-[18px] text-[#FF6B6B] border-b-2 border-[#FF6B6B]"
        >
          Да
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}