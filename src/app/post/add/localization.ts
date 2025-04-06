import { useMemo } from 'react';

// Локализация для страниц размещения объявления
export const usePostLocalization = () => {
  return useMemo(() => ({
    ru: {
      // Шаг выбора типа объявления
      listingType: 'Тип объявления',
      chooseListingType: 'Выберите тип объявления',
      sale: 'Продажа',
      rent: 'Сдача в аренду',

      // Шаг выбора типа недвижимости
      propertyType: 'Тип недвижимости',
      choosePropertyType: 'Выберите тип недвижимости',

      // Шаг загрузки фотографий
      photos: 'Фотографии',
      uploadPhotos: 'Загрузите фотографии',
      cover: 'Обложка',
      uploadPhoto: 'Загрузить фото',
      mainPhoto: 'Основная фотография',

      // Шаг выбора комнатности
      rooms: 'Комнатность',
      chooseRooms: 'Какую комнатность рассматриваете?',
      oneRoom: 'Одна комната',
      twoRooms: 'Две комнаты',
      threeRooms: 'Три комнаты',
      fourRooms: 'Четыре комнаты',
      moreThanFive: 'Больше пяти',

      // Шаг информации о недвижимости
      information: 'Информация',
      fillAllFields: 'Заполните все поля',
      city: 'Город',
      district: 'Район',
      area: 'Площадь (м2)',
      currency: 'Валюта',
      price: 'Цена',
      description: 'Описание',
      withRenovation: 'Наличие ремонта',
      withFurniture: 'Мебель/техника в наличии',
      fromOwners: 'От собственников',

      // Страница проверки
      onVerification: 'На проверке',
      verificationText: 'Ваше объявление отправлено на проверку. Обычно это занимает 20-40 минут.',

      // Общие кнопки
      continue: 'Продолжить',
      back: 'Назад',
      publish: 'Опубликовать',
    },
    uz: {
      // Шаг выбора типа объявления
      listingType: 'E\'lon turi',
      chooseListingType: 'E\'lon turini tanlang',
      sale: 'Sotish',
      rent: 'Ijaraga berish',

      // Шаг выбора типа недвижимости
      propertyType: 'Ko\'chmas mulk turi',
      choosePropertyType: 'Ko\'chmas mulk turini tanlang',

      // Шаг загрузки фотографий
      photos: 'Fotosuratlari',
      uploadPhotos: 'Fotosuratlarni yuklang',
      cover: 'Muqova',
      uploadPhoto: 'Fotosuratni yuklash',
      mainPhoto: 'Asosiy fotosurat',

      // Шаг выбора комнатности
      rooms: 'Xonalar soni',
      chooseRooms: 'Qanday xonalar sonini ko\'rib chiqyapsiz?',
      oneRoom: 'Bir xona',
      twoRooms: 'Ikki xona',
      threeRooms: 'Uch xona',
      fourRooms: 'To\'rt xona',
      moreThanFive: 'Besh va undan ortiq',

      // Шаг информации о недвижимости
      information: 'Ma\'lumot',
      fillAllFields: 'Barcha maydonlarni to\'ldiring',
      city: 'Shahar',
      district: 'Tuman',
      area: 'Maydon (m2)',
      currency: 'Valyuta',
      price: 'Narx',
      description: 'Tavsif',
      withRenovation: 'Ta\'mirlangan',
      withFurniture: 'Mebel/texnika mavjud',
      fromOwners: 'Mulkdorlardan',

      // Страница проверки
      onVerification: 'Tekshiruvda',
      verificationText: 'Sizning e\'loningiz tekshirish uchun yuborildi. Odatda bu 20-40 daqiqa vaqt oladi.',

      // Общие кнопки
      continue: 'Davom etish',
      back: 'Orqaga',
      publish: 'E\'lon qilish',
    },
    en: {
      // Шаг выбора типа объявления
      listingType: 'Listing Type',
      chooseListingType: 'Choose Listing Type',
      sale: 'Sale',
      rent: 'Rent',

      // Шаг выбора типа недвижимости
      propertyType: 'Property Type',
      choosePropertyType: 'Select property type',

      // Шаг загрузки фотографий
      photos: 'Photos',
      uploadPhotos: 'Upload photos',
      cover: 'Cover',
      uploadPhoto: 'Upload photo',
      mainPhoto: 'Main photo',

      // Шаг выбора комнатности
      rooms: 'Rooms',
      chooseRooms: 'What rooms are you looking for?',
      oneRoom: 'One room',
      twoRooms: 'Two rooms',
      threeRooms: 'Three rooms',
      fourRooms: 'Four rooms',
      moreThanFive: 'More than five',

      // Шаг информации о недвижимости
      information: 'Information',
      fillAllFields: 'Fill all fields',
      city: 'City',
      district: 'District',
      area: 'Area (m2)',
      currency: 'Currency',
      price: 'Price',
      description: 'Description',
      withRenovation: 'With renovation',
      withFurniture: 'Furniture/equipment available',
      fromOwners: 'From owners',

      // Страница проверки
      onVerification: 'Pending Verification',
      verificationText: 'Your listing has been sent for verification. It usually takes 20-40 minutes.',

      // Общие кнопки
      continue: 'Continue',
      back: 'Back',
      publish: 'Publish',
    },
  }), []);
};