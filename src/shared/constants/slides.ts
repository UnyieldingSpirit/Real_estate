export const SlideType = {
    WELCOME: 'welcome',
    FEATURES: 'features',
    BENEFITS: 'benefits'
};

export const slides = [
    {
        id: SlideType.WELCOME,
        title: 'Приложение, которое поможет',
        description: 'MoyDom поможет легко снять или купить недвижимость в вашем городе',
        image: '/images/onboarding-1.png'
    },
    {
        id: SlideType.FEATURES,
        title: 'Легко и удобно находите то что нужно',
        description: 'В MoyDom простой и удобный функционал без излишеств',
        image: '/images/onboarding-2.png'
    },
    {
        id: SlideType.BENEFITS,
        title: 'Быстрые сделки без посредников',
        description: 'Находите лучшие предложения напрямую от собственников',
        image: '/images/onboarding-3.png'
    }
];