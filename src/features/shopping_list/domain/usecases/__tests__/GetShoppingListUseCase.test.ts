import { GetShoppingListUseCase } from '../GetShoppingListUseCase';
import { ShoppingListRepository } from '../../repositories/ShoppingListRepository';
import { ShoppingListItem } from '../../../../../types/shopping_list';

describe('GetShoppingListUseCase', () => {
  let mockRepo: jest.Mocked<ShoppingListRepository>;
  let useCase: GetShoppingListUseCase;

  const mockItems: ShoppingListItem[] = [
    { id: 'item-1', ingredientName: 'Garlic', quantity: 2, unit: 'cloves', isChecked: false, category: 'Vegetables', createdAt: '2026-08-01' },
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
    useCase = new GetShoppingListUseCase(mockRepo);
  });

  it('should delegate fetching all shopping list items', async () => {
    mockRepo.getItems.mockResolvedValue(mockItems);

    const result = await useCase.execute();

    expect(mockRepo.getItems).toHaveBeenCalled();
    expect(result).toEqual(mockItems);
  });
});
