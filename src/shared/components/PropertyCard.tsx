import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCategoryStore } from '@/src/store/categoryStore';
import { FavoriteHeartIcon } from '@/src/shared/ui/Icon';

// Тип операции с недвижимостью
type OperationType = 'rent' | 'sale';

// Статус объявления
type AdvertisementStatus = 'active' | 'inReview' | 'draft' | 'rejected';

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
    status?: AdvertisementStatus;
    hideOwnerBadge?: boolean;
}

// Интерфейс пропсов компонента
interface PropertyCardProps {
    property: PropertyData;
    myAdvertisementMode?: boolean;
    fromFavoritesPage?: boolean; // Новый параметр для определения источника
}

// Функция для форматирования времени
const formatTimeAgo = (daysAgo?: number): string => {
    if (!daysAgo) return 'Сегодня';
    
    if (daysAgo === 1) return 'Вчера';
    if (daysAgo >= 2 && daysAgo <= 4) return `${daysAgo} дня назад`;
    return `${daysAgo} дней назад`;
};

export default function PropertyCard({ 
    property, 
    myAdvertisementMode = false,
    fromFavoritesPage = false // По умолчанию считаем, что карточка не из избранного
}: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    
    const router = useRouter();
    const pathname = usePathname(); // Получаем текущий путь
    
    // Определяем, находимся ли мы на странице избранного
    const isOnFavoritesPage = pathname === '/favorites' || fromFavoritesPage;
    
    const handleCardClick = () => {
        // Определяем, куда редиректить, в зависимости от того, где мы находимся
        if (isOnFavoritesPage) {
            router.push(`/property-favorites/${property.id}`);
        } else {
            router.push(`/property/${property.id}`);
        }
    };
    
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

    // Добавляем обработчики для тачевых событий слайдера
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Минимальное расстояние для определения свайпа
    const minSwipeDistance: number = 50;

    const onTouchStart = (e: React.TouchEvent<HTMLImageElement>): void => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
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

    // Форматирование цены и определение типа объявления
    const formatPrice = (): string => {
        const priceString: string = property.price || "300$";
        
        if (property.operationType) {
            return property.operationType === 'rent' 
                ? `${priceString}/мес.` 
                : `${priceString}`;
        }
        
        const priceValue: number = parseInt(priceString.replace(/[^0-9]/g, ''));
        
        return priceValue > 5000 
            ? `${priceString}` 
            : `${priceString}/мес.`;
    };

    // Определяем текст для статуса объявления
    const getTimeOrStatus = (): { text: string; isStatus?: boolean } => {
        // Если это мои объявления в статусе "на проверке"
        if (myAdvertisementMode && property.status === 'inReview') {
            return { 
                text: 'На проверке', 
                isStatus: true 
            };
        }
        
        // Иначе возвращаем отформатированное время
        return { text: formatTimeAgo(property.daysAgo) };
    };

    // Определяем, показывать ли бейдж владельца
    const showOwnerBadge = !property.hideOwnerBadge && !myAdvertisementMode;

    return (
        <div 
            className="rounded-[20px] overflow-hidden bg-white mb-4 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Изображение и дни */}
            <div className="relative">
                <div className="relative w-full p-4">
                    <div className="relative h-[180px] w-full rounded-2xl overflow-hidden">
                        <img
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
                        
                        {/* Индикаторы слайдера */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
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
                    </div>

                    {/* Бейдж с днями или статусом */}
                    <div 
                        className={`absolute top-6 left-6 rounded-full px-4 py-2 text-sm 
                            ${getTimeOrStatus().isStatus 
                                ? 'bg-[#DFA803] text-white' 
                                : 'bg-white text-[#000000]'}`}
                    >
                        {getTimeOrStatus().text}
                    </div>

                    {/* Кнопка избранного - только не в режиме моих объявлений */}
                    {!myAdvertisementMode && (
                        <button
                            onClick={toggleFavorite}
                            className="absolute top-6 right-6 bg-white border-none rounded-full w-10 h-10 flex items-center justify-center"
                        >
                            <FavoriteHeartIcon
                                color={isFavorite ? activeColor : '#E2E2E2'} 
                                strokeWidth={isFavorite ? 0 : 1.5}
                            />
                        </button>
                    )}

                    {/* Бейдж владельца */}
                    {showOwnerBadge && (
                        <div className={`absolute bottom-0 right-4 ${property.fromOwner ? 'bg-[#7BB3FF]' : 'bg-[#F18D74]'} rounded-full px-4 py-1.5 text-white text-sm font-medium`}>
                            {property.fromOwner ? 'Собственник' : 'Риелтор'}
                        </div>
                    )}
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

                {/* Цена */}
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