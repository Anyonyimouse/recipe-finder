import { DeleteCategoriesUseCase } from '../DeleteCategoriesUseCase';
import { ShoppingListRepository } from '../../repositories/ShoppingListRepository';

describe('DeleteCategoriesUseCase', () => {
  let mockRepo: jest.Mocked<ShoppingListRepository>;
  let useCase: DeleteCategoriesUseCase;

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
    useCase = new DeleteCategoriesUseCase(mockRepo);
  });

  it('should delegate deleting items by category list', async () => {
    mockRepo.deleteCategories.mockResolvedValue(undefined);

    await useCase.execute(['Vegetables', 'Condiments']);

    expect(mockRepo.deleteCategories).toHaveBeenCalledWith(['Vegetables', 'Condiments']);
  });
});
