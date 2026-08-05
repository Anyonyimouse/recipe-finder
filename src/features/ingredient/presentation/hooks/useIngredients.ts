import { useCallback, useEffect, useState } from 'react';
import { Ingredient } from '../../../../types/ingredient';
import { SQLiteIngredientRepository } from '../../data/repositories/SQLiteIngredientRepository';

const repo = new SQLiteIngredientRepository();

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadIngredients = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = searchQuery
        ? await repo.searchIngredients(searchQuery)
        : await repo.getAllIngredients();
      setIngredients(data);
    } catch {
      // Graceful offline handle
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  const toggleSelectIngredient = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    ingredients,
    selectedIds,
    searchQuery,
    setSearchQuery,
    isLoading,
    toggleSelectIngredient,
    clearSelection,
  };
}
