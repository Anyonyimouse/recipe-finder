import { IngredientRepository } from '../../domain/repositories/IngredientRepository';
import { Ingredient } from '../../../../types/ingredient';
import { getDatabase } from '../../../../database/database';

export class SQLiteIngredientRepository implements IngredientRepository {
  async getAllIngredients(): Promise<Ingredient[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<{
      id: string;
      name: string;
      category: string;
      image_url: string | null;
    }>('SELECT id, name, category, image_url FROM ingredients ORDER BY name ASC');

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      imageUrl: r.image_url || undefined,
    }));
  }

  async searchIngredients(query: string): Promise<Ingredient[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<{
      id: string;
      name: string;
      category: string;
      image_url: string | null;
    }>(
      'SELECT id, name, category, image_url FROM ingredients WHERE name LIKE ? ORDER BY name ASC',
      [`%${query}%`]
    );

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      imageUrl: r.image_url || undefined,
    }));
  }
}
