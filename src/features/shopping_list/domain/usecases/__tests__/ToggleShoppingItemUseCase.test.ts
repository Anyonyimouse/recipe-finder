import { ToggleShoppingItemUseCase } from '../ToggleShoppingItemUseCase';
import { ShoppingListRepository } from '../../repositories/ShoppingListRepository';

describe('ToggleShoppingItemUseCase', () => {
  let mockRepo: jest.Mocked<ShoppingListRepository>;
  let useCase: ToggleShoppingItemUseCase;

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
    useCase = new ToggleShoppingItemUseCase(mockRepo);
  });

  it('should delegate toggling shopping list item by ID', async () => {
    mockRepo.toggleItem.mockResolvedValue(undefined);

    await useCase.execute('item-1');

    expect(mockRepo.toggleItem).toHaveBeenCalledWith('item-1');
  });
});
