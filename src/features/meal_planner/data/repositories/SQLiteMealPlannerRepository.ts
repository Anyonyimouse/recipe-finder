import { getDatabase } from '../../../../database/database';
import { MealPlan } from '../../../../types/meal_planner';
import { MealPlannerRepository } from '../../domain/repositories/MealPlannerRepository';

export class SQLiteMealPlannerRepository implements MealPlannerRepository {
  async getMealPlansForDate(date: string): Promise<MealPlan[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<{
      id: string;
      date: string;
      meal_type: string;
      recipe_id: string;
      title: string | null;
      image_url: string | null;
      prep_time: number | null;
      cook_time: number | null;
      created_at: string;
    }>(
      `SELECT mp.*, r.title, r.image_url, r.prep_time, r.cook_time
       FROM meal_plans mp
       LEFT JOIN recipes r ON mp.recipe_id = r.id
       WHERE mp.date = ?
       ORDER BY mp.created_at ASC`,
      [date]
    );

    return rows.map((r) => ({
      id: r.id,
      date: r.date,
      mealType: r.meal_type,
      recipeId: r.recipe_id,
      recipeTitle: r.title || 'Planned Recipe',
      imageUrl: r.image_url || undefined,
      prepTime: r.prep_time || 0,
      cookTime: r.cook_time || 0,
      createdAt: r.created_at,
    }));
  }

  async getMealPlansForWeek(startDate: string, endDate: string): Promise<MealPlan[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<{
      id: string;
      date: string;
      meal_type: string;
      recipe_id: string;
      title: string | null;
      image_url: string | null;
      prep_time: number | null;
      cook_time: number | null;
      created_at: string;
    }>(
      `SELECT mp.*, r.title, r.image_url, r.prep_time, r.cook_time
       FROM meal_plans mp
       LEFT JOIN recipes r ON mp.recipe_id = r.id
       WHERE mp.date >= ? AND mp.date <= ?
       ORDER BY mp.date ASC, mp.created_at ASC`,
      [startDate, endDate]
    );

    return rows.map((r) => ({
      id: r.id,
      date: r.date,
      mealType: r.meal_type,
      recipeId: r.recipe_id,
      recipeTitle: r.title || 'Planned Recipe',
      imageUrl: r.image_url || undefined,
      prepTime: r.prep_time || 0,
      cookTime: r.cook_time || 0,
      createdAt: r.created_at,
    }));
  }

  async addMealPlan(date: string, mealType: string, recipeId: string): Promise<void> {
    const db = await getDatabase();
    const id = `mp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const now = new Date().toISOString();

    await db.execAsync('PRAGMA foreign_keys = OFF;');
    try {
      await db.runAsync(
        'INSERT INTO meal_plans (id, date, meal_type, recipe_id, created_at) VALUES (?, ?, ?, ?, ?)',
        [id, date, mealType, recipeId, now]
      );
    } finally {
      await db.execAsync('PRAGMA foreign_keys = ON;');
    }
  }

  async removeMealPlan(id: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM meal_plans WHERE id = ?', [id]);
  }
}
