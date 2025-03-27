'use client';

import { useState, useRef, useEffect } from 'react';

export default function PropertyCard({ property }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isShowingDemo, setIsShowingDemo] = useState(false);
    const [demoProgress, setDemoProgress] = useState(0);
    const [userHasInteracted, setUserHasInteracted] = useState(false);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    // Преобразуем в массив, если images не массив или пусто
    const images = Array.isArray(property.images) && property.images.length > 0
        ? property.images
        : ['https://placehold.co/600x400?text=Нет+фото'];

    useEffect(() => {
        // Показываем демо только если есть несколько изображений и пользователь еще не взаимодействовал
        if (images.length > 1 && !userHasInteracted) {
            // Запускаем демо через 2 секунды после загрузки
            const demoTimer = setTimeout(() => {
                setIsShowingDemo(true);
                startDemoAnimation();
            }, 2000);
            
            return () => {
                clearTimeout(demoTimer);
                cancelAnimationFrame(animationRef.current);
            };
        }
    }, [images.length, userHasInteracted]);

    // Функция для анимации демо-свайпа
    const startDemoAnimation = () => {
        let startTime = null;
        const animationDuration = 5000; // 3 секунды на всю анимацию

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // Анимация движения вперед и назад (0-50% вперед, 50-100% назад)
            let slideProgress;
            if (progress < 0.4) {
                // 0-40%: двигаем вправо
                slideProgress = progress / 0.4 * 0.4; // до 40% ширины
            } else if (progress < 0.5) {
                // 40-50%: задержка
                slideProgress = 0.4;
            } else if (progress < 0.9) {
                // 50-90%: двигаем назад
                slideProgress = 0.4 - ((progress - 0.5) / 0.4 * 0.4);
            } else {
                // 90-100%: полностью вернулись
                slideProgress = 0;
            }
            
            setDemoProgress(slideProgress);
            
            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setIsShowingDemo(false);
                setDemoProgress(0);
                
                // Повторяем демо через 5 секунд, если пользователь не взаимодействовал
                if (!userHasInteracted) {
                    const repeatTimer = setTimeout(() => {
                        if (!userHasInteracted) {
                            setIsShowingDemo(true);
                            startDemoAnimation();
                        }
                    }, 5000);
                    
                    return () => clearTimeout(repeatTimer);
                }
            }
        };
        
        animationRef.current = requestAnimationFrame(animate);
    };

    // Обработчик для избранного
    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        setUserHasInteracted(true);
    };

    // Определение типа объявления (риелтор или собственник)
    const isOwner = property.fromOwner === true;
    const advertiserType = isOwner ? 'Собственник' : 'Риелтор';
    const advertiserBgColor = isOwner ? 'bg-[#7BB3FF]' : 'bg-[#F18D74]';
    const advertiserTextColor = 'text-white';

    // Минимальное расстояние для определения свайпа
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setUserHasInteracted(true);
        setIsShowingDemo(false);
        cancelAnimationFrame(animationRef.current);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe && images.length > 1) {
            // Свайп влево - следующее изображение
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        } else if (isRightSwipe && images.length > 1) {
            // Свайп вправо - предыдущее изображение
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    return (
        <div className="rounded-[20px] overflow-hidden bg-white mb-4">
            {/* Изображение и дни */}
            <div className="relative">
                <div className="relative w-full p-4">
                    <div 
                        ref={containerRef}
                        className="relative h-[180px] w-full rounded-2xl overflow-hidden"
                    >
                        {/* Основное изображение */}
                        <div 
                            className="absolute inset-0 transition-transform"
                            style={{
                                transform: isShowingDemo ? `translateX(-${demoProgress * 100}%)` : 'translateX(0)'
                            }}
                        >
                            <img
                                ref={imageRef}
                                src={images[currentImageIndex]}
                                alt={property.title || "Изображение недвижимости"}
                                className="object-cover h-full w-full"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/600x400?text=Нет+фото';
                                }}
                            />
                        </div>
                        
                        {/* Следующее изображение (для демо) */}
                        {isShowingDemo && images.length > 1 && (
                            <div 
                                className="absolute inset-0 transition-transform"
                                style={{
                                    transform: `translateX(${100 - demoProgress * 100}%)`
                                }}
                            >
                                <img
                                    src={images[(currentImageIndex + 1) % images.length]}
                                    alt={property.title || "Следующее изображение"}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        )}
                        
                        {/* Анимированный палец для демонстрации */}
                        {isShowingDemo && (
                            <div 
                                className="absolute pointer-events-none"
                                style={{
                                    top: '50%',
                                    left: `${50 - demoProgress * 50}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            >
                                <div className="w-12 h-12 bg-white bg-opacity-70 rounded-full flex items-center justify-center shadow-lg">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 14L4 9M4 9L9 4M4 9H15C16.0609 9 17.0783 9.42143 17.8284 10.1716C18.5786 10.9217 19 11.9391 19 13V14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Индикаторы слайдера */}
                    {images.length > 1 && (
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${
                                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
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
                        {isFavorite ? (
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="#FF6B6B" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M11.0316 18.009C10.6848 18.1303 10.1136 18.1303 9.76682 18.009C6.80882 17.0078 0.199219 12.8314 0.199219 5.75278C0.199219 2.62807 2.73902 0.0999756 5.87042 0.0999756C7.72682 0.0999756 9.36902 0.989864 10.3992 2.36514C10.9233 1.66322 11.6059 1.09273 12.3923 0.699379C13.1787 0.306027 14.0472 0.100744 14.928 0.0999756C18.0594 0.0999756 20.5992 2.62807 20.5992 5.75278C20.5992 12.8314 13.9896 17.0078 11.0316 18.009Z" 
                                />
                            </svg>
                        ) : (
                            <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M11.0316 18.009C10.6848 18.1303 10.1136 18.1303 9.76682 18.009C6.80882 17.0078 0.199219 12.8314 0.199219 5.75278C0.199219 2.62807 2.73902 0.0999756 5.87042 0.0999756C7.72682 0.0999756 9.36902 0.989864 10.3992 2.36514C10.9233 1.66322 11.6059 1.09273 12.3923 0.699379C13.1787 0.306027 14.0472 0.100744 14.928 0.0999756C18.0594 0.0999756 20.5992 2.62807 20.5992 5.75278C20.5992 12.8314 13.9896 17.0078 11.0316 18.009Z" 
                                    stroke="#C0C0C0" 
                                    strokeWidth="1.5"
                                />
                            </svg>
                        )}
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

                {/* Цена */}
                <div className="text-[22px] text-[#000000] font-bold mb-2">
                    {property.price || "300$/мес."}
                </div>

                {/* Параметры */}
                <div className="flex gap-2">
                    <div className="flex items-center bg-[#F2F2F2] py-1 px-2 rounded-full text-base">
                        <svg width="16" height="16" className="mr-1" viewBox="0 0 24 24" fill="#838383" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3h18v18H3z" />
                        </svg>
                        <span className='text-[#000000]'>
                            {property.area || "60м²"}
                        </span>
                    </div>

                    <div className="flex items-center bg-[#F2F2F2] py-1 px-2 rounded-full text-base">
                        <svg width="16" height="16" className="mr-1" viewBox="0 0 24 24" fill="#838383" stroke="currentColor" strokeWidth="2">
                            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        </svg>
                        <span className='text-[#000000]'>
                            {property.rooms || "4"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}