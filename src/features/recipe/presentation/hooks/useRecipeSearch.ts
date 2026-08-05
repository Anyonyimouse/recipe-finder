import { useCallback, useEffect, useState } from 'react';
import { Recipe } from '../../../../types/recipe';
import { SQLiteRecipeRepository } from '../../data/repositories/SQLiteRecipeRepository';

const repo = new SQLiteRecipeRepository();

export function useRecipeSearch(
  searchQuery: string,
  selectedIngredientIds: string[],
  selectedCuisine?: string,
  selectedMealType?: string,
  maxCalories?: number
) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await repo.searchRecipes(
        searchQuery,
        selectedIngredientIds,
        selectedCuisine,
        selectedMealType,
        maxCalories
      );
      setRecipes(results);
    } catch {
      // Graceful offline handling
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedIngredientIds, selectedCuisine, selectedMealType, maxCalories]);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        fetchRecipes();
      }
    }, 120);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fetchRecipes]);

  return {
    recipes,
    isLoading,
    refresh: fetchRecipes,
  };
}
