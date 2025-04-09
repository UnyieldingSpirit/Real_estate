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
    iconWidth: 85,
    iconHeight: 80,
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

interface CategoryState {
  // Активная категория - может быть null
  activeCategory: PropertyCategoryType | null;
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

// Цвет по умолчанию
const DEFAULT_APP_COLOR = '#FF6B6B';

export const useCategoryStore = create<CategoryState>((set, get) => ({
  // Изначально нет активной категории
  activeCategory: null,
  activeCategoryColor: DEFAULT_APP_COLOR,

  setActiveCategory: (category) => {
    // Если null, то сбрасываем активную категорию
    if (category === null) {
      set({
        activeCategory: null,
        activeCategoryColor: DEFAULT_APP_COLOR,
      });
      return;
    }

    // Иначе устанавливаем указанную категорию
    const categoryConfig = PROPERTY_CATEGORIES[category];
    set({
      activeCategory: category,
      activeCategoryColor: categoryConfig.activeColor,
    });
  },

  getActiveColor: () => {
    const { activeCategory, activeCategoryColor } = get();
    // Если активная категория не выбрана, возвращаем дефолтный цвет
    if (!activeCategory) return DEFAULT_APP_COLOR;
    return activeCategoryColor;
  },

  isCategoryActive: (category) => {
    return get().activeCategory === category;
  },

  getCategoryConfig: (category) => {
    return PROPERTY_CATEGORIES[category];
  },
}));