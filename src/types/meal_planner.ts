export interface MealPlan {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: string; // Breakfast, Lunch, Dinner, Merienda
  recipeId: string;
  recipeTitle?: string;
  imageUrl?: string;
  prepTime?: number;
  cookTime?: number;
  createdAt: string;
}
