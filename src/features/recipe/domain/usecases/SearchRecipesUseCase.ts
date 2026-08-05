import { Recipe } from '../../../../types/recipe';
import { RecipeRepository } from '../repositories/RecipeRepository';

export class SearchRecipesUseCase {
  constructor(private recipeRepo: RecipeRepository) {}

  async execute(
    query: string,
    ingredientIds: string[],
    cuisine?: string,
    mealType?: string,
    maxCalories?: number
  ): Promise<Recipe[]> {
    return this.recipeRepo.searchRecipes(query, ingredientIds, cuisine, mealType, maxCalories);
  }
}
