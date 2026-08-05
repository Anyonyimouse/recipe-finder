import { Recipe } from '../../../../types/recipe';

export interface RecipeRepository {
  getAllRecipes(): Promise<Recipe[]>;
  getRecipeById(id: string): Promise<Recipe | null>;
  searchByIngredients(ingredientIds: string[]): Promise<Recipe[]>;
  searchRecipes(
    query: string,
    ingredientIds: string[],
    cuisine?: string,
    mealType?: string,
    maxCalories?: number
  ): Promise<Recipe[]>;
  getFavoritesByIds(ids: string[]): Promise<Recipe[]>;
  saveFullOnlineRecipe(recipe: {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strInstructions: string;
    ingredients: { name: string; measure: string }[];
  }): Promise<void>;
  isRecipeDownloaded(idMeal: string): Promise<boolean>;
}
