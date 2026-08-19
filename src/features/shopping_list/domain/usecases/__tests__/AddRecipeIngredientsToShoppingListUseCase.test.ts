import { AddRecipeIngredientsToShoppingListUseCase } from '../AddRecipeIngredientsToShoppingListUseCase';
import { ShoppingListRepository } from '../../repositories/ShoppingListRepository';

describe('AddRecipeIngredientsToShoppingListUseCase', () => {
  let mockRepo: jest.Mocked<ShoppingListRepository>;
  let useCase: AddRecipeIngredientsToShoppingListUseCase;

  const ingredients = [
    { name: 'Soy Sauce', quantity: 0.5, unit: 'cup', category: 'Condiments' },
    { name: 'Chicken', quantity: 1, unit: 'kg', category: 'Meat' },
  ];

  beforeEach(() => {
    mockRepo = {
      getItems: jest.fn(),
      addItem: jest.fn(),
      addRecipeIngredients: jest.fn(),
      toggleItem: jest.fn(),
      clearChecked: jest.fn(),
      deleteCategories: jest.fn(),
      clearAll: jest.fn(),
    };
    useCase = new AddRecipeIngredientsToShoppingListUseCase(mockRepo);
  });

  it('should delegate bulk adding recipe ingredients to shopping list repository', async () => {
    mockRepo.addRecipeIngredients.mockResolvedValue(undefined);

    await useCase.execute(ingredients);

    expect(mockRepo.addRecipeIngredients).toHaveBeenCalledWith(ingredients);
  });
});
