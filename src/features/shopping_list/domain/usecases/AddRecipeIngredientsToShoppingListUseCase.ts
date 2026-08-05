import { ShoppingListRepository } from '../repositories/ShoppingListRepository';

export class AddRecipeIngredientsToShoppingListUseCase {
  constructor(private repo: ShoppingListRepository) {}

  async execute(ingredients: { name: string; quantity: number; unit: string; category?: string }[]): Promise<void> {
    return this.repo.addRecipeIngredients(ingredients);
  }
}
