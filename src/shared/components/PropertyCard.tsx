'use client';

import { useState, useRef, TouchEvent, JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/src/store/categoryStore';
import { FavoriteHeartIcon } from '@/src/shared/ui/Icon';

// Тип операции с недвижимостью
type OperationType = 'rent' | 'sale';

// Интерфейс для объекта недвижимости
interface PropertyData {
    id?: number | string;
    title?: string;
    description?: string;
    price?: string;
    location?: string;
    area?: string;
    rooms?: number | string;
    images?: string[];
    daysAgo?: number;
    hasRenovation?: boolean;
    hasFurniture?: boolean;
    fromOwner?: boolean;
    operationType?: OperationType;
}

// Интерфейс пропсов компонента
interface PropertyCardProps {
    property: PropertyData;
    onClick?: () => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps): JSX.Element {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    
    // Получаем активный цвет из store
    const activeColor = useCategoryStore(state => state.getActiveColor());

    // Преобразуем в массив, если images не массив или пусто
    const images: string[] = Array.isArray(property.images) && property.images.length > 0
        ? property.images
        : ['https://placehold.co/600x400?text=Нет+фото'];

    // Обработчик для избранного
    const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    // Обработчик для клика по карточке
    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else {
            // Переход на детальную страницу с использованием id из property
           router.push(`/property/${property.id}`);
        }
    };

    // Определение типа объявления (риелтор или собственник)
    const isOwner: boolean = property.fromOwner === true;
    const advertiserType: string = isOwner ? 'Собственник' : 'Риелтор';
    const advertiserBgColor: string = isOwner ? 'bg-[#7BB3FF]' : 'bg-[#F18D74]';
    const advertiserTextColor: string = 'text-white';

    // Минимальное расстояние для определения свайпа
    const minSwipeDistance: number = 50;

    const onTouchStart = (e: TouchEvent<HTMLImageElement>): void => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent<HTMLImageElement>): void => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (): void => {
        if (!touchStart || !touchEnd) return;
        const distance: number = touchStart - touchEnd;
        const isLeftSwipe: boolean = distance > minSwipeDistance;
        const isRightSwipe: boolean = distance < -minSwipeDistance;
        
        if (isLeftSwipe && images.length > 1) {
            // Свайп влево - следующее изображение
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        } else if (isRightSwipe && images.length > 1) {
            // Свайп вправо - предыдущее изображение
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    // Если элемент в избранном, используем цвет активной категории, 
    // иначе стандартный цвет для сердечка
    const heartFillColor: string = isFavorite ? (activeColor || "#DC2735") : "none";
    const heartStrokeColor: string = isFavorite ? "none" : "#C0C0C0";

    // Форматирование цены и определение типа объявления (аренда/продажа)
    const formatPrice = (): string => {
        // Получаем строку цены
        const priceString: string = property.price || "300$";
        
        // Если тип операции задан явно, используем его
        if (property.operationType) {
            return property.operationType === 'rent' 
                ? `${priceString}/мес.` 
                : `${priceString}`;
        }
        
        // Иначе пытаемся определить по цене
        // Извлекаем числовое значение из строки цены
        const priceValue: number = parseInt(priceString.replace(/[^0-9]/g, ''));
        
        // Если цена больше 5000$, считаем что это продажа
        // Если меньше, то аренда
        return priceValue > 5000 
            ? `${priceString}` 
            : `${priceString}/мес.`;
    };

    return (
        <div 
            className="rounded-[20px] overflow-hidden bg-white mb-4 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Изображение и дни */}
            <div className="relative">
                <div className="relative w-full p-4">
                    <div 
                        ref={containerRef}
                        className="relative h-[180px] w-full rounded-2xl overflow-hidden"
                    >
                        {/* Основное изображение */}
                        <img
                            ref={imageRef}
                            src={images[currentImageIndex]}
                            alt={property.title || "Изображение недвижимости"}
                            className="object-cover h-full w-full"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/600x400?text=Нет+фото';
                            }}
                        />
                    </div>

                    {/* Индикаторы слайдера */}
                    {images.length > 1 && (
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${
                                        index === currentImageIndex 
                                            ? 'border-2 border-white bg-transparent' 
                                            : 'bg-white'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Бейдж с днями */}
                    <div className="absolute top-6 left-6 bg-white rounded-full px-4 py-2 text-[#000000] text-sm">
                        {property.daysAgo || 4} дня назад
                    </div>

                    {/* Кнопка избранного */}
                    <button
                        onClick={toggleFavorite}
                        className="absolute top-6 right-6 bg-white border-none rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        <FavoriteHeartIcon
                            color={heartFillColor} 
                            stroke={heartStrokeColor}
                            strokeWidth={isFavorite ? 0 : 1.5}
                        />
                    </button>

                    {/* Тип объявителя (риелтор/собственник) */}
                    <div className={`absolute bottom-0.5 right-4 ${advertiserBgColor} rounded-full px-4 py-1.5 ${advertiserTextColor} text-sm font-medium`}>
                        {advertiserType}
                    </div>
                </div>
            </div>

            {/* Информация о недвижимости */}
            <div className="px-4 pb-4">
                {/* Локация */}
                <div className="flex items-center text-[#838383]">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="mr-1" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>
                        {property.location || "Ташкент, Чиланзарский район"}
                    </span>
                </div>

                {/* Цена с определением типа объявления */}
                <div className="text-[22px] text-[#000000] font-bold mb-2">
                    {formatPrice()}
                </div>

                {/* Параметры */}
                <div className="flex gap-2">
                    <div className="flex items-center bg-[#F2F2F2] py-1 px-2 rounded-full text-base">
                       <img src="/square.svg" alt="Площадь" className='w-[16px] h-[16px]' />
                        <span className='ml-2 text-[18px] mt-1 text-[#000000]'>
                            {property.area || "60м²"}
                        </span>
                    </div>

                    <div className="flex items-center bg-[#F2F2F2] py-1 px-2 rounded-full text-base">
                         <img src="/rooms.svg" alt="Комнаты" className='w-[16px] h-[16px]' />
                        <span className='ml-2 text-[18px] mt-1 text-[#000000]'>
                            {property.rooms || "4"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}