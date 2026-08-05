import { ShoppingListRepository } from '../repositories/ShoppingListRepository';

export class DeleteCategoriesUseCase {
  constructor(private repo: ShoppingListRepository) {}

  async execute(categories: string[]): Promise<void> {
    return this.repo.deleteCategories(categories);
  }
}
