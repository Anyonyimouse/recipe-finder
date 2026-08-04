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
    const now = new Date().toISOString();

    // Disable foreign keys temporarily for favorite stub insertion to prevent FK constraint failures
    await db.execAsync('PRAGMA foreign_keys = OFF;');
    try {
      // 1. Insert stub recipe if missing
      await db.runAsync(
        `INSERT OR IGNORE INTO recipes (id, title, description, image_url, prep_time, cook_time, servings, difficulty, category_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?)`,
        [recipeId, 'Saved Recipe', 'Favorite Item', '', 15, 20, 4, 'Easy', now, now]
      );
      // 2. Insert into favorites
      await db.runAsync(
        'INSERT OR IGNORE INTO favorites (recipe_id, created_at) VALUES (?, ?)',
        [recipeId, now]
      );
    } finally {
      await db.execAsync('PRAGMA foreign_keys = ON;');
    }
  }

  async removeFavorite(recipeId: string): Promise<void> {
    const db = await getDatabase();
    await db.execAsync('PRAGMA foreign_keys = OFF;');
    try {
      await db.runAsync('DELETE FROM favorites WHERE recipe_id = ?', [recipeId]);
    } finally {
      await db.execAsync('PRAGMA foreign_keys = ON;');
    }
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
