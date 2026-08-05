import { ShoppingListRepository } from '../repositories/ShoppingListRepository';

export class ClearCheckedShoppingItemsUseCase {
  constructor(private repo: ShoppingListRepository) {}

  async execute(): Promise<void> {
    return this.repo.clearChecked();
  }
}
