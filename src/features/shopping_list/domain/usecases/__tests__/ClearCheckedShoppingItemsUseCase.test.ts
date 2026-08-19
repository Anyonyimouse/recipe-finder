import { ClearCheckedShoppingItemsUseCase } from '../ClearCheckedShoppingItemsUseCase';
import { ShoppingListRepository } from '../../repositories/ShoppingListRepository';

describe('ClearCheckedShoppingItemsUseCase', () => {
  let mockRepo: jest.Mocked<ShoppingListRepository>;
  let useCase: ClearCheckedShoppingItemsUseCase;

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
    useCase = new ClearCheckedShoppingItemsUseCase(mockRepo);
  });

  it('should delegate clearing checked items to repository', async () => {
    mockRepo.clearChecked.mockResolvedValue(undefined);

    await useCase.execute();

    expect(mockRepo.clearChecked).toHaveBeenCalled();
  });
});
