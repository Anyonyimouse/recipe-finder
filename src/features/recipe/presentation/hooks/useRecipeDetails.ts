import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '../../../../types/recipe';
import { SQLiteRecipeRepository } from '../../data/repositories/SQLiteRecipeRepository';

const repo = new SQLiteRecipeRepository();

export function useRecipeDetails(recipeId: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    if (!recipeId) return;
    setIsLoading(true);
    try {
      const data = await repo.getRecipeById(recipeId);
      setRecipe(data);
    } catch {
      // Graceful offline fallback
    } finally {
      setIsLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    recipe,
    isLoading,
    refresh: fetchDetails,
  };
}
