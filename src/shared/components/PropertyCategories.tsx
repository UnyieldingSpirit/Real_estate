'use client';

import { useTranslation } from '@/src/hooks';
import { 
  HousePlanIcon, 
  BookkeepingIcon, 
  CalculatorIcon, 
  WeatherIcon
} from '@/src/shared/ui/Icon';
import { useCategoryStore, PropertyCategoryType } from '@/src/store/categoryStore';

// Сопоставление типов категорий с компонентами иконок
const CATEGORY_ICONS = {
  [PropertyCategoryType.APARTMENT]: CalculatorIcon,
  [PropertyCategoryType.HOUSE]: HousePlanIcon,
  [PropertyCategoryType.COMMERCIAL]: BookkeepingIcon,
  [PropertyCategoryType.DACHA]: WeatherIcon,
};

const localization = {
  ru: {
    categories: 'Категории',
    apartment: 'Квартира',
    house: 'Частный дом',
    commercial: 'Нежилая недвижимость',
    dacha: 'Дача'
  },
  uz: {
    categories: 'Toifalar',
    apartment: 'Kvartira',
    house: 'Xususiy uy',
    commercial: 'Tijorat ko\'chmas mulki',
    dacha: 'Dala hovli'
  }
};

export default function Categories() {
  const { t } = useTranslation(localization);
  
  // Используем store напрямую для получения активной категории и метода для её изменения
  const activeCategory = useCategoryStore(state => state.activeCategory);
  const setActiveCategory = useCategoryStore(state => state.setActiveCategory);
  const getCategoryConfig = useCategoryStore(state => state.getCategoryConfig);
  
  // Обработчик нажатия на категорию
  const handleCategoryClick = (category: PropertyCategoryType) => {
    setActiveCategory(category);
    console.log(`Selected category: ${category}`);
  };
  
  return (
    <div className="px-4 mb-6">
      <h2 className="text-[#1F1F1F] mb-4"
       style={{ 
                    fontFamily: 'ALS Hauss, sans-serif',
                    fontWeight: 900,
                    fontSize: '28px',
                    lineHeight: '96%',
                    letterSpacing: '-0.04em'
                  }}>
        {t('categories')}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {Object.values(PropertyCategoryType).map((category) => {
          const config = getCategoryConfig(category);
          
          // Проверяем, является ли текущая категория активной
          const isActive = activeCategory === category;
          
          const bgColor = isActive ? config.activeColor : config.inactiveColor;
          const textColor = isActive ? config.activeTextColor : config.textColor;
          const iconColor = isActive ? config.iconActiveColor : config.iconInactiveColor;
          const IconComponent = CATEGORY_ICONS[category];
          
          return (
            <div
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="rounded-2xl shadow-sm overflow-hidden cursor-pointer h-[150px] relative transition-colors duration-300"
              style={{ backgroundColor: bgColor }}
            >
              <div className="p-3.5 h-full flex flex-col justify-between">
                <h3 
                  className="text-xl font-medium z-10 transition-colors duration-300"
                  style={{ color: textColor }}
                >
                  {t(config.titleKey)}
                </h3>
                
                <div className="w-full h-3/4 absolute bottom-0 right-0 flex justify-end items-end px-4">
                  <IconComponent 
                    color={iconColor}
                    width={config.iconWidth}
                    height={config.iconHeight}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}