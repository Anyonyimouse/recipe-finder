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
}
