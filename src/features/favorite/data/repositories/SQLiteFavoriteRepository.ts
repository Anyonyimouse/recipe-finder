import { FavoriteRepository } from '../../domain/repositories/FavoriteRepository';
import { getDatabase } from '../../../../database/database';

export class SQLiteFavoriteRepository implements FavoriteRepository {
  async getFavoriteIds(): Promise<string[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<{ recipe_id: string }>(
      'SELECT recipe_id FROM favorites ORDER BY created_at DESC'
    );
    return rows.map((r) => r.recipe_id);
  }

  async addFavorite(recipeId: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT OR IGNORE INTO favorites (recipe_id, created_at) VALUES (?, ?)',
      [recipeId, new Date().toISOString()]
    );
  }

  async removeFavorite(recipeId: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM favorites WHERE recipe_id = ?', [recipeId]);
  }

  async isFavorite(recipeId: string): Promise<boolean> {
    const db = await getDatabase();
    const row = await db.getFirstAsync<{ recipe_id: string }>(
      'SELECT recipe_id FROM favorites WHERE recipe_id = ?',
      [recipeId]
    );
    return !!row;
  }
}
