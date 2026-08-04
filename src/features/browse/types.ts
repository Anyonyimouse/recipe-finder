export interface OnlineRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube?: string;
  ingredients: { name: string; measure: string }[];
}

export const CATEGORY_TAGS = [
  'All',
  'Chicken',
  'Beef',
  'Pork',
  'Seafood',
  'Pasta',
  'Dessert',
  'Vegetarian',
  'Breakfast',
];

export const COUNTRY_CUISINES = [
  {
    country: 'Filipino',
    flag: '🇵🇭',
    meals: ['All', 'Breakfast', 'Lunch', 'Dinner', 'Merienda'],
  },
  {
    country: 'Italian',
    flag: '🇮🇹',
    meals: ['All', 'Pasta', 'Seafood', 'Dessert'],
  },
  {
    country: 'American',
    flag: '🇺🇸',
    meals: ['All', 'Beef', 'Pork', 'Chicken', 'Dessert'],
  },
  {
    country: 'Japanese',
    flag: '🇯🇵',
    meals: ['All', 'Seafood', 'Chicken', 'Beef'],
  },
  {
    country: 'Mexican',
    flag: '🇲🇽',
    meals: ['All', 'Beef', 'Chicken', 'Vegetarian'],
  },
  {
    country: 'Indian',
    flag: '🇮🇳',
    meals: ['All', 'Chicken', 'Vegetarian', 'Lamb'],
  },
  {
    country: 'Chinese',
    flag: '🇨🇳',
    meals: ['All', 'Pork', 'Chicken', 'Beef', 'Seafood'],
  },
  {
    country: 'Thai',
    flag: '🇹🇭',
    meals: ['All', 'Seafood', 'Chicken', 'Vegetarian'],
  },
];
