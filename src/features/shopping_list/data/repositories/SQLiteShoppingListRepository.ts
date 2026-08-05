import { getDatabase } from '../../../../database/database';
import { ShoppingListItem } from '../../../../types/shopping_list';
import { ShoppingListRepository } from '../../domain/repositories/ShoppingListRepository';

export class SQLiteShoppingListRepository implements ShoppingListRepository {
  async getItems(): Promise<ShoppingListItem[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<{
      id: string;
      ingredient_name: string;
      quantity: number;
      unit: string;
      category: string;
      is_checked: number;
      created_at: string;
    }>('SELECT * FROM shopping_list ORDER BY is_checked ASC, category ASC, ingredient_name ASC');

    return rows.map((r) => ({
      id: r.id,
      ingredientName: r.ingredient_name,
      quantity: r.quantity || 1,
      unit: r.unit || '',
      category: r.category || 'General',
      isChecked: Boolean(r.is_checked),
      createdAt: r.created_at,
    }));
  }

  async addItem(ingredientName: string, quantity: number, unit: string, category = 'General'): Promise<void> {
    const db = await getDatabase();
    const id = `shop-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();

    await db.runAsync(
      'INSERT INTO shopping_list (id, ingredient_name, quantity, unit, category, is_checked, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)',
      [id, ingredientName.trim(), quantity || 1, unit.trim(), category, now]
    );
  }

  async toggleItem(id: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      'UPDATE shopping_list SET is_checked = CASE WHEN is_checked = 1 THEN 0 ELSE 1 END WHERE id = ?',
      [id]
    );
  }

  async clearChecked(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM shopping_list WHERE is_checked = 1');
  }

  async clearAll(): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM shopping_list');
  }

  async addRecipeIngredients(ingredients: { name: string; quantity: number; unit: string; category?: string }[]): Promise<void> {
    const db = await getDatabase();
    const now = new Date().toISOString();

    for (let i = 0; i < ingredients.length; i++) {
      const ing = ingredients[i];
      if (!ing.name || !ing.name.trim()) continue;
      const id = `shop-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`;
      await db.runAsync(
        'INSERT INTO shopping_list (id, ingredient_name, quantity, unit, category, is_checked, created_at) VALUES (?, ?, ?, ?, ?, 0, ?)',
        [id, ing.name.trim(), ing.quantity || 1, ing.unit ? ing.unit.trim() : '', ing.category || 'General', now]
      );
    }
  }

  async deleteCategories(categories: string[]): Promise<void> {
    const db = await getDatabase();
    for (const cat of categories) {
      await db.runAsync('DELETE FROM shopping_list WHERE category = ?', [cat]);
    }
  }
}
