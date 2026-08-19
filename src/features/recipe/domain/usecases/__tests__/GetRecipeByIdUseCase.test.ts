import { GetRecipeByIdUseCase } from '../GetRecipeByIdUseCase';
import { RecipeRepository } from '../../repositories/RecipeRepository';
import { Recipe } from '../../../../../types/recipe';

describe('GetRecipeByIdUseCase', () => {
  let mockRepo: jest.Mocked<RecipeRepository>;
  let useCase: GetRecipeByIdUseCase;

  const mockRecipe: Recipe = {
    id: 'rec-1',
    title: 'Adobo',
    description: 'Filipino Chicken Adobo',
    imageUrl: 'https://example.com/adobo.jpg',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    categoryId: 'cat-1',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-01',
  };

  beforeEach(() => {
    mockRepo = {
      getAllRecipes: jest.fn(),
      getRecipeById: jest.fn(),
      searchByIngredients: jest.fn(),
      searchRecipes: jest.fn(),
      getFavoritesByIds: jest.fn(),
      saveFullOnlineRecipe: jest.fn(),
      isRecipeDownloaded: jest.fn(),
    };
    useCase = new GetRecipeByIdUseCase(mockRepo);
  });

  it('should return recipe by ID when recipe exists', async () => {
    mockRepo.getRecipeById.mockResolvedValue(mockRecipe);

    const result = await useCase.execute('rec-1');

    expect(mockRepo.getRecipeById).toHaveBeenCalledWith('rec-1');
    expect(result).toEqual(mockRecipe);
  });

  it('should return null when recipe ID is not found', async () => {
    mockRepo.getRecipeById.mockResolvedValue(null);

    const result = await useCase.execute('non-existent');

    expect(mockRepo.getRecipeById).toHaveBeenCalledWith('non-existent');
    expect(result).toBeNull();
  });
});
