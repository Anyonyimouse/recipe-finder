import { ShoppingListRepository } from '../repositories/ShoppingListRepository';

export class ToggleShoppingItemUseCase {
  constructor(private repo: ShoppingListRepository) {}

  async execute(id: string): Promise<void> {
    return this.repo.toggleItem(id);
  }
}
