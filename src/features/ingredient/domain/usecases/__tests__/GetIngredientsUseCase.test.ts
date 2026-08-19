import { GetIngredientsUseCase } from '../GetIngredientsUseCase';
import { IngredientRepository } from '../../repositories/IngredientRepository';
import { Ingredient } from '../../../../../types/ingredient';

describe('GetIngredientsUseCase', () => {
  let mockRepo: jest.Mocked<IngredientRepository>;
  let useCase: GetIngredientsUseCase;

  const mockIngredients: Ingredient[] = [
    { id: 'ing-1', name: 'Garlic', category: 'Vegetables' },
    { id: 'ing-2', name: 'Soy Sauce', category: 'Condiments' },
  ];

  beforeEach(() => {
    mockRepo = {
      getAllIngredients: jest.fn(),
      searchIngredients: jest.fn(),
    };
    useCase = new GetIngredientsUseCase(mockRepo);
  });

  it('should return all ingredients when search query is empty or undefined', async () => {
    mockRepo.getAllIngredients.mockResolvedValue(mockIngredients);

    const result = await useCase.execute();

    expect(mockRepo.getAllIngredients).toHaveBeenCalled();
    expect(result).toEqual(mockIngredients);
  });

  it('should search ingredients when searchQuery string is provided', async () => {
    mockRepo.searchIngredients.mockResolvedValue([mockIngredients[0]]);

    const result = await useCase.execute('Garlic');

    expect(mockRepo.searchIngredients).toHaveBeenCalledWith('Garlic');
    expect(result).toEqual([mockIngredients[0]]);
  });
});
