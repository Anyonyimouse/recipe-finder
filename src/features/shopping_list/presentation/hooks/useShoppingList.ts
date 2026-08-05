import { useState, useEffect, useCallback } from 'react';
import { ShoppingListItem } from '../../../../types/shopping_list';
import {
  addRecipeIngredientsToShoppingListUseCase,
  addShoppingItemUseCase,
  clearCheckedShoppingItemsUseCase,
  deleteCategoriesUseCase,
  getShoppingListUseCase,
  toggleShoppingItemUseCase,
} from '../../di/ShoppingListContainer';

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getShoppingListUseCase.execute();
      setItems(data);
    } catch {
      // safe offline handle
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const addItem = async (name: string, quantity: number, unit: string, category?: string) => {
    await addShoppingItemUseCase.execute(name, quantity, unit, category);
    await loadItems();
  };

  const toggleItem = async (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
    await toggleShoppingItemUseCase.execute(id);
  };

  const clearChecked = async () => {
    setItems((prev) => prev.filter((item) => !item.isChecked));
    await clearCheckedShoppingItemsUseCase.execute();
  };

  const addRecipeIngredients = async (
    ingredients: { name: string; quantity: number; unit: string; category?: string }[]
  ) => {
    await addRecipeIngredientsToShoppingListUseCase.execute(ingredients);
    await loadItems();
  };

  const deleteCategories = async (categories: string[]) => {
    setItems((prev) => prev.filter((item) => !categories.includes(item.category || 'General')));
    await deleteCategoriesUseCase.execute(categories);
    await loadItems();
  };

  return {
    items,
    isLoading,
    addItem,
    toggleItem,
    clearChecked,
    addRecipeIngredients,
    deleteCategories,
    reload: loadItems,
  };
}
