import { AddShoppingItemUseCase } from '../AddShoppingItemUseCase';
import { ShoppingListRepository } from '../../repositories/ShoppingListRepository';

describe('AddShoppingItemUseCase', () => {
  let mockRepo: jest.Mocked<ShoppingListRepository>;
  let useCase: AddShoppingItemUseCase;

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
    useCase = new AddShoppingItemUseCase(mockRepo);
  });

  it('should delegate adding shopping item to repository', async () => {
    mockRepo.addItem.mockResolvedValue(undefined);

    await useCase.execute('Garlic', 2, 'cloves', 'Vegetables');

    expect(mockRepo.addItem).toHaveBeenCalledWith('Garlic', 2, 'cloves', 'Vegetables');
  });
});
