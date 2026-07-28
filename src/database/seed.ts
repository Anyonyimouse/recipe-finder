import { SQLiteDatabase } from 'expo-sqlite';
import filipinoData from './filipino_dataset.json';

export async function seedDatabase(db: SQLiteDatabase): Promise<void> {
  const syncCheck = await db.getFirstAsync<{ value: string }>(
    "SELECT value FROM sync_metadata WHERE key = 'database_version'"
  );

  // Skip if already upgraded to version 17
  if (syncCheck && syncCheck.value === '17') {
    return;
  }

  await db.execAsync('PRAGMA foreign_keys = OFF;');

  // Ensure columns exist on legacy SQLite tables if upgraded from older schema
  try {
    await db.execAsync('ALTER TABLE recipes ADD COLUMN cuisine TEXT;');
  } catch {
    // Column already exists
  }
  try {
    await db.execAsync('ALTER TABLE recipes ADD COLUMN meal_type TEXT;');
  } catch {
    // Column already exists
  }

  await db.withTransactionAsync(async () => {
    // 1. Purge all previous recipes, categories & relations
    await db.execAsync('DELETE FROM recipes;');
    await db.execAsync('DELETE FROM categories;');
    await db.execAsync('DELETE FROM recipe_ingredients;');
    await db.execAsync('DELETE FROM recipe_steps;');

    // 2. Seed 100% Authentic Filipino Categories
    for (const cat of filipinoData.categories) {
      await db.runAsync(
        'INSERT OR REPLACE INTO categories (id, name, icon) VALUES (?, ?, ?)',
        [cat.id, cat.name, cat.icon]
      );
    }

    // 3. Seed 100% Authentic Filipino Ingredients
    for (const ing of filipinoData.ingredients) {
      await db.runAsync(
        'INSERT OR REPLACE INTO ingredients (id, name, category, image_url) VALUES (?, ?, ?, ?)',
        [ing.id, ing.name, ing.category, ing.imageUrl]
      );
    }

    // 4. Seed Curated Unique Non-Redundant Filipino Recipes
    for (const recipe of filipinoData.recipes) {
      await db.runAsync(
        `INSERT OR REPLACE INTO recipes 
         (id, title, description, image_url, prep_time, cook_time, servings, difficulty, category_id, cuisine, meal_type, calories, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          recipe.id,
          recipe.title,
          recipe.description,
          recipe.imageUrl,
          recipe.prepTime,
          recipe.cookTime,
          recipe.servings,
          recipe.difficulty,
          recipe.categoryId,
          (recipe as any).cuisine || 'Filipino Food',
          (recipe as any).mealType || 'Lunch',
          recipe.calories,
          recipe.createdAt,
          recipe.updatedAt,
        ]
      );

      // Seed Recipe Ingredients
      for (const ingObj of recipe.ingredients) {
        await db.runAsync(
          'INSERT OR REPLACE INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)',
          [recipe.id, ingObj.ingredientId, ingObj.quantity, ingObj.unit]
        );
      }

      // Seed Recipe Steps
      let stepNum = 1;
      for (const stepText of recipe.steps) {
        await db.runAsync(
          'INSERT INTO recipe_steps (recipe_id, step_number, instruction) VALUES (?, ?, ?)',
          [recipe.id, stepNum, stepText]
        );
        stepNum++;
      }
    }

    // 5. Update Sync Metadata
    await db.runAsync(
      "INSERT OR REPLACE INTO sync_metadata (key, value) VALUES ('database_version', '17')"
    );
    await db.runAsync(
      "INSERT OR REPLACE INTO sync_metadata (key, value) VALUES ('last_sync', ?)",
      [new Date().toISOString()]
    );
    await db.runAsync(
      `INSERT OR REPLACE INTO sync_metadata (key, value) VALUES ('recipe_count', '${filipinoData.recipes.length}')`
    );
  });

  await db.execAsync('PRAGMA foreign_keys = ON;');
}
