import { Recipe } from '../../../../types/recipe';
import { RecipeRepository } from '../repositories/RecipeRepository';

export class GetRecipeByIdUseCase {
  constructor(private recipeRepo: RecipeRepository) {}

  async execute(id: string): Promise<Recipe | null> {
    return this.recipeRepo.getRecipeById(id);
  }
}
