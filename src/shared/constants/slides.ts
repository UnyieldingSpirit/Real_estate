export const SlideType = {
  WELCOME: 'welcome',
  FEATURES: 'features',
  BENEFITS: 'benefits',
};

export const slides = [
  {
    id: SlideType.WELCOME,
    titleKey: 'onboarding.welcome.title',
    descriptionKey: 'onboarding.welcome.description',
    image: '/images/onboarding-1.png',
  },
  {
    id: SlideType.FEATURES,
    titleKey: 'onboarding.features.title',
    descriptionKey: 'onboarding.features.description',
    image: '/images/onboarding-2.png',
  },
  {
    id: SlideType.BENEFITS,
    titleKey: 'onboarding.benefits.title',
    descriptionKey: 'onboarding.benefits.description',
    image: '/images/onboarding-3.png',
  },
];