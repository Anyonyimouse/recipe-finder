import { Ingredient } from '../../../../types/ingredient';
import { IngredientRepository } from '../repositories/IngredientRepository';

export class GetIngredientsUseCase {
  constructor(private ingredientRepo: IngredientRepository) {}

  async execute(searchQuery?: string): Promise<Ingredient[]> {
    if (searchQuery && searchQuery.trim() !== '') {
      return this.ingredientRepo.searchIngredients(searchQuery.trim());
    }
    return this.ingredientRepo.getAllIngredients();
  }
}
