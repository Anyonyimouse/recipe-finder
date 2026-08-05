import { SQLiteShoppingListRepository } from '../data/repositories/SQLiteShoppingListRepository';
import { ShoppingListRepository } from '../domain/repositories/ShoppingListRepository';
import { AddRecipeIngredientsToShoppingListUseCase } from '../domain/usecases/AddRecipeIngredientsToShoppingListUseCase';
import { AddShoppingItemUseCase } from '../domain/usecases/AddShoppingItemUseCase';
import { ClearCheckedShoppingItemsUseCase } from '../domain/usecases/ClearCheckedShoppingItemsUseCase';
import { DeleteCategoriesUseCase } from '../domain/usecases/DeleteCategoriesUseCase';
import { GetShoppingListUseCase } from '../domain/usecases/GetShoppingListUseCase';
import { ToggleShoppingItemUseCase } from '../domain/usecases/ToggleShoppingItemUseCase';

export const shoppingListRepository: ShoppingListRepository = new SQLiteShoppingListRepository();
export const getShoppingListUseCase = new GetShoppingListUseCase(shoppingListRepository);
export const addShoppingItemUseCase = new AddShoppingItemUseCase(shoppingListRepository);
export const toggleShoppingItemUseCase = new ToggleShoppingItemUseCase(shoppingListRepository);
export const clearCheckedShoppingItemsUseCase = new ClearCheckedShoppingItemsUseCase(shoppingListRepository);
export const addRecipeIngredientsToShoppingListUseCase = new AddRecipeIngredientsToShoppingListUseCase(shoppingListRepository);
export const deleteCategoriesUseCase = new DeleteCategoriesUseCase(shoppingListRepository);
