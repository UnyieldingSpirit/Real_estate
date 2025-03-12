'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PropertyCard({ property }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Преобразуем в массив, если images не массив или пусто
    const images = Array.isArray(property.images) && property.images.length > 0
        ? property.images
        : ['https://placehold.co/600x400?text=Нет+фото'];

    // Обработчики для галереи изображений
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Обработчик для избранного
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="property-card" style={{
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '16px'
        }}>
            {/* Изображение и дни */}
            <div style={{ position: 'relative' }}>
                <div style={{
                    position: 'relative',
                    height: '240px',
                    width: '100%',
                    backgroundColor: '#f0f0f0'
                }}>
                    <img
                        src={images[currentImageIndex]}
                        alt={property.title}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                        }}
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/600x400?text=Нет+фото';
                        }}
                    />

                    {/* Индикаторы слайдера */}
                    {images.length > 1 && (
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '0',
                            right: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '6px'
                        }}>
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Кнопки переключения слайдов */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '10px',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                &lt;
                            </button>
                            <button
                                onClick={nextImage}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                &gt;
                            </button>
                        </>
                    )}
                </div>

                {/* Бейдж с днями и избранное */}
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                }}>
                    4 дня назад
                </div>

                <button
                    onClick={toggleFavorite}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    {isFavorite ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF4848">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Информация о недвижимости */}
            <div style={{ padding: '16px' }}>
                {/* Локация */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    color: '#666',
                    fontSize: '14px'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span style={{ marginLeft: '4px' }}>
                        {property.location || `${property.city}${property.district ? ', ' + property.district : ''}`}
                    </span>
                </div>

                {/* Цена */}
                <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '12px'
                }}>
                    {property.price}
                </div>

                {/* Параметры */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '12px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f5f5f5',
                        padding: '4px 10px',
                        borderRadius: '100px',
                        fontSize: '14px'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3h18v18H3z" />
                        </svg>
                        <span style={{ marginLeft: '4px' }}>
                            {property.area || '60м²'}
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f5f5f5',
                        padding: '4px 10px',
                        borderRadius: '100px',
                        fontSize: '14px'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        </svg>
                        <span style={{ marginLeft: '4px' }}>
                            {property.rooms || '4'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}