import { create } from 'zustand';

// Импортируем enum категорий
export enum PropertyCategoryType {
    APARTMENT = 'apartment',
    HOUSE = 'house',
    COMMERCIAL = 'commercial',
    DACHA = 'dacha',
}

// Определяем полную конфигурацию категорий прямо в store
export const PROPERTY_CATEGORIES = {
  [PropertyCategoryType.APARTMENT]: {
    titleKey: 'apartment',
    activeColor: '#FF7560',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    activeTextColor: '#FFFFFF',
    iconActiveColor: 'white',
    iconInactiveColor: '#E6E6E6',
    iconWidth: 90,
    iconHeight: 100,
  },
  [PropertyCategoryType.HOUSE]: {
    titleKey: 'house',
    activeColor: '#AB3574ED',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    activeTextColor: '#FFFFFF',
    iconActiveColor: 'white',
    iconInactiveColor: '#E6E6E6',
    iconWidth: 115,
    iconHeight: 100,
  },
  [PropertyCategoryType.COMMERCIAL]: {
    titleKey: 'commercial',
    activeColor: '#554B8FED',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    activeTextColor: '#FFFFFF',
    iconActiveColor: 'white',
    iconInactiveColor: '#E6E6E6',
    iconWidth: 90,
    iconHeight: 85,
  },
  [PropertyCategoryType.DACHA]: {
    titleKey: 'dacha',
    activeColor: '#4CAF50',
    inactiveColor: '#FFFFFF',
    textColor: '#1F1F1F',
    activeTextColor: '#FFFFFF',
    iconActiveColor: 'white',
    iconInactiveColor: '#E6E6E6',
    iconWidth: 96,
    iconHeight: 96,
  },
};

// Цвет по умолчанию для приложения (красный для MoyDom)
// const DEFAULT_APP_COLOR = '#FF6B6B';

interface CategoryState {
    // Активная категория
    activeCategory: PropertyCategoryType;
    // Соответствующий цвет активной категории
    activeCategoryColor: string;
    // Устанавливает активную категорию
    setActiveCategory: (category: PropertyCategoryType | null) => void;
    // Получает цвет на основе активной категории (или возвращает дефолтный)
    getActiveColor: () => string;
    // Проверяет активна ли указанная категория
    isCategoryActive: (category: PropertyCategoryType) => boolean;
    // Получает конфигурацию категории
    getCategoryConfig: (category: PropertyCategoryType) => typeof PROPERTY_CATEGORIES[PropertyCategoryType];
}

// Удалили middleware persist, теперь состояние не сохраняется между сессиями
export const useCategoryStore = create<CategoryState>((set, get) => ({
  // Устанавливаем APARTMENT как активную категорию по умолчанию
  activeCategory: PropertyCategoryType.APARTMENT,
  activeCategoryColor: PROPERTY_CATEGORIES[PropertyCategoryType.APARTMENT].activeColor,

  setActiveCategory: (category) => {
    // Если передан null, используем APARTMENT как категорию по умолчанию
    const categoryToSet = category || PropertyCategoryType.APARTMENT;
    const categoryConfig = PROPERTY_CATEGORIES[categoryToSet];

    set({
      activeCategory: categoryToSet,
      activeCategoryColor: categoryConfig.activeColor,
    });
  },

  getActiveColor: () => {
    return get().activeCategoryColor;
  },

  isCategoryActive: (category) => {
    return get().activeCategory === category;
  },

  getCategoryConfig: (category) => {
    return PROPERTY_CATEGORIES[category];
  },
}));