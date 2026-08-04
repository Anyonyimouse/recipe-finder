export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings?: number;
  readyInMinutes?: number;
  sourceUrl?: string;
  summary?: string;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];
  extendedIngredients?: {
    id: number;
    name: string;
    original: string;
    amount: number;
    unit: string;
    image?: string;
  }[];
  analyzedInstructions?: {
    name: string;
    steps: {
      number: number;
      step: string;
      equipment?: { name: string }[];
      ingredients?: { name: string }[];
    }[];
  }[];
  nutrition?: {
    nutrients: { name: string; amount: number; unit: string }[];
  };
}

// Configurable API key (fallback or user key)
let SPOONACULAR_API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY || 'a897284f18374a2aa6a5df489f074d28';

export function setSpoonacularApiKey(key: string) {
  SPOONACULAR_API_KEY = key;
}

const BASE_URL = 'https://api.spoonacular.com';

export const spoonacularService = {
  /**
   * Complex Recipe Search with filters
   */
  async searchRecipes(query: string, cuisine?: string, type?: string, maxCalories?: number) {
    try {
      let url = `${BASE_URL}/recipes/complexSearch?query=${encodeURIComponent(query)}&addRecipeInformation=true&fillIngredients=true&number=20&apiKey=${SPOONACULAR_API_KEY}`;
      if (cuisine && cuisine !== 'All') {
        url += `&cuisine=${encodeURIComponent(cuisine.replace(' Food', ''))}`;
      }
      if (type && type !== 'All') {
        url += `&type=${encodeURIComponent(type.toLowerCase())}`;
      }
      if (maxCalories && maxCalories > 0 && maxCalories <= 600) {
        url += `&maxCalories=${maxCalories}`;
      } else if (maxCalories === 601) {
        url += `&minCalories=600`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return (data.results || []) as SpoonacularRecipe[];
    } catch {
      return [];
    }
  },

  /**
   * Search Recipes by Ingredients
   */
  async searchByIngredients(ingredients: string[]) {
    try {
      const ingList = ingredients.join(',');
      const url = `${BASE_URL}/recipes/findByIngredients?ingredients=${encodeURIComponent(ingList)}&number=20&ranking=1&apiKey=${SPOONACULAR_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as SpoonacularRecipe[];
    } catch {
      return [];
    }
  },

  /**
   * Autocomplete Recipe Titles
   */
  async autocomplete(query: string) {
    try {
      const url = `${BASE_URL}/recipes/autocomplete?query=${encodeURIComponent(query)}&number=5&apiKey=${SPOONACULAR_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) return [];
      return (await res.json()) as { id: number; title: string }[];
    } catch {
      return [];
    }
  },

  /**
   * Get Full Recipe Details (Instructions, Equipment, Nutrition)
   */
  async getRecipeInformation(id: number) {
    try {
      const url = `${BASE_URL}/recipes/${id}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as SpoonacularRecipe;
    } catch {
      return null;
    }
  },

  /**
   * Get Similar Recipes
   */
  async getSimilarRecipes(id: number) {
    try {
      const url = `${BASE_URL}/recipes/${id}/similar?number=4&apiKey=${SPOONACULAR_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) return [];
      return (await res.json()) as { id: number; title: string; readyInMinutes: number; servings: number }[];
    } catch {
      return [];
    }
  },

  /**
   * Ingredient Substitutes
   */
  async getIngredientSubstitutes(ingredientName: string) {
    try {
      const url = `${BASE_URL}/food/ingredients/substitutes?ingredientName=${encodeURIComponent(ingredientName)}&apiKey=${SPOONACULAR_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) return null;
      return (await res.json()) as { status: string; substitutes?: string[]; message?: string };
    } catch {
      return null;
    }
  },
};
