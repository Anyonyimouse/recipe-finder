import { ShoppingListRepository } from '../repositories/ShoppingListRepository';

export class AddShoppingItemUseCase {
  constructor(private repo: ShoppingListRepository) {}

  async execute(name: string, quantity: number, unit: string, category?: string): Promise<void> {
    return this.repo.addItem(name, quantity, unit, category);
  }
}
