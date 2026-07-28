import { RecipeRepository } from '../../domain/repositories/RecipeRepository';
import { Recipe, Difficulty } from '../../../../types/recipe';
import { getDatabase } from '../../../../database/database';

export class SQLiteRecipeRepository implements RecipeRepository {
  async getAllRecipes(): Promise<Recipe[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync<any>(`
      SELECT r.*, COUNT(ri.ingredient_id) as total_ingredients
      FROM recipes r
      LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      GROUP BY r.id
      ORDER BY r.title ASC
    `);

    return rows.map(this.mapRecipeRow);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    const db = await getDatabase();
    const recipeRow = await db.getFirstAsync<any>(
      'SELECT * FROM recipes WHERE id = ?',
      [id]
    );

    if (!recipeRow) return null;

    const recipe = this.mapRecipeRow(recipeRow);

    // Get ingredients
    const ingRows = await db.getAllAsync<any>(
      `SELECT ri.*, i.name as ingredient_name, i.image_url as ingredient_image_url
       FROM recipe_ingredients ri
       JOIN ingredients i ON ri.ingredient_id = i.id
       WHERE ri.recipe_id = ?`,
      [id]
    );

    recipe.ingredients = ingRows.map((r) => ({
      recipeId: r.recipe_id,
      ingredientId: r.ingredient_id,
      ingredientName: r.ingredient_name,
      imageUrl: r.ingredient_image_url || undefined,
      quantity: r.quantity,
      unit: r.unit,
    }));

    // Get steps
    const stepRows = await db.getAllAsync<any>(
      'SELECT * FROM recipe_steps WHERE recipe_id = ? ORDER BY step_number ASC',
      [id]
    );

    recipe.steps = stepRows.map((s) => ({
      id: s.id,
      recipeId: s.recipe_id,
      stepNumber: s.step_number,
      instruction: s.instruction,
    }));

    return recipe;
  }

  async searchByIngredients(selectedIds: string[]): Promise<Recipe[]> {
    if (selectedIds.length === 0) {
      return this.getAllRecipes();
    }

    const db = await getDatabase();
    const placeholders = selectedIds.map(() => '?').join(',');

    const query = `
      SELECT r.*,
        COUNT(DISTINCT ri.ingredient_id) as match_count,
        (SELECT COUNT(*) FROM recipe_ingredients WHERE recipe_id = r.id) as total_ingredients
      FROM recipes r
      JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      WHERE ri.ingredient_id IN (${placeholders})
      GROUP BY r.id
      ORDER BY match_count DESC, r.title ASC
    `;

    const rows = await db.getAllAsync<any>(query, selectedIds);
    return rows.map(this.mapRecipeRow);
  }

  async searchRecipes(
    queryStr: string,
    selectedIds: string[],
    cuisine?: string,
    mealType?: string,
    maxCalories?: number
  ): Promise<Recipe[]> {
    const db = await getDatabase();
    const trimmed = queryStr.trim();
    const searchPattern = trimmed ? `%${trimmed}%` : null;

    let whereClauses: string[] = [];
    let params: any[] = [];

    // Filter by selected ingredients
    if (selectedIds.length > 0) {
      const placeholders = selectedIds.map(() => '?').join(',');
      whereClauses.push(`ri.ingredient_id IN (${placeholders})`);
      params.push(...selectedIds);
    }

    // Filter by search text
    if (searchPattern) {
      whereClauses.push('(r.title LIKE ? OR r.description LIKE ? OR c.name LIKE ? OR i.name LIKE ?)');
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    // Filter by cuisine
    if (cuisine && cuisine !== 'All') {
      whereClauses.push('r.cuisine = ?');
      params.push(cuisine);
    }

    // Filter by meal_type
    if (mealType && mealType !== 'All') {
      whereClauses.push('r.meal_type = ?');
      params.push(mealType);
    }

    // Filter by max calories (Low Calorie mode)
    if (maxCalories && maxCalories > 0) {
      whereClauses.push('(r.calories IS NOT NULL AND r.calories <= ?)');
      params.push(maxCalories);
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const selectMatchCount = selectedIds.length > 0
      ? 'COUNT(DISTINCT ri.ingredient_id) as match_count,'
      : '';
    const orderBy = selectedIds.length > 0
      ? 'ORDER BY match_count DESC, r.title ASC'
      : 'ORDER BY r.title ASC';

    const sql = `
      SELECT r.*,
        ${selectMatchCount}
        (SELECT COUNT(*) FROM recipe_ingredients WHERE recipe_id = r.id) as total_ingredients
      FROM recipes r
      LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      LEFT JOIN ingredients i ON ri.ingredient_id = i.id
      LEFT JOIN categories c ON r.category_id = c.id
      ${whereString}
      GROUP BY r.id
      ${orderBy}
    `;

    const rows = await db.getAllAsync<any>(sql, params);
    return rows.map(this.mapRecipeRow);
  }

  async getFavoritesByIds(ids: string[]): Promise<Recipe[]> {
    if (ids.length === 0) return [];
    const db = await getDatabase();
    const placeholders = ids.map(() => '?').join(',');
    const rows = await db.getAllAsync<any>(
      `SELECT r.*, COUNT(ri.ingredient_id) as total_ingredients
       FROM recipes r
       LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
       WHERE r.id IN (${placeholders})
       GROUP BY r.id`,
      ids
    );
    return rows.map(this.mapRecipeRow);
  }

  private mapRecipeRow(r: any): Recipe {
    return {
      id: r.id,
      title: r.title,
      description: r.description || '',
      imageUrl: r.image_url || '',
      prepTime: r.prep_time || 0,
      cookTime: r.cook_time || 0,
      servings: r.servings || 1,
      difficulty: (r.difficulty as Difficulty) || 'Easy',
      categoryId: r.category_id || '',
      cuisine: r.cuisine || undefined,
      mealType: r.meal_type || undefined,
      calories: r.calories || undefined,
      createdAt: r.created_at || '',
      updatedAt: r.updated_at || '',
      matchCount: r.match_count !== undefined ? Number(r.match_count) : undefined,
      totalIngredients:
        r.total_ingredients !== undefined ? Number(r.total_ingredients) : undefined,
    };
  }
}
