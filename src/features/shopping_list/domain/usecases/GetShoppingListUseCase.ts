import { ShoppingListItem } from '../../../../types/shopping_list';
import { ShoppingListRepository } from '../repositories/ShoppingListRepository';

export class GetShoppingListUseCase {
  constructor(private repo: ShoppingListRepository) {}

  async execute(): Promise<ShoppingListItem[]> {
    return this.repo.getItems();
  }
}
