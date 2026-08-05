import { ShoppingListItem } from '../../../../types/shopping_list';

export interface ShoppingListRepository {
  getItems(): Promise<ShoppingListItem[]>;
  addItem(ingredientName: string, quantity: number, unit: string, category?: string): Promise<void>;
  toggleItem(id: string): Promise<void>;
  clearChecked(): Promise<void>;
  clearAll(): Promise<void>;
  addRecipeIngredients(ingredients: { name: string; quantity: number; unit: string; category?: string }[]): Promise<void>;
  deleteCategories(categories: string[]): Promise<void>;
}
